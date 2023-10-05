// Imports from solid-js
import { For, JSX } from 'solid-js';

// Stores
import { globalStore } from '../../store/GlobalStore';

// Helpers
import { coordsPointOnFeature } from '../../helpers/geo';

// Types / Interfaces / Enums
import { LayerDescription, ProportionalSymbolsParameters, ProportionalSymbolsSymbolType } from '../../global.d';

/* eslint-disable no-mixed-operators */
const PropSizer = function PropSizer(
  fixedValue: number,
  fixedSize: number,
  symbolType: ProportionalSymbolsSymbolType,
) {
  this.fixedValue = fixedValue;
  const { sqrt, abs } = Math;
  if (symbolType === ProportionalSymbolsSymbolType.circle) {
    const { PI } = Math;
    this.smax = fixedSize * fixedSize * PI;
    this.scale = (val) => sqrt(abs(val) * this.smax / this.fixedValue) / PI;
    this.get_value = (size) => ((size * PI) ** 2) / this.smax * this.fixedValue;
  } else if (symbolType === ProportionalSymbolsSymbolType.line) {
    this.smax = fixedSize;
    this.scale = (val) => abs(val) * this.smax / this.fixedValue;
    this.get_value = (size) => size / this.smax * this.fixedValue;
  } else { // symbolType === ProportionalSymbolsSymbolType.square
    this.smax = fixedSize * fixedSize;
    this.scale = (val) => sqrt(abs(val) * this.smax / this.fixedValue);
    this.get_value = (size) => (size ** 2) / this.smax * this.fixedValue;
  }
}; /* eslint-enable no-mixed-operators */

export default function proportionalSymbolsRenderer(
  layerDescription: LayerDescription,
): JSX.Element {
  // This should never happen...
  // We are doing it to inform TypeScript that we are sure that the rendererParameters
  // property is not null (and so avoid the "Object is possibly 'null'" warning)
  if (layerDescription.rendererParameters == null) {
    throw Error('Unexpected Error: Renderer parameters not found');
  }
  // Will scale the symbols according to the value of the variable
  const propSize = new (PropSizer as any)(
    layerDescription.rendererParameters.referenceValue,
    layerDescription.rendererParameters.referenceRadius,
    layerDescription.rendererParameters.symbolType,
  );

  // The parameters for this renderer
  const rendererParameters = layerDescription.rendererParameters as ProportionalSymbolsParameters;

  return <g
    id={layerDescription.name}
    class="layer proportional-symbols"
    visibility={layerDescription.visible ? undefined : 'hidden'}
    fill-opacity={layerDescription.fillOpacity}
    stroke={layerDescription.strokeColor}
    stroke-width={layerDescription.strokeWidth}
    stroke-opacity={layerDescription.strokeOpacity}
    stroke-linecap="round"
    stroke-linejoin="round"
    filter={layerDescription.dropShadow ? `url(#filter-drop-shadow-${layerDescription.id})` : undefined}
  >
    <For each={layerDescription.data.features}>
      {
        (feature) => {
          const coords = coordsPointOnFeature(feature.geometry);
          const projectedCoords = globalStore.projection(coords);
          if (rendererParameters.symbolType === ProportionalSymbolsSymbolType.circle) {
            const symbolSize = propSize.scale(
              feature.properties[layerDescription.rendererParameters!.variable],
            );
            const el = <circle
              r={symbolSize}
              cx={projectedCoords[0]}
              cy={projectedCoords[1]}
              fill={layerDescription.rendererParameters!.color}
            ></circle>;
            el.__data__ = feature; // eslint-disable-line no-underscore-dangle
            return el;
          }
          if (rendererParameters.symbolType === ProportionalSymbolsSymbolType.square) {
            const symbolSize = propSize.scale(
              feature.properties[layerDescription.rendererParameters!.variable],
            );
            const el = <rect
              width={symbolSize}
              height={symbolSize}
              x={projectedCoords[0] - symbolSize / 2}
              y={projectedCoords[1] - symbolSize / 2}
              fill={layerDescription.rendererParameters!.color}
            ></rect>;
            el.__data__ = feature; // eslint-disable-line no-underscore-dangle
            return el;
          }
          return null;
        }
      }
    </For>
  </g>;
}
