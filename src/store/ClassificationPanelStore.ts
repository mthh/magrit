import { createStore } from 'solid-js/store';
import { ClassificationMethod, ClassificationParameters } from '../global';

type ClassificationPanelStoreType = {
  show: boolean,
  layerName?: string,
  variableName?: string,
  series?: any[],
  classificationMethod?: ClassificationMethod,
  nClasses?: number,
  colorScheme?: string,
  invertColorScheme?: boolean,
  onConfirm?: (classification: ClassificationParameters) => void,
  onCancel?: () => void,
  noDataColor?: string,
};

const [
  classificationPanelStore,
  setClassificationPanelStore,
] = createStore({
  show: false,
  layerName: undefined,
  variableName: undefined,
  series: undefined,
  classificationMethod: undefined,
  nClasses: undefined,
  colorScheme: undefined,
  invertColorScheme: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  noDataColor: undefined,
} as ClassificationPanelStoreType);

export {
  classificationPanelStore,
  setClassificationPanelStore,
};
