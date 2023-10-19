// Imports from solid-js
import {
  type Accessor,
  For,
  type JSX,
  Show,
} from 'solid-js';

// Stores
import { layersDescriptionStore, setLayersDescriptionStore } from '../../store/LayersDescriptionStore';

// Subcomponents
import InputFieldColor from '../Inputs/InputColor.tsx';
import InputFieldNumber from '../Inputs/InputNumber.tsx';
import InputFieldSelect from '../Inputs/InputSelect.tsx';

// Helpers
import type { TranslationFunctions } from '../../i18n/i18n-types';

// Types / Interfaces / Enums
import {
  DistanceUnit,
  type Ellipse,
  type FreeDrawing,
  type LayoutFeature,
  LayoutFeatureType,
  type Rectangle,
  type ScaleBar,
  ScaleBarStyle,
} from '../../global.d';
import InputFieldText from '../Inputs/InputText.tsx';

/**
 * Update a single property of a layout feature in the layersDescriptionStore,
 * given its id and the path to the property.
 *
 * @param {string} layoutFeatureId - The id of the layout feature to update.
 * @param {string[]} props - The path to the property to update.
 * @param {string | number} value - The new value of the property.
 * @return {void}
 */
const updateLayoutFeatureProperty = (
  layoutFeatureId: string,
  props: string[],
  value: string | number | number[],
) => {
  const allPropsExceptLast = props.slice(0, props.length - 1);
  const lastProp = props[props.length - 1];
  const args = [
    'layoutFeatures',
    (f: LayoutFeature) => f.id === layoutFeatureId,
    ...allPropsExceptLast,
    {
      [lastProp]: value,
    },
  ];
  setLayersDescriptionStore(...args);
};

function makeSettingsRectangle(
  layoutFeatureId: string,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  const ft = layersDescriptionStore.layoutFeatures
    .find((f) => f.id === layoutFeatureId) as Rectangle;
  return <>
    <InputFieldColor
      label={ LL().LayoutFeatures.Modal.FillColor() }
      value={ft.fillColor}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['fillColor'],
        newValue,
      )}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.FillOpacity() }
      value={ft.fillOpacity}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['fillOpacity'],
        newValue,
      )}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldColor
      label={ LL().LayoutFeatures.Modal.StrokeColor() }
      value={ft.strokeColor}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeColor'],
        newValue,
      )}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.StrokeOpacity() }
      value={ft.strokeOpacity}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeOpacity'],
        newValue,
      )}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.StrokeWidth() }
      value={ft.strokeWidth}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeWidth'],
        newValue,
      )}
      min={0}
      max={100}
      step={1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.RoundCorners() }
      value={ft.cornerRadius}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['cornerRadius'],
        newValue,
      )}
      min={0}
      max={100}
      step={1}
    />
  </>;
}

function makeSettingsEllipse(
  layoutFeatureId: string,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  const ft = layersDescriptionStore.layoutFeatures
    .find((f) => f.id === layoutFeatureId) as Ellipse;
  return <>
    <InputFieldColor
      label={ LL().LayoutFeatures.Modal.FillColor() }
      value={ ft.fillColor }
      onChange={ (newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['fillColor'],
        newValue,
      )}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.FillOpacity() }
      value={ft.fillOpacity}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['fillOpacity'],
        newValue,
      )}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldColor
      label={ LL().LayoutFeatures.Modal.StrokeColor() }
      value={ft.strokeColor}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeColor'],
        newValue,
      )}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.StrokeOpacity() }
      value={ft.strokeOpacity}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeOpacity'],
        newValue,
      )}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.StrokeWidth() }
      value={ft.strokeWidth}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeWidth'],
        newValue,
      )}
      min={0}
      max={100}
      step={1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.Rx() }
      value={ft.rx}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['rx'],
        newValue,
      )}
      min={0}
      max={1000}
      step={1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.Ry() }
      value={ft.ry}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['ry'],
        newValue,
      )}
      min={0}
      max={1000}
      step={1}
    />
  </>;
}

function makeSettingsScaleBar(
  layoutFeatureId: string,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  const ft = layersDescriptionStore.layoutFeatures
    .find((f) => f.id === layoutFeatureId) as ScaleBar;
  return <>
    <InputFieldSelect
      label={ LL().LayoutFeatures.Modal.ScaleBarType() }
      onChange={(value) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['style'],
        value,
      )}
      value={ ft.style }
      width={ 200 }
    >
      <For each={Object.keys(ScaleBarStyle)}>
        {(style) => <option value={style}>{ LL().LayoutFeatures.Modal[style]() }</option>}
      </For>
    </InputFieldSelect>
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.Width() }
      value={ ft.width }
      onChange={(value) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['width'],
        value,
      )}
      min={10}
      max={1000}
      step={1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.Height() }
      value={ ft.height }
      onChange={(value) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['height'],
        value,
      )}
      min={1}
      max={400}
      step={1}
    />
    <InputFieldSelect
      label={ LL().LayoutFeatures.Modal.Units() }
      onChange={(value) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['unit'],
        value,
      )}
      value={ft.unit}
    >
      <For each={Object.keys(DistanceUnit)}>
        {(unit) => <option value={unit}>{ LL().LayoutFeatures.Modal[unit]() }</option>}
      </For>
    </InputFieldSelect>
    <Show when={ft.style === ScaleBarStyle.blackAndWhiteBar}>
      <InputFieldText
        label={ LL().LayoutFeatures.Modal.TickValues() }
        onChange={(value) => {
          const ticks = value.split(',').map((v) => +v);
          if (ticks.some((t) => Number.isNaN(t))) {
            return;
          }
          updateLayoutFeatureProperty(
            layoutFeatureId,
            ['tickValues'],
            ticks,
          );
        }}
        value={ft.tickValues.join(', ')}
      />
    </Show>
  </>;
}

function makeSettingsFreeDrawing(
  layoutFeatureId: string,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  const ft = layersDescriptionStore.layoutFeatures
    .find((f) => f.id === layoutFeatureId) as FreeDrawing;
  return <>
    <InputFieldColor
      label={ LL().LayoutFeatures.Modal.StrokeColor() }
      value={ft.strokeColor}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeColor'],
        newValue,
      )}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.StrokeOpacity() }
      value={ft.strokeOpacity}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeOpacity'],
        newValue,
      )}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayoutFeatures.Modal.StrokeWidth() }
      value={ft.strokeWidth}
      onChange={(newValue) => updateLayoutFeatureProperty(
        layoutFeatureId,
        ['strokeWidth'],
        newValue,
      )}
      min={0}
      max={100}
      step={1}
    />
  </>;
}

export default function LayoutFeatureSettings(
  props: {
    layoutFeatureId: string,
    LL: Accessor<TranslationFunctions>
  },
): JSX.Element {
  // We can use destructuring here because we know that the props
  // won't change during the lifetime of the component
  const {
    layoutFeatureId,
    LL,
  } = props; // eslint-disable-line solid/reactivity

  const layoutFeature = layersDescriptionStore.layoutFeatures
    .find((f) => f.id === layoutFeatureId);

  if (!layoutFeature) {
    // Due to the way this settings modal is triggered,
    // this should never happen...
    throw new Error('LayoutFeatureSettings: layoutFeature is undefined');
  }

  return <div class="layout-feature-settings">
    <div class="layout-features-settings__content">
      {
        ({
          [LayoutFeatureType.Rectangle]: makeSettingsRectangle,
          [LayoutFeatureType.Ellipse]: makeSettingsEllipse,
          [LayoutFeatureType.ScaleBar]: makeSettingsScaleBar,
          [LayoutFeatureType.FreeDrawing]: makeSettingsFreeDrawing,
        })[layoutFeature.type](layoutFeatureId, LL)
      }
    </div>
  </div>;
}
