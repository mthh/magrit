// Imports from solid-js
import {
  Accessor, createMemo, For, JSX, Show,
} from 'solid-js';

// Import from other packages
import { FaSolidAngleDown } from 'solid-icons/fa';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';
import type { TranslationFunctions } from '../../i18n/i18n-types';
import { camelToFlat, unproxify } from '../../helpers/common';
import { epsgDb } from '../../helpers/projection';

// Stores
import { globalStore } from '../../store/GlobalStore';
import { mapStore, setMapStore } from '../../store/MapStore';
import { setModalStore } from '../../store/ModalStore';

// Sub-components
import DetailsSummary from '../DetailsSummary.tsx';
import { onClickDropdown, onKeyDownDropdown, setDropdownItemTarget } from '../DropdownMenu.tsx';
import InputFieldCheckbox from '../Inputs/InputCheckbox.tsx';
import InputFieldNumber from '../Inputs/InputNumber.tsx';
import InputFieldRangeSlider from '../Inputs/InputRangeSlider.tsx';
import ProjectionSelection from '../Modals/ProjectionSelection.tsx';

function onChangeProjectionEntry(
  entry: { name: string, value: string, type: string },
  LL: Accessor<TranslationFunctions>,
) {
  // Value is either the name of the projection (to be used in the projection function for d3)
  // or "other"
  if (entry.value === 'other') {
    // Save the current projection definition if the user clics on "cancel"
    const currentProjection = unproxify(mapStore.projection as never);
    // Open the modal that will allow the user to select a projection
    setModalStore({
      show: true,
      content: () => <ProjectionSelection />,
      title: LL().ProjectionSelection.title(),
      confirmCallback: () => {
        // Nothing to do on confirm
        // because the projection is already changed
        // from inside the modal...
      },
      cancelCallback: () => {
        setMapStore('projection', currentProjection);
      },
      width: '900px',
      escapeKey: 'cancel',
    });
  } else if (entry.type === 'd3') {
    // The projection function name in d3 is 'geo' + the value
    const functionName = `geo${entry.value}`;
    // Changing this in the mapStore will
    // actually change the projection and the path generator
    // in the global store and redraw the map
    setMapStore(
      'projection',
      {
        name: entry.value,
        value: functionName,
        type: 'd3',
      },
    );
  } else {
    const proj = epsgDb[entry.value];
    setMapStore(
      'projection',
      {
        name: proj.name,
        value: proj.proj4,
        bounds: proj.bbox,
        code: `EPSG:${proj.code}`,
        type: 'proj4',
      },
    );
  }
}

const formatCurrentProjection = (
  type: string,
  name: string,
  code: string | undefined,
) => (type === 'd3' ? camelToFlat(name) : `${name} (${code})`);

export default function MapConfiguration(): JSX.Element {
  const { LL } = useI18nContext();
  let refParentNodeDropdown: HTMLDivElement;

  const shortListEntries = createMemo(() => [
    {
      name: LL().MapConfiguration.GlobalProjections(),
      type: 'group',
    },
    {
      name: 'Natural Earth 2',
      value: 'NaturalEarth2',
      type: 'd3',
    },
    {
      name: 'Robinson',
      value: 'Robinson',
      type: 'd3',
    },
    {
      name: 'Equal Earth',
      value: 'EqualEarth',
      type: 'd3',
    },
    {
      name: 'Mercator',
      value: 'Mercator',
      type: 'd3',
    },
    {
      type: 'divider',
    },
    {
      name: LL().MapConfiguration.LocalProjections(),
      type: 'group',
    },
    {
      name: 'ETRS89-extended / LAEA Europe (EPSG:3035)',
      value: '3035',
      type: 'proj4',
    },
    {
      name: 'RGF93 / Lambert-93 (EPSG:2154)',
      value: '2154',
      type: 'proj4',
    },
    // TODO: handle Grid Based Datum Adjustments
    //       (we need to download the grid files when the user selects
    //       a projection that requires it)
    // {
    //   name: 'OSGB36 / British National Grid - United Kingdom Ordnance Survey (EPSG:27700)',
    //   value: '27700',
    //   type: 'proj4',
    // },
    // {
    //   name: 'NAD27(CGQ77) / Quebec Lambert (EPSG:2138)',
    //   value: '2138',
    //   type: 'proj4',
    // },
    // {
    //   name: 'NAD83 / Conus Albers (EPSG:5070)',
    //   value: '5070',
    //   type: 'proj4',
    // },
    {
      type: 'divider',
    },
    {
      name: LL().MapConfiguration.MoreProjection(),
      value: 'other',
      type: '',
    },
  ]);

  const hasParallel = createMemo(() => !!globalStore.projection?.parallel);

  const hasParallels = createMemo(() => !!globalStore.projection?.parallels);

  return <div class="map-configuration">
    <InputFieldNumber
      label={LL().MapConfiguration.Width()}
      value={mapStore.mapDimensions.width}
      onChange={(v) => {
        const maxSize = globalStore.windowDimensions.width - globalStore.leftMenuWidth;
        const width = v <= maxSize
          ? v
          : globalStore.windowDimensions.width - globalStore.leftMenuWidth - 10;
        // Note that clip extent (if used) is automatically updated (in MapStore)
        // and that the path are automatically updated (triggered from MapStore too)
        setMapStore({
          mapDimensions: {
            width,
            height: mapStore.mapDimensions.height,
          },
        });
      }}
      min={10}
      max={globalStore.windowDimensions.width - globalStore.leftMenuWidth - 10}
      step={1}
      width={100}
    />
    <InputFieldNumber
      label={LL().MapConfiguration.Height()}
      value={mapStore.mapDimensions.height}
      onChange={(v) => {
        const maxSize = globalStore.windowDimensions.height - globalStore.headerHeight;
        const height = v <= maxSize
          ? v
          : globalStore.windowDimensions.height - globalStore.headerHeight - 10;
        // Note that clip extent (if used) is automatically updated (in MapStore)
        // and that the path are automatically updated (triggered from MapStore too)
        setMapStore({
          mapDimensions: {
            width: mapStore.mapDimensions.width,
            height,
          },
        });
      }}
      min={10}
      max={globalStore.windowDimensions.height - globalStore.headerHeight - 10}
      step={1}
      width={100}
    />
    <InputFieldCheckbox
      label={LL().MapConfiguration.LockZoom()}
      checked={mapStore.lockZoomPan}
      onChange={(v) => {
        setMapStore({
          lockZoomPan: v,
        });
      }}
    />
    <div class="field-block">
      <label class="label">{LL().MapConfiguration.Projection()}</label>
      <div
        classList={{ dropdown: true }}
        style={{ width: '100%' }}
        id={'map-configuration__projection-dropdown-container'}
        ref={refParentNodeDropdown!}
      >
        <div
          class="dropdown-trigger"
          style={{ width: '100%' }}
          onClick={onClickDropdown}
          onKeyDown={onKeyDownDropdown}
        >
          <button
            class="button"
            aria-haspopup="true"
            aria-controls={'map-configuration__projection-dropdown'}
            style={{ width: '100%' }}
            title={LL().MapConfiguration.Projection()}
            aria-label={LL().MapConfiguration.Projection()}
          >
        <span
          class="dropdown-item-target"
          style={{
            width: '100%',
            'text-overflow': 'ellipsis',
            overflow: 'hidden',
            'text-align': 'left',
          }}
        >
          {formatCurrentProjection(
            mapStore.projection.type,
            mapStore.projection.name,
            mapStore.projection.code,
          )}
        </span>
            <span class="icon is-small">
          <FaSolidAngleDown/>
        </span>
          </button>
        </div>
        <div class="dropdown-menu" id={'map-configuration__projection-dropdown'} role="menu" style={{ width: '100%' }}>
          <div class="dropdown-content" style={{ 'z-index': 1001 }}>
            <For each={shortListEntries()}>
              {(entry) => {
                if (entry.type === 'group') {
                  return <div
                    class="dropdown-item"
                    style={{ color: 'var(--bulma-text-weak)' }}
                  >
                    <p>{entry.name}</p>
                  </div>;
                }
                if (entry.type === 'divider') {
                  return <hr class="dropdown-divider"/>;
                }
                return <a href="#" class="dropdown-item" onClick={(ev) => {
                  if (entry.value !== 'other') setDropdownItemTarget(ev, {});
                  onChangeProjectionEntry(entry as never, LL);
                }}>
                  {entry.name}
                </a>;
              }}
            </For>
          </div>
        </div>
      </div>
    </div>
    <Show when={globalStore.projection && mapStore.projection.type === 'd3'}>
      <DetailsSummary summaryContent={LL().MapConfiguration.ShowProjectionParameters()}>
        <InputFieldRangeSlider
          label={LL().MapConfiguration.ProjectionCenterLambda()}
          value={mapStore.rotate[0]}
          onChange={(v) => {
            setMapStore('rotate', [v, mapStore.rotate[1], mapStore.rotate[2]]);
          }}
          min={-180}
          max={180}
          step={1}
        />
        <InputFieldRangeSlider
          label={LL().MapConfiguration.ProjectionCenterPhi()}
          value={mapStore.rotate[1]}
          onChange={(v) => {
            setMapStore('rotate', [mapStore.rotate[0], v, mapStore.rotate[2]]);
          }}
          min={-180}
          max={180}
          step={1}
        />
        <InputFieldRangeSlider
          label={LL().MapConfiguration.ProjectionCenterGamma()}
          value={mapStore.rotate[2]}
          onChange={(v) => {
            setMapStore('rotate', [mapStore.rotate[0], mapStore.rotate[1], v]);
          }}
          min={-180}
          max={180}
          step={1}
        />
        <Show when={hasParallel()}>
          <InputFieldRangeSlider
            label={LL().MapConfiguration.StandardParallel()}
            value={mapStore.parallel || globalStore.projection.parallel()}
            onChange={(v) => {
              setMapStore('parallel', v);
            }}
            min={-90}
            max={90}
            step={1}
          />
        </Show>
        <Show when={hasParallels()}>
          <InputFieldRangeSlider
            label={LL().MapConfiguration.StandardParallels()}
            value={mapStore.parallels || globalStore.projection.parallels()}
            onChange={(v) => {
              setMapStore('parallels', v);
            }}
            min={-90}
            max={90}
            step={1}
          />
        </Show>
      </DetailsSummary>
    </Show>
  </div>;
}
