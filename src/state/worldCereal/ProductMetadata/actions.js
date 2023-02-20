import {commonActions, Action as CommonAction} from '@gisatcz/ptr-state';
import {GL} from '@gisatcz/ptr-maps';
import {find as _find} from 'lodash';
import utils from '../../../utils';
import productMetadataModel from '../../../models/productMetadata';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import Action from '../../Action';

const setActiveKeys = commonActions.setActiveKeys(
	ActionTypes.WORLD_CEREAL.PRODUCT_METADATA
);

/**
 * Add models to store
 * @param items {Array} A collection of incoming items
 */
function add(items) {
	return dispatch => {
		const models = items.map(item => productMetadataModel(item));
		dispatch(
			commonActions.add(ActionTypes.WORLD_CEREAL.PRODUCT_METADATA)(models)
		);
	};
}

/**
 * Load product metadata based on current map set view
 */
function loadForMapSetView() {
	return (dispatch, getState) => {
		const state = getState();
		const mapSetKey = Select.maps.getActiveSetKey(state);
		const viewAsFeature =
			Select.worldCereal.productMetadata.getMapSetActiveMapExtentAsFeature(
				state,
				mapSetKey
			);
		const config = Select.app.getCompleteLocalConfiguration(state);
		const userKey = Select.users.getActiveKey(getState());
		if (viewAsFeature && config && userKey) {
			const {geometry} = viewAsFeature;
			const {apiBackendProtocol, apiBackendHost, apiBackendPath} = config;
			const path = 'rest/project/worldCereal/product/filtered';
			const url = `${apiBackendProtocol}://${apiBackendHost}/${apiBackendPath}/${path}`;
			const method = 'POST';
			const payload = {geometry};

			utils
				.request(url, method, null, payload, userKey)
				.then(data => {
					if (data) {
						dispatch(handleLoadResponse(data));
					}
				})
				.catch(
					err => new Error(`Failed to load product metadata. Error: ${err}`)
				);
		}
	};
}

/**
 * @param data {products: Array, tiles: Array} products: A collection of products metadata. tiles: List of S2 tiles for given mapView.
 **/
function handleLoadResponse(data) {
	return dispatch => {
		const {products, tiles} = data;

		let models = [];
		let keys = [];
		products.forEach(product => {
			if (product.data) {
				models.push(product);
			}

			keys.push(product.key);
		});

		if (models.length) {
			dispatch(add(models));
		}

		dispatch(setActiveKeys(keys));

		if (tiles?.length) {
			dispatch(actionSetActiveTiles(tiles));
		}
	};
}

/**
 *
 * @param {string} mapKey
 * @param {string} spatialDataSourceKey
 * @param {string} productMetadataKey
 * @returns {Promise}
 */
function handleDataSourceAndAddtoMap(
	mapKey,
	spatialDataSourceKey,
	productMetadataKey
) {
	return (dispatch, getState) => {
		const dataQueryActive = Select.worldCereal.dataQueryActiveByMapKey(
			getState(),
			mapKey
		);
		dispatch(
			Action.data.spatialDataSources.useKeys([spatialDataSourceKey])
		).then(() => {
			//add ds
			const layerKey = spatialDataSourceKey;
			const ds =
				Select.data.spatialDataSources.getByKeyObserver(spatialDataSourceKey);
			const layer = {
				key: layerKey,
				layerKey: productMetadataKey,
				spatialDataSourceKey,
				type: 'wms',
				options: {
					pickable: dataQueryActive,
					hoverable: true,
					transparentColor: [255, 255, 255, 0], // white border, transparent background
					params: {
						layers: ds.data.layers,
					},
					url: ds.data.url,
					textureParameters: {
						[GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
						[GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
						[GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
						[GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
					},
				},
			};

			const existingLayer = Select.maps.getLayerStateByLayerKeyAndMapKey(
				getState(),
				mapKey,
				layerKey
			);

			// Because of async, spatialDataSources could receive at the time, when layer wes already aggain removed
			// It is important to check if layer should be in map (OutlineLayer is indicator)
			if (!existingLayer) {
				dispatch(CommonAction.maps.addMapLayers(mapKey, [layer]));
			}
		});
	};
}

/**
 * Add/remove the product to/from active map
 * @param productMetadataKey {string} unique key of product metadata
 */
function handleProductInActiveMap(layerKey, spatialDataSourceKey) {
	return (dispatch, getState) => {
		const state = getState();
		const mapSetKey = Select.maps.getActiveSetKey(state);
		const map = Select.maps.getMapSetActiveMap(state, mapSetKey);
		// const productMetadata = Select.worldCereal.productMetadata.getByKey(
		// 	state,
		// 	productMetadataKey
		// );

		const isLayerPresent =
			map?.data?.layers &&
			!!_find(map.data.layers, layer => layer.layerKey === layerKey);

		// Remove or add layer(s)
		if (isLayerPresent) {
			const existingLayer = Select.maps.getLayerStateByLayerKeyAndMapKey(
				state,
				map.key,
				spatialDataSourceKey
			);

			//remove data layer only if is in map
			if (existingLayer) {
				dispatch(removeLayersDatasourceLayer(map.key, spatialDataSourceKey));
			}
		} else {
			dispatch(
				handleDataSourceAndAddtoMap(map.key, spatialDataSourceKey, layerKey)
			);
		}
	};
}

function removeLayersDatasourceLayer(mapKey, spatialDataSourceKey) {
	return dispatch => {
		dispatch(CommonAction.maps.removeMapLayer(mapKey, spatialDataSourceKey));
	};
}

// helpers ---------------------------------------------------------------------------------------
// Creators --------------------------------------------------------------------------------------
/**
 * Set active tiles
 * @param tiles {Array} List of tiles
 */
const actionSetActiveTiles = tiles => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA.SET_ACTIVE_TILES,
		tiles,
	};
};

export default {
	add,
	loadForMapSetView,

	handleProductInActiveMap,
};
