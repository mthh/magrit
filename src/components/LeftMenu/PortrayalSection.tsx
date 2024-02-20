import {
  createMemo,
  createSignal,
  type JSX,
  Match,
  Show,
  Switch,
} from 'solid-js';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';
import {
  isCandidateForRepresentation,
  // layerGeometryType,
  // layerAnyAvailableVariable,
  // layerAvailableVariables,
} from '../../helpers/layerDescription';

// Stores
import { layersDescriptionStore } from '../../store/LayersDescriptionStore';
import { setPortrayalSelectionStore } from '../../store/PortrayalSelectionStore';

// Subcomponents
import DropdownMenu from '../DropdownMenu.tsx';
// import ChoroplethSettings from './PortrayalOption/ChoroplethSettings.tsx';
// import LabelsSettings from './PortrayalOption/LabelsSettings.tsx';
// import ProportionalSymbolsSettings from './PortrayalOption/ProportionalSymbolsSettings.tsx';
// import DiscontinuitySettings from './PortrayalOption/DiscontinuitySettings.tsx';
// import CategoricalChoroplethSettings from './PortrayalOption/CategoricalChoroplethSettings.tsx';
// import SmoothingSettings from './PortrayalOption/SmoothingSettings.tsx';
// import CartogramSettings from './PortrayalOption/CartogramSettings.tsx';
// import GriddingSettings from './PortrayalOption/GriddingSettings.tsx';

// Types / Interfaces / Enums
// import { RepresentationType } from '../../global.d';

// Styles
import '../../styles/PortrayalSection.css';

export default function PortrayalSection(): JSX.Element {
  const { LL } = useI18nContext();

  const [
    targetLayer,
    setTargetLayer,
  ] = createSignal<string | null>(null);
  // const [
  //   availableVariables,
  //   setAvailableVariables,
  // ] = createSignal<{
  //   hasCategorical: boolean,
  //   hasStock: boolean,
  //   hasRatio: boolean,
  //   hasIdentifier: boolean,
  //   // hasUnknown,
  // } | null>(null);
  // const [
  //   selectedPortrayal,
  //   setSelectedPortrayal,
  // ] = createSignal<RepresentationType | null>(null);

  // const availablePortrayals = createMemo(() => {
  //   const geometryType = layerGeometryType(targetLayer() as string);
  //   const entries = [];
  //
  //   // Choropleth inputs:
  //   //   - variable: ratio
  //   //   - geometry: point, line, polygon
  //   if (availableVariables()?.hasRatio) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.Choropleth(),
  //       value: RepresentationType.choropleth,
  //     });
  //   }
  //   // Proportional symbols inputs:
  //   //   - variable: stock
  //   //   - geometry: point, line, polygon
  //   if (availableVariables()?.hasStock) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.ProportionalSymbols(),
  //       value: RepresentationType.proportionalSymbols,
  //     });
  //   }
  //   // Smoothed portrayal inputs:
  //   //   - variable: stock
  //   //   - geometry: point, polygon
  //   if (
  //     availableVariables()?.hasStock
  //     && (geometryType === 'polygon' || geometryType === 'point')
  //   ) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.Smoothed(),
  //       value: RepresentationType.smoothed,
  //     });
  //   }
  //   // Categorical choropleth inputs:
  //   //   - variable: categorical
  //   //   - geometry: point, line, polygon
  //   if (availableVariables()?.hasCategorical) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.CategoricalChoropleth(),
  //       value: RepresentationType.categoricalChoropleth,
  //     });
  //   }
  //   // Discontinuity inputs:
  //   //   - variable: stock, ratio
  //   //   - geometry: polygon
  //   if (
  //     (availableVariables()?.hasStock || availableVariables()?.hasRatio)
  //     && geometryType === 'polygon'
  //   ) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.Discontinuity(),
  //       value: RepresentationType.discontinuity,
  //     });
  //   }
  //   // Grid inputs:
  //   //   - variable: stock, ratio
  //   //   - geometry: polygon
  //   if (
  //     (availableVariables()?.hasStock || availableVariables()?.hasRatio)
  //     && geometryType === 'polygon'
  //   ) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.Grid(),
  //       value: RepresentationType.grid,
  //     });
  //   }
  //   // Cartogram inputs:
  //   //   - variable: stock
  //   //   - geometry: polygon
  //   if (availableVariables()?.hasStock && geometryType === 'polygon') {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.Cartogram(),
  //       value: RepresentationType.cartogram,
  //     });
  //   }
  //   // Label inputs:
  //   //   - variable: any
  //   //   - geometry: point, line, polygon
  //   if (layerAnyAvailableVariable(targetLayer() as string)) {
  //     entries.push({
  //       name: LL().PortrayalSection.PortrayalTypes.Labels(),
  //       value: RepresentationType.labels,
  //     });
  //   }
  //
  //   return entries;
  // });

  const entries = createMemo(() => layersDescriptionStore.layers
    .filter(isCandidateForRepresentation)
    .map((layer) => ({ name: layer.name, value: layer.id })));
  return <div class="portrayal-section">
    <DropdownMenu
      id={'portrayal-section__target-layer-dropdown'}
      entries={entries()}
      defaultEntry={ { name: LL().PortrayalSection.TargetLayer() } }
      prefix={ 'Layer: '}
      onChange={ (value) => {
        // // Deselect the portrayal selected if any
        // // (will unmount the settings component)
        // setSelectedPortrayal(null);
        // // Set the target layer to null in order to
        // // unmout the DropdownMenu for available portrayals
        // setTargetLayer(null);
        // Set the target layer
        setTargetLayer(value);
        // // ...and compute the available portrayals for the variable of this layer
        // setAvailableVariables(layerAvailableVariables(targetLayer()!));
      } }
    />
    <Show when={ targetLayer() }>
      <p><br /></p>
      <button
        class="button is-primary"
        style={{
          width: '100%',
        }}
        onClick={() => {
          setPortrayalSelectionStore({
            show: true,
            layerId: targetLayer()!,
          });
        }}
      >
        { LL().PortrayalSection.OpenModal() }
      </button>
      {/* <DropdownMenu */}
      {/*   id={'portrayal-section__portrayal-dropdown'} */}
      {/*   entries={ availablePortrayals() } */}
      {/*   defaultEntry={{ name: LL().PortrayalSection.ChooseARepresentation() }} */}
      {/*   onChange={(v) => setSelectedPortrayal(v as RepresentationType)} */}
      {/* /> */}
    </Show>
{/*    <div class="portrayal-section__portrayal-options">
      <Switch>
        <Match when={ selectedPortrayal() === RepresentationType.choropleth }>
          <ChoroplethSettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.proportionalSymbols }>
          <ProportionalSymbolsSettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.discontinuity }>
          <DiscontinuitySettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.categoricalChoropleth }>
          <CategoricalChoroplethSettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.labels }>
          <LabelsSettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.smoothed }>
          <SmoothingSettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.cartogram }>
          <CartogramSettings layerId={ targetLayer() as string } />
        </Match>
        <Match when={ selectedPortrayal() === RepresentationType.grid }>
          <GriddingSettings layerId={ targetLayer() as string } />
        </Match>
      </Switch>
    </div> */}
  </div>;
}
