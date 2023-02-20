import ActionTypes from '../../../constants/ActionTypes';
import {
	commonReducers as common,
	DEFAULT_INITIAL_STATE,
} from '@gisatcz/ptr-state';

const INITIAL_STATE = {...DEFAULT_INITIAL_STATE, activeKeys: null};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.WORLD_CEREAL.GLOBAL_PRODUCT_METADATA.ADD:
			return common.add(state, action);
		default:
			return state;
	}
};
