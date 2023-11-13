// Imports from solid-js
import { Accessor, JSX, Show } from 'solid-js';

// Helpers
import { TranslationFunctions } from '../../i18n/i18n-types';
import { createDropShadow } from '../MapRenderer/FilterDropShadow';
import { debounce, unproxify } from '../../helpers/common';

// Stores
import { layersDescriptionStore, setLayersDescriptionStore } from '../../store/LayersDescriptionStore';
import { setClassificationPanelStore } from '../../store/ClassificationPanelStore';

// Types / Interfaces
import type {
  LayerDescription,
  ProportionalSymbolsParameters,
  LabelsParameters,
  ClassificationParameters,
} from '../../global.d';

// Styles
import '../../styles/LayerAndLegendSettings.css';
import InputFieldCheckbox from '../Inputs/InputCheckbox.tsx';
import InputFieldColor from '../Inputs/InputColor.tsx';
import InputFieldNumber from '../Inputs/InputNumber.tsx';
import InputFieldSelect from '../Inputs/InputSelect.tsx';
import InputFieldText from '../Inputs/InputText.tsx';

const updateProp = (
  layerId: string,
  propOrProps: string | string[],
  value: string | number | boolean,
) => {
  if (Array.isArray(propOrProps)) {
    const allPropsExceptLast = propOrProps.slice(0, propOrProps.length - 1);
    const lastProp = propOrProps[propOrProps.length - 1];
    const args = [
      'layers',
      (l: LayerDescription) => l.id === layerId,
      ...allPropsExceptLast,
      {
        [lastProp]: value,
      },
    ];
    setLayersDescriptionStore(...args);
  } else {
    setLayersDescriptionStore(
      'layers',
      (l: LayerDescription) => l.id === layerId,
      { [propOrProps]: value },
    );
  }
};

const debouncedUpdateProp = debounce(updateProp, 250);

function updateDropShadow(layerId: string, checked: boolean) {
  // Mutate the store for the layer
  const layer = layersDescriptionStore.layers.find((l) => l.id === layerId);
  if (layer) {
    if (checked) {
      // Need to investigate why this is not working as expected
      // (i.e. the filter should be added automatically to the def section)
      const filter = createDropShadow(layerId);
      (document.querySelector('.map-zone svg defs') as SVGDefsElement).appendChild(filter);
    } else {
      // Same here, it should be removed automatically
      const filter = document.querySelector(`#filter-drop-shadow-${layerId}`);
      if (filter) filter.remove();
    }
    setLayersDescriptionStore(
      'layers',
      (l: LayerDescription) => l.id === layerId,
      { dropShadow: checked },
    );
  }
}

function makeSettingsLabels(
  props: LayerDescription,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  const rendererParameters = props.rendererParameters as LabelsParameters;
  return <>
    <InputFieldNumber
      label={ LL().LayerSettings.FontSize() }
      value={rendererParameters.fontSize}
      onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'fontSize'], v)}
      min={1}
      max={100}
      step={1}
    />
    <InputFieldColor
      label={ LL().LayerSettings.TextColor() }
      value={rendererParameters.fontColor}
      onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'fontColor'], v)}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.XOffset() }
      value={rendererParameters.textOffset[0]}
      onChange={
        (v) => {
          const value = [v, rendererParameters.textOffset[1]];
          debouncedUpdateProp(props.id, ['rendererParameters', 'textOffset'], value);
        }
      }
      min={-100}
      max={100}
      step={1}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.YOffset() }
      value={rendererParameters.textOffset[1]}
      onChange={
        (v) => {
          const value = [rendererParameters.textOffset[0], v];
          debouncedUpdateProp(props.id, ['rendererParameters', 'textOffset'], value);
        }
      }
      min={-100}
      max={100}
      step={1}
    />
    <InputFieldSelect
      label={ LL().LayerSettings.FontStyle() }
      onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'fontStyle'], v)}
      value={rendererParameters.fontStyle}
    >
      <option value="normal">Normal</option>
      <option value="italic">Italic</option>
    </InputFieldSelect>
    <InputFieldSelect
      label={ LL().LayerSettings.FontWeight() }
      onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'fontWeight'], v)}
      value={rendererParameters.fontWeight}
    >
      <option value="normal">Normal</option>
      <option value="bold">Bold</option>
    </InputFieldSelect>
  </>;
}

function makeSettingsDefaultPoint(
  props: LayerDescription,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  return <>
    {/*
      The way the entities are colored depends on the renderer...
        - For 'default' renderer (i.e. no classification), we can choose the color manually
        - For 'choropleth' renderer, we propose to reopen the classification modal
        - For 'proportional' renderer, ... (TODO)
    */}
    <Show when={props.renderer === 'default'}>
      <InputFieldColor
        label={ LL().LayerSettings.FillColor() }
        value={props.fillColor!}
        onChange={(v) => debouncedUpdateProp(props.id, 'fillColor', v)}
      />
    </Show>
    <Show when={props.renderer === 'choropleth'}>
      <div class="field" style={{ 'text-align': 'center' }}>
        <button
          class="button"
          style={{ margin: 'auto' }}
          onClick={() => {
            // Save current state of classification parameters
            const params = unproxify(props.rendererParameters);
            setClassificationPanelStore({
              show: true,
              layerName: props.name,
              variableName: (props.rendererParameters as ClassificationParameters).variable,
              series: props.data.features
                .map((f) => f.properties[(
                  props.rendererParameters as ClassificationParameters).variable]),
              nClasses: (props.rendererParameters as ClassificationParameters).classes,
              colorScheme: (props.rendererParameters as ClassificationParameters).palette.name,
              invertColorScheme: (
                props.rendererParameters as ClassificationParameters).reversePalette,
              noDataColor: (props.rendererParameters as ClassificationParameters).nodataColor,
              onCancel: () => {
                setLayersDescriptionStore(
                  'layers',
                  (l: LayerDescription) => l.id === props.id,
                  { rendererParameters: params },
                );
              },
              onConfirm: (newParams) => {
                console.log(newParams);
                setLayersDescriptionStore(
                  'layers',
                  (l: LayerDescription) => l.id === props.id,
                  { rendererParameters: newParams },
                );
              },
            });
          }}
        >{ LL().LayerSettings.ChangeClassification() }</button>
      </div>
    </Show>
    <Show when={props.renderer === 'proportionalSymbols'}>
      <InputFieldNumber
        label={ LL().PortrayalSection.ProportionalSymbolsOptions.ReferenceSize() }
        value={(props.rendererParameters as ProportionalSymbolsParameters).referenceRadius}
        onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'referenceRadius'], v)}
        min={1}
        max={200}
        step={0.1}
      />
      <InputFieldNumber
        label={ LL().PortrayalSection.ProportionalSymbolsOptions.OnValue() }
        value={(props.rendererParameters as ProportionalSymbolsParameters).referenceValue}
        onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'referenceValue'], v)}
        min={1}
        max={99999999999}
        step={0.1}
      />
      <InputFieldColor
        label={ LL().LayerSettings.FillColor() }
        value={ (props.rendererParameters as ProportionalSymbolsParameters).color as string }
        onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'color'], v)}
      />
    </Show>
    <InputFieldColor
      label={ LL().LayerSettings.StrokeColor() }
      value={ props.strokeColor! }
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeColor', v)}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.FillOpacity() }
      value={ props.fillOpacity! }
      onChange={(v) => debouncedUpdateProp(props.id, 'fillOpacity', v)}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.StrokeOpacity() }
      value={ props.strokeOpacity! }
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeOpacity', v)}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.StrokeWidth() }
      value={+props.strokeWidth.replace('px', '')}
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeWidth', `${v}px`)}
      min={0}
      max={10}
      step={0.1}
    />
    <Show when={ props.renderer !== 'proportionalSymbols' }>
      <InputFieldNumber
        label={ LL().LayerSettings.PointRadius() }
        value={ props.pointRadius! }
        onChange={(v) => debouncedUpdateProp(props.id, 'pointRadius', v)}
        min={1}
        max={20}
        step={1}
      />
    </Show>
    <Show when={ props.renderer === 'proportionalSymbols' }>
      <InputFieldCheckbox
        label={ LL().PortrayalSection.ProportionalSymbolsOptions.AvoidOverlapping() }
        checked={ (props.rendererParameters as ProportionalSymbolsParameters).avoidOverlapping }
        onChange={(checked) => {
          setLayersDescriptionStore(
            'layers',
            (l: LayerDescription) => l.id === props.id,
            'rendererParameters',
            { avoidOverlapping: checked },
          );
          // TODO: update the map
        }}
      />
      <Show when={(props.rendererParameters as ProportionalSymbolsParameters).avoidOverlapping}>
        <InputFieldNumber
          label={'Iterations'}
          value={(props.rendererParameters as ProportionalSymbolsParameters).iterations}
          onChange={(v) => debouncedUpdateProp(props.id, ['rendererParameters', 'iterations'], v)}
          min={1}
          max={1000}
          step={1}
        />
      </Show>
    </Show>
    <InputFieldCheckbox
      label={ LL().LayerSettings.DropShadow() }
      checked={ props.dropShadow }
      onChange={(checked) => updateDropShadow(props.id, checked)}
    />
  </>;
}

function makeSettingsDefaultLine(
  props: LayerDescription,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  return <>
    <Show when={ props.renderer === 'default' }>
      <InputFieldColor
        label={ LL().LayerSettings.StrokeColor() }
        value={ props.strokeColor! }
        onChange={(v) => debouncedUpdateProp(props.id, 'strokeColor', v)}
      />
    </Show>
    <Show when={props.renderer === 'choropleth'}>
      <div class="field" style={{ 'text-align': 'center' }}>
        <button
          class="button"
          style={{ margin: 'auto' }}
          onClick={() => {
            // Save current state of classification parameters
            const params = unproxify(props.rendererParameters);
            setClassificationPanelStore({
              show: true,
              layerName: props.name,
              variableName: (props.rendererParameters as ClassificationParameters).variable,
              series: props.data.features
                .map((f) => f.properties[(
                  props.rendererParameters as ClassificationParameters).variable]),
              nClasses: (props.rendererParameters as ClassificationParameters).classes,
              colorScheme: (props.rendererParameters as ClassificationParameters).palette.name,
              invertColorScheme: (
                props.rendererParameters as ClassificationParameters).reversePalette,
              noDataColor: (props.rendererParameters as ClassificationParameters).nodataColor,
              onCancel: () => {
                setLayersDescriptionStore(
                  'layers',
                  (l: LayerDescription) => l.id === props.id,
                  { rendererParameters: params },
                );
              },
              onConfirm: (newParams) => {
                console.log(newParams);
                setLayersDescriptionStore(
                  'layers',
                  (l: LayerDescription) => l.id === props.id,
                  { rendererParameters: newParams },
                );
              },
            });
          }}
        >{ LL().LayerSettings.ChangeClassification() }</button>
      </div>
    </Show>
    <InputFieldNumber
      label={ LL().LayerSettings.StrokeOpacity() }
      value={ props.strokeOpacity! }
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeOpacity', v)}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.StrokeWidth() }
      value={+props.strokeWidth!.replace('px', '')}
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeWidth', `${v}px`)}
      min={0}
      max={10}
      step={0.1}
    />
  </>;
}

function makeSettingsDefaultPolygon(
  props: LayerDescription,
  LL: Accessor<TranslationFunctions>,
): JSX.Element {
  return <>
    {/*
      The way the entities are colored depends on the renderer...
        - For 'default' renderer (i.e. no classification) or 'sphere',
          we can choose the color manually
        - For 'choropleth' renderer, we propose to reopen the classification modal
        - For 'proportional' renderer, ... (TODO)
    */}
    <Show when={props.renderer === 'default' || props.renderer === 'sphere'}>
      <InputFieldColor
        label={ LL().LayerSettings.FillColor() }
        value={props.fillColor!}
        onChange={(v) => debouncedUpdateProp(props.id, 'fillColor', v)}
      />
    </Show>
    <Show when={props.renderer === 'choropleth'}>
      <div class="field" style={{ 'text-align': 'center' }}>
        <button
          class="button"
          style={{ margin: 'auto' }}
          onClick={() => {
            // Save current state of classification parameters
            const params = unproxify(props.rendererParameters);
            setClassificationPanelStore({
              show: true,
              layerName: props.name,
              variableName: (props.rendererParameters as ClassificationParameters).variable,
              series: props.data.features
                .map((f) => f.properties[(
                  props.rendererParameters as ClassificationParameters).variable]),
              classificationMethod: (props.rendererParameters as ClassificationParameters).method,
              nClasses: (props.rendererParameters as ClassificationParameters).classes,
              colorScheme: (props.rendererParameters as ClassificationParameters).palette.name,
              invertColorScheme: (
                props.rendererParameters as ClassificationParameters).reversePalette,
              noDataColor: (props.rendererParameters as ClassificationParameters).nodataColor,
              onCancel: () => {
                setLayersDescriptionStore(
                  'layers',
                  (l: LayerDescription) => l.id === props.id,
                  { rendererParameters: params },
                );
              },
              onConfirm: (newParams) => {
                setLayersDescriptionStore(
                  'layers',
                  (l: LayerDescription) => l.id === props.id,
                  { rendererParameters: newParams },
                );
              },
            });
          }}
        >{ LL().LayerSettings.ChangeClassification() }</button>
      </div>
    </Show>
    <InputFieldColor
      label={ LL().LayerSettings.StrokeColor() }
      value={ props.strokeColor! }
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeColor', v)}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.FillOpacity() }
      value={ props.fillOpacity! }
      onChange={(v) => debouncedUpdateProp(props.id, 'fillOpacity', v)}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.StrokeOpacity() }
      value={ props.strokeOpacity! }
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeOpacity', v)}
      min={0}
      max={1}
      step={0.1}
    />
    <InputFieldNumber
      label={ LL().LayerSettings.StrokeWidth() }
      value={+props.strokeWidth!.replace('px', '')}
      onChange={(v) => debouncedUpdateProp(props.id, 'strokeWidth', `${v}px`)}
      min={0}
      max={10}
      step={0.1}
    />
    <InputFieldCheckbox
      label={ LL().LayerSettings.DropShadow() }
      checked={ props.dropShadow }
      onChange={(checked) => updateDropShadow(props.id, checked)}
    />
  </>;
}

export default function LayerSettings(
  props: {
    id: string,
    LL: Accessor<TranslationFunctions>,
  },
): JSX.Element {
  // We can use destructuring here because we know that the props
  // won't change during the lifetime of the component
  const { id, LL } = props; // eslint-disable-line solid/reactivity
  const layerDescription = layersDescriptionStore.layers
    .find((l) => l.id === id) as LayerDescription;

  let innerElement;
  if (layerDescription.renderer === 'labels') {
    innerElement = makeSettingsLabels(layerDescription, LL);
  } else {
    innerElement = {
      point: makeSettingsDefaultPoint,
      linestring: makeSettingsDefaultLine,
      polygon: makeSettingsDefaultPolygon,
    }[layerDescription.type as ('point' | 'linestring' | 'polygon')](layerDescription, LL);
  }

  return <div class="layer-settings">
    <div class="layer-settings__title">
      <InputFieldText
        label={ LL().LayerSettings.Name() }
        value={ layerDescription.name }
        onChange={(v) => updateProp(layerDescription.id, 'name', v)}
        width={460}
      />
    </div>
    <br />
    <div class="layer-settings__content">
      { innerElement }
    </div>
  </div>;
}
