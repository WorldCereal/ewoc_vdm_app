import ActionTypes from '../../../constants/ActionTypes';
import {
	commonReducers as common,
	DEFAULT_INITIAL_STATE,
} from '@gisatcz/ptr-state';

const INITIAL_STATE = {...DEFAULT_INITIAL_STATE, activeKeys: null};

/**
 * Set active tiles
 * @param state {Object}
 * @param action {Object}
 * @param action.tiles {Array}
 * @returns {Object} new state
 */
const setActiveTiles = (state, action) => {
	return {
		...state,
		activeTiles: action.tiles,
	};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA.ADD:
			return common.add(state, action);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA.SET_ACTIVE_KEYS:
			return common.setActiveMultiple(state, action);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA.SET_ACTIVE_TILES:
			return setActiveTiles(state, action);
		default:
			return state;
	}
};
