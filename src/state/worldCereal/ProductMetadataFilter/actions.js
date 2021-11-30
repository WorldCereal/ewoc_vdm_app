import ActionTypes from '../../../constants/ActionTypes';

/**
 * Add given value to filter
 * @param parameter {string}
 * @param value {string}
 */
const actionAddValueToActiveFilter = (parameter, value) => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.ADD_VALUE,
		parameter,
		value,
	};
};

/**
 * Remove given value from filter
 * @param parameter {string}
 * @param value {string}
 */
const actionRemoveValueFromActiveFilter = (parameter, value) => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_VALUE,
		parameter,
		value,
	};
};

/**
 * Remove all values from filter
 */
const actionRemoveAllValuesFromActiveFilter = () => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_ALL,
	};
};

/**
 * Remove all values from filter for given parameter
 * @param parameter {string}
 */
const actionRemoveAllParameterValuesFromActiveFilter = parameter => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_ALL_FROM_PARAMETER,
		parameter,
	};
};

/**
 * Set active filter
 * @param activeFilter {Object}
 */
const actionSetActiveFilter = activeFilter => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER.SET,
		activeFilter,
	};
};

export default {
	addValueToActiveFilter: actionAddValueToActiveFilter,
	removeValueFromActiveFilter: actionRemoveValueFromActiveFilter,
	removeAllParameterValuesFromActiveFilter:
		actionRemoveAllParameterValuesFromActiveFilter,
	removeAllValuesFromActiveFilter: actionRemoveAllValuesFromActiveFilter,

	setActiveFilter: actionSetActiveFilter,
};
