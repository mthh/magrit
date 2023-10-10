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
    EmptyProject: 'Créer un nouveau projet vide ?',
    SaveEditedData: 'Sauvegarder les modifications effectuées ?',
    ReloadLastProject: 'Un projet a été sauvegardé automatiquement lors de la fermetture de la page le {}. Recharger le ce projet ?',
  },
  HeaderApp: {
    NightDayMode: 'Night / Day mode',
    ImportProjet: 'Importer un projet Magrit',
    SaveProject: 'Sauvegarder le projet',
    About: 'À propos de Magrit',
    Language: 'Sélection de la langue',
  },
  Pagination: {
    Next: 'Suivant',
    Previous: 'Précédent',
  },
  DatasetCatalog: {
    title: 'Catalogue de données',
    placeholderSearchBar: 'Rechercher un jeu de données...',
    searchButton: 'Rechercher',
    datasets: '{{Un jeu de données | ?? jeux de données}}',
    about: 'À propos',
    description: 'Description',
    preview: 'Aperçu',
    license: 'Licence',
    type: 'Type',
    types: {
      vector: 'Jeu de données vectoriel',
      raster: 'Jeu de données raster',
    },
    provider: 'Fournisseur',
    attributions: 'Attributions',
    date: 'Date',
    source: 'Source',
    features: '{{Un enregistrement | ?? enregistrements}}',
    directLink: 'Lien direct vers le jeu de données',
    placeholderDatasetDetail: 'Sélectionner un jeu de données pour afficher ses détails.',
    noSearchResult: 'Aucun jeu de données ne correspond à votre recherche.',
    altDatasetPreview: 'Aperçu du jeu de données',
    confirmButton: 'Ajouter à la carte',
    cancelButton: 'Annuler',
  },
  LeftMenu: {
    Import: 'Import des données',
    MapConfiguration: 'Configuration de la carte',
    LayerManager: 'Gestion des couches',
    RepresentationChoice: 'Choix de la représentation',
    ExportSection: 'Export des données',
    LayoutFeatures: 'Mise en page et éléments d\'habillage',
  },
  ImportSection: {
    OpenGeospatialFile: 'Ouvrir un fichier géospatial...',
    OpenTabularFile: 'Ouvrir un fichier tabulaire...',
    ExampleDatasets: 'Jeu de données d\'exemples',
  },
  MapConfiguration: {
    Dimensions: 'Dimensions',
    Width: 'Largeur',
    Height: 'Hauteur',
    Projection: 'Projection',
    MoreProjection: 'Plus de projections',
    CustomProjection: 'Projection personnalisée',
    LockZoom: 'Verrouiller le zoom / la position',
  },
  LayoutFeaturesSection: {
    BackgroundColor: 'Couleur de fond',
    Opacity: 'Opacité',
    MapSkinElements: 'Éléments d\'habillage de la carte',
  },
  AboutPanel: {
    title: 'À propos de Magrit',
    description: 'Magrit est une application Web pour la visualisation et l\'analyse de données géospatiales. Cette application est développée par les membres de l\'UAR RIATE (CNRS, Université Paris Cité).',
    usefulLinks: 'Liens utiles :',
    UarRiate: 'UAR RIATE',
    linkGithub: 'Page du projet sur GitHub',
    linkGithubIssues: 'Rapport de bug',
    documentation: 'Documentation',
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
    Typing: 'Typage des champs',
  },
  PortrayalSection: {
    PortrayalTypes: {
      Choropleth: 'Choropleth',
      ProportionalSymbols: 'Symboles proportionnels',
      NoPortrayal: 'Aucune représentation pour la couche choisie - Veuillez vérifier le types des champs de la couche ou sélectionner une autre couche',
    },
    RepresentationChoice: 'Choix de la représentation',
    TargetLayer: 'Couche cible',
    CreateLayer: 'Créer la couche',
    ResultName: 'Nom du résultat',
    ResultNamePlaceholder: 'Saisir le nom de la couche à créer',
    NewLayer: 'Nouvelle_couche',
    CommonOptions: {
      Variable: 'Variable',
      Color: 'Couleur',
    },
    ChoroplethOptions: {
      Choropleth: 'Choroplèthe',
      Classification: 'Classification',
      ColorScheme: 'Palette de couleurs',
      ColorSchemeInvert: 'Inverser la palette',
      CurrentNumberOfClasses: '{{ Une classe | ?? classes }}',
    },
    ProportionalSymbolsOptions: {
      ReferenceSize: 'Taille de référence (px)',
      OnValue: 'Sur la valeur',
      SymbolType: 'Type de symbole',
      SymbolTypes: {
        circle: 'Cercle',
        square: 'Carré',
        line: 'Ligne',
      },
      AvoidOverlapping: 'Éviter le chevauchement des symboles',
      SingleColor: 'Une couleur',
      TwoColor: 'Deux couleurs',
      LimitValue: 'Valeur limite',
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
    DropShadow: 'Ajouter une ombre',
  },
  DataTable: {
    titleGeo: 'Table attributaire',
    titleTabular: 'Tableau de données',
    Features: '{{Une entité | ?? entités}}',
    Columns: '{{Une colonne | ?? colonnes}}',
    ExportCsv: 'Exporter en CSV...',
    NewColumn: 'Nouveau champ...',
    NewColumnModal: {
      title: 'Nouveau champ',
      name: 'Nom',
      namePlaceholder: 'Saisir le nom du champ',
      newColumnContent: 'Contenu du nouveau champ',
      numericalValues: 'Calcul d\'une valeur entre deux champs numériques',
      nonNumericalValues: 'Calcul d\'une valeur à partir d\'un (ou deux) champs non numérique',
      formula: 'Formule',
      constantValue: 'Valeur constante',
      operation: 'Opération à effectuer',
    },
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
    histogramAndDensity: 'Histogramme et densité',
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
    classificationMethods: {
      equalInterval: 'Intervals égaux',
      quantiles: 'Quantiles',
      jenks: 'Jenks',
      standardDeviation: 'Écart-type',
      q6: 'Q6',
      pretty: 'Pretty breaks',
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
    palette: 'Palette de couleurs',
    reversePalette: 'Inverser la palette',
    displayMean: 'Afficher la moyenne',
    displayMedian: 'Afficher la médiane',
    displayStdDev: 'Afficher l\'écart-type',
    logarithmicScale: 'Échelle logarithmique',
    breaksInput: 'Saisir les limites de classes',
    validate: 'Valider',
    missingValues: '{{ Une entité sans données | ?? entités sans données }}',
    count: 'Entités par classe',
  },
  Legend: {
    ContextMenu: {
      Edit: 'Éditer',
      Hide: 'Masquer',
      Up: 'Monter',
      Down: 'Descendre',
    },
    Modal: {
      Title: 'Paramètres de la légende',
      LegendTitle: 'Titre de la légende',
      LegendSubtitle: 'Sous-titre de la légende',
      LegendNote: 'Note de la légende',
      LegendChoroplethOrientation: 'Orientation de la légende',
      LegendChoroplethOrientationHorizontal: 'Horizontale',
      LegendChoroplethOrientationVertical: 'Verticale',
      BoxWidth: 'Largeur des boites',
      BoxHeight: 'Hauteur des boites',
      BoxSpacing: 'Espacement entre les boites',
      BoxCornerRadius: 'Rayon des coins des boites',
      BoxStrokeWidth: 'Épaisseur des lignes des boites',
      RoundDecimals: 'Arrondir les valeurs',
      MoreOptions: 'Plus d\'options...',
    },
  },
  CommonTextElement: {
    FontSize: 'Taille de police',
    FontColor: 'Couleur de police',
    FontFamily: 'Police',
    FontWeight: 'Épaisseur de police',
    FontStyle: 'Style de police',
    Normal: 'Normal',
    Bold: 'Gras',
    Italic: 'Italique',
    Underline: 'Souligné',
  },
} satisfies BaseTranslation;

export default fr;
