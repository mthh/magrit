import {
  Accessor,
  createMemo,
  createSignal,
  type JSX,
} from 'solid-js';
import { produce, unwrap } from 'solid-js/store';

// Imports from other packages
import alasql from 'alasql';
import { yieldOrContinue } from 'main-thread-scheduling';
import { area } from '@turf/turf';
import { LocalizedString } from 'typesafe-i18n';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';
import { TranslationFunctions } from '../../i18n/i18n-types';
import { findSuitableName } from '../../helpers/common';
import { generateIdLayer } from '../../helpers/layers';

// Stores
import {
  layersDescriptionStore,
  LayersDescriptionStoreType,
  setLayersDescriptionStore,
} from '../../store/LayersDescriptionStore';
import { setPortrayalSelectionStore } from '../../store/PortrayalSelectionStore';
import { setLoading } from '../../store/GlobalStore';

// Subcomponents
import { openLayerManager } from '../LeftMenu/LeftMenu.tsx';
import { PortrayalSettingsProps } from './common';
import ButtonValidation from '../Inputs/InputButtonValidation.tsx';
import InputResultName from './InputResultName.tsx';
import FormulaInput, {
  formatValidSampleOutput, hasSpecialFieldArea,
  hasSpecialFieldId,
  replaceSpecialFields,
  SampleOutputFormat,
} from '../FormulaInput.tsx';
import InformationBanner from '../Modals/Banners/InformationBanner.tsx';

// Types / Interfaces / Enums
import { LayerDescription } from '../../global';

async function onClickValidate(
  referenceLayerId: string,
  formula: string,
  newLayerName: string,
) {
  const layerDescription = layersDescriptionStore.layers
    .find((layer) => layer.id === referenceLayerId)! as LayerDescription;
  const data = layerDescription.data.features
    .map((d) => unwrap(d.properties) as Record<string, any>);
  const lengthDataset = data.length;
  const formulaClean = replaceSpecialFields(formula, lengthDataset);
  const query = `SELECT ${formulaClean} as newValue FROM ?`;

  // Add special fields if needed
  if (hasSpecialFieldId(formulaClean)) {
    data.forEach((d, i) => {
      d['@@uuid'] = i; // eslint-disable-line no-param-reassign
    });
  }
  if (hasSpecialFieldArea(formulaClean)) {
    data.forEach((d, i) => {
      d['@@area'] = area(layerDescription.data.features[i].geometry as never); // eslint-disable-line no-param-reassign
    });
  }

  // Compute new column
  const newColumn = alasql(query, [data]);
  const predicateArray = newColumn.map((d: any) => d.newValue);

  // Select the data based on the predicate array
  const features = layerDescription.data.features.filter((_, i) => predicateArray[i]);

  const newLayerDescription = {
    id: generateIdLayer(),
    name: newLayerName,
    data: { type: 'FeatureCollection', features },
    type: 'polygon',
    fields: unwrap(layerDescription.fields),
    renderer: 'default',
    visible: true,
    fillOpacity: 1,
    fillColor: '#395446',
    strokeColor: '#000000',
    strokeWidth: 1,
    strokeOpacity: 1,
    dropShadow: false,
    blurFilter: false,
    shapeRendering: 'auto',
  } as LayerDescription;

  setLayersDescriptionStore(
    produce((draft: LayersDescriptionStoreType) => {
      draft.layers.push(newLayerDescription);
    }),
  );
}

const allValuesAreBoolean = (
  values: any[],
) => Object.values(values).every((v) => v === true || v === false);

function formatSampleOutput(
  s: SampleOutputFormat | undefined,
  LL: Accessor<TranslationFunctions>,
): string | LocalizedString {
  if (!s) return '';
  if (s.type === 'Error') {
    return LL().FormulaInput[`Error${s.value as 'ParsingFormula' | 'EmptyResult'}`]();
  }
  // In this component we want all the returned values to be boolean
  const values = Object.values(s.value);
  if (values.length === 0) {
    return LL().FormulaInput.ErrorEmptyResult();
  }
  if (!allValuesAreBoolean(values)) {
    return LL().PortrayalSection.SelectionOptions.InvalidFormula();
  }
  return formatValidSampleOutput(s.value);
}

export default function SelectionSettings(
  props: PortrayalSettingsProps,
): JSX.Element {
  const { LL } = useI18nContext();

  const layerDescription = layersDescriptionStore.layers
    .find((layer) => layer.id === props.layerId)!;

  const [
    newLayerName,
    setNewLayerName,
  ] = createSignal<string>('');

  const [
    formula,
    setFormula,
  ] = createSignal<string>('');

  const [
    sampleOutput,
    setSampleOutput,
  ] = createSignal<SampleOutputFormat | undefined>(undefined);

  const makePortrayal = async () => {
    // Check name of the new layer
    const layerName = findSuitableName(
      newLayerName() || LL().PortrayalSection.NewLayer(),
      layersDescriptionStore.layers.map((d) => d.name),
    );

    // Close the current modal
    setPortrayalSelectionStore({ show: false, layerId: '' });

    // Display loading overlay
    setLoading(true);

    await yieldOrContinue('smooth');

    // Actually create the layer
    setTimeout(async () => {
      await onClickValidate(
        layerDescription.id,
        formula(),
        layerName,
      );

      // Hide loading overlay
      setLoading(false);

      // Open the LayerManager to show the new layer
      openLayerManager();
    }, 0);
  };

  const isConfirmationEnabled = createMemo(() => formula() !== ''
    && sampleOutput()
    && sampleOutput()!.type !== 'Error'
    && allValuesAreBoolean(Object.values(sampleOutput()!.value)));

  return <div class="portrayal-section__portrayal-options-selection">
    <InformationBanner expanded={true}>
      <p>{LL().PortrayalSection.SelectionOptions.Information()}</p>
      <p>{LL().PortrayalSection.SelectionOptions.InformationSyntax()}</p>
    </InformationBanner>
    <br />
    <FormulaInput
      typeDataset={'layer'}
      dsDescription={layerDescription}
      currentFormula={formula}
      setCurrentFormula={setFormula}
      sampleOutput={sampleOutput}
      setSampleOutput={setSampleOutput}
    />
    <div class="control" style={{ display: 'flex', height: '7em' }}>
      <div style={{ display: 'flex', 'align-items': 'center', width: '12%' }}>
        <label class="label">{LL().FormulaInput.sampleOutput()}</label>
      </div>
      <pre
        style={{ display: 'flex', 'align-items': 'center', width: '120%' }}
        classList={{ 'has-text-danger': sampleOutput() && sampleOutput()!.type === 'Error' }}
        id="sample-output"
      >
        {formatSampleOutput(sampleOutput(), LL)}
      </pre>
    </div>
    <br />
    <div class="field-block">
    </div>
    <br />
    <InputResultName
      onKeyUp={(value) => {
        setNewLayerName(value);
      }}
      onEnter={makePortrayal}
    />
    <ButtonValidation
      label={LL().PortrayalSection.CreateLayer()}
      onClick={makePortrayal}
      disabled={!isConfirmationEnabled()}
    />
  </div>;
}
