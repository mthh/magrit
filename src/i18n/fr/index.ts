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
    ReloadLastProject: 'Un projet a été sauvegardé automatiquement lors de la fermeture de la page le {}. Recharger le ce projet ?',
  },
  HeaderApp: {
    NightDayMode: 'Night / Day mode',
    ImportProjet: 'Importer un projet Magrit',
    SaveProject: 'Sauvegarder le projet',
    NewProject: 'Nouveau projet',
    About: 'À propos de Magrit',
    Language: 'Sélection de la langue',
    Undo: 'Annuler',
    Redo: 'Rétablir',
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
  MapZone: {
    DropFilesHere: 'Glisser-déposer vos jeux de données ici ! (ou utiliser le menu d\'import des données)',
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
    CustomProjection: 'Projection personnalisée...',
    LockZoom: 'Verrouiller le zoom / la position',
  },
  LayoutFeatures: {
    BackgroundColor: 'Couleur de fond',
    Opacity: 'Opacité',
    MapSkinElements: 'Éléments d\'habillage de la carte',
    Sphere: 'Sphère',
    Graticule: 'Graticule',
    Rectangle: 'Rectangle',
    Ellipse: 'Ellipse',
    Line: 'Ligne / Flèche',
    Text: 'Texte',
    Image: 'Image',
    ScaleBar: 'Échelle',
    NorthArrow: 'Flèche Nord',
    FreeDrawing: 'Dessin libre',
    ContextMenu: {
      Edit: 'Éditer',
      Delete: 'Supprimer',
      Up: 'Monter',
      Down: 'Descendre',
    },
    DrawingInstructions: {
      Line: 'Cliquez pour commencer à dessiner une ligne. Cliquez à nouveau pour ajouter un point. Double-cliquez pour terminer.',
      Rectangle: 'Cliquez une première fois pour localiser le premier coin du rectangle. Cliquez une seconde fois pour localiser le coin opposé.',
      Ellipse: 'Cliquez une première fois pour localiser le centre de l\'ellipse. Cliquez une seconde fois pour localiser le point sur le bord de l\'ellipse.',
      FreeDrawing: 'Cliquez pour commencer à dessiner puis relâchez le bouton de la souris pour terminer.',
    },
    Modal: {
      Title: 'Propriétés', // 'Propriétés pour {{ type d'objet }}'
      FillColor: 'Couleur de remplissage',
      FillOpacity: 'Opacité du remplissage',
      StrokeColor: 'Couleur de la bordure',
      StrokeWidth: 'Épaisseur de la bordure',
      StrokeOpacity: 'Opacité de la bordure',
      RoundCorners: 'Coins arrondis',
      Rotation: 'Rotation',
      Rx: 'Rayon X',
      Ry: 'Rayon Y',
      Width: 'Largeur',
      Height: 'Hauteur',
      Units: 'Unité de distance',
      m: 'Mètres',
      km: 'Kilomètres',
      mi: 'Miles',
      ft: 'Pieds',
      yd: 'Yards',
      nmi: 'Milles marins',
      ScaleBarType: 'Type d\'échelle',
      simpleLine: 'Ligne simple',
      lineWithTicksOnTop: 'Ligne avec des traits en haut',
      lineWithTicksOnBottom: 'Ligne avec des traits en bas',
      blackAndWhiteBar: 'Barre noir et blanc',
      TickValues: 'Valeurs des traits (séparées par des virgules, à partir de 0)',
    },
  },
  AboutPanel: {
    title: 'À propos de Magrit',
    description: 'Magrit est une application Web open source pour la visualisation et l\'analyse de données géospatiales. Cette application est développée par les membres de l\'UAR RIATE (CNRS, Université Paris Cité).',
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
    Legend: 'Afficher / masquer la légende',
    LegendDisplacement: 'La position de la légende a été modifiée afin de la repositionner dans la zone d\'affichage de la carte.',
  },
  PortrayalSection: {
    PortrayalTypes: {
      Choropleth: 'Choropleth',
      ProportionalSymbols: 'Symboles proportionnels',
      Labels: 'Étiquettes',
      Discontinuity: 'Discontinuité',
      Categorical: 'Choropleth catégorielle',
      Smoothed: 'Carte lissée',
      NoPortrayal: 'Aucune représentation pour la couche choisie - Veuillez vérifier le types des champs de la couche ou sélectionner une autre couche',
    },
    RepresentationChoice: 'Choix de la représentation',
    ChooseARepresentation: 'Choisir une représentation',
    DropdownPrefixLayer: 'Couche : ',
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
    DiscontinuityOptions: {
      DiscontinuityType: 'Type de discontinuité',
      Relative: 'Relative',
      Absolute: 'Absolue',
      Classification: 'Type de discrétisation',
      DiscontinuityThreshold: 'Seuil des discontinuité à afficher',
    },
    SmoothingOptions: {
      Type: 'Type de lissage',
      Resolution: 'Résolution de la grille (km)',
      Stewart: 'Potentiel de Stewart',
      KDE: 'Estimation de densité par noyau',
      Bandwidth: 'Largeur de bande',
      KernelType: 'Type de noyau',
      Pareto: 'Pareto',
      Gaussian: 'Gaussien',
      Epanechnikov: 'Epanechnikov',
      Quartic: 'Quartique',
      Triangular: 'Triangulaire',
      Uniform: 'Uniforme',
      Span: 'Portée',
      Alpha: 'Alpha',
      Beta: 'Beta',
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
    ClipSvgCurrentExtent: 'Découper le SVG sur l\'emprise actuelle',
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
    AestheticFilter: 'Filtre esthétique',
    DropShadow: 'Ajouter une ombre',
    Blur: 'Flou',
    AllowMovingSymbols: 'Autoriser le déplacement des symboles',
    ChangeClassification: 'Changer les options de discrétisation',
    FontFamily: 'Police d\'écriture',
    FontSize: 'Taille de la police',
    TextColor: 'Couleur du texte',
    XOffset: 'Décalage en X',
    YOffset: 'Décalage en Y',
    FontStyle: 'Style de police',
    FontWeight: 'Épaisseur de police',
    BufferAroundText: 'Tampon autour du texte',
    BufferColor: 'Couleur du tampon',
    BufferWidth: 'Largeur du tampon',
    AllowMovingLabels: 'Autoriser le déplacement des étiquettes',
  },
  ProjectionSelection: {
    title: 'Sélection de la projection',
    SearchProjection: 'Entrer un code EPSG ou un nom de projection',
    NMatchingProjections: '{{ Une projection | ?? projections }} correspondante(s)',
    TooManyResults: 'Trop de résultats, veuillez affiner votre recherche.',
    Kind: 'Type :',
    ProjCRS: 'Système de référence spatiale projeté',
    GeogCRS: 'Système de référence spatiale géographique',
    BboxGeo: 'Emprise (coordonnées géographiques) :',
    BboxProjected: 'Emprise (coordonnées projetées) :',
    Area: 'Zone :',
    Unit: 'Unité :',
    MoreInformation: 'Plus d\'informations',
  },
  DataTable: {
    titleGeo: 'Table attributaire',
    titleTabular: 'Tableau de données',
    Features: '{{Une entité | ?? entités}}',
    Columns: '{{Une colonne | ?? colonnes}}',
    ExportCsv: 'Exporter en CSV...',
    NewColumn: 'Nouveau champ...',
    DeleteColumn: 'Supprimer la colonne',
    NewColumnModal: {
      BackToDatatable: 'Retour au tableau de données',
      title: 'Nouveau champ',
      name: 'Nom',
      namePlaceholder: 'Saisir le nom du champ',
      newColumnType: 'Type du nouveau champ',
      formula: 'Formule',
      compute: 'Calculer',
      sampleOutput: 'Exemple de résultat',
      errorParsingFormula: 'Erreur lors de l\'analyse de la formule',
      errorEmptyResult: 'Erreur - résultat vide',
      noteSpecialCharacters: 'Notez que les noms de champs contenant des caractères spéciaux ou des espaces doivent être entourés de backticks ou de crochets.',
      '/': 'Division',
      '*': 'Multiplication',
      '-': 'Soustraction',
      '+': 'Addition',
      'POWER()': 'Puissance',
      'CONCAT()': 'Concaténation',
      'SUBSTRING()': 'Extraction d\'une sous-chaîne de caractères',
      specialFieldLength: 'Champ spécial - La taille du jeu de données (nombre d\'entités)',
      specialFieldArea: 'Champ spécial - L\'aire de l\'entité (seulement pour les polygones). Notez que ce calcul est réalisé à partir des coordonnées géographiques et est réalisé sur le sphéroïde. Ce résultat peut-être moins précis que si le calcul avait été réalisé dans une projection locale basée sur un éllipsoide adapté.',
      specialFieldId: 'Champ spécial - L\'identifiant unique (interne) de l\'entité',
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
      equalIntervals: 'Intervals égaux',
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
    classificationMethodLegendDescriptions: {
      equalIntervals: 'Discrétisation en intervalles égaux',
      quantiles: 'Discrétisation en quantiles',
      jenks: 'Discrétisation avec ma méthodes des seuils naturels (Jenks)',
      standardDeviation: 'Discrétisation avec la méthode de la moyenne et des écart-types',
      q6: 'Discrétisation avec la méthode Q6',
      pretty: 'Discrétisation avec la méthode "pretty breaks"',
      geometricProgression: 'Discrétisation avec une progression géométrique',
      arithmeticProgression: 'Discrétisation avec une progression arithmétique',
      headTail: 'Discrétisation avec la méthode "head/tail"',
      manual: 'Discrétisation manuelle',
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
      DisplayBackgroundRectangle: 'Afficher un rectangle sous la légende',
      BackgroundRectangleColor: 'Couleur du rectangle',
      BackgroundRectangleOpacity: 'Opacité du remplissage du rectangle',
      BackgroundRectangleStrokeColor: 'Couleur de la bordure du rectangle',
      BackgroundRectangleStrokeWidth: 'Épaisseur de la bordure du rectangle',
      BackgroundRectangleStrokeOpacity: 'Opacité de la bordure du rectangle',
      LegendOrientation: 'Orientation de la légende',
      LegendOrientationHorizontal: 'Horizontale',
      LegendOrientationVertical: 'Verticale',
      LegendSymbolLayout: 'Disposition des symboles',
      LegendSymbolLayoutVertical: 'Verticale',
      LegendSymbolLayoutHorizontal: 'Horizontale',
      LegendSymbolLayoutStacked: 'Empilée',
      BoxWidth: 'Largeur des boites',
      BoxHeight: 'Hauteur des boites',
      BoxSpacing: 'Espacement entre les boites',
      BoxSpacingNoData: 'Espacement entre les boites et la boite "sans données"',
      NoDataLabel: 'Étiquette de la boite "sans données"',
      BoxCornerRadius: 'Rayon des coins des boites',
      BoxStrokeWidth: 'Épaisseur des lignes des boites',
      RoundDecimals: 'Arrondir les valeurs',
      MoreOptions: 'Plus d\'options...',
      SymbolsSpacing: 'Espace entre les symboles',
      ChooseValues: 'Choix des valeurs',
      LineLength: 'Longueur de la ligne',
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
