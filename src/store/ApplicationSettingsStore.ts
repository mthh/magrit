import { createStore } from 'solid-js/store';
import { CustomPalette, LegendTextElement } from '../global';

export enum RenderVisibility {
  RenderAsHidden,
  // RenderAsDisplayNone,
  DoNotRender,
}

export enum ZoomBehavior {
  Redraw,
  Transform,
}

export enum ResizeBehavior {
  ShrinkGrow,
  KeepMapSize,
}

const getUserLocale = () => (navigator.languages && navigator.languages.length
  ? navigator.languages[0]
  : navigator.language || 'en-US');

// A bunch of (global) settings for the application
// (this is not the same as GlobalStore, which contains the state of the application)
export type ApplicationSettingsStoreType = {
  // The default color scheme for the Choropleth representation
  defaultColorScheme: string,
  // The default "no data" color for the Choropleth representation
  defaultNoDataColor: string,
  // The default behavior when zooming
  // (either redraw the paths or apply a transform to the SVG)
  zoomBehavior: ZoomBehavior,
  // The default behavior when the user resizes the window
  // (either shrink / grow the map or keep the same size and add scrollbars if necessary)
  resizeBehavior: ResizeBehavior,
  // Whether to render layers that are not visible (selected
  // by the user in the Layer Manager) with
  // visibility: hidden (RenderVisibility.RenderAsHidden)
  // or don't render them at all (RenderVisibility.DoNotRender).
  // Not rendering layer that are not visible is faster but
  // when exporting the map to SVG, the user may want to export
  // all the layers, even the ones that are not visible
  // (in the future we may never render the layers that are not visible
  // but add them with visibility:hidden only in the SVG export).
  renderVisibility: RenderVisibility,
  // Whether to use a clip extent when rendering the map.
  // This is useful when the user zooms a lot, and some of the map
  // is rendered outside the SVG viewport (which is not visible
  // but can be computationally expensive to render).
  useClipExtent: boolean,
  // Default font size for legends
  defaultLegendSettings: {
    spacing: number,
    title: Partial<LegendTextElement>,
    subtitle: Partial<LegendTextElement>,
    labels: Partial<LegendTextElement>,
    note: Partial<LegendTextElement>,
  },
  // The locale of the browser (used for formatting numbers and dates)
  userLocale: string,
  // The color of the snapping grid that the user can display
  // to align layout features / legends on the map
  snappingGridColor: string,
  // The custom palettes defined by the user
  customPalettes: CustomPalette[],
};

const [
  applicationSettingsStore,
  setApplicationSettingsStore,
] = createStore({
  defaultColorScheme: 'YlOrRd',
  defaultNoDataColor: '#ffffff',
  zoomBehavior: ZoomBehavior.Redraw,
  resizeBehavior: ResizeBehavior.ShrinkGrow,
  renderVisibility: RenderVisibility.DoNotRender,
  useClipExtent: false,
  snappingGridColor: '#808080',
  defaultLegendSettings: {
    spacing: 5,
    title: {
      fontSize: 13,
      fontFamily: 'Sans-serif',
      fontColor: '#000000',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      fontFamily: 'Sans-serif',
      fontColor: '#000000',
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    labels: {
      fontSize: 11,
      fontFamily: 'Sans-serif',
      fontColor: '#000000',
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    note: {
      fontSize: 11,
      fontFamily: 'Sans-serif',
      fontColor: '#000000',
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
  },
  userLocale: getUserLocale(),
} as ApplicationSettingsStoreType);

export {
  applicationSettingsStore,
  setApplicationSettingsStore,
};
