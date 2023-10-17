import { createStore } from 'solid-js/store';
import { JSX } from 'solid-js';

type ModalStoreType = {
  show: boolean,
  title: string | null,
  content: JSX.Element | (() => JSX.Element) | string | null,
  confirmCallback: (() => void) | null,
  cancelCallback: (() => void) | null,
  successButton: string | null,
  cancelButton: string | null,
  escapeKey: 'confirm' | 'cancel' | null,
  width?: number,
};

const [
  modalStore,
  setModalStore,
] = createStore({
  show: false,
  title: null,
  content: null,
  confirmCallback: null,
  cancelCallback: null,
  successButton: null,
  cancelButton: null,
  escapeKey: null,
  width: undefined,
} as ModalStoreType);

export {
  modalStore,
  setModalStore,
};
