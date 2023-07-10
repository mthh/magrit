import { LocalizedString } from 'typesafe-i18n';
import { JSX, onMount } from 'solid-js';
import { useI18nContext } from '../../i18n/i18n-solid';
import { modalStore, setModalStore } from '../../store/ModalStore';
import '../../styles/ModalWindow.css';

export default function DefaultModal(): JSX.Element {
  const { LL } = useI18nContext();
  const successButton: LocalizedString = LL()[modalStore.successButton || 'SuccessButton']();
  const cancelButton: LocalizedString = LL()[modalStore.cancelButton || 'CancelButton']();
  const confirmCallback = modalStore.confirmCallback || (() => {});
  const cancelCallback = modalStore.cancelCallback || (() => {});

  let refParentNode: HTMLDivElement;

  onMount(() => {
    // Set focus on the confirm button when the modal is shown
    const confirmButton = (refParentNode as HTMLDivElement).querySelector('.button.is-success') as HTMLElement;
    if (confirmButton) {
      confirmButton.focus();
    }
  });

  return <div class="modal-window modal" style={{ display: 'flex' }} ref={refParentNode}>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{ modalStore.title }</p>
        {/* <button class="delete" aria-label="close"></button> */}
      </header>
      <section class="modal-card-body">
        { modalStore.content }
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          onClick={ () => { confirmCallback(); setModalStore({ show: false, content: null }); } }
        >{ successButton }</button>
        <button
          class="button"
          onClick={ () => { cancelCallback(); setModalStore({ show: false, content: null }); } }
        >{ cancelButton }</button>
      </footer>
    </div>
  </div>;
}
