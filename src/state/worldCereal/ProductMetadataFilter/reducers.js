import {stateManagement} from '@gisatcz/ptr-utils';
import ActionTypes from '../../../constants/ActionTypes';
import parameters from '../../../data/worldCereal/productMetadataFilter/parameters';

const INITIAL_STATE = {
	parameters,
};

const addValueToActiveFilter = (state, parameter, value) => {
	const newValues = stateManagement.addItem(
		state.activeFilter[parameter] || [],
		value
	);

	return {
		...state,
		activeFilter: {
			...state.activeFilter,
			[parameter]: newValues,
		},
	};
};

const removeValueFromActiveFilter = (state, parameter, value) => {
	const valueIndex = state.activeFilter[parameter].indexOf(value);

	if (valueIndex > -1) {
		const newValues = state.activeFilter[parameter].filter(
			(val, index) => index !== valueIndex
		);

		return {
			...state,
			activeFilter: {
				...state.activeFilter,
				[parameter]: newValues.length ? newValues : null,
			},
		};
	} else {
		return state;
	}
};

const removeAllParameterValuesFromActiveFilter = (state, parameter) => {
	return {
		...state,
		activeFilter: {
			...state.activeFilter,
			[parameter]: null,
		},
	};
};

const removeAllValuesFromActiveFilter = state => {
	return {
		...state,
		activeFilter: {},
	};
};

const setActiveFilter = (state, activeFilter) => {
	return {
		...state,
		activeFilter,
	};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.ADD_VALUE:
			return addValueToActiveFilter(state, action.parameter, action.value);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_ALL:
			return removeAllValuesFromActiveFilter(state);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_ALL_FROM_PARAMETER:
			return removeAllParameterValuesFromActiveFilter(state, action.parameter);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_VALUE:
			return removeValueFromActiveFilter(state, action.parameter, action.value);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER.SET:
			return setActiveFilter(state, action.activeFilter);
		default:
			return state;
	}
};
