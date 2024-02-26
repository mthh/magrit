import type { BaseTranslation } from '../i18n-types';

const en = {
  StartApplication: 'Start Application',
  SuccessButton: 'Confirm',
  CancelButton: 'Cancel',
  Alerts: {
    DeleteLayer: 'Delete layer',
    DeleteTable: 'Delete table',
    EmptyProject: 'Create a new empty project ?',
    SaveEditedData: 'Save changes ?',
    ReloadLastProject: 'A project was automatically saved when the page was closed on {}. Reload this project ?',
  },
  LoadingMessages: {
    Default: 'Loading...',
    Reloading: 'Reloading project...',
    SmoothingDataPreparation: 'Data preparation...',
    SmoothingComputingGPUKDE: 'Computing KDE on GPU...',
    SmoothingComputingGPUStewart: 'Computing Stewart\'s potential on GPU...',
    SmoothingContours: 'Computing contours...',
    SmoothingIntersections: 'Clipping contours with mask layer...',
  },
  HeaderApp: {
    NightDayMode: 'Night / Day mode',
    ImportProjet: 'Import a Magrit project',
    SaveProject: 'Save project',
    NewProject: 'New project',
    About: 'About Magrit',
    Language: 'Language selection',
    Undo: 'Undo',
    Redo: 'Redo',
  },
  Pagination: {
    Next: 'Next',
    Previous: 'Previous',
  },
  DatasetCatalog: {
    title: 'Example dataset catalog',
    placeholderSearchBar: 'Search a dataset...',
    searchButton: 'Search',
    datasets: '{{One dataset | ?? datasets}}',
    about: 'About',
    description: 'Description',
    preview: 'Preview',
    license: 'License',
    type: 'Type',
    types: {
      vector: 'Vector dataset',
      raster: 'Raster dataset',
    },
    provider: 'Provider',
    attributions: 'Attributions',
    date: 'Date',
    source: 'Source',
    features: '{{One feature | ?? features}}',
    directLink: 'Direct link to the dataset',
    placeholderDatasetDetail: 'Select a dataset to see its details.',
    noSearchResult: 'No dataset matches your search.',
    altDatasetPreview: 'Dataset preview',
    confirmButton: 'Add to map',
    cancelButton: 'Cancel',
  },
  ImportWindow: {
    Title: 'Data import',
    Instructions: 'Drag and drop one or more datasets here (geographical or tabular) or click here to select a file.',
    SupportedVectorFormats: 'Supported vector formats are: ESRI Shapefile (.shp, .shx, .dbf, .prj, .cpg), GeoPackage (.gpkg), GeoJSON (.geojson or .json), TopoJSON (.topojson or .json), GML (.gml) and KML (.kml).',
    SupportedTabularFormats: 'Supported tabular formats are: Excel (.xls, .xlsx), CSV (.csv), TSV (.tsv) and OpenDocument Spreadsheet (.ods).',
    AnalyzingDataset: 'Analyzing dataset...',
    CancelButton: 'Cancel',
    ImportButton: '{{No dataset to import | Import dataset | Import ?? datasets}}',
    LayerName: 'Layer name',
    Features: 'Features',
    GeometryType: 'Geometry type',
    CRS: 'CRS',
    UseProjection: 'Use this projection',
    Simplify: 'Simplify',
    SimplifyDisabledTooltip: 'Simplification is only available for (Multi)LineString and (Multi)Polygon vector layers.',
    SimplifyTooltip: 'Simplify the geometries of the layer to reduce the size of the dataset and improve performance. A new window will open to allow you to choose the simplification options.',
    FitExtent: 'Fit extent',
    Delete: 'Delete ?',
    Incomplete: 'Incomplete',
    IncompleteMessage: 'The dataset is incomplete and cannot be imported. Please add the other mandatory files.',
    UnsupportedFileFormat: 'Unsupported file format for {file}',
    ErrorReadingFile: 'Error while reading file {file}: {message}',
    RemovedEmptyFeatures: 'Removed {{ 0 feature | a feature | ?? features }} without geometry',
  },
  MapZone: {
    DropFilesHere: 'Drag and drop your file(s) here ! (or use the import menu)',
  },
  LeftMenu: {
    Import: 'Data import',
    MapConfiguration: 'Map configuration',
    LayerManager: 'Layer manager',
    RepresentationChoice: 'Representation choice',
    ExportSection: 'Map and data export',
    LayoutFeatures: 'Page layout and skin elements',
  },
  ImportSection: {
    OpenImportWindow: 'Open data import window...',
    ExampleDatasets: 'Example datasets',
  },
  MapConfiguration: {
    Dimensions: 'Dimensions',
    Width: 'Width',
    Height: 'Height',
    Projection: 'Projection',
    MoreProjection: 'More projections',
    CustomProjection: 'Custom projection...',
    LockZoom: 'Lock zoom / position',
  },
  LayoutFeatures: {
    BackgroundColor: 'Background color',
    Opacity: 'Opacity',
    MapSkinElements: 'Map skin elements',
    Sphere: 'Sphere',
    Graticule: 'Graticule',
    Rectangle: 'Rectangle',
    Line: 'Line / Arrow',
    Text: 'Text',
    Image: 'Image',
    ScaleBar: 'Scale bar',
    NorthArrow: 'North arrow',
    FreeDrawing: 'Free drawing',
    ContextMenu: {
      EditSettings: 'Edit settings...',
      Edit: 'Edit',
      Delete: 'Delete',
      Up: 'Up',
      Down: 'Down',
      Clone: 'Clone',
    },
    ConfirmationMessages: {
      Sphere: 'The "Sphere" layer has been added to the map.',
      Graticule: 'The "Graticule" layer has been added to the map.',
    },
    DrawingInstructions: {
      Line: 'Click to start drawing a line. Click again to add a point. Double-click to finish.\nHold the Ctrl key to draw a straight line.',
      Rectangle: 'Click to locate the first corner of the rectangle. Click again to locate the opposite corner.',
      FreeDrawing: 'Click to start drawing the desired shape and release to finish.',
      Text: 'Click to locate the text.',
      TextPlaceholder: 'Type your text here...',
      PressEscToCancel: 'Press Esc to cancel.',
    },
    Modal: {
      Title: 'Settings', // 'Settings for {{ type }}',
      FillColor: 'Fill color',
      FillOpacity: 'Fill opacity',
      StrokeColor: 'Stroke color',
      StrokeWidth: 'Stroke width',
      StrokeOpacity: 'Stroke opacity',
      RoundCorners: 'Round corners',
      Rotation: 'Rotation',
      RotateManually: 'Rotate manually',
      RotateToNorth: 'Rotate automatically to geographic north',
      NorthArrowType: 'North arrow type',
      SimpleNorthArrow: 'Simple north arrow',
      FancyNorthArrow: 'Fancy north arrow',
      Width: 'Width',
      Height: 'Height',
      Size: 'Taille',
      ScaleBarBehavior: 'Scale bar behavior',
      ScaleBarAbsoluteSize: 'Fixed size (in px), displayed distance computed dynamically',
      ScaleBarGeographicSize: 'Fixed distance (in distance unit), size (in px) computed dynamically',
      Units: 'Distance unit',
      UnitLabel: 'Distance unit label',
      m: 'Meters',
      km: 'Kilometers',
      mi: 'Miles',
      ft: 'Feet',
      yd: 'Yards',
      nmi: 'Nautical miles',
      ScaleBarType: 'Scale bar type',
      simpleLine: 'Simple line',
      lineWithTicksOnTop: 'Line with ticks on top',
      lineWithTicksOnBottom: 'Line with ticks on bottom',
      blackAndWhiteBar: 'Black and white bar',
      TickValues: 'Tick values (comma separated, starting from 0)',
      TextContent: 'Text content',
      TextProperties: 'Text properties',
      FontSize: 'Font size',
      FontFamily: 'Font family',
      FontWeight: 'Font weight',
      FontStyle: 'Font style',
      Normal: 'Normal',
      Bold: 'Bold',
      Italic: 'Italic',
      Underline: 'Underline',
      TextAnchor: 'Text anchor',
      Start: 'Start',
      Middle: 'Middle',
      End: 'End',
      AllowModifyingFillStroke: 'Allow modifying fill and stroke properties',
    },
  },
  AboutPanel: {
    title: 'About Magrit',
    description: 'Magrit is an open source Web application for the visualization and the analysis of geospatial data. It is developed by the UAR RIATE (CNRS, Université Paris Cité).',
    usefulLinks: 'Useful links:',
    UarRiate: 'UAR RIATE',
    linkGithub: 'GitHub project page',
    linkGithubIssues: 'GitHub issues',
    documentation: 'Documentation',
  },
  LayerManager: {
    point: 'Point layer',
    linestring: 'Line layer',
    polygon: 'Polygon layer',
    raster: 'Raster layer',
    table: 'Data table',
    Delete: 'Remove layer',
    Join: 'Join to a geospatial layer',
    AttributeTable: 'Attribute table',
    FitZoom: 'Zoom on layer',
    ToggleVisibility: 'Toggle visibility',
    Settings: 'Settings',
    Typing: 'Fields typing',
    Legend: 'Display / hide legend',
    LegendDisplacement: 'The position of the legend has been changed to reposition it in the map display area.',
  },
  PortrayalSection: {
    PortrayalTypes: {
      Choropleth: 'Choropleth',
      ProportionalSymbols: 'Proportional symbols',
      Labels: 'Labels',
      Discontinuity: 'Discontinuity',
      CategoricalChoropleth: 'Categorical choropleth',
      Smoothed: 'Smoothed map',
      Cartogram: 'Cartogram',
      Grid: 'Grid',
      NoPortrayal: 'No portrayal for the selected layer - Please verify the typing of the fields or select another layer',
    },
    OpenModal: 'Open portrayal selection modal...',
    RepresentationChoice: 'Representation choice',
    ChooseARepresentation: 'Choose a representation',
    DropdownPrefixLayer: 'Layer: ',
    TargetLayer: 'Target layer',
    CreateLayer: 'Create layer',
    ResultName: 'Result name',
    ResultNamePlaceholder: 'Type the name of the layer to create',
    NewLayer: 'New_layer',
    CommonOptions: {
      Variable: 'Variable',
      Color: 'Color',
    },
    ChoroplethOptions: {
      Choropleth: 'Choropleth',
      Classification: 'Classification',
      ColorScheme: 'Color scheme',
      ColorSchemeInvert: 'Invert color scheme',
      CurrentNumberOfClasses: '{{ One class | ?? classes }}',
      DisplayChartOnMap: 'Display a class summary chart on the map',
    },
    ProportionalSymbolsOptions: {
      ReferenceSize: 'Reference size (px)',
      OnValue: 'On value',
      SymbolType: 'Symbol type',
      SymbolTypes: {
        circle: 'Circle',
        square: 'Square',
        line: 'Line',
      },
      AvoidOverlapping: 'Avoid overlapping symbols',
      LimitValue: 'Limit value',
    },
    DiscontinuityOptions: {
      DiscontinuityType: 'Discontinuity type',
      Relative: 'Relative',
      Absolute: 'Absolute',
      Classification: 'Classification type',
      DiscontinuityThreshold: 'Threshold of discontinuity to display',
    },
    SmoothingOptions: {
      Type: 'Smoothing type',
      Resolution: 'Grid resolution (km)',
      Stewart: 'Stewart\'s potential',
      KDE: 'Kernel density estimation',
      Bandwidth: 'Bandwidth',
      KernelType: 'Kernel type',
      Pareto: 'Pareto',
      Gaussian: 'Gaussian',
      Epanechnikov: 'Epanechnikov',
      Quartic: 'Quartic',
      Triangular: 'Triangular',
      Uniform: 'Uniform',
      Biweight: 'Biweight',
      Span: 'Span',
      Alpha: 'Alpha',
      Beta: 'Beta',
    },
    CartogramOptions: {
      Algorithm: 'Algorithm to use',
      Iterations: 'Iterations',
      Dougenik: 'Dougenik et al. (1985)',
      Olson: 'Olson (2005)',
      GastnerSeguyMore: 'Gastner, Seguy & More (2018)',
      WarningGeo: 'The current map projection is geographic (or its unit is degrees). The cartogram will be calculated in the current projection. Whenever possible, you should use projected data (with a distance unit in metres, for example) for greater accuracy.',
    },
    GridOptions: {
      Resolution: 'Grid resolution (km)',
      ResolutionWithUnit: 'Grid resolution ({unit})',
      CellShape: 'Cell shape',
      CellSquare: 'Square',
      CellHexagon: 'Hexagon',
      CellTriangle: 'Triangle',
      CellDiamond: 'Diamond',
      WarningGeo: 'The current map projection is geographic (or its unit is degrees). The grid resolution is therefore expressed in degrees. Whenever possible, you should use projected data (with a distance unit in metres, for example) for greater accuracy.',
    },
    CategoricalChoroplethOptions: {
      DisplayChartOnMap: 'Display the frequency histogram by category on the map',
      Categories: '{{One category | ?? categories}}',
      HasNull: 'Contains null or empty values',
      NoNull: 'No null or empty values',
      ShowChart: 'Show chart',
      XAxisCategories: 'Categories',
      YAxisCount: 'Count',
      Customize: 'Customize category names and colors',
      Value: 'Value:',
      Count: 'Count:',
    },
  },
  ExportSection: {
    Description: 'Selection of the type of export and the format of the file to be generated.',
    SelectLayers: 'Select a layer',
    SelectFormat: 'Select a format',
    SelectCRS: 'Select a CRS',
    Layers: 'Layers',
    Export: 'Export',
    ExportPng: 'Export as PNG',
    ExportSvg: 'Export as SVG',
    CustomCRS: 'Custom CRS',
    ClipSvgCurrentExtent: 'Clip SVG to current extent',
    Width: 'Width (px)',
    Height: 'Height (px)',
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
    AestheticFilter: 'Aesthetic filter',
    DropShadow: 'Add a shadow',
    Blur: 'Blur',
    AllowMovingSymbols: 'Allow moving symbols',
    ChangeClassification: 'Change classification options',
    FontFamily: 'Font family',
    FontSize: 'Font size',
    TextColor: 'Text color',
    XOffset: 'X offset',
    YOffset: 'Y offset',
    FontStyle: 'Font style',
    FontWeight: 'Font weight',
    BufferAroundText: 'Buffer around text',
    BufferColor: 'Buffer color',
    BufferWidth: 'Buffer width',
    AllowMovingLabels: 'Allow moving labels',
    Palette: 'Palette',
  },
  JoinPanel: {
    Title: 'Join to a geospatial layer',
    Information: 'This feature allows you to join data from a table to a geospatial layer. Data from the table is added to the geospatial layer based on a field common to both datasets.',
    Information2: 'Only fields with unique values are available for the join.',
    TargetLayer: 'Select the layer to join to',
    TargetLayerPlaceholder: 'Select a layer',
    JoinFieldTable: 'Select the field to join on (table)',
    JoinFieldLayer: 'Select the field to join on (layer)',
    JoinFieldPlaceholder: 'Select a field',
    Loading: 'Computing join...',
    ResultInformation: 'Result information:',
    MatchedGeometry: 'Geometries having a match:',
    MatchedData: 'Table rows having a match:',
    NoData: 'no data',
    Prefix: 'Use a prefix for the joined fields ?',
    PrefixValue: 'Prefix',
    SelectFields: 'Select the fields to join ?',
    Confirm: 'Add fields to the selected layer',
  },
  PortrayalSelection: {
    Title: 'Portrayal selection',
    Title2: 'Options for the selected portrayal',
    Layer: 'Layer:',
    Back: 'Back to portrayal selection',
    Information: 'Select the representation you wish to apply to your data layer. Greyed-out representations indicate that your dataset does not contain any data allowing you to perform this type of representation. If you suspect this is an error, you can change the field type in the Layer Manager.',
    ShortDescriptions: {
      Choropleth: 'A choropleth map is a thematic map in which areas are shaded or patterned in proportion to the value of a variable.',
      ProportionalSymbols: 'A proportional symbols map is a thematic map in which the size of a symbol varies in proportion to the value of a variable.',
      Labels: 'A labels map is a thematic map in which the value of a variable is displayed as a label.',
      Discontinuity: 'A discontinuity map is a thematic map in which areas are shaded or patterned in proportion to the value of a variable, but with a discontinuity at a given threshold.',
      CategoricalChoropleth: 'A categorical choropleth map is a thematic map in which areas are shaded or patterned in proportion to the value of a categorical variable.',
      Smoothed: 'A smoothed map is a thematic map in which the value of a variable is smoothed using a kernel density estimation.',
      Cartogram: 'A cartogram is a thematic map in which the geometry of areas is distorted in proportion to the value of a variable.',
      Grid: 'A grid map is a thematic map in which areas are shaded or patterned in proportion to the value of a variable, but with a grid layout.',
    },
    LongDescriptions: {
      Choropleth: '',
    },
  },
  ProjectionSelection: {
    title: 'Projection selection',
    SearchProjection: 'Enter an EPSG code or a projection name',
    NMatchingProjections: '{{No matching projection | One projection found | ?? projections found}}',
    TooManyResults: 'Too many results, please refine your search.',
    Kind: 'Kind:',
    ProjCRS: 'Projected coordinate reference system',
    GeogCRS: 'Geographic coordinate reference system',
    BboxGeo: 'Bounding box (geographic coordinates):',
    BboxProjected: 'Bounding box (projected coordinates):',
    Area: 'Area:',
    Unit: 'Unit:',
    MoreInformation: 'More information',
  },
  ImageSymbolSelection: {
    Title: 'Image import and selection',
    SelectImage: 'Select a symbol among the available ones...',
    UploadImage: 'Or upload an image (PNG or SVG)...',
    Browse: 'Browse...',
    SelectedImage: 'Selected image:',
  },
  SimplificationModal: {
    title: 'Simplification of geometries',
  },
  DataTable: {
    titleGeo: 'Attribute table',
    titleTabular: 'Data table',
    Features: '{{One feature | ?? features}}',
    Columns: '{{One column | ?? columns}}',
    ExportCsv: 'Export as CSV...',
    NewColumn: 'New column...',
    DeleteColumn: 'Delete column',
    NewColumnModal: {
      BackToDatatable: 'Back to data table',
      title: 'New column',
      name: 'Name',
      namePlaceholder: 'Type the name of the column',
      newColumnType: 'New column type',
      formula: 'Formula',
      compute: 'Compute',
      sampleOutput: 'Sample output',
      errorParsingFormula: 'Error while parsing the formula',
      errorEmptyResult: 'Error - empty result',
      noteSpecialCharacters: 'Note that column names containing special characters or spaces must be enclosed in backticks or in brackets.',
      '/': 'Division',
      '+': 'Addition',
      '-': 'Subtraction',
      '*': 'Multiplication',
      'POWER()': 'Power operator',
      'CONCAT()': 'Concatenate 2 or more strings',
      'SUBSTRING()': 'Extract a substring',
      specialFieldLength: 'Special field - The length of the dataset (number of features)',
      specialFieldArea: 'Special field - The area of the feature, in square meters (only for polygon layers). Note that this calculation is based on the geographical coordinates and is made on the spheroid. This result may be less accurate than if the calculation had been carried out in a local projection based on an adapted ellipsoid.',
      specialFieldId: 'Special field - The (internal) row id of the feature',
    },
  },
  FieldsTyping: {
    ModalTitle: 'Fields typing',
    FieldName: 'Field name',
    FieldType: 'Field type',
    VariableTypes: {
      identifier: 'Identifier',
      ratio: 'Ratio',
      stock: 'Stock',
      categorical: 'Categorical',
      unknown: 'Unknown',
    },
  },
  ClassificationPanel: {
    title: 'Classification',
    box: 'Box',
    histogram: 'Histogram',
    beeswarm: 'Beeswarm',
    dotHistogram: 'Dot histogram',
    histogramAndDensity: 'Histogram and density',
    distribution: 'Values distribution',
    summary: 'Summary',
    population: 'Population (non-null values)',
    minimum: 'Minimum',
    maximum: 'Maximum',
    mean: 'Mean',
    median: 'Median',
    standardDeviation: 'Standard deviation',
    variance: 'Variance',
    varianceCoefficient: 'Variance coefficient',
    skewness: 'Skewness',
    classification: 'Classification',
    classificationMethod: 'Classification method',
    classificationMethods: {
      equalIntervals: 'Equal intervals',
      quantiles: 'Quantiles',
      jenks: 'Jenks',
      standardDeviation: 'Standard deviation',
      q6: 'Q6',
      pretty: 'Pretty',
      geometricProgression: 'Geometric progression',
      arithmeticProgression: 'Arithmetic progression',
      headTail: 'Head/tail',
      manual: 'Manual',
    },
    classificationMethodLegendDescriptions: {
      equalIntervals: 'Classified using equal intervals',
      quantiles: 'Classified using quantiles',
      jenks: 'Classified using natural breaks (Jenks)',
      standardDeviation: 'Classified using mean and standard deviation',
      q6: 'Classified using the Q6 method',
      pretty: 'Classified using the "pretty breaks" method',
      geometricProgression: 'Classified using a geometric progression',
      arithmeticProgression: 'Classified using an arithmetic progression',
      headTail: 'Classified using the head/tail break method',
      manual: 'Classified manually',
    },
    numberOfClasses: 'Number of classes',
    meanPosition: 'Mean value position',
    meanPositionCenter: 'Class center',
    meanPositionBoundary: 'Class boundary',
    amplitude: 'Amplitude',
    howManyStdDev: 'standard deviations',
    typeScheme: 'Color scheme type',
    sequential: 'Sequential',
    diverging: 'Diverging',
    palette: 'Palette',
    reversePalette: 'Reverse palette',
    centralClass: 'Central class',
    displayMean: 'Display mean',
    displayMedian: 'Display median',
    displayStdDev: 'Display standard deviation',
    logarithmicScale: 'Logarithmic scale',
    breaksInput: 'Enter class limits',
    validate: 'Validate',
    missingValues: '{{ One feature without data | ?? features without data }}',
    count: 'Features per class',
  },
  Legend: {
    ContextMenu: {
      EditSettings: 'Edit settings...',
      Hide: 'Hide',
      Up: 'Up',
      Down: 'Down',
    },
    Modal: {
      Title: 'Legend settings',
      LegendTitle: 'Legend title',
      LegendSubtitle: 'Legend subtitle',
      LegendNote: 'Legend note',
      DisplayBackgroundRectangle: 'Display a rectangle under the legend',
      BackgroundRectangleColor: 'Background rectangle color',
      BackgroundRectangleOpacity: 'Background rectangle fill opacity',
      BackgroundRectangleStrokeColor: 'Background rectangle stroke color',
      BackgroundRectangleStrokeWidth: 'Background rectangle stroke width',
      BackgroundRectangleStrokeOpacity: 'Background rectangle stroke opacity',
      LegendOrientation: 'Legend orientation',
      LegendOrientationHorizontal: 'Horizontal',
      LegendOrientationVertical: 'Vertical',
      LegendSymbolLayout: 'Legend layout',
      LegendSymbolLayoutVertical: 'Vertical',
      LegendSymbolLayoutHorizontal: 'Horizontal',
      LegendSymbolLayoutStacked: 'Stacked',
      BoxWidth: 'Box width',
      BoxHeight: 'Box height',
      BoxSpacing: 'Spacing between boxes',
      BoxSpacingNoData: 'Spacing between boxes and no data box',
      NoDataLabel: 'Label for the "no data" box',
      BoxCornerRadius: 'Box corner radius',
      BoxStrokeWidth: 'Box stroke width',
      RoundDecimals: 'Round values',
      MoreOptions: 'More options...',
      SymbolsSpacing: 'Spacing between symbols',
      ChooseValues: 'Choice of values',
      LineLength: 'Line length',
    },
  },
  CommonTextElement: {
    FontSize: 'Font size',
    FontColor: 'Font color',
    FontFamily: 'Font family',
    FontWeight: 'Font weight',
    FontStyle: 'Font style',
    Normal: 'Normal',
    Bold: 'Bold',
    Italic: 'Italic',
    Underline: 'Underline',
  },
} satisfies BaseTranslation;

export default en;
