// Imports from solid-js
import {
  createMemo,
  createSignal,
  JSX,
} from 'solid-js';
import { produce, unwrap } from 'solid-js/store';

// Imports from other packages
import { yieldOrContinue } from 'main-thread-scheduling';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';
import { randomColorFromCategoricalPalette } from '../../helpers/color';
import { findSuitableName } from '../../helpers/common';
import { generateIdLayer } from '../../helpers/layers';

// Stores
import { setLoading } from '../../store/GlobalStore';
import {
  layersDescriptionStore,
  LayersDescriptionStoreType,
  setLayersDescriptionStore,
} from '../../store/LayersDescriptionStore';
import { setFunctionalitySelectionStore } from '../../store/FunctionalitySelectionStore';

// Subcomponents
import { PortrayalSettingsProps } from './common';
import InputResultName from './InputResultName.tsx';
import ButtonValidation from '../Inputs/InputButtonValidation.tsx';
import Simplification from '../Simplification.tsx';
import { openLayerManager } from '../LeftMenu/LeftMenu.tsx';

// Types
import type { GeoJSONFeature, LayerDescription } from '../../global';

async function onClickValidate(
  referenceLayerId: string,
  features: GeoJSONFeature[],
  newLayerName: string,
): Promise<void> {
  const referenceDescription = (layersDescriptionStore.layers
    .find((layer) => layer.id === referenceLayerId) as LayerDescription);

  const newData = JSON.parse(JSON.stringify(referenceDescription.data));
  newData.features = features;

  const color = randomColorFromCategoricalPalette();

  const newLayerDescription = {
    id: generateIdLayer(),
    name: newLayerName,
    data: newData,
    type: referenceDescription.type,
    fields: unwrap(referenceDescription.fields),
    representationType: 'default',
    visible: true,
    fillOpacity: 1,
    fillColor: color,
    strokeColor: '#000000',
    strokeWidth: 1,
    strokeOpacity: 1,
    dropShadow: null,
    shapeRendering: 'auto',
  } as LayerDescription;

  setLayersDescriptionStore(
    produce((draft: LayersDescriptionStoreType) => {
      draft.layers.push(newLayerDescription);
    }),
  );
}

export default function SimplificationSettings(
  props: PortrayalSettingsProps,
): JSX.Element {
  const { LL } = useI18nContext();

  const layerDescription = layersDescriptionStore.layers
    .find((layer) => layer.id === props.layerId)!;

  const [
    simplifiedLayers,
    setSimplifiedLayers,
  ] = createSignal<GeoJSONFeature[][]>([]);

  const [
    newLayerName,
    setNewLayerName,
  ] = createSignal<string>(
    LL().FunctionalitiesSection.SimplificationOptions.NewLayerName({
      layerName: layerDescription.name,
    }) as string,
  );

  const makePortrayal = async () => {
    // Check name of the new layer
    const layerName = findSuitableName(
      newLayerName() || LL().FunctionalitiesSection.NewLayer(),
      layersDescriptionStore.layers.map((d) => d.name),
    );

    // Close the current modal
    setFunctionalitySelectionStore({ show: false, id: '', type: '' });

    // Display loading overlay
    setLoading(true);

    await yieldOrContinue('smooth');

    // Actually create the new layer
    setTimeout(async () => {
      await onClickValidate(
        layerDescription.id,
        simplifiedLayers()[0],
        layerName,
      );

      // Hide loading overlay
      setLoading(false);

      // Open the LayerManager to show the new layer
      openLayerManager();
    }, 0);
  };

  return <div class="portrayal-section__portrayal-options-simplification">
    <Simplification
      ids={[props.layerId]}
      setSimplifiedLayers={setSimplifiedLayers}
      style={{ height: '85%' }}
    />
    <InputResultName
      value={newLayerName()}
      onKeyUp={(value) => { setNewLayerName(value); }}
      onEnter={makePortrayal}
    />
    <ButtonValidation
      label={ LL().FunctionalitiesSection.CreateLayer() }
      onClick={ makePortrayal }
    />
  </div>;
}
