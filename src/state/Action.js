import {config as getConfig} from '@gisatcz/ptr-core';
import {Action as CommonAction} from '@gisatcz/ptr-state';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import Select from './Select';

require('dotenv').config();

import {appKey} from '../constants/app';

import productMetadataActions from './worldCereal/ProductMetadata/actions';
import productMetadataFilterActions from './worldCereal/ProductMetadataFilter/actions';

// TODO load view from BE
import view from '../data/view';
import cases from '../data/cases';
import styles from '../data/styles';
import utils from '../utils';

const getAppEnvConfig = () => {
	if (process?.env) {
		const apiBackendProtocol = process.env?.REACT_APP_apiBackendProtocol;
		const apiBackendHost = process.env?.REACT_APP_apiBackendHost;
		const apiBackendPath = process.env?.REACT_APP_apiBackendPath;
		const requestPageSize = process.env?.REACT_APP_requestPageSize;
		const requestPageSizeXX = process.env?.REACT_APP_requestPageSizeXX;

		return {
			...(apiBackendProtocol ? {apiBackendProtocol} : {}),
			...(apiBackendHost ? {apiBackendHost} : {}),
			...(apiBackendPath ? {apiBackendPath} : {}),
			...(requestPageSize ? {requestPageSize} : {}),
			...(requestPageSizeXX ? {requestPageSizeXX} : {}),
		};
	} else {
		return {};
	}
};

function init(path) {
	return (dispatch, getState) => {
		dispatch(CommonAction.app.setBaseUrl(path));

		const config = getConfig(getAppEnvConfig());

		dispatch(CommonAction.app.updateLocalConfiguration(config));
		dispatch(CommonAction.app.setKey(appKey));

		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const {'userKey': devUserKey} = localConfig;
		const activeUser = Select.users.getActiveKey(getState());
		// For local development
		// Set active user key from local config if exists
		if(!activeUser && devUserKey) {
			dispatch(CommonAction.users.setActiveKey(devUserKey))
		}


		dispatch(resetSession());

		// add & apply view
		dispatch(CommonAction.views.add(view));
		dispatch(CommonAction.views.applyAndSetActive(view.key, CommonAction));
		dispatch(
			productMetadataFilterActions.setActiveFilter(
				view.data.state.worldCereal.productMetadataFilter.activeFilter
			)
		);

		// add metadata
		dispatch(CommonAction.cases.add(cases));
		dispatch(CommonAction.styles.add(styles));

		// add mock data
		// dispatch(productMetadataActions.add(productMetadata));
		// dispatch(productMetadataActions.add(productMetadata_wheat));
		// dispatch(
		// 	productMetadataActions.add(productMetadata_annualcropland_diffTimes)
		// );
		// dispatch(productMetadataActions.add(productMetadata_france));

		// add random metadata
		// dispatch(productMetadataActions.add(randomMetadata));

		// add test layers
		// setTimeout(() => {
		// 	dispatch(
		// 		productMetadataActions.addLayersForTiles(
		// 			'test',
		// 			france_tiles_test,
		// 			'annualcropland',
		// 			Object.keys(view.data.state.maps.maps)[0]
		// 		)
		// 	);
		// }, 500);
	};
}

/**
 * Reset session
 */
function resetSession() {
	return (dispatch, getState) => {
		const config = Select.app.getCompleteLocalConfiguration(getState());
		if (config) {
			const userKey = Select.users.getActiveKey(getState());
			const {apiBackendProtocol, apiBackendHost, apiBackendPath} = config;
			const path = 'rest/project/worldCereal/user/sessionStart';
			const url = `${apiBackendProtocol}://${apiBackendHost}/${apiBackendPath}/${path}`;
			const method = 'GET';
			
			utils
				.request(url, method, null, null, userKey)
				.catch(
					err => new Error(`Failed to load product metadata. Error: ${err}`)
				);
		} else {
			throw new Error("Action/resetUser: Config wasn't found!");
		}
	};
}

/**
 * Adjust boxRange according to current zoom level
 * @param mapKey {string}
 */
function adjustInitialBoxRange(mapKey) {
	return (dispatch, getState) => {
		const currentMapView = Select.maps.getViewByMapKey(getState(), mapKey);
		const currentMapViewport = Select.maps.getViewportByMapKey(
			getState(),
			mapKey
		);

		const boxRange = mapUtils.view.getNearestZoomLevelBoxRange(
			currentMapViewport.width,
			currentMapViewport.height,
			currentMapView.boxRange
		);

		if (boxRange !== currentMapView.boxRange) {
			dispatch(updateMapView(mapKey, {boxRange}));
		}
	};
}

/**
 * @param mapKey {string}
 * @param viewUpdate {Object} Panther's mapView parameters to update
 */
function updateMapView(mapKey, viewUpdate) {
	return (dispatch, getState) => {
		dispatch(CommonAction.maps.updateMapAndSetView(mapKey, viewUpdate));

		// just to be sure, that map view was updated
		setTimeout(() => {
			const isInteractivityLimited = Select.worldCereal.isInteractivityLimited(
				getState()
			);
			if (!isInteractivityLimited) {
				dispatch(productMetadataActions.loadForMapSetView());
			}
		}, 10);
	};
}

/**
 * Remove all layers from map with given layerKey parameters (layerKey (in contrast with key) could be common for multiple layers).
 * For given productMetadata is the layerKey same as productMetadataKey
 * @param mapKey {string}
 * @param layerKeys {Array} List of productMetadataKey uuids
 */
function removeAllLayersFromMapByLayerKeys(mapKey, layerKeys) {
	return (dispatch, getState) => {
		const mapLayers = Select.maps.getMapLayersStateByMapKey(getState(), mapKey);
		if (mapLayers && layerKeys.length) {
			mapLayers.forEach(layer => {
				if (layerKeys.indexOf(layer.layerKey) !== -1) {
					// TODO create action to remove layers at once
					dispatch(CommonAction.maps.removeMapLayer(mapKey, layer.key));
				}
			});
		}
	};
}

// TODO create common action in maps
/**
 * Remove all layers (except background) for given map
 * @param mapKey {string}
 */
function removeAllMapLayers(mapKey) {
	return (dispatch, getState) => {
		const mapLayers = Select.maps.getMapLayersStateByMapKey(getState(), mapKey);
		if (mapLayers) {
			mapLayers.forEach(layer => {
				dispatch(CommonAction.maps.removeMapLayer(mapKey, layer.key));
			});
		}
	};
}

export default {
	...CommonAction,
	init,
	worldCereal: {
		productMetadata: productMetadataActions,
		productMetadataFilter: productMetadataFilterActions,

		adjustInitialBoxRange,
		removeAllLayersFromMapByLayerKeys,
		removeAllMapLayers,
		updateMapView,
	},
};
