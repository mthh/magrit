// Import from solid-js
import {
  createSignal,
  For,
  Show,
} from 'solid-js';
import type { JSX } from 'solid-js';
import { produce } from 'solid-js/store';

// Imports from other packages
import { getPalette } from 'dicopal';
import { yieldOrContinue } from 'main-thread-scheduling';
import { bbox } from '@turf/turf';

// Stores
import { applicationSettingsStore } from '../../store/ApplicationSettingsStore';
import { setLoading } from '../../store/GlobalStore';
import {
  layersDescriptionStore,
  LayersDescriptionStoreType,
  setLayersDescriptionStore,
} from '../../store/LayersDescriptionStore';
import { setPortrayalSelectionStore } from '../../store/PortrayalSelectionStore';

// Helper
import { useI18nContext } from '../../i18n/i18n-solid';
import { findSuitableName } from '../../helpers/common';
import { computeAppropriateResolution } from '../../helpers/geo';
import { generateIdLayer } from '../../helpers/layers';
import { generateIdLegend } from '../../helpers/legends';
import { Mpow } from '../../helpers/math';
import { computeKde, computeStewart } from '../../helpers/smoothing';
import { Variable, VariableType } from '../../helpers/typeDetection';
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
  type CustomPalette,
  type GridParameters,
  type KdeParameters,
  type LayerDescriptionSmoothedLayer,
  type LegendTextElement,
  LegendType,
  Orientation,
  RepresentationType,
  type SmoothedLayerParameters,
  SmoothingMethod,
  type StewartParameters,
} from '../../global.d';

async function onClickValidate(
  referenceLayerId: string,
  newName: string,
  targetVariable: string,
  gridParams: GridParameters,
  smoothingMethod: SmoothingMethod,
  parameters: Partial<StewartParameters> | KdeParameters,
) {
  const referenceLayerDescription = layersDescriptionStore.layers
    .find((l) => l.id === referenceLayerId);

  if (referenceLayerDescription === undefined) {
    throw new Error('Unexpected Error: Reference layer not found');
  }

  let newData;
  if (smoothingMethod === SmoothingMethod.Kde) {
    const kdeParams = {
      kernel: (parameters as KdeParameters).kernel,
      bandwidth: (parameters as KdeParameters).bandwidth,
    } as KdeParameters;

    newData = await computeKde(
      referenceLayerDescription.data,
      referenceLayerDescription.type as 'point' | 'polygon',
      targetVariable,
      gridParams,
      kdeParams,
    );
  } else { // smoothingMethod === SmoothingMethod.Stewart
    const fn = (parameters as StewartParameters).function;

    const alpha = fn === 'gaussian'
      ? (
        0.6931471805
        / Mpow(
          (parameters as StewartParameters).span,
          (parameters as StewartParameters).beta,
        )
      ) : (
        (Mpow(
          2.0,
          (1.0 / (parameters as StewartParameters).beta),
        ) - 1.0) / (parameters as StewartParameters).span
      );

    const stewartParams = {
      beta: (parameters as StewartParameters).beta,
      span: (parameters as StewartParameters).span,
      function: fn,
      alpha,
    } as StewartParameters;

    newData = await computeStewart(
      referenceLayerDescription.data,
      referenceLayerDescription.type as 'point' | 'polygon',
      targetVariable,
      gridParams,
      stewartParams,
    );
  }

  const thresholds = newData.features.map((f) => f.properties.min_v)
    .concat([newData.features[newData.features.length - 1].properties.max_v]);

  const rendererParameters = {
    variable: targetVariable,
    method: smoothingMethod,
    smoothingParameters: parameters,
    gridParameters: gridParams,
    breaks: thresholds,
    // TODO: wrap 'getPalette' in a function that returns a CustomPalette
    palette: getPalette('Carrots', thresholds.length - 1) as CustomPalette,
    reversePalette: true,
  } as SmoothedLayerParameters;

  // Find a position for the legend
  const legendPosition = getPossibleLegendPosition(120, 340);

  // Create a new layer
  const newId = generateIdLayer();

  const newLayerDescription = {
    id: newId,
    layerId: referenceLayerId,
    name: newName,
    type: 'polygon',
    renderer: 'smoothed' as RepresentationType,
    data: newData,
    fields: [
      {
        name: 'min_v',
        type: VariableType.stock,
        hasMissingValues: false,
        dataType: 'number',
      } as Variable,
      {
        name: 'center_v',
        type: VariableType.stock,
        hasMissingValues: false,
        dataType: 'number',
      } as Variable,
      {
        name: 'max_v',
        type: VariableType.stock,
        hasMissingValues: false,
        dataType: 'number',
      } as Variable,
      {
        name: targetVariable,
        type: VariableType.stock,
        hasMissingValues: false,
        dataType: 'number',
      },
    ],
    visible: true,
    strokeColor: '#000000',
    strokeWidth: 1,
    strokeOpacity: 1,
    fillColor: '#abcdef',
    fillOpacity: 1,
    dropShadow: false,
    blurFilter: false,
    shapeRendering: 'auto',
    rendererParameters,
  } as LayerDescriptionSmoothedLayer;

  const legend = {
    // Part common to all legends
    id: generateIdLegend(),
    layerId: newId,
    title: {
      text: targetVariable,
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
    roundDecimals: 1,
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

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        draft.layers.push(newLayerDescription);
        draft.layoutFeaturesAndLegends.push(legend);
      },
    ),
  );
}

export default function SmoothingSettings(props: PortrayalSettingsProps): JSX.Element {
  const { LL } = useI18nContext();

  // The description of the layer to be smoothed
  const layerDescription = layersDescriptionStore.layers
    .find((l) => l.id === props.layerId)!;

  // The bbox of the layer to be smoothed
  const bboxLayer = bbox(layerDescription.data);

  // The fields of the layer to be smoothed.
  // We know that we have such fields because otherwise this component would not be rendered.
  const targetFields = layerDescription
    .fields.filter((variable) => (
      variable.type === VariableType.ratio || variable.type === VariableType.stock));

  // Appropriate resolution for the grid
  const appropriateResolution = +(computeAppropriateResolution(bboxLayer, 1).toPrecision(2));

  // Signals for common options
  const [
    targetVariable,
    setTargetVariable,
  ] = createSignal<string>(targetFields![0].name);
  const [
    targetSmoothingMethod,
    setTargetSmoothingMethod,
  ] = createSignal<SmoothingMethod>(SmoothingMethod.Stewart);
  const [
    targetResolution,
    setTargetResolution,
  ] = createSignal<number>(appropriateResolution);
  const [
    newLayerName,
    setNewLayerName,
  ] = createSignal(`Smoothed_${layerDescription.name}`);

  // Signals for KDE options
  const [
    targetKdeKernelType,
    setTargetKdeKernelType,
  ] = createSignal<'gaussian' | 'epanechnikov' | 'quartic' | 'triangular' | 'uniform' | 'biweight'>('gaussian');
  const [
    targetBandwidth,
    setTargetBandwidth,
  ] = createSignal<number>(+(appropriateResolution * 2.25).toPrecision(2));

  // Signals for Stewart options
  const [
    targetStewartKernelType,
    setTargetStewartKernelType,
  ] = createSignal<'gaussian' | 'pareto'>('gaussian');
  const [
    targetSpan,
    setTargetSpan,
  ] = createSignal<number>(+(appropriateResolution * 2.25).toPrecision(2));
  const [
    targetBeta,
    setTargetBeta,
  ] = createSignal<number>(2);

  const makePortrayal = async () => {
    const layerName = findSuitableName(
      newLayerName() || LL().PortrayalSection.NewLayer(),
      layersDescriptionStore.layers.map((l) => l.name),
    );
    const params = targetSmoothingMethod() === SmoothingMethod.Kde
      ? {
        kernel: targetKdeKernelType(),
        bandwidth: targetBandwidth(),
      } as KdeParameters
      : {
        function: targetStewartKernelType(),
        span: targetSpan(),
        beta: targetBeta(),
      } as Partial<StewartParameters>;

    const gridParams = {
      xMin: bboxLayer[0],
      yMin: bboxLayer[1],
      xMax: bboxLayer[2],
      yMax: bboxLayer[3],
      resolution: targetResolution(),
    } as GridParameters;

    // Close the current modal
    setPortrayalSelectionStore({ show: false, layerId: '' });

    // Display loading overlay
    setLoading(true);

    await yieldOrContinue('smooth');

    // Actually make the new layer
    setTimeout(() => {
      onClickValidate(
        layerDescription.id,
        layerName,
        targetVariable(),
        gridParams,
        targetSmoothingMethod(),
        params,
      ).then(() => {
        // Hide loading overlay
        setLoading(false);

        // Open the LayerManager to show the new layer
        openLayerManager();
      });
    }, 0);
  };

  return <div class="portrayal-section__portrayal-options-smoothed">
    <InputFieldSelect
      label={ LL().PortrayalSection.CommonOptions.Variable() }
      onChange={(v) => { setTargetVariable(v); }}
      value={targetVariable()}
    >
      <For each={targetFields}>
        { (variable) => <option value={ variable.name }>{ variable.name }</option> }
      </For>
    </InputFieldSelect>
    <InputFieldSelect
      label={LL().PortrayalSection.SmoothingOptions.Type()}
      onChange={(v) => {
        setTargetSmoothingMethod(v as SmoothingMethod);
      }}
      value={targetSmoothingMethod()}
    >
      <option value="Stewart">{LL().PortrayalSection.SmoothingOptions.Stewart()}</option>
      <option value="Kde">{LL().PortrayalSection.SmoothingOptions.KDE()}</option>
    </InputFieldSelect>
    <InputFieldNumber
      label={LL().PortrayalSection.SmoothingOptions.Resolution()}
      value={targetResolution()}
      onChange={(v) => setTargetResolution(v)}
      min={0}
      max={1e5}
      step={0.1}
    />
    <Show when={targetSmoothingMethod() === SmoothingMethod.Kde}>
      <InputFieldSelect
        label={LL().PortrayalSection.SmoothingOptions.KernelType()}
        onChange={(v) => {
          setTargetKdeKernelType(
            v as 'gaussian' | 'epanechnikov' | 'quartic' | 'triangular' | 'uniform' | 'biweight',
          );
        }}
        value={targetKdeKernelType()}
      >
        <option value="gaussian">{LL().PortrayalSection.SmoothingOptions.Gaussian()}</option>
        <option value="epanechnikov">{LL().PortrayalSection.SmoothingOptions.Epanechnikov()}</option>
        <option value="quartic">{LL().PortrayalSection.SmoothingOptions.Quartic()}</option>
        <option value="triangular">{LL().PortrayalSection.SmoothingOptions.Triangular()}</option>
        <option value="uniform">{LL().PortrayalSection.SmoothingOptions.Uniform()}</option>
        <option value="biweight">{LL().PortrayalSection.SmoothingOptions.Biweight()}</option>
      </InputFieldSelect>
      <InputFieldNumber
        label={LL().PortrayalSection.SmoothingOptions.Bandwidth()}
        value={targetBandwidth()}
        onChange={(v) => setTargetBandwidth(v)}
        min={0}
        max={1e5}
        step={1}
      />
    </Show>
    <Show when={targetSmoothingMethod() === SmoothingMethod.Stewart}>
      <InputFieldSelect
        label={LL().PortrayalSection.SmoothingOptions.KernelType()}
        onChange={(v) => {
          setTargetStewartKernelType(v as 'gaussian' | 'pareto');
        }}
        value={targetStewartKernelType()}
      >
        <option value="gaussian">{LL().PortrayalSection.SmoothingOptions.Gaussian()}</option>
        <option value="pareto">{LL().PortrayalSection.SmoothingOptions.Pareto()}</option>
      </InputFieldSelect>
      <InputFieldNumber
        label={ LL().PortrayalSection.SmoothingOptions.Span() }
        value={targetSpan()}
        onChange={(v) => setTargetSpan(v)}
        min={0}
        max={1e5}
        step={1}
      />
      <InputFieldNumber
        label={LL().PortrayalSection.SmoothingOptions.Beta()}
        value={targetBeta()}
        onChange={(v) => setTargetBeta(v)}
        min={0}
        max={10}
        step={1}
      />
    </Show>
    <InputResultName
      onKeyUp={ (value) => { setNewLayerName(value); }}
      onEnter={makePortrayal}
    />
    <ButtonValidation
      label={ LL().PortrayalSection.CreateLayer() }
      onClick={ makePortrayal }
      disabled={
        targetResolution() <= 0
        || (targetSmoothingMethod() === SmoothingMethod.Kde && targetBandwidth() <= 0)
        || (targetSmoothingMethod() === SmoothingMethod.Stewart && targetSpan() <= 0)
      }
    />
  </div>;
}
