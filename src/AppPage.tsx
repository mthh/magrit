// Imports from solid-js
import {
  JSX, onCleanup, onMount, Show,
} from 'solid-js';

// Imports from other packages
import initGdalJs from 'gdal3.js';
import workerUrl from 'gdal3.js/dist/package/gdal3.js?url'; // eslint-disable-line import/extensions
import dataUrl from 'gdal3.js/dist/package/gdal3WebAssembly.data?url';
import wasmUrl from 'gdal3.js/dist/package/gdal3WebAssembly.wasm?url';
import { Transition } from 'solid-transition-group';
import toast, { Toaster } from 'solid-toast';
import { yieldOrContinue } from 'main-thread-scheduling';

// Helpers
import { useI18nContext } from './i18n/i18n-solid';
import { clickLinkFromDataUrl } from './helpers/exports';
import { draggedElementsAreFiles, isAuthorizedFile, prepareFileExtensions } from './helpers/fileUpload';
import { round } from './helpers/math';
import { initDb, storeProject } from './helpers/storage';

// Sub-components
import AboutModal from './components/Modals/AboutModal.tsx';
import FieldTypingModal from './components/Modals/FieldTypingModal.tsx';
import DefaultModal from './components/Modals/ModalWindow.tsx';
import LeftMenu from './components/LeftMenu/LeftMenu.tsx';
import LoadingOverlay from './components/LoadingOverlay.tsx';
import MapZone from './components/MapZone.tsx';
import NiceAlert from './components/Modals/NiceAlert.tsx';
import TableWindow from './components/Modals/TableWindow.tsx';
import ClassificationPanel from './components/Modals/ClassificationPanel.tsx';
import { HeaderBarApp } from './components/Headers.tsx';
import ExampleDataModal from './components/Modals/ExampleDatasetModal.tsx';
import ContextMenu from './components/ContextMenu.tsx';
import ImportWindow from './components/ImportWindow.tsx';
// import ReloadPrompt from './components/ReloadPrompt.tsx';

// Stores
import { classificationPanelStore } from './store/ClassificationPanelStore';
import { fieldTypingModalStore } from './store/FieldTypingModalStore';
import { globalStore, setGlobalStore, setLoading } from './store/GlobalStore';
import {
  type MapStoreType,
  mapStore,
  setMapStore,
  setMapStoreBase,
} from './store/MapStore';
import {
  defaultLayersDescription,
  layersDescriptionStore,
  setLayersDescriptionStore,
} from './store/LayersDescriptionStore';
import { modalStore, setModalStore } from './store/ModalStore';
import { niceAlertStore, setNiceAlertStore } from './store/NiceAlertStore';
import { fileDropStore, setFileDropStore } from './store/FileDropStore';
import { tableWindowStore } from './store/TableWindowStore';
import { applicationSettingsStore, ResizeBehavior } from './store/ApplicationSettingsStore';
import { datasetCatalogStore } from './store/DatasetCatalogStore';
import { contextMenuStore, resetContextMenuStore } from './store/ContextMenuStore';
import { resetUndoRedoStackStore } from './store/stateStackStore';
import { undo, redo } from './store/undo-redo';

// Types and enums
import type {
  DexieDb,
  LayerDescription,
  LayoutFeature,
  TableDescription,
} from './global';

// Other stuff
import { version } from '../package.json';

// Styles
import './styles/Transitions.css';

const loadGdal = async (): Promise<Gdal> => initGdalJs({
  paths: {
    wasm: wasmUrl,
    data: dataUrl,
    js: workerUrl,
  },
  useWorker: true,
});

let timeout: NodeJS.Timeout | null | undefined = null;

const db = initDb() as DexieDb;

const onBeforeUnloadWindow = (ev: Event) => {
  // If there is no layer or if
  // there is only the sphere layer and or the graticule layer,
  // do nothing
  if (!globalStore.userHasAddedLayer) {
    return;
  }

  // This is to prevent the browser from closing the window (or tab)
  // by displaying a confirmation dialog.
  ev.returnValue = true; // eslint-disable-line no-param-reassign

  // Otherwise we store the state of the current projet
  // in the local DB (indexedDB via Dexie)
  const { layers, layoutFeatures, tables } = layersDescriptionStore;
  const map = { ...mapStore };
  const obj = {
    layers,
    layoutFeatures,
    map,
    tables,
  };

  storeProject(db, obj);
};

const dragEnterHandler = (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();
  // Only files should trigger the opening of the drop overlay
  if (!draggedElementsAreFiles(e as DragEvent)) return;

  setFileDropStore({ show: true });
  // clearTimeout(timeout);
};

const dragOverHandler = (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();
  // Only files should trigger the opening of the drop overlay
  if (!draggedElementsAreFiles(e as DragEvent)) return;

  setFileDropStore({ show: true });
  if (timeout) {
    clearTimeout(timeout);
    // timeout = setTimeout(() => {
    //   setOverlayDropStore({ show: false });
    //   timeout = null;
    // }, 2500);
  }
};

const dragLeaveHandler = (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();
  if (!draggedElementsAreFiles(e as DragEvent)) return;

  // We want the drop overlay to close if the cursor leaves the drop area
  // and there are no files in the drop area
  timeout = setTimeout(() => {
    if (fileDropStore.files.length < 1) {
      setFileDropStore({ show: false, files: [] });
      timeout = null;
    }
  }, 1000);
};

const dropHandler = (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();
  if (!draggedElementsAreFiles(e as DragEvent)) return;
  // Store name and type of the files dropped in a new array (CustomFileList) of FileEntry.
  const files = prepareFileExtensions((e as DragEvent).dataTransfer!.files);
  // Filter out the files that are not supported
  const filteredFiles = [];
  for (let i = 0; i < files.length; i += 1) {
    if (isAuthorizedFile(files[i])) {
      filteredFiles.push(files[i]);
    } else {
      toast.error(`Unsupported file format for file : ${files[i].name}.${files[i].ext}`);
    }
  }
  // Add the dropped files to the existing file list
  setFileDropStore(
    { files: fileDropStore.files.concat(filteredFiles) },
  );
  if (timeout) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // setOverlayDropStore({ show: false, files: [] });
      timeout = null;
    }, 500);
  }
};

const reloadFromProjectObject = async (
  obj: {
    layers: LayerDescription[],
    layoutFeatures: LayoutFeature[],
    map: MapStoreType,
    tables: TableDescription[],
  },
): Promise<void> => {
  // Display a loading overlay because it may take some time
  setLoading(true, 'Reloading');

  await yieldOrContinue('smooth');

  // The state we want to use
  const {
    layers,
    layoutFeatures,
    map,
    tables,
  } = obj;

  // Reset the layers description store before changing the map store
  // (this avoid redrawing the map for the potential current layers)
  setLayersDescriptionStore({ layers: [], layoutFeatures: [], tables: [] });
  // Update the map store
  // (this updates the projection and pathGenerator in the global store)
  setMapStore(map);
  // Update the layer description store with the layers and layout features
  setLayersDescriptionStore({ layers, layoutFeatures, tables });
  // Reverse the "userHasAddedLayer" flag
  setGlobalStore({ userHasAddedLayer: true });
  // Hide the loading overlay
  setLoading(false);
};

const AppPage: () => JSX.Element = () => {
  const { setLocale, LL } = useI18nContext();
  setLocale('en');

  // Set the maximum dimensions of the map for the current window size
  // (we need it before mounting the component because the map is
  // created when the component is mounted and the map uses mapStore.mapDimensions)
  const maxMapDimensions = {
    width: round((window.innerWidth - applicationSettingsStore.leftMenuWidth) * 0.9, 0),
    height: round((window.innerHeight - applicationSettingsStore.headerHeight) * 0.9, 0),
  };

  setMapStoreBase({
    mapDimensions: maxMapDimensions,
  });

  // Store some useful values in the global store
  setGlobalStore({
    windowDimensions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });

  const onResize = (/* event: Event */): void => {
    if (applicationSettingsStore.resizeBehavior === ResizeBehavior.ShrinkGrow) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setGlobalStore({
        windowDimensions: {
          width,
          height,
        },
      });

      // Store the new dimensions of the map
      setMapStore({
        mapDimensions: {
          width: Math.round((width - applicationSettingsStore.leftMenuWidth) * 0.9),
          height: Math.round((height - applicationSettingsStore.headerHeight) * 0.9),
        },
      });

      // Note that the clipExtent is automatically updated (in MapStore)
      // and that the path are automatically updated (triggered from MapStore too)
    } else if (applicationSettingsStore.resizeBehavior === ResizeBehavior.KeepMapSize) {
      // Do nothing (at least for now)
    }
  };

  onCleanup(() => {
    // When app is unmounted, remove event listeners
    window.removeEventListener('resize', onResize);
    window.removeEventListener('beforeunload', onBeforeUnloadWindow);
  });

  // Todo: there is a lot of code executed in onMount,
  //  it should be refactored / split into smaller functions
  onMount(async () => {
    // Add event listener to the window to handle resize events
    window.addEventListener('resize', onResize);
    // Add event listeners to the root element and the overlay drop
    // in order to handle drag and drop events (for files upload only)
    document.querySelectorAll('div#root, .overlay-drop')
      .forEach((el) => {
        el.addEventListener('dragenter', dragEnterHandler);
        el.addEventListener('dragover', dragOverHandler);
        el.addEventListener('dragleave', dragLeaveHandler);
        el.addEventListener('drop', dropHandler);
      });

    // Add event listener to the window to handle beforeunload events
    window.addEventListener('beforeunload', onBeforeUnloadWindow);

    // Add event listener to the window to handle undo/redo events
    document.getElementById('button-undo')
      ?.addEventListener('click', undo);
    document.getElementById('button-redo')
      ?.addEventListener('click', redo);

    // Event listeners for the buttons of the header bar
    document.getElementById('button-new-project')
      ?.addEventListener('click', () => {
        const createNewProject = (): void => {
          // Compute the default dimension of the map
          const mapWidth = round(
            (window.innerWidth - applicationSettingsStore.leftMenuWidth) * 0.9,
            0,
          );
          const mapHeight = round(
            (window.innerHeight - applicationSettingsStore.headerHeight) * 0.9,
            0,
          );

          // Remove all layers
          setLayersDescriptionStore(defaultLayersDescription());

          // Reset the "userHasAddedLayer" flag
          setGlobalStore({ userHasAddedLayer: false });

          // Reset the map store
          // (this will also reset the projection and pathGenerator in the global store)
          setMapStore({
            mapDimensions: {
              width: mapWidth,
              height: mapHeight,
            },
            scale: 160,
            translate: [mapWidth / 2, mapHeight / 2],
            projection: {
              type: 'd3',
              value: 'geoNaturalEarth2',
              name: 'NaturalEarth2',
            },
            backgroundColor: '#ffffff',
            backgroundColorOpacity: 1,
          });

          // Reset the undo/redo store
          resetUndoRedoStackStore();
        };

        setNiceAlertStore({
          show: true,
          content: () => <div
              class="is-flex is-justify-content-center is-align-items-center"
              style={{ height: '100%' }}
            >
              <h4>{ LL().Alerts.EmptyProject() }</h4>
            </div>,
          confirmCallback: createNewProject,
          focusOn: 'confirm',
        });
      });

    document.getElementById('button-export-project')
      ?.addEventListener('click', () => {
        const { layers, layoutFeatures, tables } = layersDescriptionStore;
        const map = { ...mapStore };
        const obj = {
          layers,
          layoutFeatures,
          map,
          tables,
        };
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj))}`;
        return clickLinkFromDataUrl(dataStr, 'export-project.mjson');
      });

    document.getElementById('button-import-project')
      ?.addEventListener('click', () => {
        const elem = document.createElement('input');
        elem.type = 'file';
        elem.accept = '.mjson';
        elem.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result;
            if (!result) return;
            const obj = JSON.parse(result.toString());
            reloadFromProjectObject(obj);
          };
          reader.readAsText(file);
        };
        elem.click();
      });

    // Todo: the content of the about panel
    //  could be moved to a separate component
    document.getElementById('button-about-magrit')
      ?.addEventListener('click', () => {
        setModalStore({
          show: true,
          title: LL().AboutPanel.title(),
          escapeKey: 'confirm',
          content: () => AboutModal({ version, LL }),
        });
      });

    // Load GDAL
    // @ts-expect-error - we should fix the type of globalThis.gdal
    globalThis.gdal = await loadGdal();

    // ... and store the number of drivers in the global store (we may change this)
    // setGlobalStore({
    //   nDrivers: (
    //     Object.keys(Gdal.drivers.raster).length
    //     + Object.keys(Gdal.drivers.vector).length
    //   ),
    // });

    // Is there a project in the DB ?
    const project = await db.projects.toArray();
    // If there is a project, propose to reload it
    if (project.length > 0) {
      const { date, data } = project[0];
      setNiceAlertStore({
        show: true,
        content: () => <p>{ LL().Alerts.ReloadLastProject(date.toLocaleDateString())}</p>,
        confirmCallback: () => {
          setGlobalStore({ userHasAddedLayer: true });
          reloadFromProjectObject(data);
        },
        focusOn: 'confirm',
      });
    }
    // We only keep the last project in the DB
    // so at this point we can delete all projects
    db.projects.clear();
  });

  return <div onClick={ () => { resetContextMenuStore(); } }>
    <HeaderBarApp />
    <main class="is-fullhd">
      <LeftMenu />
      <MapZone />
      <Show when={globalStore.isLoading }>
        <LoadingOverlay />
      </Show>
      <Transition name="slide-fade">
        <Show when={classificationPanelStore.show}>
          <ClassificationPanel />
        </Show>
        <Show when={tableWindowStore.show}>
          <TableWindow />
        </Show>
        <Show when={fieldTypingModalStore.show}>
          <FieldTypingModal />
        </Show>
        <Show when={datasetCatalogStore.show}>
          <ExampleDataModal />
        </Show>
        <Show when={modalStore.show}>
          <DefaultModal />
        </Show>
      </Transition>
      {/*
        We put the NiceAlert component outside of the previous Transition component
        and we put it lower than it in the DOM
        because we want it to be displayed on top of the other modals
        (for example when asking for confirmation when closing
        the table modal after having made changes)
      */}
      <Transition name="slide-fade">
        <Show when={niceAlertStore.show}>
          <NiceAlert />
        </Show>
      </Transition>
      <Show when={contextMenuStore.show}>
        <ContextMenu />
      </Show>
    </main>
    <Toaster
      position={'bottom-center'}
    />
    <Show when={fileDropStore.show}>
      <ImportWindow />
    </Show>
    {/* <ReloadPrompt /> */}
  </div>;
};

export default AppPage;
