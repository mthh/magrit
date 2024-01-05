// Import from solid-js
import { For, JSX, Show } from 'solid-js';
import { produce } from 'solid-js/store';

// Import from other packages
import { getPalette } from 'dicopal';

// Stores
import { setFieldTypingModalStore } from '../store/FieldTypingModalStore';
import { globalStore, setGlobalStore } from '../store/GlobalStore';
import { setLayersDescriptionStore } from '../store/LayersDescriptionStore';
import { fitExtent } from '../store/MapStore';
import { overlayDropStore, setOverlayDropStore } from '../store/OverlayDropStore';

// Helpers
import { useI18nContext } from '../i18n/i18n-solid';
import {
  isAuthorizedFile,
  isTabularFile,
  isGeojson,
  isTopojson,
} from '../helpers/fileUpload';
import { convertTabularDatasetToJSON, convertToGeoJSON, getGeometryType } from '../helpers/formatConversion';
import { generateIdLayer, generateIdTable } from '../helpers/layers';
import { convertTopojsonToGeojson } from '../helpers/topojson';
import { detectTypeField, Variable } from '../helpers/typeDetection';

// Types / Interfaces / Enums
import type { CustomFileList } from '../helpers/fileUpload';
import { GeoJSONFeatureCollection, LayerDescription, TableDescription } from '../global';
import type { LayersDescriptionStoreType } from '../store/LayersDescriptionStore';

// Styles
import '../styles/OverlayDrop.css';

/*
TODO: most of the logic in the file should be moved to a helper (because in the future it
  will be used in other places than the overlay drop - notably the view dedicated to
  handling files / user data)
*/

const getDefaultRenderingParams = (geomType: string) => {
  const pal = getPalette('Vivid', 10)!.colors;
  const color = pal[Math.floor(Math.random() * pal.length)];

  if (geomType === 'point') {
    return {
      renderer: 'default',
      strokeColor: '#212121',
      strokeWidth: 1,
      strokeOpacity: 1,
      fillColor: color,
      fillOpacity: 1,
      pointRadius: 5,
      dropShadow: false,
      blurFilter: false,
    };
  }
  if (geomType === 'linestring') {
    return {
      renderer: 'default',
      strokeColor: color,
      strokeWidth: 1.5,
      strokeOpacity: 1,
      dropShadow: false,
      blurFilter: false,
    };
  }
  if (geomType === 'polygon') {
    return {
      renderer: 'default',
      strokeColor: '#212121',
      strokeWidth: 0.4,
      strokeOpacity: 1,
      fillColor: color,
      fillOpacity: 0.85,
      dropShadow: false,
      blurFilter: false,
    };
  }
  return {};
};

function addLayer(geojson: GeoJSONFeatureCollection, name: string) {
  const geomType = getGeometryType(geojson);
  const layerId = generateIdLayer();

  const fieldsName: string[] = Object.keys(geojson.features[0].properties);

  const fieldsDescription: Variable[] = fieldsName.map((field) => {
    const o = detectTypeField(
      geojson.features.map((ft) => ft.properties[field]) as never[],
      field,
    );
    return {
      name: field,
      hasMissingValues: o.hasMissingValues,
      type: o.variableType,
      dataType: o.dataType,
    };
  });

  // Add the new layer to the LayerManager by adding it
  // to the layersDescriptionStore
  const newLayerDescription = {
    id: layerId,
    name,
    type: geomType,
    data: geojson,
    visible: true,
    fields: fieldsDescription,
    ...getDefaultRenderingParams(geomType),
    shapeRendering: geomType === 'polygon' && geojson.features.length > 10000 ? 'optimizeSpeed' : 'auto',
  };

  let firstLayer = false;

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        if (!globalStore.userHasAddedLayer) {
          // eslint-disable-next-line no-param-reassign
          draft.layers = [];
          setGlobalStore({ userHasAddedLayer: true });
          firstLayer = true;
        }
        draft.layers.push(newLayerDescription as LayerDescription);
      },
    ),
  );

  // If this is the first layer, zoom on it:
  if (firstLayer) {
    fitExtent(layerId);
  }

  // Open modal for field typing
  setFieldTypingModalStore({
    show: true,
    targetId: layerId,
    targetType: 'layer',
  });
}

function addTabularLayer(data: object[], name: string) {
  const fields: string[] = Object.keys(data[0]);

  const descriptions = fields.map((field) => {
    const o = detectTypeField(
      data.map((ft) => ft[field]) as never[],
      field,
    );
    return {
      name: field,
      hasMissingValues: o.hasMissingValues,
      type: o.variableType,
      dataType: o.dataType,
    };
  });
  const tableDescription = {
    id: generateIdTable(),
    name,
    fields: descriptions,
    data,
  } as TableDescription;

  setLayersDescriptionStore(
    produce(
      (draft: LayersDescriptionStoreType) => {
        // TODO: Do we want to clean the map (as we do when the first layer is added)
        //       when adding the first table?
        // if (!globalStore.userHasAddedLayer) {
        //   // eslint-disable-next-line no-param-reassign
        //   draft.layers = [];
        //   setGlobalStore({ userHasAddedLayer: true });
        // }
        draft.tables.push(tableDescription);
      },
    ),
  );
}

const convertDroppedFiles = async (files: CustomFileList) => {
  console.log('convertDroppedFiles', files);
  const authorizedFiles = files.filter(isAuthorizedFile);
  console.log('authorizedFiles', authorizedFiles);
  setOverlayDropStore({
    show: false,
    files: [],
  });
  setGlobalStore({ isLoading: true });
  if (await isTopojson(authorizedFiles)) {
    const res = convertTopojsonToGeojson(await files[0].file.text());
    Object.keys(res).forEach((layerName) => {
      addLayer(res[layerName], layerName);
    });
  } else if (await isGeojson(authorizedFiles)) {
    const res = JSON.parse(await authorizedFiles[0].file.text());
    addLayer(res, authorizedFiles[0].name);
  } else if (isTabularFile(authorizedFiles)) {
    const res = await convertTabularDatasetToJSON(authorizedFiles[0].file, authorizedFiles[0].ext);
    console.log(res);
    addTabularLayer(res, authorizedFiles[0].name);
  } else {
    // TODO: handle GeoPackages that may contain multiple layers
    let res;
    try {
      res = await convertToGeoJSON(authorizedFiles.map((f) => f.file));
    } catch (e) {
      // TODO: display error message and/or improve error handling
      console.error(e);
      return;
    }
    addLayer(res, authorizedFiles[0].name);
  }

  setGlobalStore({ isLoading: false });
};

const displayFiles = (files: CustomFileList): JSX.Element => {
  const { LL } = useI18nContext();

  return <>
    <Show when={files.length === 0}>
      <p>{ LL().DropFilesHere() }</p>
    </Show>
    <Show when={files.length > 0}>
      <p>
        { LL().FilesDetected(files.length) }
      </p>
      <ul>
        <For each={files}>
          {
            (file) => {
              const authorized = isAuthorizedFile(file);
              const prop = authorized ? {} : { 'data-tooltip': LL().UnsupportedFormat() };
              return <li classList={{ authorized }} {...prop}>
                {file.name} ({file.file.size / 1000} kb)
              </li>;
            }
          }
        </For>
      </ul>
    </Show>
  </>;
};

export default function OverlayDrop(): JSX.Element {
  const { LL } = useI18nContext();

  return <div class="overlay-drop" classList={{ visible: overlayDropStore.show }}>
    <div class="overlay-drop__content">
      <div class="overlay-drop__content__title">
        { displayFiles(overlayDropStore.files) }
      </div>
      <div class="columns is-centered has-text-centered">
        <div class="column is-half">
          <button class="button is-success" onClick={async () => { await convertDroppedFiles(overlayDropStore.files); }}>
            { LL().ImportFiles() }
          </button>
        </div>
      </div>
    </div>
  </div>;
}
