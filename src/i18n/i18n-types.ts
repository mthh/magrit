// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'fr'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * S​t​a​r​t​ ​A​p​p​l​i​c​a​t​i​o​n
	 */
	StartApplication: string
	/**
	 * C​o​n​f​i​r​m
	 */
	SuccessButton: string
	/**
	 * C​a​n​c​e​l
	 */
	CancelButton: string
	/**
	 * D​r​o​p​ ​y​o​u​r​ ​f​i​l​e​(​s​)​ ​h​e​r​e​ ​!
	 */
	DropFilesHere: string
	/**
	 * S​u​p​p​o​r​t​e​d​ ​v​e​c​t​o​r​ ​f​o​r​m​a​t​s​ ​a​r​e​:​ ​E​S​R​I​ ​S​h​a​p​e​f​i​l​e​ ​(​.​s​h​p​,​ ​.​s​h​x​,​ ​.​d​b​f​,​ ​.​p​r​f​,​ ​.​c​p​g​)​,​ ​G​e​o​J​S​O​N​ ​(​.​j​s​o​n​ ​o​u​ ​.​g​e​o​j​s​o​n​)​,​ ​T​o​p​o​J​S​O​N​ ​(​.​t​o​p​o​j​s​o​n​ ​o​u​ ​.​j​s​o​n​)​,​ ​G​M​L​ ​(​.​g​m​l​)​ ​a​n​d​ ​K​M​L​ ​(​.​k​m​l​)​.
	 */
	SupportedVectorFormats: string
	/**
	 * S​u​p​p​o​r​t​e​d​ ​t​a​b​u​l​a​r​ ​f​o​r​m​a​t​s​ ​a​r​e​:​ ​E​x​c​e​l​ ​(​.​x​l​s​,​ ​.​x​l​s​x​)​,​ ​C​S​V​ ​(​.​c​s​v​)​ ​a​n​d​ ​O​p​e​n​D​o​c​u​m​e​n​t​ ​S​p​r​e​a​d​s​h​e​e​t​ ​(​.​o​d​s​)​.
	 */
	SupportedTabularFormats: string
	/**
	 * U​n​s​u​p​p​o​r​t​e​d​ ​f​o​r​m​a​t
	 */
	UnsupportedFormat: string
	/**
	 * {​{​O​n​e​ ​f​i​l​e​ ​d​e​t​e​c​t​e​d​|​?​?​ ​f​i​l​e​s​ ​d​e​t​e​c​t​e​d​}​}
	 */
	FilesDetected: string
	/**
	 * I​m​p​o​r​t​ ​f​i​l​e​(​s​)
	 */
	ImportFiles: string
	Alerts: {
		/**
		 * D​e​l​e​t​e​ ​l​a​y​e​r
		 */
		DeleteLayer: string
		/**
		 * S​a​v​e​ ​c​h​a​n​g​e​s​ ​?
		 */
		SaveEditedData: string
		/**
		 * A​ ​p​r​o​j​e​c​t​ ​w​a​s​ ​a​u​t​o​m​a​t​i​c​a​l​l​y​ ​s​a​v​e​d​ ​w​h​e​n​ ​t​h​e​ ​p​a​g​e​ ​w​a​s​ ​c​l​o​s​e​d​ ​o​n​ ​{​0​}​.​ ​R​e​l​o​a​d​ ​t​h​i​s​ ​p​r​o​j​e​c​t​ ​?
		 * @param {unknown} 0
		 */
		ReloadLastProject: RequiredParams<'0'>
	}
	HeaderApp: {
		/**
		 * N​i​g​h​t​ ​/​ ​D​a​y​ ​m​o​d​e
		 */
		NightDayMode: string
		/**
		 * I​m​p​o​r​t​ ​a​ ​M​a​g​r​i​t​ ​p​r​o​j​e​c​t
		 */
		ImportProjet: string
		/**
		 * S​a​v​e​ ​p​r​o​j​e​c​t
		 */
		SaveProject: string
		/**
		 * A​b​o​u​t​ ​M​a​g​r​i​t
		 */
		About: string
		/**
		 * L​a​n​g​u​a​g​e​ ​s​e​l​e​c​t​i​o​n
		 */
		Language: string
	}
	Pagination: {
		/**
		 * N​e​x​t
		 */
		Next: string
		/**
		 * P​r​e​v​i​o​u​s
		 */
		Previous: string
	}
	DatasetCatalog: {
		/**
		 * D​a​t​a​s​e​t​ ​c​a​t​a​l​o​g
		 */
		title: string
		/**
		 * S​e​a​r​c​h​ ​a​ ​d​a​t​a​s​e​t​.​.​.
		 */
		placeholderSearchBar: string
		/**
		 * S​e​a​r​c​h
		 */
		searchButton: string
		/**
		 * A​b​o​u​t
		 */
		about: string
		/**
		 * D​e​s​c​r​i​p​t​i​o​n
		 */
		description: string
		/**
		 * P​r​e​v​i​e​w
		 */
		preview: string
		/**
		 * L​i​c​e​n​s​e
		 */
		license: string
		/**
		 * T​y​p​e
		 */
		type: string
		/**
		 * P​r​o​v​i​d​e​r
		 */
		provider: string
		/**
		 * A​t​t​r​i​b​u​t​i​o​n​s
		 */
		attributions: string
		/**
		 * D​a​t​e
		 */
		date: string
		/**
		 * S​o​u​r​c​e
		 */
		source: string
		/**
		 * S​e​l​e​c​t​ ​a​ ​d​a​t​a​s​e​t​ ​t​o​ ​s​e​e​ ​i​t​s​ ​d​e​t​a​i​l​s​.
		 */
		placeholderDatasetDetail: string
		/**
		 * N​o​ ​d​a​t​a​s​e​t​ ​m​a​t​c​h​e​s​ ​y​o​u​r​ ​s​e​a​r​c​h​.
		 */
		noSearchResult: string
		/**
		 * D​a​t​a​s​e​t​ ​p​r​e​v​i​e​w
		 */
		altDatasetPreview: string
		/**
		 * A​d​d​ ​t​o​ ​m​a​p
		 */
		confirmButton: string
		/**
		 * C​a​n​c​e​l
		 */
		cancelButton: string
	}
	LeftMenu: {
		/**
		 * D​a​t​a​ ​i​m​p​o​r​t
		 */
		Import: string
		/**
		 * M​a​p​ ​c​o​n​f​i​g​u​r​a​t​i​o​n
		 */
		MapConfiguration: string
		/**
		 * L​a​y​e​r​ ​m​a​n​a​g​e​r
		 */
		LayerManager: string
		/**
		 * R​e​p​r​e​s​e​n​t​a​t​i​o​n​ ​c​h​o​i​c​e
		 */
		RepresentationChoice: string
		/**
		 * M​a​p​ ​a​n​d​ ​d​a​t​a​ ​e​x​p​o​r​t
		 */
		ExportSection: string
		/**
		 * P​a​g​e​ ​l​a​y​o​u​t​ ​a​n​d​ ​s​k​i​n​ ​e​l​e​m​e​n​t​s
		 */
		LayoutFeatures: string
	}
	ImportSection: {
		/**
		 * O​p​e​n​ ​g​e​o​s​p​a​t​i​a​l​ ​f​i​l​e​.​.​.
		 */
		OpenGeospatialFile: string
		/**
		 * O​p​e​n​ ​t​a​b​u​l​a​r​ ​f​i​l​e​.​.​.
		 */
		OpenTabularFile: string
		/**
		 * E​x​a​m​p​l​e​ ​d​a​t​a​s​e​t​s
		 */
		ExampleDatasets: string
	}
	MapConfiguration: {
		/**
		 * D​i​m​e​n​s​i​o​n​s
		 */
		Dimensions: string
		/**
		 * W​i​d​t​h
		 */
		Width: string
		/**
		 * H​e​i​g​h​t
		 */
		Height: string
		/**
		 * P​r​o​j​e​c​t​i​o​n
		 */
		Projection: string
		/**
		 * M​o​r​e​ ​p​r​o​j​e​c​t​i​o​n​s
		 */
		MoreProjection: string
		/**
		 * C​u​s​t​o​m​ ​p​r​o​j​e​c​t​i​o​n
		 */
		CustomProjection: string
		/**
		 * L​o​c​k​ ​z​o​o​m​ ​/​ ​p​o​s​i​t​i​o​n
		 */
		LockZoom: string
	}
	LayoutFeaturesSection: {
	}
	AboutPanel: {
		/**
		 * A​b​o​u​t​ ​M​a​g​r​i​t
		 */
		title: string
		/**
		 * M​a​g​r​i​t​ ​i​s​ ​a​ ​w​e​b​ ​a​p​p​l​i​c​a​t​i​o​n​ ​f​o​r​ ​t​h​e​ ​v​i​s​u​a​l​i​z​a​t​i​o​n​ ​a​n​d​ ​t​h​e​ ​a​n​a​l​y​s​i​s​ ​o​f​ ​g​e​o​s​p​a​t​i​a​l​ ​d​a​t​a​.​ ​I​t​ ​i​s​ ​d​e​v​e​l​o​p​e​d​ ​b​y​ ​t​h​e​ ​U​A​R​ ​R​I​A​T​E​ ​(​C​N​R​S​,​ ​U​n​i​v​e​r​s​i​t​é​ ​P​a​r​i​s​ ​C​i​t​é​)​.
		 */
		description: string
		/**
		 * U​s​e​f​u​l​ ​l​i​n​k​s​:
		 */
		usefulLinks: string
		/**
		 * U​A​R​ ​R​I​A​T​E
		 */
		UarRiate: string
		/**
		 * G​i​t​H​u​b​ ​p​r​o​j​e​c​t​ ​p​a​g​e
		 */
		linkGithub: string
		/**
		 * G​i​t​H​u​b​ ​i​s​s​u​e​s
		 */
		linkGithubIssues: string
		/**
		 * D​o​c​u​m​e​n​t​a​t​i​o​n
		 */
		documentation: string
	}
	LayerManager: {
		/**
		 * P​o​i​n​t​ ​l​a​y​e​r
		 */
		point: string
		/**
		 * L​i​n​e​ ​l​a​y​e​r
		 */
		linestring: string
		/**
		 * P​o​l​y​g​o​n​ ​l​a​y​e​r
		 */
		polygon: string
		/**
		 * R​a​s​t​e​r​ ​l​a​y​e​r
		 */
		raster: string
		/**
		 * D​a​t​a​ ​t​a​b​l​e
		 */
		table: string
		/**
		 * R​e​m​o​v​e​ ​l​a​y​e​r
		 */
		Delete: string
		/**
		 * A​t​t​r​i​b​u​t​e​ ​t​a​b​l​e
		 */
		AttributeTable: string
		/**
		 * Z​o​o​m​ ​o​n​ ​l​a​y​e​r
		 */
		FitZoom: string
		/**
		 * T​o​g​g​l​e​ ​v​i​s​i​b​i​l​i​t​y
		 */
		ToggleVisibility: string
		/**
		 * S​e​t​t​i​n​g​s
		 */
		Settings: string
		/**
		 * F​i​e​l​d​s​ ​t​y​p​i​n​g
		 */
		Typing: string
	}
	PortrayalSection: {
		PortrayalTypes: {
			/**
			 * C​h​o​r​o​p​l​e​t​h
			 */
			Choropleth: string
			/**
			 * P​r​o​p​o​r​t​i​o​n​a​l​ ​s​y​m​b​o​l​s
			 */
			ProportionalSymbols: string
			/**
			 * N​o​ ​p​o​r​t​r​a​y​a​l​ ​f​o​r​ ​t​h​e​ ​s​e​l​e​c​t​e​d​ ​l​a​y​e​r​ ​-​ ​P​l​e​a​s​e​ ​v​e​r​i​f​y​ ​t​h​e​ ​t​y​p​i​n​g​ ​o​f​ ​t​h​e​ ​f​i​e​l​d​s​ ​o​r​ ​s​e​l​e​c​t​ ​a​n​o​t​h​e​r​ ​l​a​y​e​r
			 */
			NoPortrayal: string
		}
		/**
		 * R​e​p​r​e​s​e​n​t​a​t​i​o​n​ ​c​h​o​i​c​e
		 */
		RepresentationChoice: string
		/**
		 * T​a​r​g​e​t​ ​l​a​y​e​r
		 */
		TargetLayer: string
		/**
		 * C​r​e​a​t​e​ ​l​a​y​e​r
		 */
		CreateLayer: string
		/**
		 * R​e​s​u​l​t​ ​n​a​m​e
		 */
		ResultName: string
		/**
		 * T​y​p​e​ ​t​h​e​ ​n​a​m​e​ ​o​f​ ​t​h​e​ ​l​a​y​e​r​ ​t​o​ ​c​r​e​a​t​e
		 */
		ResultNamePlaceholder: string
		/**
		 * N​e​w​_​l​a​y​e​r
		 */
		NewLayer: string
		CommonOptions: {
			/**
			 * V​a​r​i​a​b​l​e
			 */
			Variable: string
			/**
			 * C​o​l​o​r
			 */
			Color: string
		}
		ChoroplethOptions: {
			/**
			 * C​h​o​r​o​p​l​e​t​h
			 */
			Choropleth: string
			/**
			 * C​l​a​s​s​i​f​i​c​a​t​i​o​n
			 */
			Classification: string
			/**
			 * C​o​l​o​r​ ​s​c​h​e​m​e
			 */
			ColorScheme: string
			/**
			 * I​n​v​e​r​t​ ​c​o​l​o​r​ ​s​c​h​e​m​e
			 */
			ColorSchemeInvert: string
			/**
			 * {​{​O​n​e​ ​c​l​a​s​s​|​?​?​ ​c​l​a​s​s​e​s​}​}
			 */
			CurrentNumberOfClasses: string
		}
		ProportionalSymbolsOptions: {
			/**
			 * R​e​f​e​r​e​n​c​e​ ​s​i​z​e​ ​(​p​x​)
			 */
			ReferenceSize: string
			/**
			 * O​n​ ​v​a​l​u​e
			 */
			OnValue: string
			/**
			 * S​y​m​b​o​l​ ​t​y​p​e
			 */
			SymbolType: string
			SymbolTypes: {
				/**
				 * C​i​r​c​l​e
				 */
				Circle: string
				/**
				 * S​q​u​a​r​e
				 */
				Square: string
			}
			/**
			 * A​v​o​i​d​ ​o​v​e​r​l​a​p​p​i​n​g​ ​s​y​m​b​o​l​s
			 */
			AvoidOverlapping: string
			/**
			 * O​n​e​ ​c​o​l​o​r
			 */
			SingleColor: string
			/**
			 * T​w​o​ ​c​o​l​o​r​s
			 */
			TwoColor: string
			/**
			 * L​i​m​i​t​ ​v​a​l​u​e
			 */
			LimitValue: string
		}
	}
	ExportSection: {
		/**
		 * S​e​l​e​c​t​ ​a​ ​l​a​y​e​r
		 */
		SelectLayers: string
		/**
		 * S​e​l​e​c​t​ ​a​ ​f​o​r​m​a​t
		 */
		SelectFormat: string
		/**
		 * S​e​l​e​c​t​ ​a​ ​C​R​S
		 */
		SelectCRS: string
		/**
		 * L​a​y​e​r​s
		 */
		Layers: string
		/**
		 * E​x​p​o​r​t
		 */
		Export: string
		/**
		 * E​x​p​o​r​t​ ​a​s​ ​P​N​G
		 */
		ExportPng: string
		/**
		 * E​x​p​o​r​t​ ​a​s​ ​S​V​G
		 */
		ExportSvg: string
		/**
		 * C​u​s​t​o​m​ ​C​R​S
		 */
		CustomCRS: string
	}
	LayerSettings: {
		/**
		 * L​a​y​e​r​ ​s​e​t​t​i​n​g​s
		 */
		LayerSettings: string
		/**
		 * N​a​m​e
		 */
		Name: string
		/**
		 * F​i​l​l​ ​c​o​l​o​r
		 */
		FillColor: string
		/**
		 * S​t​r​o​k​e​ ​c​o​l​o​r
		 */
		StrokeColor: string
		/**
		 * F​i​l​l​ ​o​p​a​c​i​t​y
		 */
		FillOpacity: string
		/**
		 * S​t​r​o​k​e​ ​o​p​a​c​i​t​y
		 */
		StrokeOpacity: string
		/**
		 * S​t​r​o​k​e​ ​w​i​d​t​h
		 */
		StrokeWidth: string
		/**
		 * P​o​i​n​t​ ​r​a​d​i​u​s
		 */
		PointRadius: string
		/**
		 * A​d​d​ ​a​ ​s​h​a​d​o​w
		 */
		DropShadow: string
	}
	DataTable: {
		/**
		 * A​t​t​r​i​b​u​t​e​ ​t​a​b​l​e
		 */
		titleGeo: string
		/**
		 * D​a​t​a​ ​t​a​b​l​e
		 */
		titleTabular: string
		/**
		 * {​{​O​n​e​ ​f​e​a​t​u​r​e​|​?​?​ ​f​e​a​t​u​r​e​s​}​}
		 */
		Features: string
		/**
		 * {​{​O​n​e​ ​c​o​l​u​m​n​|​?​?​ ​c​o​l​u​m​n​s​}​}
		 */
		Columns: string
		/**
		 * E​x​p​o​r​t​ ​a​s​ ​C​S​V​.​.​.
		 */
		ExportCsv: string
		/**
		 * N​e​w​ ​c​o​l​u​m​n​.​.​.
		 */
		NewColumn: string
		NewColumnModal: {
			/**
			 * N​e​w​ ​c​o​l​u​m​n
			 */
			title: string
		}
	}
	FieldsTyping: {
		/**
		 * F​i​e​l​d​s​ ​t​y​p​i​n​g
		 */
		ModalTitle: string
		/**
		 * F​i​e​l​d​ ​n​a​m​e
		 */
		FieldName: string
		/**
		 * F​i​e​l​d​ ​t​y​p​e
		 */
		FieldType: string
		VariableTypes: {
			/**
			 * I​d​e​n​t​i​f​i​e​r
			 */
			identifier: string
			/**
			 * R​a​t​i​o
			 */
			ratio: string
			/**
			 * S​t​o​c​k
			 */
			stock: string
			/**
			 * C​a​t​e​g​o​r​i​c​a​l
			 */
			categorical: string
			/**
			 * U​n​k​n​o​w​n
			 */
			unknown: string
		}
	}
	ClassificationPanel: {
		/**
		 * C​l​a​s​s​i​f​i​c​a​t​i​o​n
		 */
		title: string
		/**
		 * B​o​x
		 */
		box: string
		/**
		 * H​i​s​t​o​g​r​a​m
		 */
		histogram: string
		/**
		 * B​e​e​s​w​a​r​m
		 */
		beeswarm: string
		/**
		 * D​o​t​ ​h​i​s​t​o​g​r​a​m
		 */
		dotHistogram: string
		/**
		 * H​i​s​t​o​g​r​a​m​ ​a​n​d​ ​d​e​n​s​i​t​y
		 */
		histogramAndDensity: string
		/**
		 * V​a​l​u​e​s​ ​d​i​s​t​r​i​b​u​t​i​o​n
		 */
		distribution: string
		/**
		 * S​u​m​m​a​r​y
		 */
		summary: string
		/**
		 * P​o​p​u​l​a​t​i​o​n​ ​(​n​o​n​-​n​u​l​l​ ​v​a​l​u​e​s​)
		 */
		population: string
		/**
		 * M​i​n​i​m​u​m
		 */
		minimum: string
		/**
		 * M​a​x​i​m​u​m
		 */
		maximum: string
		/**
		 * M​e​a​n
		 */
		mean: string
		/**
		 * M​e​d​i​a​n
		 */
		median: string
		/**
		 * S​t​a​n​d​a​r​d​ ​d​e​v​i​a​t​i​o​n
		 */
		standardDeviation: string
		/**
		 * V​a​r​i​a​n​c​e
		 */
		variance: string
		/**
		 * V​a​r​i​a​n​c​e​ ​c​o​e​f​f​i​c​i​e​n​t
		 */
		varianceCoefficient: string
		/**
		 * S​k​e​w​n​e​s​s
		 */
		skewness: string
		/**
		 * C​l​a​s​s​i​f​i​c​a​t​i​o​n
		 */
		classification: string
		/**
		 * C​l​a​s​s​i​f​i​c​a​t​i​o​n​ ​m​e​t​h​o​d
		 */
		classificationMethod: string
		classificationMethods: {
			/**
			 * E​q​u​a​l​ ​i​n​t​e​r​v​a​l​s
			 */
			equalInterval: string
			/**
			 * Q​u​a​n​t​i​l​e​s
			 */
			quantiles: string
			/**
			 * J​e​n​k​s
			 */
			jenks: string
			/**
			 * S​t​a​n​d​a​r​d​ ​d​e​v​i​a​t​i​o​n
			 */
			standardDeviation: string
			/**
			 * Q​6
			 */
			q6: string
			/**
			 * P​r​e​t​t​y
			 */
			pretty: string
			/**
			 * G​e​o​m​e​t​r​i​c​ ​p​r​o​g​r​e​s​s​i​o​n
			 */
			geometricProgression: string
			/**
			 * A​r​i​t​h​m​e​t​i​c​ ​p​r​o​g​r​e​s​s​i​o​n
			 */
			arithmeticProgression: string
			/**
			 * H​e​a​d​/​t​a​i​l
			 */
			headTail: string
			/**
			 * M​a​n​u​a​l
			 */
			manual: string
		}
		/**
		 * N​u​m​b​e​r​ ​o​f​ ​c​l​a​s​s​e​s
		 */
		numberOfClasses: string
		/**
		 * M​e​a​n​ ​v​a​l​u​e​ ​p​o​s​i​t​i​o​n
		 */
		meanPosition: string
		/**
		 * C​l​a​s​s​ ​c​e​n​t​e​r
		 */
		meanPositionCenter: string
		/**
		 * C​l​a​s​s​ ​b​o​u​n​d​a​r​y
		 */
		meanPositionBoundary: string
		/**
		 * A​m​p​l​i​t​u​d​e
		 */
		amplitude: string
		/**
		 * s​t​a​n​d​a​r​d​ ​d​e​v​i​a​t​i​o​n​s
		 */
		howManyStdDev: string
		/**
		 * L​o​g​a​r​i​t​h​m​i​c​ ​s​c​a​l​e
		 */
		logarithmicScale: string
		/**
		 * E​n​t​e​r​ ​c​l​a​s​s​ ​l​i​m​i​t​s
		 */
		breaksInput: string
		/**
		 * V​a​l​i​d​a​t​e
		 */
		validate: string
		/**
		 * {​{​O​n​e​ ​f​e​a​t​u​r​e​ ​w​i​t​h​o​u​t​ ​d​a​t​a​|​?​?​ ​f​e​a​t​u​r​e​ ​w​i​t​h​o​u​t​ ​d​a​t​a​}​}
		 */
		missingValues: string
	}
}

export type TranslationFunctions = {
	/**
	 * Start Application
	 */
	StartApplication: () => LocalizedString
	/**
	 * Confirm
	 */
	SuccessButton: () => LocalizedString
	/**
	 * Cancel
	 */
	CancelButton: () => LocalizedString
	/**
	 * Drop your file(s) here !
	 */
	DropFilesHere: () => LocalizedString
	/**
	 * Supported vector formats are: ESRI Shapefile (.shp, .shx, .dbf, .prf, .cpg), GeoJSON (.json ou .geojson), TopoJSON (.topojson ou .json), GML (.gml) and KML (.kml).
	 */
	SupportedVectorFormats: () => LocalizedString
	/**
	 * Supported tabular formats are: Excel (.xls, .xlsx), CSV (.csv) and OpenDocument Spreadsheet (.ods).
	 */
	SupportedTabularFormats: () => LocalizedString
	/**
	 * Unsupported format
	 */
	UnsupportedFormat: () => LocalizedString
	/**
	 * {{One file detected|?? files detected}}
	 */
	FilesDetected: (arg0: number | string | boolean) => LocalizedString
	/**
	 * Import file(s)
	 */
	ImportFiles: () => LocalizedString
	Alerts: {
		/**
		 * Delete layer
		 */
		DeleteLayer: () => LocalizedString
		/**
		 * Save changes ?
		 */
		SaveEditedData: () => LocalizedString
		/**
		 * A project was automatically saved when the page was closed on {0}. Reload this project ?
		 */
		ReloadLastProject: (arg0: unknown) => LocalizedString
	}
	HeaderApp: {
		/**
		 * Night / Day mode
		 */
		NightDayMode: () => LocalizedString
		/**
		 * Import a Magrit project
		 */
		ImportProjet: () => LocalizedString
		/**
		 * Save project
		 */
		SaveProject: () => LocalizedString
		/**
		 * About Magrit
		 */
		About: () => LocalizedString
		/**
		 * Language selection
		 */
		Language: () => LocalizedString
	}
	Pagination: {
		/**
		 * Next
		 */
		Next: () => LocalizedString
		/**
		 * Previous
		 */
		Previous: () => LocalizedString
	}
	DatasetCatalog: {
		/**
		 * Dataset catalog
		 */
		title: () => LocalizedString
		/**
		 * Search a dataset...
		 */
		placeholderSearchBar: () => LocalizedString
		/**
		 * Search
		 */
		searchButton: () => LocalizedString
		/**
		 * About
		 */
		about: () => LocalizedString
		/**
		 * Description
		 */
		description: () => LocalizedString
		/**
		 * Preview
		 */
		preview: () => LocalizedString
		/**
		 * License
		 */
		license: () => LocalizedString
		/**
		 * Type
		 */
		type: () => LocalizedString
		/**
		 * Provider
		 */
		provider: () => LocalizedString
		/**
		 * Attributions
		 */
		attributions: () => LocalizedString
		/**
		 * Date
		 */
		date: () => LocalizedString
		/**
		 * Source
		 */
		source: () => LocalizedString
		/**
		 * Select a dataset to see its details.
		 */
		placeholderDatasetDetail: () => LocalizedString
		/**
		 * No dataset matches your search.
		 */
		noSearchResult: () => LocalizedString
		/**
		 * Dataset preview
		 */
		altDatasetPreview: () => LocalizedString
		/**
		 * Add to map
		 */
		confirmButton: () => LocalizedString
		/**
		 * Cancel
		 */
		cancelButton: () => LocalizedString
	}
	LeftMenu: {
		/**
		 * Data import
		 */
		Import: () => LocalizedString
		/**
		 * Map configuration
		 */
		MapConfiguration: () => LocalizedString
		/**
		 * Layer manager
		 */
		LayerManager: () => LocalizedString
		/**
		 * Representation choice
		 */
		RepresentationChoice: () => LocalizedString
		/**
		 * Map and data export
		 */
		ExportSection: () => LocalizedString
		/**
		 * Page layout and skin elements
		 */
		LayoutFeatures: () => LocalizedString
	}
	ImportSection: {
		/**
		 * Open geospatial file...
		 */
		OpenGeospatialFile: () => LocalizedString
		/**
		 * Open tabular file...
		 */
		OpenTabularFile: () => LocalizedString
		/**
		 * Example datasets
		 */
		ExampleDatasets: () => LocalizedString
	}
	MapConfiguration: {
		/**
		 * Dimensions
		 */
		Dimensions: () => LocalizedString
		/**
		 * Width
		 */
		Width: () => LocalizedString
		/**
		 * Height
		 */
		Height: () => LocalizedString
		/**
		 * Projection
		 */
		Projection: () => LocalizedString
		/**
		 * More projections
		 */
		MoreProjection: () => LocalizedString
		/**
		 * Custom projection
		 */
		CustomProjection: () => LocalizedString
		/**
		 * Lock zoom / position
		 */
		LockZoom: () => LocalizedString
	}
	LayoutFeaturesSection: {
	}
	AboutPanel: {
		/**
		 * About Magrit
		 */
		title: () => LocalizedString
		/**
		 * Magrit is a web application for the visualization and the analysis of geospatial data. It is developed by the UAR RIATE (CNRS, Université Paris Cité).
		 */
		description: () => LocalizedString
		/**
		 * Useful links:
		 */
		usefulLinks: () => LocalizedString
		/**
		 * UAR RIATE
		 */
		UarRiate: () => LocalizedString
		/**
		 * GitHub project page
		 */
		linkGithub: () => LocalizedString
		/**
		 * GitHub issues
		 */
		linkGithubIssues: () => LocalizedString
		/**
		 * Documentation
		 */
		documentation: () => LocalizedString
	}
	LayerManager: {
		/**
		 * Point layer
		 */
		point: () => LocalizedString
		/**
		 * Line layer
		 */
		linestring: () => LocalizedString
		/**
		 * Polygon layer
		 */
		polygon: () => LocalizedString
		/**
		 * Raster layer
		 */
		raster: () => LocalizedString
		/**
		 * Data table
		 */
		table: () => LocalizedString
		/**
		 * Remove layer
		 */
		Delete: () => LocalizedString
		/**
		 * Attribute table
		 */
		AttributeTable: () => LocalizedString
		/**
		 * Zoom on layer
		 */
		FitZoom: () => LocalizedString
		/**
		 * Toggle visibility
		 */
		ToggleVisibility: () => LocalizedString
		/**
		 * Settings
		 */
		Settings: () => LocalizedString
		/**
		 * Fields typing
		 */
		Typing: () => LocalizedString
	}
	PortrayalSection: {
		PortrayalTypes: {
			/**
			 * Choropleth
			 */
			Choropleth: () => LocalizedString
			/**
			 * Proportional symbols
			 */
			ProportionalSymbols: () => LocalizedString
			/**
			 * No portrayal for the selected layer - Please verify the typing of the fields or select another layer
			 */
			NoPortrayal: () => LocalizedString
		}
		/**
		 * Representation choice
		 */
		RepresentationChoice: () => LocalizedString
		/**
		 * Target layer
		 */
		TargetLayer: () => LocalizedString
		/**
		 * Create layer
		 */
		CreateLayer: () => LocalizedString
		/**
		 * Result name
		 */
		ResultName: () => LocalizedString
		/**
		 * Type the name of the layer to create
		 */
		ResultNamePlaceholder: () => LocalizedString
		/**
		 * New_layer
		 */
		NewLayer: () => LocalizedString
		CommonOptions: {
			/**
			 * Variable
			 */
			Variable: () => LocalizedString
			/**
			 * Color
			 */
			Color: () => LocalizedString
		}
		ChoroplethOptions: {
			/**
			 * Choropleth
			 */
			Choropleth: () => LocalizedString
			/**
			 * Classification
			 */
			Classification: () => LocalizedString
			/**
			 * Color scheme
			 */
			ColorScheme: () => LocalizedString
			/**
			 * Invert color scheme
			 */
			ColorSchemeInvert: () => LocalizedString
			/**
			 * {{One class|?? classes}}
			 */
			CurrentNumberOfClasses: (arg0: number | string | boolean) => LocalizedString
		}
		ProportionalSymbolsOptions: {
			/**
			 * Reference size (px)
			 */
			ReferenceSize: () => LocalizedString
			/**
			 * On value
			 */
			OnValue: () => LocalizedString
			/**
			 * Symbol type
			 */
			SymbolType: () => LocalizedString
			SymbolTypes: {
				/**
				 * Circle
				 */
				Circle: () => LocalizedString
				/**
				 * Square
				 */
				Square: () => LocalizedString
			}
			/**
			 * Avoid overlapping symbols
			 */
			AvoidOverlapping: () => LocalizedString
			/**
			 * One color
			 */
			SingleColor: () => LocalizedString
			/**
			 * Two colors
			 */
			TwoColor: () => LocalizedString
			/**
			 * Limit value
			 */
			LimitValue: () => LocalizedString
		}
	}
	ExportSection: {
		/**
		 * Select a layer
		 */
		SelectLayers: () => LocalizedString
		/**
		 * Select a format
		 */
		SelectFormat: () => LocalizedString
		/**
		 * Select a CRS
		 */
		SelectCRS: () => LocalizedString
		/**
		 * Layers
		 */
		Layers: () => LocalizedString
		/**
		 * Export
		 */
		Export: () => LocalizedString
		/**
		 * Export as PNG
		 */
		ExportPng: () => LocalizedString
		/**
		 * Export as SVG
		 */
		ExportSvg: () => LocalizedString
		/**
		 * Custom CRS
		 */
		CustomCRS: () => LocalizedString
	}
	LayerSettings: {
		/**
		 * Layer settings
		 */
		LayerSettings: () => LocalizedString
		/**
		 * Name
		 */
		Name: () => LocalizedString
		/**
		 * Fill color
		 */
		FillColor: () => LocalizedString
		/**
		 * Stroke color
		 */
		StrokeColor: () => LocalizedString
		/**
		 * Fill opacity
		 */
		FillOpacity: () => LocalizedString
		/**
		 * Stroke opacity
		 */
		StrokeOpacity: () => LocalizedString
		/**
		 * Stroke width
		 */
		StrokeWidth: () => LocalizedString
		/**
		 * Point radius
		 */
		PointRadius: () => LocalizedString
		/**
		 * Add a shadow
		 */
		DropShadow: () => LocalizedString
	}
	DataTable: {
		/**
		 * Attribute table
		 */
		titleGeo: () => LocalizedString
		/**
		 * Data table
		 */
		titleTabular: () => LocalizedString
		/**
		 * {{One feature|?? features}}
		 */
		Features: (arg0: number | string | boolean) => LocalizedString
		/**
		 * {{One column|?? columns}}
		 */
		Columns: (arg0: number | string | boolean) => LocalizedString
		/**
		 * Export as CSV...
		 */
		ExportCsv: () => LocalizedString
		/**
		 * New column...
		 */
		NewColumn: () => LocalizedString
		NewColumnModal: {
			/**
			 * New column
			 */
			title: () => LocalizedString
		}
	}
	FieldsTyping: {
		/**
		 * Fields typing
		 */
		ModalTitle: () => LocalizedString
		/**
		 * Field name
		 */
		FieldName: () => LocalizedString
		/**
		 * Field type
		 */
		FieldType: () => LocalizedString
		VariableTypes: {
			/**
			 * Identifier
			 */
			identifier: () => LocalizedString
			/**
			 * Ratio
			 */
			ratio: () => LocalizedString
			/**
			 * Stock
			 */
			stock: () => LocalizedString
			/**
			 * Categorical
			 */
			categorical: () => LocalizedString
			/**
			 * Unknown
			 */
			unknown: () => LocalizedString
		}
	}
	ClassificationPanel: {
		/**
		 * Classification
		 */
		title: () => LocalizedString
		/**
		 * Box
		 */
		box: () => LocalizedString
		/**
		 * Histogram
		 */
		histogram: () => LocalizedString
		/**
		 * Beeswarm
		 */
		beeswarm: () => LocalizedString
		/**
		 * Dot histogram
		 */
		dotHistogram: () => LocalizedString
		/**
		 * Histogram and density
		 */
		histogramAndDensity: () => LocalizedString
		/**
		 * Values distribution
		 */
		distribution: () => LocalizedString
		/**
		 * Summary
		 */
		summary: () => LocalizedString
		/**
		 * Population (non-null values)
		 */
		population: () => LocalizedString
		/**
		 * Minimum
		 */
		minimum: () => LocalizedString
		/**
		 * Maximum
		 */
		maximum: () => LocalizedString
		/**
		 * Mean
		 */
		mean: () => LocalizedString
		/**
		 * Median
		 */
		median: () => LocalizedString
		/**
		 * Standard deviation
		 */
		standardDeviation: () => LocalizedString
		/**
		 * Variance
		 */
		variance: () => LocalizedString
		/**
		 * Variance coefficient
		 */
		varianceCoefficient: () => LocalizedString
		/**
		 * Skewness
		 */
		skewness: () => LocalizedString
		/**
		 * Classification
		 */
		classification: () => LocalizedString
		/**
		 * Classification method
		 */
		classificationMethod: () => LocalizedString
		classificationMethods: {
			/**
			 * Equal intervals
			 */
			equalInterval: () => LocalizedString
			/**
			 * Quantiles
			 */
			quantiles: () => LocalizedString
			/**
			 * Jenks
			 */
			jenks: () => LocalizedString
			/**
			 * Standard deviation
			 */
			standardDeviation: () => LocalizedString
			/**
			 * Q6
			 */
			q6: () => LocalizedString
			/**
			 * Pretty
			 */
			pretty: () => LocalizedString
			/**
			 * Geometric progression
			 */
			geometricProgression: () => LocalizedString
			/**
			 * Arithmetic progression
			 */
			arithmeticProgression: () => LocalizedString
			/**
			 * Head/tail
			 */
			headTail: () => LocalizedString
			/**
			 * Manual
			 */
			manual: () => LocalizedString
		}
		/**
		 * Number of classes
		 */
		numberOfClasses: () => LocalizedString
		/**
		 * Mean value position
		 */
		meanPosition: () => LocalizedString
		/**
		 * Class center
		 */
		meanPositionCenter: () => LocalizedString
		/**
		 * Class boundary
		 */
		meanPositionBoundary: () => LocalizedString
		/**
		 * Amplitude
		 */
		amplitude: () => LocalizedString
		/**
		 * standard deviations
		 */
		howManyStdDev: () => LocalizedString
		/**
		 * Logarithmic scale
		 */
		logarithmicScale: () => LocalizedString
		/**
		 * Enter class limits
		 */
		breaksInput: () => LocalizedString
		/**
		 * Validate
		 */
		validate: () => LocalizedString
		/**
		 * {{One feature without data|?? feature without data}}
		 */
		missingValues: (arg0: number | string | boolean) => LocalizedString
	}
}

export type Formatters = {}
