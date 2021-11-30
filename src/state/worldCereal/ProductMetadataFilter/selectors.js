import {Select as CommonSelect} from '@gisatcz/ptr-state';
import {createSelector} from 'reselect';
import {createCachedSelector} from 're-reselect';
import {forIn as _forIn} from 'lodash';

const getActiveFilter = state =>
	state.worldCereal.productMetadataFilter.activeFilter;
const getFilterParametersAsObject = state =>
	state.worldCereal.productMetadataFilter.parameters;

/**
 * Get all parameters for filtering as array
 * @param {Object} state
 * @return {Array} A collection of parameters for filtering
 */
const getFilterParameters = createSelector(
	[getFilterParametersAsObject],
	parameters => {
		return parameters && Object.values(parameters);
	}
);

/**
 * Get all parameters for filtering as array ordered
 * @param {Object} state
 * @return {Array} A collection of parameters for filtering
 */
const getFilterParametersOrdered = createSelector(
	[
		getFilterParametersAsObject,
		state =>
			CommonSelect.components.get(state, 'productFilter', 'parameterOrder'),
	],
	(parameters, order) => {
		if (parameters) {
			return order
				? order.map(key => parameters[key])
				: Object.values(parameters);
		} else {
			return null;
		}
	}
);

/**
 * Get active filter extended with parameters
 * @param {Object} state
 * @return {Array} A collection of parameters for filtering
 */
const getActiveFilterWithFilterParameters = createSelector(
	[
		getActiveFilter,
		getFilterParametersAsObject,
		CommonSelect.cases.getAllAsObject,
	],
	(activeFilter, params, cases) => {
		if (activeFilter && params) {
			let data = [];
			_forIn(activeFilter, (values, key) => {
				if (values) {
					const finalValues = values.map(
						value => getValueMetadataHelper(params, key, value, cases) || value
					);
					data.push({
						parameter: params[key],
						values: finalValues || values,
					});
				}
			});

			return data.length ? data : null;
		} else {
			return null;
		}
	}
);

/**
 * @param {Object} state
 * @param {string} parameter
 * @param {string} value
 * @return {Object|null}
 */
const getValueMetadata = createCachedSelector(
	[
		getFilterParametersAsObject,
		(state, parameterKey) => parameterKey,
		(state, parameterKey, value) => value,
		CommonSelect.cases.getAllAsObject,
	],
	getValueMetadataHelper
)((state, parameterKey, value) => `${parameterKey}_${value}`);

/**
 * True, if given value is present in active filter
 * @param {Object} state
 * @param {string} parameter
 * @param {string} value
 * @return {boolean}
 */
const isValueInActiveFilter = createCachedSelector(
	[
		getActiveFilter,
		(state, parameter) => parameter,
		(state, parameter, value) => value,
	],
	(activeFilter, parameter, value) => {
		if (activeFilter && parameter && value) {
			const parameterOptions = activeFilter[parameter];
			return !!(parameterOptions && parameterOptions.indexOf(value) > -1);
		} else {
			return false;
		}
	}
)((state, parameter, value) => `${parameter}_${value}`);

// helpers --------------------------------------------------------------
/**
 * If given parameter for filtering is a metadata type, then return model for given value
 * @param parameters {Array} A collection of parameters for filtering
 * @param parameterKey {string}
 * @param value {string}
 * @param cases {Object}
 * @return {Object|null}
 */
function getValueMetadataHelper(parameters, parameterKey, value, cases) {
	if (parameters && parameterKey && value) {
		const parameter = parameters[parameterKey];
		const dataType = parameter?.dataType;

		if (dataType === 'cases' && cases) {
			return cases[value] || value;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export default {
	getActiveFilter,
	getActiveFilterWithFilterParameters,

	getFilterParameters,
	getFilterParametersOrdered,
	getValueMetadata,

	isValueInActiveFilter,
};
