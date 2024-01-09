// Imports from solid-js
import {
  createMemo,
  For,
  JSX,
  Show,
} from 'solid-js';

// Helpers
import { getClassifier } from '../../helpers/classification';
import { unproxify } from '../../helpers/common';
import { mergeFilterIds } from './common.tsx';

// Stores
import { applicationSettingsStore, RenderVisibility } from '../../store/ApplicationSettingsStore';
import { globalStore } from '../../store/GlobalStore';

// Directives
import bindData from '../../directives/bind-data';

// Types / Interfaces / Enums
import {
  ClassificationMethod,
  LayerDescriptionSmoothedLayer,
  SmoothedLayerParameters,
} from '../../global.d';

// For now we keep an array of directives
// because otherwise the import is not detected by the compiler...
const directives = [ // eslint-disable-line @typescript-eslint/no-unused-vars
  bindData,
];

export default function smoothedMapRenderer(
  layerDescription: LayerDescriptionSmoothedLayer,
): JSX.Element {
  const rendererParameters = createMemo(
    () => layerDescription.rendererParameters as SmoothedLayerParameters,
  );

  const classifier = createMemo(() => {
    const Cls = getClassifier(ClassificationMethod.manual);
    return new Cls(null, null, rendererParameters().breaks);
  });

  const colors = createMemo(
    () => (rendererParameters().reversePalette
      ? rendererParameters().palette.colors.toReversed()
      : rendererParameters().palette.colors),
  );

  return <g
    id={layerDescription.id}
    class="layer choropleth"
    visibility={layerDescription.visible ? undefined : 'hidden'}
    fill-opacity={layerDescription.fillOpacity}
    stroke={layerDescription.strokeColor}
    stroke-width={layerDescription.strokeWidth}
    stroke-opacity={layerDescription.strokeOpacity}
    stroke-linecap="round"
    stroke-linejoin="round"
    clip-path="url(#clip-sphere)"
    filter={mergeFilterIds(layerDescription)}
    shape-rendering={layerDescription.shapeRendering}
  >
    <For each={layerDescription.data.features}>
      {
        (feature) => <path
          fill={
            colors()[classifier().getClass(feature.properties.center)]
          }
          d={globalStore.pathGenerator(feature)}
          vector-effect="non-scaling-stroke"
          use:bindData={unproxify(feature)}
        />
      }
    </For>
  </g>;
}
