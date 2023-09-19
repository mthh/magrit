import type { BaseTranslation } from '../i18n-types';

const fr = {
  StartApplication: 'Démarrer l\'Application',
  SuccessButton: 'Confirmation',
  CancelButton: 'Annulation',
  DropFilesHere: 'Déposez le(s) fichier(s) ici !',
  SupportedVectorFormats: 'Les formats vectoriels supportés sont : ESRI Shapefile (.shp, .shx, .dbf, .prf, .cpg), GeoJSON (.json ou .geojson), TopoJSON (.topojson ou .json), GML (.gml), KML (.kml).',
  SupportedTabularFormats: 'Les formats de fichiers tabulaires supportés sont : Excel (.xls, .xlsx), CSV (.csv) et les feuilles de calculs OpenDocument (.ods).',
  UnsupportedFormat: 'Format non supporté',
  FilesDetected: '{{ Un fichier détecté | ?? fichiers détectés }}',
  ImportFiles: 'Importer le(s) fichier(s)',
  Alerts: {
    DeleteLayer: 'Supprimer la couche',
    SaveEditedData: 'Sauvegarder les modifications effectuées ?',
    ReloadLastProject: 'Un projet a été sauvegardé automatiquement lors de la fermetture de la page le {}. Recharger le ce projet ?',
  },
  LeftMenu: {
    Import: 'Import des données',
    MapConfiguration: 'Configuration de la carte',
    LayerManager: 'Gestion des couches',
    RepresentationChoice: 'Choix de la représentation',
    ExportSection: 'Export des données',
  },
  ImportSection: {
    OpenGeospatialFile: 'Ouvrir un fichier géospatial...',
    OpenTabularFile: 'Ouvrir un fichier tabulaire...',
  },
  MapConfiguration: {
    Dimensions: 'Dimensions',
    Width: 'Largeur',
    Height: 'Hauteur',
    Projection: 'Projection',
    MoreProjection: 'Plus de projections',
    CustomProjection: 'Projection personnalisée',
  },
  LayerManager: {
    point: 'Couche de points',
    linestring: 'Couche de lignes',
    polygon: 'Couche de polygones',
    raster: 'Couche raster',
    table: 'Tableau de données',
    Delete: 'Suppression de la couche',
    AttributeTable: 'Table attributaire',
    FitZoom: 'Zoom sur la couche',
    ToggleVisibility: 'Afficher / Masquer',
    Settings: 'Paramètres',
  },
  PortrayalSection: {
    RepresentationChoice: 'Choix de la représentation',
    TargetLayer: 'Couche cible',
    CreateLayer: 'Créer la couche',
    ResultName: 'Nom du résultat',
    NewLayer: 'Nouvelle_couche',
    ChoroplethOptions: {
      Choropleth: 'Choroplèthe',
      Variable: 'Variable',
      Classification: 'Classification',
      ColorScheme: 'Palette de couleurs',
      ColorSchemeInvert: 'Inverser la palette',
    },
  },
  ExportSection: {
    SelectLayers: 'Sélectionner une couche',
    SelectFormat: 'Sélectionner un format',
    SelectCRS: 'Sélectionner un SCR',
    Layers: 'Couches',
    Export: 'Exporter',
    ExportPng: 'Exporter en PNG',
    ExportSvg: 'Exporter en SVG',
    CustomCRS: 'SCR personnalisé',
  },
  LayerSettings: {
    LayerSettings: 'Paramètres de la couche',
    Name: 'Nom',
    FillColor: 'Couleur de remplissage',
    StrokeColor: 'Couleur de la ligne',
    FillOpacity: 'Opacité du remplissage',
    StrokeOpacity: 'Opacité de la ligne',
    StrokeWidth: 'Épaisseur de la ligne',
    PointRadius: 'Rayon du point',
  },
  DataTable: {
    titleGeo: 'Table attributaire',
    titleTabular: 'Tableau de données',
    Features: '{{Une entité | ?? entités}}',
    Columns: '{{Une colonne | ?? colonnes}}',
    ExportCsv: 'Exporter en CSV...',
  },
  FieldsTyping: {
    ModalTitle: 'Typage des champs',
    FieldName: 'Nom du champ',
    FieldType: 'Type du champ',
    VariableTypes: {
      identifier: 'Identifiant',
      ratio: 'Ratio',
      stock: 'Stock',
      categorical: 'Catégoriel',
      unknown: 'Inconnu',
    },
  },
  ClassificationPanel: {
    title: 'Discrétisation',
    box: 'Boite à moustache',
    histogram: 'Histogramme',
    beeswarm: 'Essaim d\'abeilles',
    dotHistogram: 'Histogramme en points',
    distribution: 'Distribution des valeurs',
    summary: 'Résumé',
    population: 'Population (valeurs non-nulles)',
    minimum: 'Minimum',
    maximum: 'Maximum',
    mean: 'Moyenne',
    median: 'Médiane',
    standardDeviation: 'Écart-type',
    variance: 'Variance',
    varianceCoefficient: 'Coefficient de variation',
    skewness: 'Skewness',
    classification: 'Discrétisation',
    classificationMethod: 'Méthode de discrétisation',
    ClassificationMethods: {
      equalInterval: 'Intervalle égal',
      quantile: 'Quantile',
      jenks: 'Jenks',
      standardDeviation: 'Écart-type',
      q6: 'Q6',
      pretty: 'Pretty',
      geometricProgression: 'Progression géométrique',
      arithmeticProgression: 'Progression arithmétique',
      headTail: 'Head/tail',
      manual: 'Manuelle',
    },
    numberOfClasses: 'Nombre de classes',
    meanPosition: 'Position de la moyenne',
    meanPositionCenter: 'Centre de la classe',
    meanPositionBoundary: 'Limite de la classe',
    amplitude: 'Amplitude',
    howManyStdDev: 'écart-types',
    logarithmicScale: 'Échelle logarithmique',
    breaksInput: 'Saisir les limites de classes',
  },
} satisfies BaseTranslation;

export default fr;
