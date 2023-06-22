import type { BaseTranslation } from '../i18n-types';

const en = {
  StartApplication: 'Start Application',
  SuccessButton: 'Confirm',
  CancelButton: 'Cancel',
  DropFilesHere: 'Drop your file(s) here !',
  SupportedVectorFormats: 'Supported vector formats are: ESRI Shapefile (.shp, .shx, .dbf, .prf, .cpg), GeoJSON (.json ou .geojson), TopoJSON (.topojson ou .json), GML (.gml) and KML (.kml).',
  SupportedTabularFormats: 'Supported tabular formats are: Excel (.xls, .xlsx), CSV (.csv) and OpenDocument Spreadsheet (.ods).',
  UnsupportedFormat: 'Unsupported format',
  FilesDetected: '{{ One file detected | ?? files detected }}',
  ImportFiles: 'Import file(s)',
  Alerts: {
    DeleteLayer: 'Delete layer',
  },
  LeftMenu: {
    Import: 'Data import',
    LayerManager: 'Layer manager',
    RepresentationChoice: 'Representation choice',
    ExportSection: 'Map and data export',
  },
  ImportSection: {
    OpenGeospatialFile: 'Open geospatial file...',
    OpenTabularFile: 'Open tabular file...',
  },
  LayerManager: {
    point: 'Point layer',
    line: 'Line layer',
    polygon: 'Polygon layer',
    raster: 'Raster layer',
    table: 'Data table',
    Delete: 'Remove layer',
    AttributeTable: 'Attribute table',
    FitZoom: 'Zoom on layer',
    ToggleVisibility: 'Toggle visibility',
    Settings: 'Settings',
  },
  ExportSection: {
    SelectLayers: 'Select a layer',
    SelectFormat: 'Select a format',
    Layers: 'Layers',
    Export: 'Export',
    ExportPng: 'Export as PNG',
    ExportSvg: 'Export as SVG',
  },
  LayerSettings: {
    LayerSettings: 'Layer settings',
    Name: 'Name',
    FillColor: 'Fill color',
    StrokeColor: 'Stroke color',
    FillOpacity: 'Fill opacity',
    StrokeOpacity: 'Stroke opacity',
    StrokeWidth: 'Stroke width',
    PointRadius: 'Point radius',
  },
} satisfies BaseTranslation;

export default en;
