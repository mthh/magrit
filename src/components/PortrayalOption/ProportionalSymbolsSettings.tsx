// Imports from solid-js
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  type JSX,
  Match,
  Show,
  Switch,
} from 'solid-js';
import { produce } from 'solid-js/store';

// Imports from other packages
import { yieldOrContinue } from 'main-thread-scheduling';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';
import { makeCategoriesMap, makeCategoriesMapping } from '../../helpers/categorical-choropleth';
import { randomColorFromCategoricalPalette } from '../../helpers/color';
import {
  descendingKeyAccessor,
  findSuitableName,
  getMinimumPrecision,
  isNumber,
} from '../../helpers/common';
import {
  computeCandidateValuesForSymbolsLegend,
  coordsPointOnFeature,
  makeDorlingDemersSimulation,
  PropSizer,
} from '../../helpers/geo';
import { generateIdLayer } from '../../helpers/layers';
import { max, min } from '../../helpers/math';
import { getPossibleLegendPosition } from '../LegendRenderer/common.tsx';
import { generateIdLegend } from '../../helpers/legends';

// Sub-components
import ButtonValidation from '../Inputs/InputButtonValidation.tsx';
import CollapsibleSection from '../CollapsibleSection.tsx';
import InputFieldCheckbox from '../Inputs/InputCheckbox.tsx';
import InputFieldColor from '../Inputs/InputColor.tsx';
import InputFieldNumber from '../Inputs/InputNumber.tsx';
import InputFieldSelect from '../Inputs/InputSelect.tsx';
import InputResultName from './InputResultName.tsx';
import { openLayerManager } from '../LeftMenu/LeftMenu.tsx';
import { CategoriesCustomisation, CategoriesPlot, CategoriesSummary } from './CategoricalChoroplethComponents.tsx';
import { ChoroplethClassificationSelector } from './ChoroplethComponents.tsx';

// Stores
import { applicationSettingsStore } from '../../store/ApplicationSettingsStore';
import { setLoading } from '../../store/GlobalStore';
import {
  layersDescriptionStore,
  LayersDescriptionStoreType,
  setLayersDescriptionStore,
} from '../../store/LayersDescriptionStore';
import { setPortrayalSelectionStore } from '../../store/PortrayalSelectionStore';

// Types / Interfaces / Enums
import {
  type CategoricalChoroplethLegend,
  type CategoricalChoroplethMapping,
  type CategoricalChoroplethParameters,
  type ChoroplethLegend,
  type ClassificationParameters,
  type GeoJSONFeatureCollection,
  type LayerDescriptionProportionalSymbols,
  type LegendTextElement,
  LegendType,
  Orientation,
  ProportionalSymbolsColorMode,
  type ProportionalSymbolsLegend,
  ProportionalSymbolsSymbolType,
  RepresentationType,
  type VectorType,
} from '../../global.d';
import type { PortrayalSettingsProps } from './common';

function onClickValidate(
  referenceLayerId: string,
  targetVariable: string,
  refSymbolSize: number,
  refValueForSymbolSize: number,
  colorProperties: {
    mode: ProportionalSymbolsColorMode,
    value: string | ClassificationParameters | CategoricalChoroplethParameters,
  },
  newLayerName: string,
  symbolType: ProportionalSymbolsSymbolType,
  extent: [number, number],
  avoidOverlapping: boolean,
) {
  // The layer description of the reference layer
  const referenceLayerDescription = layersDescriptionStore.layers
    .find((l) => l.id === referenceLayerId);

  if (referenceLayerDescription === undefined) {
    throw Error('Unexpected Error: Reference layer not found');
  }

  const propSymbolsParameters = {
    variable: targetVariable,
    symbolType,
    referenceRadius: refSymbolSize,
    referenceValue: refValueForSymbolSize,
    avoidOverlapping,
    iterations: 100,
    movable: false,
    colorMode: colorProperties.mode,
    color: colorProperties.value,
  };

  console.log(propSymbolsParameters);

  // Copy dataset
  const newData = JSON.parse(
    JSON.stringify(
      referenceLayerDescription.data,
    ),
  ) as GeoJSONFeatureCollection;

  if (
    referenceLayerDescription.type === 'polygon'
    || (referenceLayerDescription.type === 'linestring' && symbolType !== ProportionalSymbolsSymbolType.line)
  ) {
    newData.features.forEach((feature) => {
      // eslint-disable-next-line no-param-reassign
      feature.geometry = {
        type: 'Point',
        coordinates: coordsPointOnFeature(feature.geometry as never),
      };
    });
  }

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

  if (avoidOverlapping) {
    if (symbolType !== ProportionalSymbolsSymbolType.line) {
      // Compute the new position if we want to avoid overlapping
      newData.features = makeDorlingDemersSimulation(
        newData.features,
        propSymbolsParameters.variable,
        {
          referenceValue: propSymbolsParameters.referenceValue,
          referenceSize: propSymbolsParameters.referenceRadius,
          symbolType,
        },
        100,
        1,
      );
    } else { // symbolType === ProportionalSymbolsSymbolType.line
      // This should not happen because we don't allow the user to
      // check the "avoid overlapping" checkbox if the symbol type
      // is a line
      throw new Error('No avoid overlapping algorithm for line symbols');
    }
  }

  // Sort the features by descending value of the target variable
  // (so that the biggest symbols are drawn first)
  newData.features
    .sort(descendingKeyAccessor((d) => d.properties[targetVariable]));

  const propSize = new PropSizer(
    propSymbolsParameters.referenceValue,
    propSymbolsParameters.referenceRadius,
    propSymbolsParameters.symbolType,
  );
  const legendValues = computeCandidateValuesForSymbolsLegend(
    extent[0],
    extent[1],
    propSize.scale,
    propSize.getValue,
  );

  // Find a position for the legend
  const legendPosition = getPossibleLegendPosition(150, 150);

  const newId = generateIdLayer();

  const newLayerDescription = {
    id: newId,
    name: newLayerName,
    data: newData,
    type: symbolType === ProportionalSymbolsSymbolType.line ? 'linestring' : 'point',
    fields: referenceLayerDescription.fields,
    renderer: 'proportionalSymbols' as RepresentationType,
    visible: true,
    strokeColor: '#000000',
    strokeWidth: 1,
    strokeOpacity: 1,
    fillColor: colorProperties.mode === 'singleColor'
      ? propSymbolsParameters.color
      : undefined,
    fillOpacity: 1,
    dropShadow: false,
    blurFilter: false,
    shapeRendering: 'auto',
    rendererParameters: propSymbolsParameters,
  } as LayerDescriptionProportionalSymbols;

  const legend = {
    // Legend common part
    id: generateIdLegend(),
    layerId: newId,
    title: {
      text: targetVariable,
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

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        draft.layers.push(newLayerDescription);
        draft.layoutFeaturesAndLegends.push(legend);
      },
    ),
  );

  if (propSymbolsParameters.colorMode === 'ratioVariable') {
    // How many decimals to display in the legend
    const minPrecision = getMinimumPrecision(propSymbolsParameters.color.breaks);

    // Find a position for the legend
    const legendChoroRatioPosition = getPossibleLegendPosition(120, 340);

    const legendChoroRatio = {
      // Part common to all legends
      id: generateIdLegend(),
      layerId: newId,
      title: {
        text: propSymbolsParameters.color.variable,
        ...applicationSettingsStore.defaultLegendSettings.title,
      } as LegendTextElement,
      subtitle: {
        ...applicationSettingsStore.defaultLegendSettings.subtitle,
      } as LegendTextElement,
      note: {
        ...applicationSettingsStore.defaultLegendSettings.note,
      } as LegendTextElement,
      position: legendChoroRatioPosition,
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

    setLayersDescriptionStore(
      produce(
        (draft: LayersDescriptionStoreType) => {
          draft.layoutFeaturesAndLegends.push(legendChoroRatio);
        },
      ),
    );
  } else if (propSymbolsParameters.colorMode === 'categoricalVariable') {
    // Find a position for the legend
    const legendChoroCategoryPosition = getPossibleLegendPosition(120, 340);

    const legendChoroCategory = {
      // Part common to all legends
      id: generateIdLegend(),
      layerId: newId,
      title: {
        text: propSymbolsParameters.color.variable,
        ...applicationSettingsStore.defaultLegendSettings.title,
      } as LegendTextElement,
      subtitle: {
        text: undefined,
        ...applicationSettingsStore.defaultLegendSettings.subtitle,
      },
      note: {
        text: undefined,
        ...applicationSettingsStore.defaultLegendSettings.note,
      },
      position: legendChoroCategoryPosition,
      visible: true,
      roundDecimals: null,
      backgroundRect: {
        visible: false,
      },
      // Part specific to choropleth
      type: LegendType.categoricalChoropleth,
      orientation: Orientation.vertical,
      boxWidth: 45,
      boxHeight: 30,
      boxSpacing: 5,
      boxSpacingNoData: 5,
      boxCornerRadius: 0,
      labels: {
        ...applicationSettingsStore.defaultLegendSettings.labels,
      } as LegendTextElement,
      noDataLabel: 'No data',
      stroke: false,
      tick: false,
    } as CategoricalChoroplethLegend;

    setLayersDescriptionStore(
      produce(
        (draft: LayersDescriptionStoreType) => {
          draft.layoutFeaturesAndLegends.push(legendChoroCategory);
        },
      ),
    );
  }
}

export default function ProportionalSymbolsSettings(
  props: PortrayalSettingsProps,
): JSX.Element {
  const { LL } = useI18nContext();

  const layerDescription = layersDescriptionStore.layers
    .find((l) => l.id === props.layerId)!;

  const geometryType = layerDescription.type as VectorType;

  // The fields of the layer that are of type 'stock'.
  // We know that we have such fields because otherwise this component would not be rendered.
  const targetFields = layerDescription
    .fields.filter((variable) => variable.type === 'stock');

  const targetFieldsRatio = layerDescription
    .fields.filter((variable) => variable.type === 'ratio');

  const targetFieldsCategory = layerDescription
    .fields.filter((variable) => variable.type === 'categorical');
  // if (!targetFields || targetFields.length === 0) {
  //   throw Error('Unexpected Error: No stock field found');
  // }

  const availableColorModes = [ProportionalSymbolsColorMode.singleColor];
  if (targetFieldsCategory.length > 0) {
    availableColorModes.push(ProportionalSymbolsColorMode.categoricalVariable);
  }
  if (targetFieldsRatio.length > 0) {
    availableColorModes.push(ProportionalSymbolsColorMode.ratioVariable);
  }

  const [
    targetVariable,
    setTargetVariable,
  ] = createSignal<string>(targetFields![0].name);

  const [
    targetRatioVariable,
    setTargetRatioVariable,
  ] = createSignal<string | null>(
    targetFieldsRatio.length > 0 ? targetFieldsRatio![0].name : null,
  );

  const [
    targetCategoryVariable,
    setTargetCategoryVariable,
  ] = createSignal<string | null>(
    targetFieldsCategory.length > 0 ? targetFieldsCategory![0].name : null,
  );

  // Reactive variable that contains the values of the target variable
  const values = createMemo(() => layerDescription.data.features
    .map((feature) => feature.properties[targetVariable()])
    .filter((value) => isNumber(value))
    .map((value: any) => +value) as number[]);

  // Reactive variables that contains the min and the max values
  // of the target variable
  const minValues = createMemo(() => min(values()));
  const maxValues = createMemo(() => max(values()));

  // Reactive variable that contains the values of the target ratio variable
  // if any
  const valuesRatio = createMemo(() => (targetRatioVariable()
    ? layerDescription.data.features
      .map((feature) => feature.properties[targetRatioVariable()!])
      .filter((value) => isNumber(value))
      .map((value: any) => +value) as number[]
    : []));

  const [
    newLayerName,
    setNewLayerName,
  ] = createSignal<string>(`ProportionalSymbols_${layerDescription.name}`);
  const [
    symbolType,
    setSymbolType,
  ] = createSignal<ProportionalSymbolsSymbolType>(ProportionalSymbolsSymbolType.circle);
  const [
    refSymbolSize,
    setRefSymbolSize,
  ] = createSignal<number>(50);
  const [
    refValueForSymbolSize,
    setRefValueForSymbolSize,
  ] = createSignal<number>(maxValues());
  const [
    colorMode,
    setColorMode,
  ] = createSignal<ProportionalSymbolsColorMode>(ProportionalSymbolsColorMode.singleColor);
  // Option for singleColor mode
  const [
    color,
    setColor,
  ] = createSignal<string>(randomColorFromCategoricalPalette('Vivid'));
  // Options for ratioVariable mode
  const [
    targetClassification,
    setTargetClassification,
  ] = createSignal<ClassificationParameters>();
  // Options for categoricalVariable mode
  const [
    categoriesMapping,
    setCategoriesMapping,
  ] = createSignal<CategoricalChoroplethMapping[]>(
    targetFieldsCategory
      ? makeCategoriesMapping(
        // eslint-disable-next-line solid/reactivity
        makeCategoriesMap(layerDescription.data.features, targetCategoryVariable()!),
      )
      : [],
  );
  const [
    avoidOverlapping,
    setAvoidOverlapping,
  ] = createSignal<boolean>(false);
  // Options for ratioVariable and categoricalVariable mode
  const [
    displayChartOnMap,
    setDisplayChartOnMap,
  ] = createSignal<boolean>(false);

  // We need to update the value of refValueForSymbolSize when
  // the targetVariable changes (which changes the max value)
  createEffect(() => {
    setRefValueForSymbolSize(maxValues);
  });

  const makePortrayal = async () => {
    console.log('makePortrayal');
    // Compute a suitable name for the new layer
    const layerName = findSuitableName(
      newLayerName() || LL().PortrayalSection.NewLayer(),
      layersDescriptionStore.layers.map((d) => d.name),
    );

    const colorProperties: {
      mode: ProportionalSymbolsColorMode,
      value: string | ClassificationParameters | CategoricalChoroplethParameters,
    } = {
      mode: colorMode(),
      value: '',
    };

    switch (colorMode()) {
      case ProportionalSymbolsColorMode.singleColor:
        colorProperties.value = color();
        break;
      case ProportionalSymbolsColorMode.ratioVariable:
        colorProperties.value = targetClassification()!;
        break;
      case ProportionalSymbolsColorMode.categoricalVariable:
        colorProperties.value = {
          variable: targetCategoryVariable(),
          noDataColor: '#ffffff',
          mapping: categoriesMapping(),
        } as CategoricalChoroplethParameters;
        break;
      default:
        throw Error('This should not happen');
    }

    // Close the current modal
    setPortrayalSelectionStore({ show: false, layerId: '' });

    // Display loading overlay
    setLoading(true);

    await yieldOrContinue('smooth');

    // Actually make the new layer
    setTimeout(() => {
      onClickValidate(
        layerDescription.id,
        targetVariable(),
        refSymbolSize(),
        refValueForSymbolSize(),
        colorProperties,
        layerName,
        symbolType(),
        [minValues(), maxValues()],
        avoidOverlapping(),
      );
      // Remove overlay
      setLoading(false);

      // Open the LayerManager to show the new layer
      openLayerManager();
    }, 0);
  };

  return <div class="portrayal-section__portrayal-options-proportional-symbols">
    <InputFieldSelect
      label={ LL().PortrayalSection.CommonOptions.Variable() }
      onChange={(value) => { setTargetVariable(value); }}
      value={ targetVariable() }
    >
      <For each={targetFields}>
        { (variable) => <option value={ variable.name }>{ variable.name }</option> }
      </For>
    </InputFieldSelect>
    <InputFieldSelect
      label={ LL().PortrayalSection.ProportionalSymbolsOptions.SymbolType() }
      onChange={(value) => { setSymbolType(value as ProportionalSymbolsSymbolType); }}
      value={ symbolType() }
    >
      <For each={
        // For points and polygons we allow circle and square
        // For linestrings we allow circle, square and line
        Object.values(ProportionalSymbolsSymbolType)
          .filter((st) => (geometryType === 'linestring' ? true : st !== ProportionalSymbolsSymbolType.line))
      }>
        {
          (st) => <option
            value={ st }
          >{ LL().PortrayalSection.ProportionalSymbolsOptions.SymbolTypes[st]() }</option>
        }
      </For>
    </InputFieldSelect>
    <InputFieldNumber
      label={ LL().PortrayalSection.ProportionalSymbolsOptions.ReferenceSize() }
      value={ refSymbolSize() }
      onChange={(value) => { setRefSymbolSize(value); }}
      min={ 1 }
      max={ 200 }
      step={ 1 }
    />
    <InputFieldNumber
      label={ LL().PortrayalSection.ProportionalSymbolsOptions.OnValue() }
      value={ refValueForSymbolSize() }
      onChange={(value) => { setRefValueForSymbolSize(value); }}
      min={ 1 }
      max={ 999 }
      step={ 0.1 }
    />
    <Show when={availableColorModes.length > 1}>
      <InputFieldSelect
        label={'Color mode'}
        onChange={(v) => { setColorMode(v as ProportionalSymbolsColorMode); }}
        value={colorMode()}
      >
        <For each={availableColorModes}>
          {
            (cm) => (
              <option value={cm}>
                {LL().PortrayalSection.ProportionalSymbolsOptions.ColorModes[cm]()}
              </option>
            )
          }
        </For>
      </InputFieldSelect>
    </Show>
    <Switch>
      <Match when={colorMode() === 'singleColor'}>
        <InputFieldColor
          label={ LL().PortrayalSection.CommonOptions.Color() }
          value={ color() }
          onChange={(value) => { setColor(value); }}
        />
      </Match>
      <Match when={colorMode() === 'ratioVariable'}>
        <InputFieldSelect
          label={''}
          onChange={(value) => { setTargetRatioVariable(value); }}
          value={ targetRatioVariable()! }
        >
          <For each={targetFieldsRatio}>
            { (variable) => <option value={ variable.name }>{ variable.name }</option> }
          </For>
        </InputFieldSelect>
        <Show when={targetRatioVariable()}>
          <ChoroplethClassificationSelector
            values={valuesRatio}
            targetVariable={() => targetRatioVariable()!}
            targetClassification={targetClassification}
            setTargetClassification={setTargetClassification}
          />
        </Show>
      </Match>
      <Match when={colorMode() === 'categoricalVariable'}>
        <InputFieldSelect
          label={''}
          onChange={(value) => {
            setTargetCategoryVariable(value);
            setCategoriesMapping(
              makeCategoriesMapping(
                makeCategoriesMap(layerDescription.data.features, value),
              ),
            );
          }}
          value={ targetCategoryVariable()! }
        >
          <For each={targetFieldsCategory}>
            { (variable) => <option value={ variable.name }>{ variable.name }</option> }
          </For>
        </InputFieldSelect>
        <Show when={targetCategoryVariable()}>
          <CategoriesSummary mapping={categoriesMapping()} />
          <CollapsibleSection
            title={LL().PortrayalSection.CategoricalChoroplethOptions.ShowChart()}
          >
            <CategoriesPlot mapping={categoriesMapping()} />
          </CollapsibleSection>
          <CollapsibleSection
            title={LL().PortrayalSection.CategoricalChoroplethOptions.Customize()}
          >
            <CategoriesCustomisation
              mapping={categoriesMapping}
              setMapping={setCategoriesMapping}
              detailed={true}
            />
          </CollapsibleSection>
        </Show>
      </Match>
    </Switch>
    <InputFieldCheckbox
      label={ LL().PortrayalSection.ProportionalSymbolsOptions.AvoidOverlapping() }
      checked={ avoidOverlapping() }
      onChange={() => { setAvoidOverlapping(!avoidOverlapping()); }}
    />
    <InputResultName
      onKeyUp={ (value) => { setNewLayerName(value); }}
      onEnter={makePortrayal}
    />
    <ButtonValidation label={ LL().PortrayalSection.CreateLayer() } onClick={makePortrayal} />
  </div>;
}
