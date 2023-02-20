import ActionTypes from '../../../constants/ActionTypes';
import {stateManagement} from '@gisatcz/ptr-utils';

// App specific reducers
const INITIAL_STATE = {};

const addConfigurationToOpen = (
	state,
	configurationGroupKey,
	configurationPath,
	componentKey
) => {
	if (configurationGroupKey && componentKey) {
		// currently supporting just one level of path
		if (configurationPath) {
			return {
				...state,
				[configurationGroupKey]: {
					...state[configurationGroupKey],
					[configurationPath]: {
						...state[configurationGroupKey][configurationPath],
						open: [
							...state[configurationGroupKey][configurationPath].open,
							componentKey,
						],
					},
				},
			};
		} else {
			return {
				...state,
				[configurationGroupKey]: {
					...state[configurationGroupKey],
					open: [...state[configurationGroupKey].open, componentKey],
				},
			};
		}
	} else {
		return state;
	}
};

const removeConfigurationFromOpen = (
	state,
	configurationGroupKey,
	configurationPath,
	componentKey
) => {
	if (configurationGroupKey && componentKey) {
		// currently supporting just one level of path
		if (configurationPath) {
			const componentIndex = state[configurationGroupKey][
				configurationPath
			].open.findIndex(a => a === componentKey);
			if (componentIndex > -1) {
				return {
					...state,
					[configurationGroupKey]: {
						...state[configurationGroupKey],
						[configurationPath]: {
							...state[configurationGroupKey][configurationPath],
							open: [
								...stateManagement.removeItemByIndex(
									state[configurationGroupKey][configurationPath].open,
									componentIndex
								),
							],
						},
					},
				};
			} else {
				return state;
			}
		} else {
			const componentIndex = state[configurationGroupKey].open.findIndex(
				a => a === componentKey
			);
			if (componentIndex > -1) {
				return {
					...state,
					[configurationGroupKey]: {
						...state[configurationGroupKey],
						open: [
							...stateManagement.removeItemByIndex(
								state[configurationGroupKey].open,
								componentIndex
							),
						],
					},
				};
			} else {
				return state;
			}
		}
	} else {
		return state;
	}
};

/**
 * Update whole visat state
 * @param state {Object}
 * @param data {Object}
 * @return {Object}
 */
const update = (state, data) => {
	return {...state, ...data};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.WORLD_CEREAL.CONFIGURATION.OPEN.ADD:
			return addConfigurationToOpen(
				state,
				action.configurationGroupKey,
				action.configurationPath,
				action.componentKey
			);
		case ActionTypes.WORLD_CEREAL.CONFIGURATION.OPEN.REMOVE:
			return removeConfigurationFromOpen(
				state,
				action.configurationGroupKey,
				action.configurationPath,
				action.componentKey
			);
		case ActionTypes.WORLD_CEREAL.CONFIGURATION.UPDATE:
			return update(state, action.data);
		default:
			return state;
	}
};
