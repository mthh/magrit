// Import from solid-js
import {
  createEffect,
  For, JSX, onMount, Show,
} from 'solid-js';

// Import from other packages
import { getColors } from 'dicopal';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';

// Stores
import { applicationSettingsStore } from '../../store/ApplicationSettingsStore';

// Sub-components and helpers for legend rendering
import {
  contextMenuLegend,
  makeLegendSubtitle,
  makeLegendTitle,
  makeLegendNote,
  makeRectangleBox,
  computeRectangleBox,
  bindMouseEnterLeave,
  bindDragBehavior,
  getTextSize,
} from './common.tsx';

// Import some type descriptions
import {
  type ClassificationParameters,
  type LayerDescription,
  Orientation,
  RenderVisibility,
} from '../../global.d';

const defaultSpacing = 5;

function choroplethVerticalLegend(layer: LayerDescription): JSX.Element {
  // Check that the layer has all the required attributes
  // Since this is done during layer creation, this should not happen in practice,
  // and the following checks are here:
  // - to make Typescript happy
  // - to make sure the layer is correctly defined.
  // In the future, we might want to remove these checks.
  if (!layer.rendererParameters) {
    throw new Error('Classification attribute is not defined - this should not happen');
  }
  const rendererParameters = layer.rendererParameters as ClassificationParameters;

  if (!rendererParameters.palette) {
    throw new Error('Classification.palette attribute is not defined - this should not happen');
  }
  if (!layer.legend) {
    throw new Error('Legend attribute is not defined - this should not happen');
  }

  const { LL } = useI18nContext();

  const colors = getColors(
    rendererParameters.palette.name,
    rendererParameters.classes,
    rendererParameters.reversePalette,
  ) as string[]; // this can't be undefined because we checked it above

  if (!colors) {
    throw new Error(`Could not get colors for scheme ${layer.rendererParameters.palette.name}`);
  }

  let distanceToTop = 0;
  if (layer.legend.title) {
    distanceToTop += +(layer.legend.title.fontSize.replace('px', '')) + 10;
  }
  if (layer.legend.subtitle) {
    distanceToTop += +(layer.legend.subtitle.fontSize.replace('px', '')) + 10;
  }
  const boxHeightAndSpacing = layer.legend.boxHeight + layer.legend.boxSpacing;
  // const totalLegendHeight = distanceToTop + colors.length * boxHeightAndSpacing + 20;
  // const totalLegendWidth = layer.legend.boxWidth + layer.legend.boxSpacing + 30;

  let refElement: SVGElement;

  const bindElementsLegend = () => {
    computeRectangleBox(refElement);
    bindMouseEnterLeave(refElement);
    bindDragBehavior(refElement, layer);
    refElement.style.cursor = 'grab'; // eslint-disable-line no-param-reassign
  };

  // onMount(() => {
  //   bindElementsLegend();
  // });

  createEffect(() => {
    if (refElement && layer.visible && layer.legend.visible) {
      bindElementsLegend();
    }
  });

  // console.log(
  //   getTextSize(
  //     layer.legend.title.text,
  //     layer.legend.title.fontSize,
  //     layer.legend.title.fontFamily,
  //   ),
  // );

  return <Show when={
    applicationSettingsStore.renderVisibility === RenderVisibility.RenderAsHidden
    || (layer.visible && layer.legend.visible)
  }>
    <g
      ref={refElement}
      class="legend choropleth"
      transform={`translate(${layer.legend.position[0]}, ${layer.legend.position[1]})`}
      visibility={layer.visible && layer.legend.visible ? undefined : 'hidden'}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contextMenuLegend(e, layer.id, LL);
      } }
    >
      { makeRectangleBox() }
      { makeLegendTitle(layer.legend.title) }
      { makeLegendSubtitle(layer.legend.subtitle) }
      { makeLegendNote(layer.legend.note) }
      <g class="legend-content">
        <For each={colors.toReversed()}>
          {
            (color, i) => <rect
              fill={color}
              x={0}
              y={distanceToTop + i() * boxHeightAndSpacing}
              rx={layer.legend.boxCornerRadius}
              ry={layer.legend.boxCornerRadius}
              width={layer.legend.boxWidth}
              height={layer.legend.boxHeight}
            />
          }
        </For>
        <For each={layer.rendererParameters.breaks}>
          {
            (value, i) => <text
              x={layer.legend.boxWidth + layer.legend.boxSpacing}
              y={distanceToTop + i() * (layer.legend.boxHeight + layer.legend.boxSpacing)}
              font-size={layer.legend.labels.fontSize}
              font-family={layer.legend.labels.fontFamily}
              font-color={layer.legend.labels.fontColor}
              font-style={layer.legend.labels.fontStyle}
              font-weight={layer.legend.labels.fontWeight}
              style={{ 'user-select': 'none' }}
              text-anchor="start"
              alignment-baseline="middle"
            >{ value }</text>
          }
        </For>
      </g>
    </g>
  </Show>;
}

function choroplethHorizontalLegend(layer: LayerDescription): JSX.Element {
  // Check that the layer has all the required attributes
  // Since this is done during layer creation, this should not happen in practice
  // and the following checks are here:
  // - to make Typescript happy
  // - to make sure that the layer is correctly defined.
  // In the future, we might want to remove these checks.
  if (!layer.rendererParameters) {
    throw new Error('Classification attribute is not defined - this should not happen');
  }
  const rendererParameters = layer.rendererParameters as ClassificationParameters;

  if (!rendererParameters.palette) {
    throw new Error('Classification.palette attribute is not defined - this should not happen');
  }
  if (!layer.legend) {
    throw new Error('Legend attribute is not defined - this should not happen');
  }

  const { LL } = useI18nContext();
  const colors = getColors(
    rendererParameters.palette.name,
    rendererParameters.classes,
    rendererParameters.reversePalette,
  ) as string[]; // this can't be undefined because we checked it above

  if (!colors) {
    throw new Error(`Could not get colors for scheme ${rendererParameters.palette.name}`);
  }

  // We need to compute the position of:
  // - the legend title
  // - the legend (optional) subtitle
  // - the legend note
  // To do so, we need to know the size of each of these elements (and the presence / absence of
  // each of them).
  const heightTitle = getTextSize(
    layer.legend.title.text,
    layer.legend.title.fontSize,
    layer.legend.title.fontFamily,
  ).height + defaultSpacing;

  const heightSubtitle = layer.legend.subtitle
    ? getTextSize(
      layer.legend.subtitle.text,
      layer.legend.subtitle.fontSize,
      layer.legend.subtitle.fontFamily,
    ).height + defaultSpacing
    : 0;

  const heightBox = layer.legend.boxHeight + defaultSpacing;

  const heightLegendLabels = getTextSize(
    '12.75',
    layer.legend.labels.fontSize,
    layer.legend.labels.fontFamily,
  ).height + defaultSpacing;

  // The y-position at which the boxes should be placed
  const distanceBoxesToTop = heightTitle + heightSubtitle;

  // The y-position at which the legend labels should be placed
  const distanceLabelsToTop = heightTitle + heightSubtitle + heightBox;

  // The y-position at which the legend note should be placed
  const distanceNoteToTop = heightTitle
    + heightSubtitle
    + heightBox
    + heightLegendLabels;

  let refElement: SVGElement;

  const bindElementsLegend = () => {
    computeRectangleBox(refElement);
    bindMouseEnterLeave(refElement);
    bindDragBehavior(refElement, layer);
    refElement.style.cursor = 'grab'; // eslint-disable-line no-param-reassign
  };

  // onMount(() => {
  //   bindElementsLegend();
  // });

  createEffect(() => {
    if (refElement && layer.visible && layer.legend.visible) {
      bindElementsLegend();
    }
  });

  return <Show when={
    applicationSettingsStore.renderVisibility === RenderVisibility.RenderAsHidden
    || (layer.visible && layer.legend.visible)
  }>
    <g
      ref={refElement}
      class="legend choropleth"
      transform={`translate(${layer.legend.position[0]}, ${layer.legend.position[1]})`}
      visibility={layer.visible && layer.legend.visible ? undefined : 'hidden'}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contextMenuLegend(e, layer.id, LL);
      } }
    >
      { makeRectangleBox() }
      { makeLegendTitle(layer.legend.title, [0, 0]) }
      { makeLegendSubtitle(layer.legend.subtitle, [0, 0]) }
      { makeLegendNote(layer.legend.note, [0, distanceNoteToTop]) }
      <g class="legend-content" pointer-events={'none'}>
        <For each={colors}>
          {
            (color, i) => <rect
              fill={color}
              x={i() * (layer.legend.boxWidth + layer.legend.boxSpacing)}
              y={distanceBoxesToTop}
              rx={layer.legend.boxCornerRadius}
              ry={layer.legend.boxCornerRadius}
              width={layer.legend.boxWidth}
              height={layer.legend.boxHeight}
            />
          }
        </For>
        <For each={layer.rendererParameters.breaks}>
          {
            (value, i) => <text
              x={(i() * (layer.legend.boxWidth + layer.legend.boxSpacing)) - 10}
              y={distanceLabelsToTop}
              font-size={layer.legend.labels.fontSize}
              font-family={layer.legend.labels.fontFamily}
              font-color={layer.legend.labels.fontColor}
              font-style={layer.legend.labels.fontStyle}
              font-weight={layer.legend.labels.fontWeight}
              style={{ 'user-select': 'none' }}
              text-anchor="start"
              alignment-baseline="middle"
            >{ value }</text>
          }
        </For>
      </g>
    </g>
  </Show>;
}

export default function legendChoropleth(layer: LayerDescription): JSX.Element {
  return layer.legend.orientation === Orientation.vertical
    ? choroplethVerticalLegend(layer)
    : choroplethHorizontalLegend(layer);
}
