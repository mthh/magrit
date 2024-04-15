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
  Messages: {
    Information: 'Information',
    Warning: 'Warning',
    Error: 'Error',
    ChevronTitle: 'Click to show/hide',
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
    Instructions: 'Drag and drop one or more datasets here (geographical or tabular) or click on the button below to select a file.',
    Open: 'Open...',
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
    AddToProject: 'Add to project',
    Delete: 'Delete ?',
    Incomplete: 'Incomplete',
    IncompleteMessage: 'The dataset is incomplete and cannot be imported. Please add the other mandatory files.',
    UnsupportedFileFormat: 'Unsupported file format for {file}',
    ErrorReadingFile: 'Error while reading file {file}: {message}',
    RemovedEmptyFeatures: 'Removed {{ nRemoved:0 feature | a feature | ?? features }} without geometry from dataset {name}.',
    NFeatures: '{{ One feature | ?? features }}',
  },
  MapZone: {
    DropFilesHere: 'Drag and drop your file(s) here ! (or use the import menu)',
    Controls: {
      Plus: 'Zoom in',
      Minus: 'Zoom out',
      Lock: 'Lock zoom / position',
      Unlock: 'Unlock zoom / position',
      Info: 'Display information on selected feature',
      InfoInstruction: 'Click on a feature to display information. Press "Esc" to close.',
    },
  },
  LeftMenu: {
    Import: 'Data import',
    MapConfiguration: 'Map configuration',
    LayerManager: 'Layer manager',
    FunctionalityChoice: 'Choice of portrayal or analysis functionality',
    ExportSection: 'Map and data export',
    LayoutFeatures: 'Page layout and skin elements',
  },
  ImportSection: {
    OpenImportWindow: 'Open data import window...',
    ExampleDatasets: 'Browse example datasets...',
  },
  MapConfiguration: {
    Dimensions: 'Dimensions',
    Width: 'Width',
    Height: 'Height',
    Projection: 'Projection',
    GlobalProjections: 'Global projections',
    LocalProjections: 'Local projections',
    RecentlyUsedProjections: 'Recently used projections',
    MoreProjection: 'More projections...',
    LockZoom: 'Lock zoom / position',
    ShowProjectionParameters: 'Show projection parameters',
    ProjectionCenterLambda: 'λ-axis rotation',
    ProjectionCenterPhi: 'φ-axis rotation',
    ProjectionCenterGamma: 'γ-axis rotation',
    StandardParallel: 'Standard parallel',
    StandardParallels: 'Standard parallels',
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
    SnapToGrid: 'Automatically align items on a grid',
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
      FreeDrawing: 'Click to start drawing the desired shape and release to finish. Press "Esc" to close the drawing mode.',
      Text: 'Click to locate the text.',
      TextPlaceholder: 'Type your text here...',
      PressEscToCancel: 'Press "Esc" to cancel.',
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
      Distance: 'Distance on the map (unit chosen below)',
      Width: 'Width (px)',
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
      LabelPosition: 'Label position',
      Top: 'Top',
      Bottom: 'Bottom',
      TextContent: 'Text content',
      FontProperties: 'Font properties',
      FontSize: 'Font size',
      FontColor: 'Font color',
      FontFamily: 'Font family',
      FontWeight: 'Font weight',
      FontStyle: 'Font style',
      Normal: 'Normal',
      Bold: 'Bold',
      Italic: 'Italic',
      Underline: 'Underline',
      LineThrough: 'Line through',
      TextAnchor: 'Text anchor',
      Start: 'Start',
      Middle: 'Middle',
      End: 'End',
      BufferAroundText: 'Buffer around text',
      BufferColor: 'Buffer color',
      BufferWidth: 'Buffer width',
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
    point: 'Point layer - {nFt} {{nFt: feature | features}} - {nCol} {{nCol: column | columns}}',
    linestring: 'Line layer - {nFt} {{nFt: feature | features}} - {nCol} {{nCol: column | columns}}',
    polygon: 'Polygon layer - {nFt} {{nFt: feature | features}} - {nCol} {{nCol: column | columns}}',
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
  FunctionalitiesSection: {
    FunctionalityTypes: {
      Choropleth: 'Choropleth',
      ProportionalSymbols: 'Proportional symbols',
      Labels: 'Labels',
      Discontinuity: 'Discontinuity',
      CategoricalChoropleth: 'Categorical choropleth',
      Smoothed: 'Smoothed map',
      Cartogram: 'Cartogram',
      Grid: 'Grid',
      Links: 'Links',
      Mushrooms: 'Mushrooms',
      PointAggregation: 'Point layer aggregation',
      SimpleLinearRegression: 'Simple linear regression',
      Aggregation: 'Aggregation',
      Selection: 'Selection',
      Simplification: 'Simplification',
      LayerCreationFromTable: 'Geospatial layer creation',
    },
    TargetLayer: 'Target layer',
    CreateLayer: 'Create layer',
    ResultName: 'Result name',
    ResultNamePlaceholder: 'Type the name of the layer to create',
    NewLayer: 'New_layer',
    CommonOptions: {
      Variable: 'Variable',
      VariablePlaceholder: 'Variable to use',
      SelectVariable: 'Select a variable',
      Color: 'Color',
    },
    ChoroplethOptions: {
      Choropleth: 'Choropleth',
      Classification: 'Classification',
      ColorScheme: 'Color scheme',
      ColorSchemeInvert: 'Invert color scheme',
      CurrentNumberOfClasses: '{{ One class | ?? classes }}',
      CurrentPalette: 'palette {p}',
      DisplayChartOnMap: 'Display a class summary histogram on the map',
      NewLayerName: 'Choropleth_{layerName}',
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
      ColorMode: 'Color mode',
      ColorModes: {
        singleColor: 'Single color',
        ratioVariable: 'Ratio variable',
        categoricalVariable: 'Categorical variable',
      },
      AvoidOverlapping: 'Avoid overlapping symbols',
      LimitValue: 'Limit value',
      NewLayerName: 'Proportional_Symbols_{layerName}',
    },
    DiscontinuityOptions: {
      DiscontinuityType: 'Discontinuity type',
      Relative: 'Relative',
      Absolute: 'Absolute',
      Classification: 'Classification type',
      DiscontinuityThreshold: 'Threshold of discontinuity to display',
      NewLayerName: 'Discontinuity_{layerName}',
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
      Count: 'Count',
      ThresholdForContours: 'Threshold for contours',
      ErrorParsingThreshold: 'Error while parsing the threshold. Please use values separated by dashes.',
      NewLayerName: 'Smoothing_{layerName}',
    },
    CartogramOptions: {
      Algorithm: 'Algorithm to use',
      Iterations: 'Iterations',
      Dougenik: 'Dougenik et al. (1985)',
      Olson: 'Olson (2005)',
      GastnerSeguyMore: 'Gastner, Seguy & More (2018)',
      WarningGeo: 'The current map projection is geographic (or its unit is degrees). The cartogram will be calculated in the current projection. Whenever possible, you should use projected data (with a distance unit in metres, for example) for greater accuracy.',
      NewLayerName: 'Cartogram_{layerName}',
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
      NewLayerName: 'Grid_{layerName}',
    },
    CategoricalChoroplethOptions: {
      DisplayChartOnMap: 'Display the frequency bar chart by category on the map',
      Categories: '{{One category | ?? categories}}',
      HasNull: 'Contains null or empty values',
      NoNull: 'No null or empty values',
      ShowChart: 'Show chart',
      XAxisCategories: 'Categories',
      YAxisCount: 'Count',
      Customize: 'Customize category names and colors',
      Value: 'Value:',
      Count: 'Count:',
      NewLayerName: 'Categorical_Choropleth_{layerName}',
    },
    LabelsOptions: {
      Filter: 'Filter the labels to create',
      NewLayerName: 'Labels_{layerName}',
    },
    LinksOptions: {
      IdentifierField: 'Identifier field',
      SelectDataset: 'Select a dataset',
      Dataset: 'Dataset containing links information',
      OriginId: 'Origin identifiers',
      DestinationId: 'Destination identifiers',
      Intensity: 'Intensity',
      LinkType: 'Link type',
      LinkTypeExchange: 'Exchange',
      LinkTypeLink: 'Link',
      LinkTypeBilateralVolume: 'Bilateral volume',
      LinkHeadType: 'Head type',
      LinkHeadTypeArrow: 'Arrow',
      LinkHeadTypeNone: 'None',
      LinkHeadTypeArrowOnSymbol: 'Arrow (positioned on symbol border)',
      LinkHeadTypeNoneOnSymbol: 'None (positioned on symbol border)',
      LinkCurvature: 'Curvature',
      LinkCurvatureStraightOnPlane: 'Straight (on the map)',
      LinkCurvatureStraightOnSphere: 'Straight (along great circle)',
      LinkCurvatureCurved: 'Curved',
      LinkPosition: 'Link position',
      LinkPositionInitial: 'Initial',
      LinkPositionShifted: 'Shifted',
      LinkPositionShared: 'Shared',
      LinkSizeType: 'Link size type',
      LinkSizeClassification: 'Link size classification',
      LinkSizeProportional: 'Proportional',
      LinkSizeFixed: 'Fixed',
      LinkSizeProportionalReferenceSize: 'Maximal Size',
      LinkSizeProportionalReferenceValue: 'On value',
      AllMatch: 'All origins and destinations match IDs of features in the geographic layer',
      SomeMatch: 'Some origins and destinations (but not all) match IDs of features in the geographic layer',
      NoMatch: 'No origins and destinations match IDs of features in the geographic layer',
      Selection: 'Select links to display',
      NewLayerName: 'Links_{layerName}',
    },
    MushroomsOptions: {
      TopProperties: 'Properties of the upper part:',
      BottomProperties: 'Properties of the lower part:',
      NewLayerName: 'Mushrooms_{layerName}',
    },
    AggregationOptions: {
      Method: 'Aggregation method',
      None: 'None',
      Information: 'If no field is selected, the aggregation will be done on the whole layer.',
      NewLayerName: 'Aggregated_{layerName}',
    },
    SimplificationOptions: {
      NewLayerName: 'Simplified_{layerName}',
    },
    SelectionOptions: {
      Formula: 'Formula',
      Information: 'Selection by expression is used to create a subset of data from a geographic layer. The features in the layer that satisfy the expression are selected.',
      InformationSyntax: 'The syntax to be used for expressions is that of the SQL language. The usual logical and arithmetic operators are available.',
      InvalidFormula: 'Invalid formula - the expression must return true or false for each feature',
      NewLayerName: 'Selection_{layerName}',
      NoSelectedData: 'No data selected by the given expression.',
      NFeaturesSelected: '{{One feature | ?? features}} selected by the given expression.',
      AllDataSelected: 'All features of the layer are selected by the given expression.',
    },
    PointAggregationOptions: {
      MapType: 'Map type',
      MapTypeRatio: 'Choropleth map (ratio values)',
      MapTypeStock: 'Proportional symbols map (stock values)',
      MeshType: 'Mesh type',
      MeshTypeGrid: 'Regular grid',
      MeshTypePolygonLayer: 'Existing polygon layer',
      ComputationType: 'Computation type',
      ComputationTypeCount: 'Simple count',
      ComputationTypeWeightedCount: 'Weighted count',
      ComputationTypeDensity: 'Density (simple count)',
      ComputationTypeWeightedDensity: 'Density (weighted count)',
      ComputationTypeMean: 'Mean',
      ComputationTypeStandardDeviation: 'Standard deviation',
      LayerToUse: 'Layer to use',
      VariableToUse: 'Numerical variable to use',
      NewLayerName: 'Aggregated_points_{layerName}',
    },
    LayerFromTableOptions: {
      Mode: 'Mode',
      ModeXY: 'Fields for X and Y coordinates',
      ModeWKT: 'Field for WKT geometry',
      FieldX: 'Field containing the X coordinate',
      FieldY: 'Field containing the Y coordinate',
      FieldWkt: 'Field containing the WKT geometry',
      NoFeatureToCreate: 'No feature to create - Please check the field(s) selected.',
      NFeaturesToCreate: '{{One feature | ?? features}} to create.',
      CoordsNotInCRS: 'The values in the selected fields do not appear to be valid geographic coordinates. Please check your selection.',
    },
    LinearRegressionOptions: {
      NewLayerName: 'Linear_Regression_{layerName}',
      DisplayCorrelationMatrix: 'Display the correlation matrix between all the variables',
      PearsonCorrelation: 'Pearson product-moment correlation',
      SpearmanCorrelation: 'Spearman\'s rank correlation',
      ExplainedVariable: 'Response variable',
      ExplanatoryVariable: 'Explanatory variable',
      LogTransform: 'Logarithmic transformation',
      PearsonCorrelationValue: 'Pearson product-moment correlation coefficient:',
      SpearmanCorrelationValue: 'Spearman\'s rank correlation coefficient:',
      ModelSummary: 'Model summary',
      Coefficients: 'Coefficients',
      CoefficientsDetails: 'Coefficients (details)',
      MultipleR2: 'Multiple R-squared: {value}',
      AdjustedR2: 'Adjusted R-squared: {value}',
      RSE: 'Residual standard error: {value}',
      DegreesOfFreedom: '{value} on {nFeatures} degrees of freedom',
      DeletedAsMissing: '({value} observation{{value: s}} deleted as missing)',
      DiagnosticPlots: 'Diagnostic plots',
      ResidualVsFittedValues: 'Residuals vs. fitted values',
      ResidualVsFittedInfo1: 'The residuals vs fitted plot shows if residuals have non-linear patterns. It is useful for investigating:',
      ResidualVsFittedInfo2: 'Whether linearity holds: this is indicated by the mean residual value for every fitted value region being close to 0 (here this is indicated by the red line being close to the dashed line).',
      ResidualVsFittedInfo3: 'Whether there are outliers: this is indicated by some ‘extreme’ residuals that are far from the rest.',
      ResidualVsFittedCheck: 'It is good if you find equally spread residuals around a horizontal line without distinct patterns.',
      ScaleLocation: 'Scale-location',
      ScaleLocationInfo1: 'This plot shows if residuals are spread equally along the ranges of predictors. It is mainly useful for investigating whether homoskedasticity (the assumption of equal variance) holds.',
      ScaleLocationCheck: 'It’s good if you see a horizontal line with equally (randomly) spread points (i.e the spread of residuals should be approximately the same across the x-axis).',
      QQ: 'Quantiles-quantiles residuals',
      QQInfo1: 'Quantile-Quantile plot (also called QQ plot) is useful for investigation whether the assumption of normality holds (the residuals of the regression should follow a normal distribution).',
      QQCheck: 'It’s good if residuals are lined well on the straight dashed line.',
      SummaryInfo1: 'In theory, several assumptions must not be violated when performing a simple linear regression:',
      SummaryInfo2: 'Linearity: the relationship between the response and explanatory variables is linear.',
      SummaryInfo3: 'Independence: the residuals are independent.',
      SummaryInfo4: 'Homoskedasticity: the variance of the residuals is constant across all fitted values.',
      SummaryInfo5: 'Normality: the residuals follow a normal distribution.',
      SummaryInfo6: 'If the graphs shown above have convinced you that these hypotheses have been validated, it\'s now time to move on to representing the results.',
      ClassificationColorSelection: 'Classification and selection of colors',
      StandardizedResiduals: 'Standardized residuals',
    },
  },
  FormulaInput: {
    formula: 'Formula',
    sampleOutput: 'Sample output',
    ErrorParsingFormula: 'Error while parsing the formula',
    ErrorEmptyResult: 'Error - empty result',
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
    StrokeDashed: 'Dashed stroke',
    SymbolSize: 'Symbol size',
    SymbolType: 'Symbol type',
    SymbolTypes: {
      circle: 'Circle',
      square: 'Square',
      diamond: 'Diamond',
      diamond2: 'Diamond (stretched)',
      cross: 'Cross',
      triangle: 'Triangle',
      star: 'Star',
      wye: 'Wye',
    },
    AestheticFilter: 'Aesthetic filter',
    DropShadow: 'Add a shadow',
    DropShadowDx: 'Shadow offset on the x-axis',
    DropShadowDy: 'Shadow offset on the y-axis',
    DropShadowColor: 'Shadow color',
    DropShadowBlur: 'Shadow blur',
    AllowMovingSymbols: 'Allow moving symbols',
    Iterations: 'Iterations',
    ResetLabelLocations: 'Reset label locations',
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
    GraticuleStepX: 'Graticule step (X)',
    GraticuleStepY: 'Graticule step (Y)',
    AddBarChartCategoricalChoropleth: 'Add a bar chart by category...',
    AddHistogramChoropleth: 'Add a class summary histogram...',
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
    ImpossibleJoin: 'The choices made do not allow a join to be made.',
    NoData: 'no data',
    Prefix: 'Use a prefix for the joined fields?',
    PrefixValue: 'Prefix',
    SelectFields: 'Select the fields to join?',
    Confirm: 'Add fields to the selected layer',
    RemoveNotMatching: 'Remove features of the layer that do not match?',
  },
  PortrayalSelection: {
    Title: 'Functionality selection',
    Title2: 'Options',
    Layer: 'Layer:',
    Table: 'Table:',
    Back: 'Back to functionality selection',
    Information: 'Select the functionality you wish to apply to your data layer. Greyed-out functionalities indicate that your dataset does not contain any data allowing you to use it. If you suspect this is an error, you can change the field type in the Layer Manager.',
    ShortDescriptions: {
      Choropleth: 'A choropleth map is a thematic map in which areas are shaded or patterned in proportion to the value of a variable.',
      ProportionalSymbols: 'A proportional symbols map is a thematic map in which the size of a symbol varies in proportion to the value of a variable.',
      Labels: 'A labels map is a thematic map in which the value of a variable is displayed as a label.',
      Discontinuity: 'A discontinuity map is a thematic map in which areas are shaded or patterned in proportion to the value of a variable, but with a discontinuity at a given threshold.',
      CategoricalChoropleth: 'A categorical choropleth map is a thematic map in which areas are shaded or patterned in proportion to the value of a categorical variable.',
      Smoothed: 'A smoothed map is a thematic map in which the value of a variable is smoothed using a kernel density estimation.',
      Cartogram: 'A cartogram is a thematic map in which the geometry of areas is distorted in proportion to the value of a variable.',
      Grid: 'A grid map is a thematic map in which areas are shaded or patterned in proportion to the value of a variable, but with a grid layout.',
      Links: 'A links map is a thematic map in which links are drawn between points or areas, optionally with a width in proportion to the value of a variable.',
      PointAggregation: 'Point aggregation is a functionality that allows you to aggregate point data into a grid or a polygonal layer.',
      SimpleLinearRegression: 'Simple linear regression is a functionality that allows you to display the result of a simple linear regression on a layer.',
      Mushrooms: 'A mushrooms map is a thematic map in which the values of two variables are represented by two half-circles or two half-squares, forming a mushroom-shaped symbol.',
      Aggregation: 'This functionality enables polygonal entities to be aggregated according to the value of a field (or all entities if no field is selected).',
      Selection: 'This functionality can be used to create a new layer based on the selection of initial geographical features according to an expression',
      Simplification: 'This functionality simplifies the drawing of linear or polygonal entities. This operation, also known as \'generalisation\' in cartography, results in a less detailed and lighter dataset.',
      LayerCreationFromTable: 'This function creates a geospatial layer from a data table containing coordinates.',
    },
  },
  ProjectionSelection: {
    title: 'Projection selection',
    GlobalProjection: 'Global projection',
    InformationGlobalProjection: 'Select a global projection for your map. Global projections are map projections that distort the shape of continents and oceans. They are often used for maps of the whole world.',
    LocalProjection: 'Local projection',
    InformationLocalProjection: 'Select a local projection for your map. Local projections are often used for large-scale maps of specific regions (i.e. covering a small part of the territory).',
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
    Title: 'Simplification of geometries',
    QuantizationFactor: 'Quantization factor',
    SimplificationFactor: 'Simplification factor',
    CountGeometries: '{geom} non-empty geometries, {pts} points',
    CheckSelfIntersection: 'Check self-intersection',
    CountSelfIntersections: '{count} self-intersections detected',
    PreventShapeRemoval: 'Prevent feature removal',
  },
  DataTable: {
    titleGeo: 'Attribute table',
    titleTabular: 'Data table',
    Features: '{{One feature | ?? features}}',
    Columns: '{{Non column | One column | ?? columns}}',
    ExportCsv: 'Export as CSV...',
    NewColumn: 'New column...',
    DeleteColumn: 'Delete column',
    NewColumnModal: {
      BackToDatatable: 'Back to data table',
      title: 'New column',
      name: 'Name',
      namePlaceholder: 'Type the name of the column',
      newColumnType: 'New column type',
      compute: 'Compute',
      formula: 'Formula',
    },
  },
  FieldsTyping: {
    ModalTitle: 'Fields typing',
    FieldName: 'Field name',
    FieldType: 'Field type',
    Information1: 'Variable type defines the analysis and representation functionalities offered by the application.',
    Information2: 'Five types of variable are available: identifier (a unique value used to identify an entity, such as a code, or its name), categorical (a nominal qualitative value), ratio (a relative quantitative value, such as an unemployment rate or population density), stock (an absolute quantitative value, such as a population stock or total wheat production), and unknown (for variables you don\'t wish to use).',
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
      nestedMeans: 'Nested means',
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
    neutralCentralClass: 'Neutral central class',
    centralClassPosition: 'Central class position',
    inflexionPointPosition: 'Inflexion point position',
    displayMean: 'Display mean',
    displayMedian: 'Display median',
    displayStdDev: 'Display standard deviation',
    logarithmicScale: 'Logarithmic scale',
    breaksInput: 'Enter class limits',
    validate: 'Validate',
    missingValues: '{{ One feature without data | ?? features without data }}',
    count: 'Features per class',
    errorCustomBreaks: 'Error - The class limits entered are invalid. Please enter numerical values separated by dashes to form at least 2 classes.',
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
      titleTextElement: 'Title',
      subtitleTextElement: 'Subtitle',
      labelsTextElement: 'Value labels',
      noteTextElement: 'Note',
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
      DisplayTick: 'Display tick between each box',
      DisplayStroke: 'Display stroke for each box',
      BoxStrokeWidth: 'Box stroke width',
      RoundDecimals: 'Round values',
      MoreOptions: 'More options...',
      SymbolsSpacing: 'Spacing between symbols',
      ChooseValues: 'Choice of values',
      LineLength: 'Line length',
      Width: 'Width',
      Height: 'Height',
      MushroomsTopTitle: 'Top part variable title',
      MushroomsTopTitleColor: 'Top part variable title color',
      MushroomsBottomTitle: 'Bottom part variable title',
      MushroomsBottomTitleColor: 'Bottom part variable title color',
      BarOrder: 'Bar order',
      BarOrderAscending: 'Ascending',
      BarOrderDescending: 'Descending',
      BarOrderNone: 'Same order as in the legend',
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
