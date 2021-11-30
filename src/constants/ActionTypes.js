import {commonActionTypes} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';

const specificActionTypes = utils.deepKeyMirror({
	WORLD_CEREAL: {
		PRODUCT_METADATA: {
			ADD: null,
			SET_ACTIVE_KEYS: null,
			SET_ACTIVE_TILES: null,
		},
		PRODUCT_METADATA_FILTER: {
			ACTIVE_FILTER: {
				ADD_VALUE: null,
				REMOVE_ALL: null,
				REMOVE_ALL_FROM_PARAMETER: null,
				REMOVE_VALUE: null,
				SET: null,
			},
		},
	},
});

export default {
	...commonActionTypes,
	...specificActionTypes,
};
