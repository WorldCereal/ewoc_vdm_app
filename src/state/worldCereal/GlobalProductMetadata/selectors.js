import {createCachedSelector} from 're-reselect';
import {uniq as _uniq, groupBy as _groupBy} from 'lodash';
import {createSelector} from 'reselect';
import {commonSelectors, Select as CommonSelect} from '@gisatcz/ptr-state';
import {timelineLayerOrder, timelinePeriodOrder} from '../../../constants/app';

const getSubstate = state => state.worldCereal.globalProductMetadata;

const getActiveModels = commonSelectors.getActiveModels(getSubstate);
const getActiveKeys = commonSelectors.getActiveKeys(getSubstate);
const getByKey = commonSelectors.getByKey(getSubstate);
const getAllAsObject = commonSelectors.getAllAsObject(getSubstate);

const getProductYear = product => {
	return Number.parseInt(product.data.eos.split('-')[0]);
};

const getAll = createSelector(
	[
		getAllAsObject,
		CommonSelect.maps.getLayersStateByMapKey,
		CommonSelect.cases.getAllAsObject,
	],
	(products, layers, cases) => {
		const productsAsArray = products ? Object.values(products) : [];
		const transformed = productsAsArray.reduce((acc, val) => {
			const product = val.data.product;
			const productIndex = acc.findIndex(i => i.product === product);
			const productYear = getProductYear(val);
			const active = layers ? layers.some(l => l.layerKey === val.key) : false;
			if (productIndex > -1) {
				if (acc[productIndex].products[productYear]) {
					acc[productIndex].products[productYear].push({
						...val,
						active,
					});
				} else {
					acc[productIndex].products[productYear] = [
						{
							...val,
							active,
						},
					];
				}
			} else {
				acc.push({
					product,
					nameDisplay: cases?.[product]?.data?.nameDisplay,
					color: cases?.[product]?.data?.color,
					products: {
						[productYear]: [
							{
								...val,
								active,
							},
						],
					},
				});
			}
			return acc;
		}, []);

		// sort layers
		transformed?.sort((a, b) => {
			return (
				timelineLayerOrder.indexOf(a.nameDisplay) -
				timelineLayerOrder.indexOf(b.nameDisplay)
			);
		});

		// sort periods
		transformed?.forEach(l => {
			for (const year of Object.keys(l.products)) {
				l.products?.[year]?.sort((a, b) => {
					return (
						timelinePeriodOrder.indexOf(a.data.season) -
						timelinePeriodOrder.indexOf(b.data.season)
					);
				});
			}
		});

		return transformed;
	}
);

const getYears = createSelector([getAll], products => {
	const years = new Set();

	for (const product of products) {
		for (const year of Object.keys(product.products)) {
			years.add(year);
		}
	}
	return [...years].sort();
});

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
			return keys.map(key => models[key]).filter(i => i);
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

export default {
	getSubstate,

	getByKey,

	getActiveModels,
	getActiveKeys,
	getAllAsObject,

	getAll,
	getYears,
	getModelsByMapKeyGroupedByParam,
};
