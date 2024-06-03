// Import from solid-js
import type { JSX } from 'solid-js';
import { createSignal, For, Show } from 'solid-js';
import { produce } from 'solid-js/store';

// Imports from other packages
import { getPalette } from 'dicopal';
import { yieldOrContinue } from 'main-thread-scheduling';
import * as Plot from '@observablehq/plot';
import toast from 'solid-toast';
import { bbox } from '@turf/turf';

// Stores
import { applicationSettingsStore } from '../../store/ApplicationSettingsStore';
import { setLoading } from '../../store/GlobalStore';
import {
  layersDescriptionStore,
  LayersDescriptionStoreType,
  setLayersDescriptionStore,
} from '../../store/LayersDescriptionStore';
import { setFunctionalitySelectionStore } from '../../store/FunctionalitySelectionStore';

// Helper
import { useI18nContext } from '../../i18n/i18n-solid';
import { parseUserDefinedBreaks, prepareStatisticalSummary } from '../../helpers/classification';
import { getPaletteWrapper } from '../../helpers/color';
import { findSuitableName } from '../../helpers/common';
import { intersectionLayer } from '../../helpers/geos';
import { computeAppropriateResolution } from '../../helpers/geo';
import { generateIdLayer } from '../../helpers/layers';
import { generateIdLegend } from '../../helpers/legends';
import { Mpow } from '../../helpers/math';
import {
  computeKdeValues, computeStewartValues, makeContourLayer,
} from '../../helpers/smoothing';
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
  type GeoJSONFeatureCollection,
  type GridParameters,
  KdeKernel,
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
  smoothingMethod: SmoothingMethod,
  gridParams: GridParameters,
  parameters: StewartParameters | KdeParameters,
  thresholds: number[],
  computedValues: { grid: GeoJSONFeatureCollection, values: number[] },
  clippingLayerId: string,
) {
  const referenceLayerDescription = layersDescriptionStore.layers
    .find((l) => l.id === referenceLayerId);

  if (referenceLayerDescription === undefined) {
    throw new Error('Unexpected Error: Reference layer not found');
  }

  const contours = await makeContourLayer(
    computedValues.grid,
    thresholds,
    targetVariable,
  );

  let newData;

  if (clippingLayerId) {
    const clippingLayer = clippingLayerId === referenceLayerId
      ? referenceLayerDescription.data
      : layersDescriptionStore.layers
        .find((l) => l.id === clippingLayerId)!.data;

    newData = await intersectionLayer(contours, clippingLayer);
  } else {
    newData = contours;
  }

  const rendererParameters = {
    variable: targetVariable,
    method: smoothingMethod,
    smoothingParameters: parameters,
    gridParameters: gridParams,
    breaks: thresholds,
    palette: getPaletteWrapper('Carrots', thresholds.length - 1, true),
  } as SmoothedLayerParameters;

  // Find a position for the legend
  const legendPosition = getPossibleLegendPosition(120, 340);

  // Create a new layer
  const newId = generateIdLayer();

  const newLayerDescription = {
    id: newId,
    // layerId: referenceLayerId,
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
    dropShadow: null,
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
    noDataBox: true,
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

  // The geometry type of the target layer
  const geomType = layerDescription.type;

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
  ] = createSignal<string>(targetFields[0].name);
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
  ] = createSignal(
    LL().FunctionalitiesSection.SmoothingOptions.NewLayerName({
      layerName: layerDescription.name,
    }) as string,
  );

  // Signals for KDE options
  const [
    targetKdeKernelType,
    setTargetKdeKernelType,
  ] = createSignal<KdeKernel>(KdeKernel.Gaussian);
  const [
    targetBandwidth,
    setTargetBandwidth,
  ] = createSignal<number>(+(appropriateResolution * 2.25).toPrecision(2));

  // Signals for Stewart options
  const [
    targetStewartKernelType,
    setTargetStewartKernelType,
  ] = createSignal<'Gaussian' | 'Pareto'>('Gaussian');
  const [
    targetSpan,
    setTargetSpan,
  ] = createSignal<number>(+(appropriateResolution * 2.25).toPrecision(2));
  const [
    targetBeta,
    setTargetBeta,
  ] = createSignal<number>(2);

  // Signals for the intermediate results:
  const [
    isLoading,
    setIsLoading,
  ] = createSignal<boolean>(false);
  // Parameters used to compute the intermediate results
  const [
    currentParameters,
    setCurrentParameters,
  ] = createSignal<{ grid: GridParameters, smoothing: KdeParameters | StewartParameters } | null>(
    null,
  );
  // Statistical summary of the computed values
  const [
    seriesSummary,
    setSeriesSummary,
  ] = createSignal<ReturnType<typeof prepareStatisticalSummary> | null>(null);
  // Computed values
  const [
    computedValues,
    setComputedValues,
  ] = createSignal<{ grid: GeoJSONFeatureCollection, values: number[] } | null>(null);
  // Thresholds, computed from the values first but maybe changed by the user
  const [
    thresholds,
    setThresholds,
  ] = createSignal<number[] | null>(null);

  // Clipping layer
  // (if the target layer is a point layer, it defaults to "none" but the user can
  // choose any polygon layer ; if the target layer is a polygon layer, it defaults
  // to the target layer and the user can't change it)
  const [
    clippingLayer,
    setClippingLayer,
  ] = createSignal<string>(geomType === 'point' ? '' : layerDescription.id);

  const makePortrayal = async () => {
    const layerName = findSuitableName(
      newLayerName() || LL().FunctionalitiesSection.NewLayer(),
      layersDescriptionStore.layers.map((l) => l.name),
    );

    // Close the current modal
    setFunctionalitySelectionStore({ show: false, id: '', type: '' });

    // Display loading overlay
    setLoading(true);

    await yieldOrContinue('smooth');

    // Actually make the new layer
    setTimeout(() => {
      onClickValidate(
        layerDescription.id,
        layerName,
        targetVariable(),
        targetSmoothingMethod(),
        currentParameters()!.grid,
        currentParameters()!.smoothing,
        thresholds()!,
        computedValues()!,
        clippingLayer(),
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
      label={LL().FunctionalitiesSection.CommonOptions.Variable()}
      onChange={(v) => {
        setTargetVariable(v);
      }}
      value={targetVariable()}
      disabled={isLoading() || !!computedValues()}
    >
      <For each={targetFields}>
        {(variable) => <option value={variable.name}>{variable.name}</option>}
      </For>
    </InputFieldSelect>
    <InputFieldSelect
      label={LL().FunctionalitiesSection.SmoothingOptions.Type()}
      onChange={(v) => {
        setTargetSmoothingMethod(v as SmoothingMethod);
      }}
      value={targetSmoothingMethod()}
      disabled={isLoading() || !!computedValues()}
    >
      <option value="Stewart">{LL().FunctionalitiesSection.SmoothingOptions.Stewart()}</option>
      <option value="Kde">{LL().FunctionalitiesSection.SmoothingOptions.KDE()}</option>
    </InputFieldSelect>
    <InputFieldNumber
      label={LL().FunctionalitiesSection.SmoothingOptions.Resolution()}
      value={targetResolution()}
      onChange={(v) => setTargetResolution(v)}
      min={0}
      max={1e5}
      step={0.1}
      disabled={isLoading() || !!computedValues()}
    />
    <Show when={targetSmoothingMethod() === SmoothingMethod.Kde}>
      <InputFieldSelect
        label={LL().FunctionalitiesSection.SmoothingOptions.KernelType()}
        onChange={(v) => {
          setTargetKdeKernelType(
            v as KdeKernel,
          );
        }}
        value={targetKdeKernelType()}
        disabled={isLoading() || !!computedValues()}
      >
        <For each={Object.values(KdeKernel)}>
          {
            (kernel) => <option value={kernel}>
              {LL().FunctionalitiesSection.SmoothingOptions[kernel]()}
            </option>
          }
        </For>
      </InputFieldSelect>
      <InputFieldNumber
        label={LL().FunctionalitiesSection.SmoothingOptions.Bandwidth()}
        value={targetBandwidth()}
        onChange={(v) => setTargetBandwidth(v)}
        min={0}
        max={1e5}
        step={1}
        disabled={isLoading() || !!computedValues()}
      />
    </Show>
    <Show when={targetSmoothingMethod() === SmoothingMethod.Stewart}>
      <InputFieldSelect
        label={LL().FunctionalitiesSection.SmoothingOptions.KernelType()}
        onChange={(v) => {
          setTargetStewartKernelType(v as 'Gaussian' | 'Pareto');
        }}
        value={targetStewartKernelType()}
        disabled={isLoading() || !!computedValues()}
      >
        <option value="Gaussian">{LL().FunctionalitiesSection.SmoothingOptions.Gaussian()}</option>
        <option value="Pareto">{LL().FunctionalitiesSection.SmoothingOptions.Pareto()}</option>
      </InputFieldSelect>
      <InputFieldNumber
        label={LL().FunctionalitiesSection.SmoothingOptions.Span()}
        value={targetSpan()}
        onChange={(v) => setTargetSpan(v)}
        min={0}
        max={1e5}
        step={1}
        disabled={isLoading() || !!computedValues()}
      />
      <InputFieldNumber
        label={LL().FunctionalitiesSection.SmoothingOptions.Beta()}
        value={targetBeta()}
        onChange={(v) => setTargetBeta(v)}
        min={0}
        max={10}
        step={1}
        disabled={isLoading() || !!computedValues()}
      />
    </Show>
    <Show when={geomType === 'point'}>
      <InputFieldSelect
        label={LL().FunctionalitiesSection.SmoothingOptions.ClippingLayer()}
        onChange={(v) => { setClippingLayer(v); }}
        value={clippingLayer()}
        disabled={isLoading() || !!computedValues()}
      >
        <option value="">
          {LL().FunctionalitiesSection.CommonOptions.NoneLayer()}
        </option>
        <For each={layersDescriptionStore.layers.filter((d) => d.type === 'polygon')}>
          {(item) => <option value={item.id}>{item.name}</option>}
        </For>
      </InputFieldSelect>
    </Show>
    <Show when={!isLoading() && !computedValues()}>
      <div class="has-text-centered">
        <button
          class="button"
          disabled={
            targetResolution() <= 0
            || (targetSmoothingMethod() === SmoothingMethod.Kde && targetBandwidth() <= 0)
            || (targetSmoothingMethod() === SmoothingMethod.Stewart && targetSpan() <= 0)
          }
          onClick={async () => {
            setIsLoading(true);
            setLoading(true);
            await yieldOrContinue('interactive');
            // If the target layer is a polygon layer, we can use its bbox for the grid,
            // but if the target layer is a point layer, we need to check if the user wants
            // to use a clipping layer ; if so we use its bbox, otherwise we use the bbox
            // of the point layer...
            let bboxForGrid;
            if (geomType === 'polygon') {
              bboxForGrid = bboxLayer;
            } else {
              // TODO: we should either check that the bbox of the clipping layer covers the
              //     bbox of the point layer, or we should only have proposed to the user
              //     clipping layers that cover the point layer...
              bboxForGrid = clippingLayer() === ''
                ? bboxLayer
                : bbox(layersDescriptionStore.layers.find((l) => l.id === clippingLayer())!.data);
            }
            // Parameters for creating the grid of points
            const gp = {
              xMin: bboxForGrid[0],
              yMin: bboxForGrid[1],
              xMax: bboxForGrid[2],
              yMax: bboxForGrid[3],
              resolution: targetResolution(),
            } as GridParameters;

            // Parameters for smoothing the values on the grid
            const smoothingParams = targetSmoothingMethod() === SmoothingMethod.Kde
              ? {
                kernel: targetKdeKernelType(),
                bandwidth: targetBandwidth(),
              } as KdeParameters
              : {
                function: targetStewartKernelType(),
                span: targetSpan(),
                beta: targetBeta(),
                alpha: targetStewartKernelType() === 'Gaussian'
                  ? (
                    0.6931471805
                    / Mpow(targetSpan(), targetBeta())
                  ) : (
                    (Mpow(2.0, 1.0 / targetBeta()) - 1.0) / targetSpan()
                  ),
              } as StewartParameters;

            // Return values from computeKdeValues or computeStewartValues
            let grid;
            let values;

            if (targetSmoothingMethod() === SmoothingMethod.Kde) {
              [grid, values] = await computeKdeValues(
                layerDescription.data,
                layerDescription.type as 'point' | 'polygon',
                targetVariable(),
                gp as GridParameters,
                smoothingParams as KdeParameters,
              );
            } else {
              [grid, values] = await computeStewartValues(
                layerDescription.data,
                layerDescription.type as 'point' | 'polygon',
                targetVariable(),
                gp as GridParameters,
                smoothingParams as StewartParameters,
              );
            }

            const summary = prepareStatisticalSummary(values);

            // Predefined thresholds
            const t = [0, 0.04, 0.1, 0.25, 0.4, 0.55, 0.785, 0.925]
              .map((d) => Math.round(d * summary.maximum));
            t.push(summary.maximum);

            // Store all the computed values and the parameters used to compute the values
            setCurrentParameters({
              grid: gp,
              smoothing: smoothingParams,
            });
            setSeriesSummary(summary);
            setThresholds(t);
            setComputedValues({ grid, values });
            setIsLoading(false);
            setLoading(false);
          }}
        >
          Compute values
        </button>
      </div>
      <div><br /></div>
    </Show>
    <Show when={isLoading()}>
      <progress class="progress is-small is-warning" max="100"></progress>
    </Show>
    <Show when={computedValues()}>
      {
        Plot.plot({
          height: 200,
          y: {
            grid: true,
            label: LL().FunctionalitiesSection.SmoothingOptions.Count(),
          },
          marks: [
            Plot.rectY(
              computedValues()!.values,
              Plot.binX({ y: 'count' }, { x: (d) => d }),
            ),
            Plot.ruleY([0]),
            ...thresholds()!.map((t) => Plot.ruleX([t], { stroke: 'red' })),
          ],
        })
      }
      <div class="field-block">
        <label class="label">
          {LL().FunctionalitiesSection.SmoothingOptions.ThresholdForContours()}
        </label>
        <div class="control">
          <input
            class="input"
            type="text"
            onChange={(v) => {
              try {
                const b = parseUserDefinedBreaks(
                  computedValues()!.values,
                  v.currentTarget.value,
                  seriesSummary()!,
                );
                setThresholds(b);
              } catch (e) {
                toast.error(LL().FunctionalitiesSection.SmoothingOptions.ErrorParsingThreshold());
                setThresholds(thresholds()!);
              }
            }}
            value={thresholds()!.join(' - ')}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </Show>
    <InputResultName
      value={newLayerName()}
      onKeyUp={(value) => {
        setNewLayerName(value);
      }}
      onEnter={makePortrayal}
      disabled={!computedValues()}
    />
    <ButtonValidation
      label={LL().FunctionalitiesSection.CreateLayer()}
      onClick={makePortrayal}
      disabled={!computedValues() || !thresholds()}
    />
  </div>;
}
