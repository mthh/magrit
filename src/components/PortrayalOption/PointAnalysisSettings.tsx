// Import from solid-js
import {
  createEffect,
  createSignal,
  For,
  type JSX,
  on,
  Show,
} from 'solid-js';
import { produce, unwrap } from 'solid-js/store';

// Imports from other packages
import { bbox } from '@turf/turf';
import { quantile } from 'statsbreaks';
import { getPalette } from 'dicopal';

// Stores
import { applicationSettingsStore } from '../../store/ApplicationSettingsStore';
import { setLoading } from '../../store/GlobalStore';
import {
  layersDescriptionStore,
  LayersDescriptionStoreType,
  setLayersDescriptionStore,
} from '../../store/LayersDescriptionStore';
import { mapStore } from '../../store/MapStore';
import { setPortrayalSelectionStore } from '../../store/PortrayalSelectionStore';

// Helper
import { useI18nContext } from '../../i18n/i18n-solid';
import d3 from '../../helpers/d3-custom';
import { descendingKeyAccessor, findSuitableName, getMinimumPrecision } from '../../helpers/common';
import {
  computeAppropriateResolution,
  computeCandidateValuesForSymbolsLegend,
  coordsPointOnFeature,
  PropSizer,
} from '../../helpers/geo';
import { generateIdLayer } from '../../helpers/layers';
import { generateIdLegend } from '../../helpers/legends';
import { Mmax, Mmin } from '../../helpers/math';
import { pointAnalysisOnGrid, pointAnalysisOnLayer } from '../../helpers/point-analysis';
import { getProjectionUnit } from '../../helpers/projection';
import { getPossibleLegendPosition } from '../LegendRenderer/common.tsx';

// Subcomponents
import ButtonValidation from '../Inputs/InputButtonValidation.tsx';
import InputFieldNumber from '../Inputs/InputNumber.tsx';
import InputFieldSelect from '../Inputs/InputSelect.tsx';
import InputResultName from './InputResultName.tsx';
import { openLayerManager } from '../LeftMenu/LeftMenu.tsx';

// Types
import type { PortrayalSettingsProps } from './common';
import {
  type ChoroplethLegend,
  ClassificationMethod,
  ClassificationParameters, CustomPalette,
  type GeoJSONFeatureCollection,
  GridCellShape,
  type GridParameters,
  type LayerDescription,
  LayerDescriptionChoropleth,
  type LayerDescriptionProportionalSymbols,
  type Legend,
  type LegendTextElement,
  LegendType,
  Orientation,
  PointAnalysisMeshType,
  PointAnalysisRatioType,
  PointAnalysisStockType,
  type ProportionalSymbolsLegend,
  ProportionalSymbolsSymbolType,
  RepresentationType,
} from '../../global.d';
import MessageBlock from '../MessageBlock.tsx';

function onClickValidate(
  referenceLayerId: string,
  typeLayerToCreate: 'choropleth' | 'proportionalSymbols',
  computationType: PointAnalysisStockType | PointAnalysisRatioType,
  meshParams: GridParameters & { cellType: GridCellShape } | string,
  targetVariable: string,
  newName: string,
) {
  const referenceLayerDescription = layersDescriptionStore.layers
    .find((l) => l.id === referenceLayerId)!;

  if (referenceLayerDescription === undefined) {
    throw new Error('Unexpected Error: Reference layer not found');
  }

  // FeatureCollection that will store the result
  let resultLayer;
  // Description of fields of the new layer
  let fields;
  // Type of the new field
  const typeField = typeLayerToCreate === 'choropleth' ? 'ratio' : 'stock';

  if (typeof meshParams === 'string') {
    // The user want to analyze the data using an existing polygon layer
    const maskLayerId = meshParams;
    const maskLayer = layersDescriptionStore.layers
      .find((l) => l.id === maskLayerId)!.data;

    resultLayer = pointAnalysisOnLayer(
      referenceLayerDescription.data,
      maskLayer,
      computationType,
      targetVariable,
    );

    fields = referenceLayerDescription.fields.concat([{
      name: computationType,
      type: typeField,
    }]);
  } else {
  // The user want to analyze the data using a grid
    resultLayer = pointAnalysisOnGrid(
      referenceLayerDescription.data,
      meshParams,
      computationType,
      targetVariable,
    );

    fields = [{
      name: computationType,
      type: typeField,
    }];
  }

  // New layer description
  let newLayerDescription: LayerDescription;
  // Corresponding legend description
  let legend: Legend;
  // Id of the layer to create
  const newId = generateIdLayer();

  if (Object.values(PointAnalysisStockType).includes(computationType as never)) {
    // The user want to create a proportional symbol layer,
    // so we need to:
    // - 0. Convert the current polygon layer to a point layer
    let minValue = Infinity;
    let maxValue = -Infinity;
    const newData = JSON.parse(JSON.stringify(resultLayer)) as GeoJSONFeatureCollection;

    newData.features.forEach((feature) => {
      // eslint-disable-next-line no-param-reassign
      feature.geometry = {
        type: 'Point',
        coordinates: coordsPointOnFeature(feature.geometry as never),
      };
      // While we are iterating on the features, we also compute the min and max values
      minValue = Mmin(feature.properties[computationType], minValue);
      maxValue = Mmax(feature.properties[computationType], maxValue);
    });

    // Store the original position of the features (we will need it
    // later if the avoid overlapping option is set
    // to recompute the new position if the user changes the
    // settings of proportional symbols or zoom in/out
    // and also if the user wants to change the position of the
    // symbols manually)
    newData.features.forEach((feature) => {
      // eslint-disable-next-line no-param-reassign
      feature.geometry.originalCoordinates = feature.geometry.coordinates;
    });

    newData.features
      .sort(descendingKeyAccessor((d) => d.properties[computationType]));

    // 1. Prepare the parameters for the proportional symbol layer
    const propSymbolsParameters = {
      variable: computationType,
      symbolType: 'circle' as ProportionalSymbolsSymbolType,
      referenceRadius: 50,
      referenceValue: maxValue,
      avoidOverlapping: false,
      iterations: 100,
      movable: false,
      colorMode: 'singleColor',
      color: '#0aa15d',
    };

    const propSize = new PropSizer(
      propSymbolsParameters.referenceValue,
      propSymbolsParameters.referenceRadius,
      propSymbolsParameters.symbolType,
    );

    const legendValues = computeCandidateValuesForSymbolsLegend(
      minValue,
      maxValue,
      propSize.scale,
      propSize.getValue,
    );

    // Find a position for the legend
    const legendPosition = getPossibleLegendPosition(150, 150);

    newLayerDescription = {
      id: newId,
      name: newName,
      data: newData,
      type: 'point',
      fields,
      renderer: 'proportionalSymbols' as RepresentationType,
      visible: true,
      strokeColor: '#000000',
      strokeWidth: 1,
      strokeOpacity: 1,
      fillColor: propSymbolsParameters.color,
      fillOpacity: 1,
      dropShadow: false,
      blurFilter: false,
      shapeRendering: 'auto',
      rendererParameters: propSymbolsParameters,
    } as LayerDescriptionProportionalSymbols;

    legend = {
      // Legend common part
      id: generateIdLegend(),
      layerId: newId,
      title: {
        text: computationType,
        ...applicationSettingsStore.defaultLegendSettings.title,
      } as LegendTextElement,
      subtitle: {
        text: 'This is a subtitle',
        ...applicationSettingsStore.defaultLegendSettings.subtitle,
      } as LegendTextElement,
      note: {
        text: 'This is a bottom note',
        ...applicationSettingsStore.defaultLegendSettings.note,
      } as LegendTextElement,
      position: legendPosition,
      visible: true,
      roundDecimals: 0,
      backgroundRect: {
        visible: false,
      },
      // Part specific to proportional symbols
      type: LegendType.proportional,
      layout: 'stacked',
      values: legendValues,
      spacing: 5,
      labels: {
        ...applicationSettingsStore.defaultLegendSettings.labels,
      } as LegendTextElement,
      symbolType: propSymbolsParameters.symbolType,
    } as ProportionalSymbolsLegend;
  } else {
    // The user want to create a choropleth layer
    const values = resultLayer.features.map((f) => f.properties[computationType]) as number[];
    console.log(values);
    const nClasses = Mmin(d3.thresholdSturges(values), 9);
    const breaks = quantile(values, { nb: nClasses, precision: null });
    const classification = {
      variable: computationType,
      method: ClassificationMethod.quantiles,
      classes: Mmin(d3.thresholdSturges(values), 9),
      breaks,
      palette: getPalette(
        applicationSettingsStore.defaultColorScheme,
        nClasses,
      ) as unknown as CustomPalette,
      noDataColor: applicationSettingsStore.defaultNoDataColor,
      entitiesByClass: [], // TODO
      reversePalette: false,
    } as ClassificationParameters;

    newLayerDescription = {
      id: newId,
      name: newName,
      type: 'polygon',
      data: resultLayer,
      fields,
      renderer: 'choropleth' as RepresentationType,
      visible: true,
      strokeColor: '#000000',
      strokeWidth: 0.4,
      strokeOpacity: 1,
      fillOpacity: 1,
      dropShadow: false,
      blurFilter: false,
      shapeRendering: referenceLayerDescription.shapeRendering,
      rendererParameters: classification,
    } as LayerDescriptionChoropleth;

    // Find a position for the legend
    const legendPosition = getPossibleLegendPosition(120, 340);

    // How many decimals to display in the legend
    const minPrecision = getMinimumPrecision(classification.breaks);

    legend = {
      // Part common to all legends
      id: generateIdLegend(),
      layerId: newId,
      title: {
        text: computationType,
        ...applicationSettingsStore.defaultLegendSettings.title,
      } as LegendTextElement,
      subtitle: {
        ...applicationSettingsStore.defaultLegendSettings.subtitle,
      } as LegendTextElement,
      note: {
        ...applicationSettingsStore.defaultLegendSettings.note,
      } as LegendTextElement,
      position: legendPosition,
      visible: true,
      roundDecimals: minPrecision < 0 ? 0 : minPrecision,
      backgroundRect: {
        visible: false,
      },
      // Part specific to choropleth
      type: LegendType.choropleth,
      orientation: Orientation.vertical,
      boxWidth: 50,
      boxHeight: 30,
      boxSpacing: 0,
      boxSpacingNoData: 10,
      boxCornerRadius: 0,
      labels: {
        ...applicationSettingsStore.defaultLegendSettings.labels,
      } as LegendTextElement,
      noDataLabel: 'No data',
      stroke: false,
      tick: false,
    } as ChoroplethLegend;
  }

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        draft.layers.push(newLayerDescription);
        draft.layoutFeaturesAndLegends.push(legend);
      },
    ),
  );
}

export default function PointAnalysisSettings(props: PortrayalSettingsProps): JSX.Element {
  const { LL } = useI18nContext();

  // The description of the layer for which we are creating the settings menu
  const layerDescription = layersDescriptionStore.layers
    .find((l) => l.id === props.layerId)!;

  // The fields that are of type stock or ratio
  const targetFields = layerDescription
    .fields.filter((variable) => variable.type === 'stock' || variable.type === 'ratio');

  // All the polygon layer descriptions
  const polygonLayers = layersDescriptionStore.layers
    .filter((l) => l.type === 'polygon')!;

  // The bbox of the layer
  const bboxLayer = bbox(layerDescription.data);

  // The description of the current projection
  const currentProjection = unwrap(mapStore.projection);
  const {
    isGeo,
    unit: distanceUnit,
    toMeter,
  } = getProjectionUnit(currentProjection);

  // Appropriate resolution for the grid in case grid is chosen
  const appropriateResolution = (
    1000 * +(
      computeAppropriateResolution(bboxLayer, 0.1).toPrecision(2))
  ) * toMeter;

  // Signals for the current component:
  const [
    newLayerName,
    setNewLayerName,
  ] = createSignal<string>(`PointAnalysis_${layerDescription.name}`);
  const [
    layerType,
    setLayerType,
  ] = createSignal<RepresentationType.choropleth | RepresentationType.proportionalSymbols>(
    RepresentationType.choropleth,
  );
  const [
    meshType,
    setMeshType,
  ] = createSignal<PointAnalysisMeshType>(PointAnalysisMeshType.Grid);
  const [
    computationType,
    setComputationType,
  ] = createSignal<PointAnalysisStockType | PointAnalysisRatioType>();
  const [
    targetVariable,
    setTargetVariable,
  ] = createSignal<string>('');
  // If mesh type is Polygon Layer:
  const [
    meshLayerToUse,
    setMeshLayerToUse,
  ] = createSignal<string>();
  // If mesh type is Grid:
  const [
    cellType,
    setCellType,
  ] = createSignal<GridCellShape>(GridCellShape.square);
  const [
    targetResolution,
    setTargetResolution,
  ] = createSignal<number>(appropriateResolution);

  const makePortrayal = async () => {
    const layerName = findSuitableName(
      newLayerName() || LL().PortrayalSection.NewLayer(),
      layersDescriptionStore.layers.map((d) => d.name),
    );

    const meshParams: GridParameters & { cellType: GridCellShape } | string = meshType() === 'Grid'
      ? {
        xMin: bboxLayer[0],
        yMin: bboxLayer[1],
        xMax: bboxLayer[2],
        yMax: bboxLayer[3],
        resolution: targetResolution(),
        cellType: cellType(),
      }
      : meshLayerToUse()!;

    // Close the current modal
    setPortrayalSelectionStore({ show: false, layerId: '' });

    // Display loading overlay
    setLoading(true);

    // Create the portrayal
    setTimeout(() => {
      onClickValidate(
        layerDescription.id,
        layerType(),
        computationType()!,
        meshParams,
        targetVariable(),
        layerName,
      );

      setLoading(false);

      openLayerManager();
    }, 0);
  };

  createEffect(
    on(
      () => layerType(),
      () => {
        if (layerType() === RepresentationType.choropleth) {
          setComputationType(PointAnalysisRatioType.Density);
        } else { // layerType() === RepresentationType.proportionalSymbols
          setComputationType(PointAnalysisStockType.Count);
        }
      },
    ),
  );

  createEffect(
    on(
      () => meshType(),
      () => {
        if (meshType() === 'PolygonLayer') {
          setMeshLayerToUse(polygonLayers[0].id);
        }
      },
    ),
  );

  return <div class="portrayal-section__portrayal-options-choropleth">
    <InputFieldSelect
      label={LL().PortrayalSection.PointAnalysisOptions.MapType()}
      onChange={(v) => {
        setLayerType(v as RepresentationType.choropleth | RepresentationType.proportionalSymbols);
      }}
      value={layerType()}
      width={300}
    >
      <option value={RepresentationType.choropleth}>
        {LL().PortrayalSection.PointAnalysisOptions.MapTypeRatio()}
      </option>
      <option value={RepresentationType.proportionalSymbols}>
        {LL().PortrayalSection.PointAnalysisOptions.MapTypeStock()}
      </option>
    </InputFieldSelect>
    <Show when={layerType() === 'proportionalSymbols'}>
      <InputFieldSelect
        label={LL().PortrayalSection.PointAnalysisOptions.ComputationType()}
        onChange={(v) => {
          setComputationType(v as PointAnalysisStockType | PointAnalysisRatioType);
        }}
        value={computationType()!}
      >
        <For each={Object.values(PointAnalysisStockType)}>
          {(v) => <option value={v}>
            {LL().PortrayalSection.PointAnalysisOptions[`ComputationType${v}`]()}
          </option>}
        </For>
      </InputFieldSelect>
    </Show>
    <Show when={layerType() === 'choropleth'}>
      <InputFieldSelect
        label={LL().PortrayalSection.PointAnalysisOptions.ComputationType()}
        onChange={(v) => {
          setComputationType(v as PointAnalysisStockType | PointAnalysisRatioType);
        }}
        value={computationType()!}
      >
        <For each={Object.values(PointAnalysisRatioType)}>
          {(v) => <option value={v}>
            {LL().PortrayalSection.PointAnalysisOptions[`ComputationType${v}`]()}
          </option>}
        </For>
      </InputFieldSelect>
    </Show>
    <Show when={
      computationType() === 'WeightedCount'
      || computationType() === 'WeightedDensity'
      || computationType() === 'Mean'
      || computationType() === 'StandardDeviation'
    }>
      <InputFieldSelect
        label={LL().PortrayalSection.PointAnalysisOptions.VariableToUse()}
        onChange={(v) => { setTargetVariable(v); }}
        value={targetVariable()}
      >
        <option value="" disabled={true}>
          {LL().PortrayalSection.PointAnalysisOptions.VariableToUse()}
        </option>
        <For each={targetFields}>
          {(variable) => <option value={variable.name}>{variable.name}</option>}
        </For>
      </InputFieldSelect>
    </Show>
    <InputFieldSelect
      label={LL().PortrayalSection.PointAnalysisOptions.MeshType()}
      onChange={(v) => { setMeshType(v as PointAnalysisMeshType); }}
      value={meshType()}
    >
      <option value={PointAnalysisMeshType.Grid}>
        {LL().PortrayalSection.PointAnalysisOptions.MeshTypeGrid()}
      </option>
      <option value={PointAnalysisMeshType.PolygonLayer} disabled={polygonLayers.length === 0}>
        {LL().PortrayalSection.PointAnalysisOptions.MeshTypePolygonLayer()}
      </option>
    </InputFieldSelect>
    <Show when={meshType() === PointAnalysisMeshType.PolygonLayer}>
      <InputFieldSelect
        label={LL().PortrayalSection.PointAnalysisOptions.LayerToUse()}
        onChange={(v) => { setMeshLayerToUse(v); }}
        value={meshLayerToUse()}
      >
        <For each={polygonLayers}>
          {(l) => <option value={l.id}>{l.name}</option>}
        </For>
      </InputFieldSelect>
    </Show>
    <Show when={meshType() === PointAnalysisMeshType.Grid}>
      <InputFieldSelect
        label={LL().PortrayalSection.GridOptions.CellShape()}
        onChange={(v) => { setCellType(v as GridCellShape); }}
        value={cellType()}
      >
        <option value="square">{LL().PortrayalSection.GridOptions.CellSquare()}</option>
        <option value="hexagon">{LL().PortrayalSection.GridOptions.CellHexagon()}</option>
        <option value="diamond">{LL().PortrayalSection.GridOptions.CellDiamond()}</option>
        <option value="triangle">{LL().PortrayalSection.GridOptions.CellTriangle()}</option>
      </InputFieldSelect>
      <InputFieldNumber
        label={LL().PortrayalSection.GridOptions.ResolutionWithUnit({ unit: distanceUnit })}
        value={targetResolution()}
        onChange={(value) => setTargetResolution(value)}
        min={0}
        max={500}
        step={0.1}
      />
      <Show when={isGeo}>
        <MessageBlock type={'warning'} useIcon={true}>
          { LL().PortrayalSection.GridOptions.WarningGeo() }
        </MessageBlock>
      </Show>
    </Show>
    <InputResultName
      onKeyUp={(value) => {
        setNewLayerName(value);
      }}
      onEnter={makePortrayal}
    />
    <ButtonValidation
      disabled={false}
      label={ LL().PortrayalSection.CreateLayer() }
      onClick={ makePortrayal }
    />
  </div>;
}
