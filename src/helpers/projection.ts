import proj4, { InterfaceProjection } from 'proj4';

import d3, { type GeoProjection, type GeoRawProjection } from './d3-custom';

import { degToRadConstant, radToDegConstant } from './math';

import epsg from '../assets/epsg.json';

import type {
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  GeoJSONGeometryType,
  GeoJSONPosition,
} from '../global';

export interface EpsgDbEntryType {
  code: string,
  kind: string,
  name: string,
  bbox: number[],
  wkt: string | null,
  proj4: string | null,
  unit: string | null,
  area: string | null,
  accuracy: number | null,
}

export interface EpsgDbType {
  [key: string]: EpsgDbEntryType
}

// TODO: we will filter out entries with null proj4 string or null wkt
//   directly in the source file to avoid loading a lot of useless data
export const epsgDb: EpsgDbType = Object.fromEntries(
  Object.entries(epsg)
    .filter(([k, v]) => ['CRS-GEOGCRS', 'CRS-PROJCRS'].includes(v.kind) && (v.proj4 || v.wkt)),
) as EpsgDbType;

/**
 * Convert a proj4 string to an object.
 * This is notably used to compare two proj4 strings.
 *
 * @param projString - The string describing the projection.
 * @returns {object} - The proj4 string as an object.
 */
const proj4stringToObj = (projString: string): { [key: string]: string | boolean } => {
  // The resulting obj
  const o: { [key: string]: string | boolean } = {};
  // Split the string into an array of strings and sort by the future key
  // (will allow fast comparison)
  const a = projString.trim().split(' ')
    .map((el) => el.replace('+', '')).sort();
  // Loop over the array and split each element into a key/value pair
  a.forEach((el) => {
    if (el.includes('=')) {
      const [k, v] = el.split('=');
      if (!(k === 'towgs84' && v === '0,0,0,0,0,0,0')) {
        o[k] = v;
      }
    } else {
      const k = el;
      o[k] = true;
    }
  });
  return o;
};

/**
 * Parse two proj4 strings and compare if they are equivalent.
 *
 * @param {string} proj1
 * @param {string} proj2
 */
export const projEquals = (proj1: string, proj2: string): boolean => {
  const p1 = proj4stringToObj(proj1);
  const p2 = proj4stringToObj(proj2);
  // Fast comparison between the objects, given the fact the key were sorted
  return JSON.stringify(p1) === JSON.stringify(p2);
};

/**
 * Get a d3 projection from a proj4 projection object.
 *
 * @param {InterfaceProjection} proj - The proj4js projection object.
 * @returns {GeoProjection} - The d3 projection.
 */
export const getD3ProjectionFromProj4 = (proj: InterfaceProjection): GeoProjection => {
  // Create the custom d3 projection using proj 4 forward and inverse functions.
  // We just use constant values to convert from degrees to radians and vice versa
  // to avoid capturing any variable from the closure.
  const projRaw: GeoRawProjection = (
    lambda: number,
    phi: number,
  ) => proj.forward([lambda * 57.29577951308232, phi * 57.29577951308232]) as [number, number];

  projRaw.invert = (x: number, y: number): [number, number] => {
    const p = proj.inverse([x, y]);
    return [p[0] * 0.017453292519943295, p[1] * 0.017453292519943295];
  };

  return d3.geoProjection(projRaw);
};

export const getProjection = (projString: string): InterfaceProjection => {
  // TODO: maybe we should resolve EPSG -> proj4 string here
  //  (and throw an error if the EPSG code isn't found)
  try {
    return proj4(projString);
  } catch (e) {
    // Error messages from proj4js are not very helpful
    // (as they only contains the input string)
    // So we throw a more informative message that will be caught
    // by the caller.
    // TODO: diagnose why proj4js failed to parse the string
    //   and throw the appropriate error message
    throw new Error(`Invalid proj4 string: ${projString}`);
  }
};

const reprojGeom = (geom: GeoJSONGeometryType, proj: GeoProjection, invert: boolean = false) => {
  const projFunc = invert
    ? (coord) => proj.invert(coord)
    : (coord) => proj(coord);

  if (geom.type === 'Point') {
    // eslint-disable-next-line no-param-reassign
    geom.coordinates = projFunc([geom.coordinates[0], geom.coordinates[1]]) as GeoJSONPosition;
  } else if (geom.type === 'MultiPoint') {
    // eslint-disable-next-line no-param-reassign
    geom.coordinates = geom.coordinates
      .map((coords) => projFunc([coords[0], coords[1]]) as GeoJSONPosition);
  } else if (geom.type === 'LineString') {
    // eslint-disable-next-line no-param-reassign
    geom.coordinates = geom.coordinates
      .map((coords) => projFunc([coords[0], coords[1]]) as GeoJSONPosition);
  } else if (geom.type === 'MultiLineString') {
    // eslint-disable-next-line no-param-reassign
    geom.coordinates
      .map((line) => line.map(
        (coords) => projFunc([coords[0], coords[1]]) as GeoJSONPosition,
      ));
  } else if (geom.type === 'Polygon') {
    // eslint-disable-next-line no-param-reassign
    geom.coordinates = geom.coordinates
      .map((ring) => ring.map(
        (coords) => projFunc([coords[0], coords[1]]) as GeoJSONPosition,
      ));
  } else if (geom.type === 'MultiPolygon') {
    // eslint-disable-next-line no-param-reassign
    geom.coordinates = geom.coordinates
      .map((poly) => poly.map(
        (ring) => ring.map((coords) => projFunc([coords[0], coords[1]]) as GeoJSONPosition),
      ));
  } else if (geom.type === 'GeometryCollection') {
    // eslint-disable-next-line no-param-reassign
    geom.geometries = geom.geometries
      .map((g) => reprojGeom(g as GeoJSONGeometryType, proj, invert));
  }
};

export const reprojWithD3 = (
  proj: GeoProjection,
  data: GeoJSONFeatureCollection,
  invert: boolean = false,
): GeoJSONFeatureCollection => {
  const newData = JSON.parse(JSON.stringify(data));
  newData.features.forEach((f: GeoJSONFeature) => {
    reprojGeom(f.geometry, proj, invert);
  });
  return newData;
};
