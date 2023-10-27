// Imports from solid-js
import { createEffect, on } from 'solid-js';
import { createStore } from 'solid-js/store';

// Helpers
import { unproxify } from '../helpers/common';
import d3 from '../helpers/d3-custom';
import { redrawPaths } from '../helpers/svg';

// Stores
import { debouncedPushUndoStack, resetRedoStackStore } from './stateStackStore';
import { globalStore, setGlobalStore } from './GlobalStore';
import { applicationSettingsStore } from './ApplicationSettingsStore';

// Types
import type { IZoomable, ProjectionDefinition } from '../global';

export type MapStoreType = {
  projection: ProjectionDefinition,
  translate: number[],
  scale: number,
  center: number[],
  rotate: number[],
  mapDimensions: { width: number, height: number },
  backgroundColor: string,
  backgroundColorOpacity: number,
  lockZoomPan: boolean,
};

const [
  mapStore,
  setMapStoreBase,
] = createStore({
  projection: {
    type: 'd3',
    value: 'geoNaturalEarth2',
    name: 'NaturalEarth2',
  },
  translate: [0, 0],
  scale: 1,
  center: [0, 0],
  rotate: [0, 0, 0],
  mapDimensions: { width: 0, height: 0 },
  backgroundColor: '#ffffff',
  backgroundColorOpacity: 1,
  lockZoomPan: false,
} as MapStoreType);

const getDefaultClipExtent = () => (
  applicationSettingsStore.useClipExtent
    ? [
      [-100, -100],
      [mapStore.mapDimensions.width + 100, mapStore.mapDimensions.height + 100],
    ] : null
);
/**
 * This is a wrapper around the setMapStoreBase function.
 * The wrapper is used to push the current state to the undo stack
 * before actually updating the store.
 */
const setMapStore = (...args: any[]) => {
  // Push the current state to the undo stack
  debouncedPushUndoStack('mapStore', unproxify(mapStore));
  // Reset the redo stack
  resetRedoStackStore();
  // Update the store
  setMapStoreBase.apply(null, args as never); // eslint-disable-line prefer-spread
};

// We want to redraw path automatically when the mapStore is updated
// So we listen here to the mapStore scale, translate and rotate properties
// and update the projection accordingly, then redraw the paths
createEffect(() => {
  if (
    !globalStore.projection
  ) {
    return;
  }
  // Update projection
  globalStore.projection
    .scale(mapStore.scale)
    .translate(mapStore.translate)
    .rotate(mapStore.rotate)
    // .preclip(d3.geoClipPolygon({
    //   type: 'Polygon',
    //   coordinates: [[
    //     [10.38, 41.15], [-9.86, 41.15], [-9.86, 51.56], [10.38, 51.56], [10.38, 41.15],
    //   ]],
    // }))
    .clipExtent(getDefaultClipExtent());

  const targetSvg = document.querySelector('svg.map-zone__map');
  if (!targetSvg) {
    return;
  }

  redrawPaths(targetSvg as SVGSVGElement & IZoomable);
});

// We want to update the projection and pathGenerator when the mapStore is updated
// So we listen here to the mapStore projection property and update the projection accordingly
createEffect(
  on(
    () => mapStore.projection.value,
    () => {
      const projection = d3[mapStore.projection.value]()
        .center(mapStore.center)
        .translate(mapStore.translate)
        .scale(mapStore.scale)
        // .preclip(d3.geoClipPolygon({
        //   type: 'Polygon',
        //   coordinates: [[
        //     [10.38, 41.15], [-9.86, 41.15], [-9.86, 51.56], [10.38, 51.56], [10.38, 41.15],
        //   ]],
        // }))
        .clipExtent(getDefaultClipExtent());
      const pathGenerator = d3.geoPath(projection);

      setGlobalStore(
        'projection',
        () => projection,
      );
      setGlobalStore(
        'pathGenerator',
        () => pathGenerator,
      );
    },
  ),
);

export {
  mapStore,
  setMapStoreBase,
  setMapStore,
  getDefaultClipExtent,
};
