import JSZip from 'jszip';

/**
 * Convert the given file(s) to a GeoJSON feature collection.
 *
 * @param fileOrFiles
 * @param params
 */
export async function convertToGeoJSON(
  fileOrFiles: (File | File[]),
  params: { openOpts: string[]; opts: string[] } = { opts: [], openOpts: [] },
): Promise<GeoJSONFeatureCollection> {
  const openOptions = params.openOpts || [];
  const input = await window.Gdal.open(fileOrFiles, openOptions);
  const options = [
    '-f', 'GeoJSON',
    '-t_srs', 'EPSG:4326',
    '-lco', 'RFC7946=NO',
    '-lco', 'WRITE_NON_FINITE_VALUES=YES',
  ].concat(params.opts || []);
  const output = await window.Gdal.ogr2ogr(input.datasets[0], options);
  const bytes = await window.Gdal.getFileBytes(output);
  await window.Gdal.close(input);
  return JSON.parse(new TextDecoder().decode(bytes));
}

/**
 * Get the geometry type of the given GeoJSON layer.
 *
 * @param {GeoJSONFeatureCollection} geojsonLayer
 * @returns {string}
 */
export function getGeometryType(geojsonLayer: GeoJSONFeatureCollection): string {
  // Extract the geometry type from the GeoJSON layer
  // (we don't care if it is a multi geometry - we just want the base type)
  const types: Set<string> = new Set();
  geojsonLayer.features.forEach((feature: GeoJSONFeature) => {
    if (!feature.geometry) return;
    types.add(feature.geometry.type.replace('Multi', ''));
  });
  // We only support one geometry (base) type per layer
  const typesArray = Array.from(types);
  if (typesArray.length > 1) {
    throw new Error('Multiple geometry types found in GeoJSON layer');
  } else if (typesArray.length === 0) {
    throw new Error('No geometry found in GeoJSON layer');
  }
  return typesArray[0].toLowerCase();
}

export function convertTabularDataset() {
}

async function uintArrayToBase64(data: Uint8Array): Promise<string> {
  const base64url: string = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });

  return base64url;
}

/**
 * Convert the given GeoJSON FeatureCollection to the asked format.
 *
 * @param {GeoJSONFeatureCollection} featureCollection - The GeoJSON FeatureCollection to convert
 * @param layerName - The name of the layer
 * @param format - The format to convert to
 * @param crs - The destination CRS to use
 * @returns {Promise<string>} The converted file as a string (base64 encoded if binary)
 */
export async function convertFromGeoJSON(
  featureCollection: GeoJSONFeatureCollection,
  layerName: string,
  format: string,
  crs: string,
): Promise<string> {
  // Store the input GeoJSON in a temporary file
  const inputFile = new File(
    [JSON.stringify(featureCollection)],
    `${layerName}.geojson`,
    { type: 'application/geo+json' },
  );
  // Open the GeoJSON file
  const input = await window.Gdal.open(inputFile);
  // Set the options for the conversion
  const options = [
    '-f', format,
    '-t_srs', crs,
  ];
  // Convert the GeoJSON to the asked format
  if (format === 'ESRI Shapefile') {
    options.push('-lco', 'ENCODING=UTF-8');
    const output = await window.Gdal.ogr2ogr(input.datasets[0], options);
    // We will return a zip file (encoded in base 64) containing all the shapefile files
    const zip = new JSZip();
    // Add the cpg file
    zip.file(`${layerName}.cpg`, 'UTF-8');
    // Add the other files
    await ['shp', 'shx', 'dbf', 'prj']
      .forEach(async (ext) => {
        const outputPath = {
          local: output.local.replace('.shp', `.${ext}`),
          real: output.real.replace('.shp', `.${ext}`),
        };
        const rawData = await window.Gdal.getFileBytes(outputPath);
        const blob = new Blob([rawData], { type: '' });
        zip.file(`${layerName}.${ext}`, blob, { binary: true });
      });
    await window.Gdal.close(input);
    // Generate the zip file (base64 encoded)
    const resZip = await zip.generateAsync({ type: 'base64' });
    return resZip;
  }
  if (format === 'KML' || format === 'GML') {
    // For KML and GML, we only return a text file
    options.push('-lco', 'ENCODING=UTF-8');
    const output = await window.Gdal.ogr2ogr(input.datasets[0], options);
    const bytes = await window.Gdal.getFileBytes(output);
    await window.Gdal.close(input);
    return new TextDecoder().decode(bytes);
  }
  if (format === 'GPKG') {
    // For GPKG, we return the binary file, encoded in base64
    const output = await window.Gdal.ogr2ogr(input.datasets[0], options);
    const bytes = await window.Gdal.getFileBytes(output);
    await window.Gdal.close(input);
    const b64Data = await uintArrayToBase64(bytes);
    return b64Data.replace('data:application/octet-stream;base64,', '');
  }
  return '';
}
