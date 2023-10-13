import { LayerDescription } from '../global';

const supportedLayerTypes = ['point', 'linestring', 'polygon'];
const isExportableLayer = (layerDescription: LayerDescription) => (
  layerDescription.data.type === 'FeatureCollection' && supportedLayerTypes.includes(layerDescription.type));

const isCandidateForRepresentation = (layerDescription: LayerDescription) => (
  layerDescription.data.type === 'FeatureCollection'
  && supportedLayerTypes.includes(layerDescription.type)
  && layerDescription.fields && layerDescription.fields.length > 0
);

export {
  isExportableLayer,
  isCandidateForRepresentation,
};
