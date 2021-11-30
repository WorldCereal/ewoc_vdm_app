import {uniq as _uniq, groupBy as _groupBy} from 'lodash';
import {createSelector} from 'reselect';
import {createCachedSelector} from 're-reselect';
import intersect from '@turf/intersect';
import {commonSelectors, Select as CommonSelect} from '@gisatcz/ptr-state';
import utils from '../../../utils';

const getSubstate = state => state.worldCereal.productMetadata;

const getActiveModels = commonSelectors.getActiveModels(getSubstate);
const getActiveKeys = commonSelectors.getActiveKeys(getSubstate);
const getByKey = commonSelectors.getByKey(getSubstate);
const getAllAsObject = commonSelectors.getAllAsObject(getSubstate);

const getActiveTiles = state => state.worldCereal.productMetadata.activeTiles;

// helpers ----------------------------------------------

/**
 * TODO move to ptr-state
 * Return active map view as polygon feature
 * @param {Object} state
 * @return {GeoJSON.Feature|null}
 */
const getMapSetActiveMapExtentAsFeature = createSelector(
	[
		CommonSelect.maps.getMapSetActiveMapView,
		CommonSelect.maps.getMapSetActiveMapViewport,
	],
	(view, viewport) => {
		if (view && viewport) {
			return utils.getExtentFromMapViewAsFeature(view, viewport);
		} else {
			return null;
		}
	}
);

// selectors ---------------------------------------------

/**
 * @param {Object} state
 * @param {string} mapKey
 * @return {Array|null} Keys of product metadata present in given map
 */
const getKeysByMapKey = createCachedSelector(
	[CommonSelect.maps.getMapLayersStateByMapKey],
	mapLayers => {
		if (mapLayers?.length) {
			return _uniq(mapLayers.map(layer => layer.layerKey));
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param {Object} state
 * @param {string} mapKey
 * @return {Array|null} Product metadata models present in given map
 */
const getModelsByMapKey = createCachedSelector(
	[getAllAsObject, getKeysByMapKey],
	(models, keys) => {
		if (keys?.length && models) {
			return keys.map(key => models[key]);
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param {Object} state
 * @param {string} mapKey
 * @param {string} parameter for grouping
 * @return {Array|null} Product metadata models present in given map grouped bz given parameter
 */
const getModelsByMapKeyGroupedByParam = createCachedSelector(
	[getModelsByMapKey, (state, mapKey, parameter) => parameter],
	(models, parameter) => {
		if (models?.length && parameter) {
			return _groupBy(models, model => model.data[parameter]);
		} else {
			return null;
		}
	}
)((state, mapKey, parameter) => `${mapKey}_${parameter}`);

/**
 * @param {Object} state
 * @param {string} productMetadataKey
 * @return {boolean} true if given product is in current map extent
 */
const isModelInMapExtent = createCachedSelector(
	[
		(state, productMetadataKey, mapSetKey) =>
			getMapSetActiveMapExtentAsFeature(state, mapSetKey),
		getByKey,
	],
	(mapExtentAsFeature, model) => {
		if (mapExtentAsFeature && model) {
			return !!intersect(model.data.geometry, mapExtentAsFeature);
		} else {
			return false;
		}
	}
)((state, productMetadataKey) => productMetadataKey);

export default {
	getSubstate,

	getByKey,

	getActiveModels,
	getActiveKeys,
	getActiveTiles,
	getAllAsObject,

	getKeysByMapKey,
	getModelsByMapKey,
	getModelsByMapKeyGroupedByParam,

	getMapSetActiveMapExtentAsFeature,

	isModelInMapExtent,
};
