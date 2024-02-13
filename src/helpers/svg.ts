import d3 from './d3-custom';
import { globalStore } from '../store/GlobalStore';
import type { IZoomable } from '../global';

/**
 * Get the SVG map element.
 *
 * @returns {SVGSVGElement & IZoomable}
 * @throws {Error} - If the SVG element could not be found.
 */
export const getTargetSvg = (): SVGSVGElement & IZoomable => {
  const targetSvg = document.querySelector('svg.map-zone__map');
  if (!targetSvg) {
    throw new Error('Could not find SVG element');
  }
  return targetSvg as SVGSVGElement & IZoomable;
};

const simpleRedrawRenderers = new Set(
  [
    'default',
    'choropleth',
    'smoothed',
    'discontinuity',
    'graticule',
    'sphere',
    'categoricalChoropleth',
    'cartogram',
  ],
);

/**
 * Redraw the paths of the SVG element
 * as well as the various symbols (circles, ...), using the updated projection.
 *
 * @param {SVGSVGElement & IZoomable} svgElement
 */
export const redrawPaths = (svgElement: SVGSVGElement & IZoomable) => {
  // We need to reset the __zoom property of the svg element
  // to the zoomIdentity, otherwise the zoom will not work anymore.
  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  svgElement.__zoom = d3.zoomIdentity;

  // For each layer...
  svgElement.querySelectorAll('g.layer').forEach((g) => {
    // Remove the transform attribute from the elements on which it was defined
    g.removeAttribute('transform');
    // Get the type of portrayal stored in a custom attribute
    const typePortrayal = g.getAttribute('mgt:portrayal-type')!;
    // Redraw the paths according to the type of portrayal
    if (simpleRedrawRenderers.has(typePortrayal)) {
      // We need to read the type of geometry
      // because we need to set the pointRadius for point geometries
      const type = g.getAttribute('mgt:geometry-type')!;
      if (type === 'point') {
        globalStore.pathGenerator.pointRadius(+g.getAttribute('mgt:point-radius')!);
      }

      g.querySelectorAll('path').forEach((p) => {
        p.setAttribute('d', globalStore.pathGenerator(p.__data__)); // eslint-disable-line no-underscore-dangle
      });
    } else if (typePortrayal === 'proportionalSymbols') {
      // Redraw the symbols (circles)
      g.querySelectorAll('circle').forEach((c) => {
        // eslint-disable-next-line no-underscore-dangle
        const projectedCoords = globalStore.projection(c.__data__.geometry.coordinates);
        c.setAttribute('cx', `${projectedCoords[0]}`);
        c.setAttribute('cy', `${projectedCoords[1]}`);
      });
      // Redraw the symbols (squares)
      g.querySelectorAll('rect').forEach((r) => {
        // eslint-disable-next-line no-underscore-dangle
        const projectedCoords = globalStore.projection(r.__data__.geometry.coordinates);
        const size = +r.getAttribute('width')!;
        r.setAttribute('x', `${projectedCoords[0] - size / 2}`);
        r.setAttribute('y', `${projectedCoords[1] - size / 2}`);
      });
    } else if (typePortrayal === 'labels') {
      g.querySelectorAll('text').forEach((t) => {
        // eslint-disable-next-line no-underscore-dangle
        const projectedCoords = globalStore.projection(t.__data__.geometry.coordinates);
        t.setAttribute('x', `${projectedCoords[0]}`);
        t.setAttribute('y', `${projectedCoords[1]}`);
      });
    }
  });
  // Also redraw the path elements in the defs
  svgElement.querySelectorAll('defs clipPath > path').forEach((p) => {
    // eslint-disable-next-line no-underscore-dangle
    p.setAttribute('d', globalStore.pathGenerator(p.__data__));
  });
};
