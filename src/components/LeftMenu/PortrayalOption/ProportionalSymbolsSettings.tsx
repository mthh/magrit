// Imports from solid-js
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
} from 'solid-js';
import { produce } from 'solid-js/store';

// Imports from other packages
import { getPalette } from 'dicopal';
import { v4 as uuidv4 } from 'uuid';

// Helpers
import { useI18nContext } from '../../../i18n/i18n-solid';
import { descendingKeyAccessor, isNumber } from '../../../helpers/common';
import {
  computeCandidateValues,
  computeCandidateValuesForSymbolsLegend,
  coordsPointOnFeature,
  PropSizer,
} from '../../../helpers/geo';
import { max, min } from '../../../helpers/math';

// Sub-components
import ResultNameInput from './ResultNameInput.tsx';

// Stores
import { layersDescriptionStore, setLayersDescriptionStore } from '../../../store/LayersDescriptionStore';

// Types / Interfaces / Enums
import type {
  GeoJSONFeatureCollection,
  LayerDescription,
  ProportionalSymbolsLegendParameters,
  ProportionalSymbolsParameters,
  RepresentationType,
} from '../../../global.d';
import {
  LegendTextElement,
  LegendType,
  ProportionalSymbolsColorMode,
  ProportionalSymbolsSymbolType,
} from '../../../global.d';

function onClickValidate(
  referenceLayerId: string,
  targetVariable: string,
  refSymbolSize: number,
  refValueForSymbolSize: number,
  newLayerName: string,
  modeColor: ProportionalSymbolsColorMode,
  symbolType: ProportionalSymbolsSymbolType,
  extent: [number, number],
) {
  // The layer description of the reference layer
  const referenceLayerDescription = layersDescriptionStore.layers
    .find((l) => l.id === referenceLayerId);

  if (referenceLayerDescription === undefined) {
    throw Error('Unexpected Error: Reference layer not found');
  }

  const propSymbolsParameters = {
    variable: targetVariable,
    colorMode: modeColor,
    color: '#9b0e0e',
    symbolType,
    referenceRadius: refSymbolSize,
    referenceValue: refValueForSymbolSize,
    avoidOverlapping: false,
  } as ProportionalSymbolsParameters;

  // Copy dataset
  const newData = JSON.parse(
    JSON.stringify(
      referenceLayerDescription.data,
    ),
  ) as GeoJSONFeatureCollection;

  if (referenceLayerDescription.type === 'polygon') {
    newData.features.forEach((feature) => {
      // eslint-disable-next-line no-param-reassign
      feature.geometry = {
        type: 'Point',
        coordinates: coordsPointOnFeature(feature.geometry),
      };
    });
  }

  // Sort the features by descending value of the target variable
  // (so that the biggest symbols are drawn first)
  newData.features
    .sort(descendingKeyAccessor((d) => d.properties[targetVariable]));

  const pal = getPalette('Vivid', 10)!.colors;
  const color = pal[Math.floor(Math.random() * pal.length)];

  propSymbolsParameters.color = color;

  const propSize = new (PropSizer as any)(
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

  const legendValues2 = computeCandidateValues(
    extent[0],
    extent[1],
    propSize.scale,
  );

  console.log(legendValues, legendValues2);

  const newLayerDescription = {
    id: uuidv4(),
    name: newLayerName,
    data: newData,
    type: 'point',
    fields: referenceLayerDescription.fields,
    renderer: 'proportionalSymbols' as RepresentationType,
    visible: true,
    strokeColor: '#000000',
    strokeWidth: '1px',
    strokeOpacity: 1,
    fillColor: propSymbolsParameters.color,
    fillOpacity: 1,
    dropShadow: false,
    shapeRendering: 'auto',
    rendererParameters: propSymbolsParameters,
    legend: {
      // Legend common part
      title: {
        text: targetVariable,
        fontSize: '13px',
        fontFamily: 'Sans-serif',
        fontColor: '#000000',
        fontStyle: 'normal',
        fontWeight: 'bold',
      } as LegendTextElement,
      subtitle: {
        text: 'This is a subtitle',
        fontSize: '12px',
        fontFamily: 'Sans-serif',
        fontColor: '#000000',
        fontStyle: 'normal',
        fontWeight: 'normal',
      } as LegendTextElement,
      note: {
        text: 'This is a bottom note',
        fontSize: '11px',
        fontFamily: 'Sans-serif',
        fontColor: '#000000',
        fontStyle: 'normal',
        fontWeight: 'normal',
      } as LegendTextElement,
      position: [100, 100],
      visible: true,
      roundDecimals: 0,
      backgroundRect: {
        visible: false,
        fill: '#ffffff',
        fillOpacity: 1,
        stroke: '#000000',
      },
      // Part specific to proportional symbols
      type: LegendType.proportional,
      layout: 'stacked',
      values: legendValues2,
      labels: {
        fontSize: '11px',
        fontFamily: 'Sans-serif',
        fontColor: '#000000',
        fontStyle: 'normal',
        fontWeight: 'normal',
      } as LegendTextElement,
    } as ProportionalSymbolsLegendParameters,
  } as LayerDescription;

  setLayersDescriptionStore(
    produce(
      (draft) => {
        draft.layers.push(newLayerDescription);
      },
    ),
  );
}

interface ProportionalSymbolsSettingsProps {
  layerId: string;
}

export default function ProportionalSymbolsSettings(
  props: ProportionalSymbolsSettingsProps,
): JSX.Element {
  const { LL } = useI18nContext();

  const layerDescription = createMemo(() => layersDescriptionStore.layers
    .find((l) => l.id === props.layerId)!);

  // if (!layerDescription) {
  //   throw Error('Unexpected Error: Layer not found');
  // }

  const targetFields = createMemo(() => layerDescription()
    .fields?.filter((variable) => variable.type === 'stock'));

  // if (!targetFields || targetFields.length === 0) {
  //   throw Error('Unexpected Error: No stock field found');
  // }

  const [
    targetVariable,
    setTargetVariable,
  ] = createSignal<string>(targetFields()[0].name);

  // Reactive variable that contains the values of the target variable
  const values = createMemo(() => layerDescription().data.features
    .map((feature) => feature.properties[targetVariable()])
    .filter((value) => isNumber(value))
    .map((value) => +value) as number[]);

  // Reactive variables that contains the min and the max values
  // of the target variable
  const minValues = createMemo(() => min(values()));
  const maxValues = createMemo(() => max(values()));

  const [
    newLayerName,
    setNewLayerName,
  ] = createSignal<string>(`ProportionalSymbols_${layerDescription().name}`);
  const [
    modeColor,
    setModeColor,
  ] = createSignal<ProportionalSymbolsColorMode>(ProportionalSymbolsColorMode.singleColor);
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
    colorOrColors,
    setColorOrColors,
  ] = createSignal<string | [string, string]>('#fefefe');

  // We need to update the value of refValueForSymbolSize when
  // the targetVariable changes (which changes the max value)
  createEffect(() => {
    setRefValueForSymbolSize(maxValues);
  });

  const makePortrayal = () => {
    console.log('makePortrayal');
    onClickValidate(
      layerDescription().id,
      targetVariable(),
      refSymbolSize(),
      refValueForSymbolSize(),
      newLayerName(),
      modeColor(),
      symbolType(),
      [minValues(), maxValues()],
    );
  };

  return <div class="portrayal-section__portrayal-options-proportional-symbols">
    <div class="field">
      <label class="label">{ LL().PortrayalSection.CommonOptions.Variable() }</label>
      <div class="select" style={{ 'max-width': '60%' }}>
        <select onChange={ (ev) => {
          setTargetVariable(ev.target.value);
        }}>
          <For each={targetFields()}>
            { (variable) => <option value={ variable.name }>{ variable.name }</option> }
          </For>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label">{ LL().PortrayalSection.ProportionalSymbolsOptions.SymbolType() }</label>
      <div class="select">
        <select onChange={ (ev) => {
          setSymbolType(ev.target.value as ProportionalSymbolsSymbolType);
        } }>
          <For each={Object.values(ProportionalSymbolsSymbolType)}>
            {
              (st) => <option
                value={ st }
              >{ LL().PortrayalSection.ProportionalSymbolsOptions.SymbolTypes[st]() }</option>
            }
          </For>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label">{ LL().PortrayalSection.ProportionalSymbolsOptions.ReferenceSize() }</label>
      <div class="control">
        <input
          type="number"
          class="number"
          min="1"
          max="200"
          step="1"
          value={ refSymbolSize() }
          onChange={(ev) => { setRefSymbolSize(+ev.target.value); }}
        />
      </div>
    </div>
    <div class="field">
      <label class="label">{ LL().PortrayalSection.ProportionalSymbolsOptions.OnValue() }</label>
      <div class="control">
        <input
          type="number"
          class="number"
          min="1"
          max="999"
          step="0.1"
          value={ refValueForSymbolSize() }
          onChange={(ev) => { setRefValueForSymbolSize(+ev.target.value); }}
        />
      </div>
    </div>
    <div class="field">
      <label class="label" for={'portrayal-section__checkbox1'}>
        { LL().PortrayalSection.ProportionalSymbolsOptions.AvoidOverlapping() }
      </label>
      <input
        id={'portrayal-section__checkbox1'}
        type="checkbox"
        class="checkbox"
        checked={ false }
      />
    </div>
    <ResultNameInput
      onKeyUp={ (value) => { setNewLayerName(value); }}
      onEnter={makePortrayal}
    />
    <div class="has-text-centered">
      <button
        class="button is-success portrayal-section__button-validation"
        onClick={makePortrayal}
      >
        { LL().PortrayalSection.CreateLayer() }
      </button>
    </div>
  </div>;
}
