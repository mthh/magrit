// Imports from solid-js
import { produce } from 'solid-js/store';

// Imports from external packages
import toast from 'solid-toast';
import { getPalette } from 'dicopal';

// Helpers
import { convertTabularDatasetToJSON, convertToGeoJSON, getGeometryType } from './formatConversion';
import { generateIdLayer, generateIdTable } from './layers';
import { allowedFileExtensions, allowedMimeTypes, SupportedTabularFileTypes } from './supportedFormats';
import { convertTopojsonToGeojson } from './topojson';
import { detectTypeField, Variable } from './typeDetection';

// Stores
import { setFieldTypingModalStore } from '../store/FieldTypingModalStore';
import { globalStore, setGlobalStore } from '../store/GlobalStore';
import { type LayersDescriptionStoreType, setLayersDescriptionStore } from '../store/LayersDescriptionStore';
import { fitExtent } from '../store/MapStore';
import { setOverlayDropStore } from '../store/OverlayDropStore';

// Types
import { GeoJSONFeatureCollection, LayerDescription, TableDescription } from '../global';

// A file, dropped by the user
interface FileEntry {
  // The name of the file (without the extension)
  name: string,
  // The extension of the file (e.g. 'csv')
  ext: string,
  // The actual File object
  file: File,
}

// A list of FileEntry, dropped by the user
export type CustomFileList = FileEntry[];

export function prepareFileExtensions(files: FileList): CustomFileList {
  return Array.from(files)
    .map((file: File) => {
      const name = file.name.substring(0, file.name.lastIndexOf('.'));
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLowerCase();
      // console.log(file.type, name, ext, file);
      const o: { name: string, ext: string, file: File } = {
        ext,
        file,
        name,
      };
      return o;
    });
}

export function draggedElementsAreFiles(e: DragEvent): boolean {
  if (
    e.dataTransfer
    && e.dataTransfer.types
    && !e.dataTransfer?.types.some((el) => el === 'Files')
  ) {
    return false;
  }
  if (e.relatedTarget && (e.relatedTarget as Node).nodeType) {
    return false;
  }
  return true;
}

export function isAuthorizedFile(file: FileEntry): boolean {
  if (
    allowedMimeTypes.indexOf(file.file.type) > -1
    && allowedFileExtensions.indexOf(file.ext) > -1
  ) {
    return true;
  }
  return false;
}

export const isTabularFile = (files: CustomFileList): boolean => Object
  .keys(SupportedTabularFileTypes)
  .map((key) => SupportedTabularFileTypes[key as never] as string)
  .indexOf(files[0].ext) > -1;

export const isTopojson = async (files: CustomFileList) => files.length === 1
  && (files[0].ext === 'topojson' || files[0].ext === 'json')
  && (await files[0].file.text()).includes('Topology');

export const isGeojson = async (files: CustomFileList) => files.length === 1
  && (files[0].ext === 'geojson' || files[0].ext === 'json')
  && (await files[0].file.text()).includes('FeatureCollection');

const getDefaultRenderingParams = (geomType: string) => {
  const pal = getPalette('Vivid', 10)!.colors;
  const color = pal[Math.floor(Math.random() * pal.length)];

  if (geomType === 'point') {
    return {
      renderer: 'default',
      strokeColor: '#212121',
      strokeWidth: 1,
      strokeOpacity: 1,
      fillColor: color,
      fillOpacity: 1,
      pointRadius: 5,
      dropShadow: false,
      blurFilter: false,
    };
  }
  if (geomType === 'linestring') {
    return {
      renderer: 'default',
      strokeColor: color,
      strokeWidth: 1.5,
      strokeOpacity: 1,
      dropShadow: false,
      blurFilter: false,
    };
  }
  if (geomType === 'polygon') {
    return {
      renderer: 'default',
      strokeColor: '#212121',
      strokeWidth: 0.4,
      strokeOpacity: 1,
      fillColor: color,
      fillOpacity: 0.85,
      dropShadow: false,
      blurFilter: false,
    };
  }
  return {};
};

function addLayer(geojson: GeoJSONFeatureCollection, name: string) {
  const geomType = getGeometryType(geojson);
  const layerId = generateIdLayer();

  const fieldsName: string[] = Object.keys(geojson.features[0].properties);

  const fieldsDescription: Variable[] = fieldsName.map((field) => {
    const o = detectTypeField(
      geojson.features.map((ft) => ft.properties[field]) as never[],
      field,
    );
    return {
      name: field,
      hasMissingValues: o.hasMissingValues,
      type: o.variableType,
      dataType: o.dataType,
    };
  });

  // Add the new layer to the LayerManager by adding it
  // to the layersDescriptionStore
  const newLayerDescription = {
    id: layerId,
    name,
    type: geomType,
    data: geojson,
    visible: true,
    fields: fieldsDescription,
    ...getDefaultRenderingParams(geomType),
    shapeRendering: geomType === 'polygon' && geojson.features.length > 10000 ? 'optimizeSpeed' : 'auto',
  };

  let firstLayer = false;

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        if (!globalStore.userHasAddedLayer) {
          // eslint-disable-next-line no-param-reassign
          draft.layers = [];
          setGlobalStore({ userHasAddedLayer: true });
          firstLayer = true;
        }
        draft.layers.push(newLayerDescription as LayerDescription);
      },
    ),
  );

  // If this is the first layer, zoom on it:
  if (firstLayer) {
    fitExtent(layerId);
  }

  // Open modal for field typing
  setFieldTypingModalStore({
    show: true,
    targetId: layerId,
    targetType: 'layer',
  });
}

function addTabularLayer(data: object[], name: string) {
  const fields: string[] = Object.keys(data[0]);

  const descriptions = fields.map((field) => {
    const o = detectTypeField(
      data.map((ft) => ft[field as keyof typeof ft]),
      field,
    );
    return {
      name: field,
      hasMissingValues: o.hasMissingValues,
      type: o.variableType,
      dataType: o.dataType,
    };
  });
  const tableDescription = {
    id: generateIdTable(),
    name,
    fields: descriptions,
    data,
  } as TableDescription;

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        // TODO: Do we want to clean the map (as we do when the first layer is added)
        //       when adding the first table?
        // if (!globalStore.userHasAddedLayer) {
        //   // eslint-disable-next-line no-param-reassign
        //   draft.layers = [];
        //   setGlobalStore({ userHasAddedLayer: true });
        // }
        draft.tables.push(tableDescription);
      },
    ),
  );
}

// TODO: allow the user to add several layers at the same time.
//    So we'll have several files - we'll need to disambiguate the situation to find out whether
//    we have several files describing a single layer (SHP) or several files describing
//    several datasets, bearing in mind that the user can (and may want to) also
//    add geo and tabular datasets at the same time.
export const convertAndAddFiles = async (files: CustomFileList) => {
  // Filter out the files that are not supported
  const authorizedFiles = files.filter(isAuthorizedFile);
  // TODO: maybe display a message to the user if some files were not handled ?
  console.log('convertDroppedFiles', files, '\nauthorizedFiles', authorizedFiles);
  // Remove the "drop" overlay
  setOverlayDropStore({ show: false, files: [] });
  // Add the "loading" overlay
  setGlobalStore({ isLoading: true });

  // Convert the file and add it to the store (and so to the map if its a geo layer)
  if (await isTopojson(authorizedFiles)) {
    const res = convertTopojsonToGeojson(await files[0].file.text());
    Object.keys(res).forEach((layerName) => {
      addLayer(res[layerName], layerName);
    });
  } else if (await isGeojson(authorizedFiles)) {
    const res = JSON.parse(await authorizedFiles[0].file.text());
    addLayer(res, authorizedFiles[0].name);
  } else if (isTabularFile(authorizedFiles)) {
    const res = await convertTabularDatasetToJSON(authorizedFiles[0].file, authorizedFiles[0].ext);
    addTabularLayer(res, authorizedFiles[0].name);
  } else {
    // TODO: handle GeoPackages that may contain multiple layers
    let res;
    try {
      res = await convertToGeoJSON(authorizedFiles.map((f) => f.file));
    } catch (e: any) {
      // TODO: display error message and/or improve error handling
      console.error(e);
      toast.error(`Error while reading file: ${e.message ? e.message : e}`);
      return;
    }
    addLayer(res, authorizedFiles[0].name);
  }

  setGlobalStore({ isLoading: false });
};
