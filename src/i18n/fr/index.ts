import type { BaseTranslation } from '../i18n-types';

const fr = {
  StartApplication: 'Démarrer l\'Application',
  SuccessButton: 'Confirmation',
  CancelButton: 'Annulation',
  Alerts: {
    DeleteLayer: 'Supprimer la couche',
    DeleteTable: 'Supprimer le tableau',
    EmptyProject: 'Créer un nouveau projet vide ?',
    SaveEditedData: 'Sauvegarder les modifications effectuées ?',
    ReloadLastProject: 'Un projet a été sauvegardé automatiquement lors de la fermeture de la page le {}. Recharger le ce projet ?',
  },
  LoadingMessages: {
    Default: 'Chargement...',
    Reloading: 'Rechargement du projet...',
    SmoothingDataPreparation: 'Préparation des données...',
    SmoothingComputingGPUKDE: 'Calcul de l\'estimation de densité par noyau sur le GPU...',
    SmoothingComputingGPUStewart: 'Calcul du potentiel de Stewart sur le GPU...',
    SmoothingContours: 'Calcul des contours...',
    SmoothingIntersection: 'Calcul de l\'intersection entre les contours et la couche de maskage...',
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
    title: 'Catalogue de données d\'exemple',
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
  ImportWindow: {
    Title: 'Import des données',
    Instructions: 'Faites glisser un ou plusieurs jeux de données (géographiques ou tabulaires) pour les ajouter ou cliquez ici pour sélectionner un fichier.',
    SupportedVectorFormats: 'Les formats vectoriels supportés sont : ESRI Shapefile (.shp, .shx, .dbf, .prj, .cpg), GeoPackage (.gpkg), GeoJSON (.geojson ou .json), TopoJSON (.topojson ou .json), GML (.gml), KML (.kml).',
    SupportedTabularFormats: 'Les formats de fichiers tabulaires supportés sont : Excel (.xls, .xlsx), CSV (.csv), TSV (.tsv) et les feuilles de calculs OpenDocument (.ods).',
    AnalyzingDataset: 'Analyse du jeu de données...',
    CancelButton: 'Annuler',
    ImportButton: '{{Pas de jeu de données à importer | Importer le jeu de données | Importer les ?? jeux de données}}',
    LayerName: 'Nom de la couche',
    Features: 'Entités',
    GeometryType: 'Type de géométrie',
    CRS: 'SCR',
    UseProjection: 'Utiliser la projection',
    Simplify: 'Simplifier',
    SimplifyDisabledTooltip: 'La simplification n\'est proposée que pour les jeux de données vectoriels (Multi)LineString et (Multi)Polygon.',
    SimplifyTooltip: 'Simplifier (généraliser) les géométries. Une fenêtre permettant de choisir le niveau de simplification s\'ouvrira.',
    FitExtent: 'Zoomer sur la couche',
    Delete: 'Supprimer ?',
    Incomplete: 'Incomplet',
    IncompleteMessage: 'Le jeu de données n\'est pas complet. Merci d\'ajouter les autres fichiers nécessaires',
    UnsupportedFileFormat: 'Format de fichier non supporté pour {file}',
    ErrorReadingFile: 'Erreur lors de la lecture du fichier {file} : {message}',
    RemovedEmptyFeatures: '{{ Aucune entité | Une entité | ?? entités }} avec une géométrie vide retirée(s) du jeu de données.',
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
    OpenImportWindow: 'Ouvrir la fenêtre d\'import des données ...',
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
    Line: 'Ligne / Flèche',
    Text: 'Texte',
    Image: 'Image',
    ScaleBar: 'Échelle',
    NorthArrow: 'Flèche Nord',
    FreeDrawing: 'Dessin libre',
    ContextMenu: {
      EditSettings: 'Modifier les paramètres...',
      Edit: 'Modifier',
      Delete: 'Supprimer',
      Up: 'Monter',
      Down: 'Descendre',
      Clone: 'Dupliquer',
    },
    ConfirmationMessages: {
      Sphere: 'La couche "Sphère" a été ajoutée à la carte.',
      Graticule: 'La couche "Graticule" a été ajoutée à la carte.',
    },
    DrawingInstructions: {
      Line: 'Cliquez pour commencer à dessiner une ligne. Cliquez à nouveau pour ajouter un point. Double-cliquez pour terminer.\nMaintenez la touche "Ctrl" enfoncée pour dessiner une ligne droite.',
      Rectangle: 'Cliquez une première fois pour localiser le premier coin du rectangle. Cliquez une seconde fois pour localiser le coin opposé.',
      FreeDrawing: 'Cliquez pour commencer à dessiner puis relâchez le bouton de la souris pour terminer.',
      Text: 'Cliquez pour localiser l\'emplacement du texte à ajouter.',
      TextPlaceholder: 'Saisir le texte à ajouter...',
      PressEscToCancel: 'Appuyez sur "Esc" pour annuler.',
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
      RotateManually: 'Rotation manuelle',
      RotateToNorth: 'Rotation automatique vers le Nord géographique',
      NorthArrowType: 'Type de flèche Nord',
      SimpleNorthArrow: 'Flèche Nord simple',
      FancyNorthArrow: 'Flèche Nord stylisée',
      Width: 'Largeur',
      Height: 'Hauteur',
      Size: 'Taille',
      ScaleBarBehavior: 'Comportement de l\'échelle',
      ScaleBarAbsoluteSize: 'Taille fixe (en px), la valeur de distance est calculée automatiquement',
      ScaleBarGeographicSize: 'Distance affichée fixe (dans l\'unité choisie), la taille de l\'échelle (en px) est calculée automatiquement',
      Units: 'Unité de distance',
      UnitLabel: 'Étiquette de l\'unité',
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
      TextContent: 'Contenu du texte',
      TextProperties: 'Propriétés du texte',
      FontSize: 'Taille de la police',
      FontColor: 'Couleur de la police',
      FontFamily: 'Police',
      FontWeight: 'Épaisseur de police',
      FontStyle: 'Style de police',
      Normal: 'Normal',
      Bold: 'Gras',
      Italic: 'Italique',
      Underline: 'Souligné',
      TextAnchor: 'Ancrage du texte',
      Start: 'Début',
      Middle: 'Milieu',
      End: 'Fin',
      AllowModifyingFillStroke: 'Autoriser la modification du remplissage et de la bordure',
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
    Join: 'Joindre à un jeu de données géospatial',
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
      CategoricalChoropleth: 'Choropleth catégorielle',
      Smoothed: 'Carte lissée',
      Cartogram: 'Cartogramme',
      Grid: 'Carroyage',
      Links: 'Liens',
      NoPortrayal: 'Aucune représentation pour la couche choisie - Veuillez vérifier le types des champs de la couche ou sélectionner une autre couche',
    },
    OpenModal: 'Ouvrir la fenêtre de paramétrage de la représentation',
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
      DisplayChartOnMap: 'Afficher un graphique de résumé des classes sur la carte',
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
      Biweight: 'Biweight',
      Span: 'Portée',
      Alpha: 'Alpha',
      Beta: 'Beta',
    },
    CartogramOptions: {
      Algorithm: 'Algorithme à utiliser',
      Iterations: 'Nombre d\'itérations',
      Dougenik: 'Dougenik et al. (1985)',
      Olson: 'Olson (2005)',
      GastnerSeguyMore: 'Gastner, Seguy & More (2018)',
      WarningGeo: 'La projection cartographique actuelle est géographique (ou son unité est en degrés). Le cartogramme va être calculé dans la projection actuelle. Privilégiez, lorsque que c\'est possible, l\'utilisation de données projetées (avec une unité de distance en mètres par exemple) pour une meilleure précision.',
    },
    GridOptions: {
      Resolution: 'Résolution de la grille (km)',
      ResolutionWithUnit: 'Résolution de la grille ({unit})',
      CellShape: 'Forme des cellules',
      CellSquare: 'Cellule carrée',
      CellHexagon: 'Cellule hexagonale',
      CellDiamond: 'Cellule en losange',
      CellTriangle: 'Cellule triangulaire',
      WarningGeo: 'La projection cartographique actuelle est géographique (ou son unité est en degrés). La résolution de la grille est donc exprimée en degrés. Privilégiez, lorsque que c\'est possible, l\'utilisation de données projetées (avec une unité de distance en mètres par exemple) pour une meilleure précision.',
    },
    CategoricalChoroplethOptions: {
      DisplayChartOnMap: 'Afficher l\'histogramme de fréquence par catégorie sur la carte',
      Categories: '{{Une catégories | ?? catégories}}',
      HasNull: 'Contient des valeurs nulles ou non renseignées',
      NoNull: 'Pas de valeurs nulles ou non renseignées',
      ShowChart: 'Afficher le graphique',
      XAxisCategories: 'Catégories',
      YAxisCount: 'Nombre',
      Customize: 'Personnaliser les couleurs et les noms de classes',
      Value: 'Valeur :',
      Count: 'Nombre : ',
    },
    LinksOptions: {
      IdentifierField: 'Champ identifiant',
      SelectDataset: 'Sélectionner un jeu de données',
      Dataset: 'Jeu de données contenant les informations sur les liens',
      OriginId: 'Identifiant des origines',
      DestinationId: 'Identifiant des destinations',
      Intensity: 'Intensité',
      LinkType: 'Type de lien',
      LinkTypeExchange: 'Échange',
      LinkTypeLink: 'Liaison',
      LinkTypeBilateralVolume: 'Volume bilatéral',
      LinkHeadType: 'Type de tête de flèche',
      LinkHeadTypeArrow: 'Tête de flèche',
      LinkHeadTypeNone: 'Aucune',
      LinkHeadTypeArrowOnSymbol: 'Tête de flèche (positionnée sur la bordure du symbole)',
      LinkHeadTypeNoneOnSymbol: 'Aucune (positionnée sur la bordure du symbole)',
      LinkCurvature: 'Courbure des liens',
      LinkCurvatureStraight: 'Aucune',
      LinkCurvatureCurved: 'Courbée',
      LinkPosition: 'Position des liens',
      LinkPositionInitial: 'Initiale',
      LinkPositionShifted: 'Décalée',
      LinkPositionShared: 'Partagée',
      LinkSizeType: 'Type de taille des liens',
      LinkSizeClassification: 'Discrétisation des tailles',
      LinkSizeProportional: 'Proportionnelle',
      LinkSizeFixed: 'Fixe',
    },
  },
  ExportSection: {
    Description: 'Sélection du type d\'export et du format de fichier à exporter.',
    SelectLayers: 'Sélectionner une couche',
    SelectFormat: 'Sélectionner un format',
    SelectCRS: 'Sélectionner un SCR',
    Layers: 'Couches',
    Export: 'Exporter',
    ExportPng: 'Exporter en PNG',
    ExportSvg: 'Exporter en SVG',
    CustomCRS: 'SCR personnalisé',
    ClipSvgCurrentExtent: 'Découper le SVG sur l\'emprise actuelle',
    Width: 'Largeur (px)',
    Height: 'Hauteur (px)',
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
    Palette: 'Palette',
  },
  JoinPanel: {
    Title: 'Joindre à une couche géospatiale',
    Information: 'Cette fonctionnalité permet de joindre les données d\'un tableau à une couche géospatiale. Les données du tableau sont ajoutées à la couche géospatiale en fonction d\'un champ commun aux deux jeux de données.',
    Information2: 'Seulement les champs contenant des valeurs uniques peuvent être utilisés pour réaliser la jointure.',
    TargetLayer: 'Sélectionner la couche cible',
    TargetLayerPlaceholder: 'Sélectionner une couche',
    JoinFieldTable: 'Champ de la table à utiliser pour la jointure',
    JoinFieldLayer: 'Champ de la couche à utiliser pour la jointure',
    JoinFieldPlaceholder: 'Sélectionner un champ',
    Loading: 'Calcul des correspondances entre les champs...',
    ResultInformation: 'Informations sur le résultat de la jointure :',
    MatchedGeometry: 'Géométries ayant une correspondance :',
    MatchedFeatures: 'Entrées du tableau ayant une correspondance :',
    NoData: 'sans données',
    Prefix: 'Utiliser un préfixe pour les champs joins ?',
    PrefixValue: 'Préfixe',
    SelectFields: 'Sélectionner les champs à joindre ?',
    Confirm: 'Ajouter les champs à la couche sélectionnée',
  },
  PortrayalSelection: {
    Title: 'Choix d\'une représentation',
    Title2: 'Options de création de la représentation',
    Layer: 'Couche :',
    Back: 'Retour au choix de la représentation',
    Information: 'Sélectionnez la représentation que vous souhaitez appliquer à votre couche de données. Les représentations grisées indiquent que votre jeu de données ne contient pas de données permettant d\'effectuer ce type de représentation. Si vous pensez qu\'il s\'agit d\'une erreur, vous pouvez modifier le type des champs dans le gestionnaire de couches.',
    ShortDescriptions: {
      Choropleth: 'Une carte choroplèthe est une carte thématique dans laquelle les zones sont colorées ou ombrées en fonction de la valeur d\'une variable statistique.',
      ProportionalSymbols: 'Une carte à symboles proportionnels est une carte thématique dans laquelle des symboles de tailles différentes sont utilisés pour représenter des valeurs différentes.',
      Labels: 'Une carte avec étiquettes est une carte thématique dans laquelle des étiquettes sont utilisées pour représenter des valeurs différentes.',
      Discontinuity: 'Une carte avec discontinuité est une carte thématique dans laquelle les discontinuités sont mises en évidence.',
      CategoricalChoropleth: 'Une carte choroplèthe catégorielle est une carte thématique dans laquelle les zones sont colorées ou ombrées en fonction de la valeur d\'une variable catégorielle.',
      Smoothed: 'Une carte lissée est une carte thématique dans laquelle les valeurs sont lissées pour une meilleure lisibilité.',
      Cartogram: 'Un cartogramme est une carte thématique dans laquelle les zones sont redimensionnées en fonction de la valeur d\'une variable statistique.',
      Grid: 'Un carroyage est une carte thématique dans laquelle les zones sont redimensionnées en fonction de la valeur d\'une variable statistique.',
      Links: 'Une carte de lien permet de tracer des liens entre des points ou des zones, optionnellement avec une largeur proportionnelle à un phénomène.',
    },
    LongDescriptions: {
      Choropleth: '',
    },
  },
  ProjectionSelection: {
    title: 'Sélection de la projection',
    SearchProjection: 'Entrer un code EPSG ou un nom de projection',
    NMatchingProjections: '{{Aucune projection correspondante | Une projection correspondante | ?? projections correspondantes}}',
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
  ImageSymbolSelection: {
    Title: 'Sélection ou import d\'une image',
    SelectImage: 'Sélectionner un symbol parmi ceux proposés ...',
    UploadImage: 'Ou ajouter une image de votre choix (PNG ou SVG) ...',
    Browse: 'Parcourir ...',
    SelectedImage: 'Image sélectionnée :',
  },
  SimplificationModal: {
    title: 'Simplification des géométries',
    QuantizationFactor: 'Facteur de quantification',
    SimplificationFactor: 'Facteur de simplification',
    CountGeometries: '{geom} géométries non nulles, {pts} points',
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
    typeScheme: 'Type de progression colorée',
    sequential: 'Séquentielle',
    diverging: 'Divergente',
    palette: 'Palette de couleurs',
    reversePalette: 'Inverser la palette',
    centralClass: 'Classe centrale',
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
      EditSettings: 'Modifier les paramètres...',
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
