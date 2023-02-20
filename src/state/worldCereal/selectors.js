import {createCachedSelector} from 're-reselect';
import {createSelector} from 'reselect';
import {filter as _filter, includes as _includes} from 'lodash';
import {Select as CommonSelect} from '@gisatcz/ptr-state';

import productMetadataFilterSelectors from './ProductMetadataFilter/selectors';
import productMetadataSelectors from './ProductMetadata/selectors';
import ProductValueMap from '../../data/ProductValueMap';

import {
	defaultStyleKey,
	MAX_BOX_RANGE_FOR_LAYERS_HANDLING,
} from '../../constants/app';

/**
 * Get product template extended by style definition
 * @param {Object} state
 * @param {string} productKey
 * @return {Object} Case model extended by style definition
 */
const getProductTemplateByKey = createCachedSelector(
	[
		CommonSelect.cases.getAllAsObject,
		CommonSelect.styles.getAllAsObject,
		(state, productKey) => productKey,
	],
	(cases, styles, productKey) => {
		const defaultStyle = styles[defaultStyleKey].data.definition;
		const defaultTemplate = {
			data: {
				style: defaultStyle,
			},
		};

		if (cases && productKey) {
			const productTemplate = cases[productKey];
			if (productTemplate) {
				if (styles) {
					const style = getCogStyle(styles, productTemplate);
					if (style) {
						return {
							...productTemplate,
							data: {
								...productTemplate.data,
								style: style.data.definition,
							},
						};
					} else {
						return {
							...productTemplate,
							data: {
								...productTemplate.data,
								style: defaultStyle,
							},
						};
					}
				} else {
					return {
						...productTemplate,
						data: {
							...productTemplate.data,
							style: defaultStyle,
						},
					};
				}
			} else {
				return defaultTemplate;
			}
		} else {
			return defaultTemplate;
		}
	}
)((state, productMetadataKey) => productMetadataKey);

/**
 * Get style based on cogStyleKey in case
 * @param {Object} state
 * @param {string} productTemplateKey caseKey
 * @return {Object} Panther style definition
 */
const getStyleDefinitionByProductTemplateKey = createCachedSelector(
	[CommonSelect.cases.getByKey, CommonSelect.styles.getAllAsObject],
	(productTemplate, styles) => {
		if (productTemplate && styles) {
			const style = getCogStyle(styles, productTemplate);
			if (style) {
				return style.data.definition;
			} else {
				return styles[defaultStyleKey].data.definition;
			}
		} else if (styles) {
			return styles[defaultStyleKey].data.definition;
		} else {
			return null;
		}
	}
)((state, productTemplateKey) => productTemplateKey);

/**
 * Filter active product metadata according to active filter
 * @param {Object} state
 * @return {Array} A collection of filtered product metadata
 */
const getActiveProductMetadataByActiveFilter = createSelector(
	[
		productMetadataSelectors.getActiveModels,
		productMetadataFilterSelectors.getActiveFilter,
	],
	(productMetadata, activeFilter) => {
		if (productMetadata && activeFilter) {
			return filterMetadata(productMetadata, activeFilter);
		} else {
			return null;
		}
	}
);

/**
 * @param {Object} state
 * @param {string} mapSetKey
 * @param {string} filterParameterKey
 * @param {string} value option
 * @return {number}
 */
const getProductMetadataCountForFilterOption = createCachedSelector(
	[
		productMetadataSelectors.getActiveModels,
		productMetadataFilterSelectors.getActiveFilter,
		(state, mapSetKey, filterParameterKey) => filterParameterKey,
		(state, mapSetKey, filterParameterKey, value) => value,
	],
	(productMetadata, activeFilter, filterParameterKey, value) => {
		if (productMetadata && activeFilter && filterParameterKey && value) {
			const updatedFilter = {...activeFilter, [filterParameterKey]: [value]};
			const filteredMetadata = filterMetadata(productMetadata, updatedFilter);
			return filteredMetadata?.length || 0;
		} else {
			return 0;
		}
	}
)(
	(state, mapSetKey, filterParameterKey, value) =>
		`${filterParameterKey}_${value}`
);

const isInteractivityLimited = createSelector(
	[
		(state, mapSetKey) =>
			CommonSelect.maps.getMapSetActiveMapView(state, mapSetKey),
	],
	mapView => {
		return mapView?.boxRange > MAX_BOX_RANGE_FOR_LAYERS_HANDLING;
	}
);

// helpers
/**
 * @param productMetadata {Array} A collection of product metadata
 * @param filter {Object} metadata filter
 * @returns {Array} A collection of filtered product metadata
 */
function filterMetadata(productMetadata, filter) {
	return _filter(productMetadata, item => {
		const {product, season} = item.data;
		if (filter.product && filter.product.indexOf(product) === -1) {
			return false;
		}
		if (filter.season && filter.season.indexOf(season) === -1) {
			return false;
		}
		return true;
	});
}

function getCogStyle(styles, template) {
	const styleKey = template.data?.cogStyleKey;
	return styleKey ? styles[styleKey] : styles[defaultStyleKey];
}

const getMapLayersOpacity = createCachedSelector(
	[
		CommonSelect.maps.getMapLayersStateByMapKey,
		(state, mapKey, productMetadataKeys) => productMetadataKeys,
	],
	(layers, productMetadataKeys) => {
		const selectedLayers = layers.filter(layer =>
			_includes(productMetadataKeys, layer.layerKey)
		);

		let opacitySum = 0;
		if (selectedLayers.length) {
			selectedLayers.forEach(selectedLayer => {
				if (selectedLayer.opacity >= 0) {
					opacitySum += selectedLayer.opacity;
				} else {
					opacitySum += 1;
				}
			});
		}

		return Math.ceil((opacitySum / selectedLayers.length) * 100);
	}
)((state, mapKey) => mapKey);

const getMapLayersConfidenceActive = createCachedSelector(
	[
		CommonSelect.maps.getMapLayersStateByMapKey,
		(state, mapKey, productMetadataKeys) => productMetadataKeys,
	],
	(layers, productMetadataKeys) => {
		const selectedLayers = layers.filter(layer =>
			_includes(productMetadataKeys, layer.layerKey)
		);

		let confidenceActive = false;
		if (selectedLayers.length) {
			selectedLayers.forEach(selectedLayer => {
				if (selectedLayer.options.confidenceActive) {
					confidenceActive = true;
				}
			});
		}

		return confidenceActive;
	}
)((state, mapKey) => mapKey);

const getMapLayerOpacity = createCachedSelector(
	[
		CommonSelect.maps.getMapLayersStateByMapKey,
		(state, mapKey, layerKey) => layerKey,
	],
	(layers, layerKey) => {
		const selectedLayer = layers.find(layer =>
			_includes(layerKey, layer.layerKey)
		);

		let opacitySum = 0;
		if (selectedLayer) {
			if (selectedLayer.opacity >= 0) {
				opacitySum += selectedLayer.opacity;
			} else {
				opacitySum += 1;
			}
		}

		return opacitySum * 100;
	}
)((state, mapKey) => mapKey);

const getMapLayerTooltipActive = createSelector(
	[
		CommonSelect.maps.getMapLayersStateByMapKey,
		(state, mapKey, layerKey) => layerKey,
	],
	(layers, layerKey) => {
		const selectedLayer = layers.find(layer =>
			_includes(layerKey, layer.layerKey)
		);

		let tooltipActive = false;
		if (selectedLayer) {
			tooltipActive = selectedLayer.options.pickable;
		}

		return tooltipActive;
	}
);

const getMapLayerOptionValueByKey = createSelector(
	[
		CommonSelect.maps.getMapLayersStateByMapKey,
		(state, mapKey, layerKey) => layerKey,
		(state, mapKey, layerKey, optionKey) => optionKey,
	],
	(layers, layerKey, optionKey) => {
		const layer = layers.find(layer => _includes(layerKey, layer.layerKey));

		if (layer) {
			return layer.options?.[optionKey];
		} else {
			return null;
		}
	}
);
const dataQueryActiveByMapKey = createSelector(
	[CommonSelect.maps.getMapLayersStateByMapKey],
	(layers = []) => {
		return layers?.some(layer => layer?.options?.pickable);
	}
);

const getProductValue = createCachedSelector(
	[product => product, (product, value) => value],
	(product, value) => {
		return ProductValueMap?.[product]?.[value];
	}
)((product, value) => `${product}_${value}`);

export default {
	getActiveProductMetadataByActiveFilter,
	getProductMetadataCountForFilterOption,
	getProductTemplateByKey,
	getStyleDefinitionByProductTemplateKey,
	isInteractivityLimited,
	getMapLayersOpacity,
	getProductValue,
	getMapLayerTooltipActive,
	getMapLayerOpacity,
	getMapLayerOptionValueByKey,
	dataQueryActiveByMapKey,
	getMapLayersConfidenceActive,
};
