import {createCachedSelector} from 're-reselect';
import {createSelector} from 'reselect';
import {filter as _filter} from 'lodash';
import {Select as CommonSelect} from '@gisatcz/ptr-state';

import {
	mapSetKey,
	defaultStyleKey,
	MAX_BOX_RANGE_FOR_LAYERS_HANDLING,
} from '../constants/app';
import productMetadataSelectors from './worldCereal/ProductMetadata/selectors';
import productMetadataFilterSelectors from './worldCereal/ProductMetadataFilter/selectors';

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
 * Get product templates (cases) extended by style definition
 * @param {Object} state
 * @return {Object} Case models extended by style definition
 */
const getProductTemplates = createSelector(
	[CommonSelect.cases.getAllAsObject, CommonSelect.styles.getAllAsObject],
	(cases, styles) => {
		if (cases && styles) {
			const productTemplates = {};
			for (const [caseKey, caseData] of Object.entries(cases)) {
				const style = getCogStyle(styles, caseData);
				productTemplates[caseKey] = {
					...caseData,
				};
				if (style) {
					productTemplates[caseKey].data.style = style;
				}
			}
			return productTemplates;
		} else {
			return null;
		}
	}
);

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
	[state => CommonSelect.maps.getMapSetActiveMapView(state, mapSetKey)],
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
		// TODO add other filter params
		const {aez, product, season} = item.data;
		if (filter.aez && filter.aez.indexOf(aez) === -1) {
			return false;
		}
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

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,
		productMetadataFilter: productMetadataFilterSelectors,

		getActiveProductMetadataByActiveFilter,
		getProductMetadataCountForFilterOption,
		getProductTemplates,
		getProductTemplateByKey,
		getStyleDefinitionByProductTemplateKey,

		isInteractivityLimited,
	},
};
