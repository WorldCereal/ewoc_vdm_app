import ActionTypes from '../../../constants/ActionTypes';

const actionUpdate = data => {
	return {
		type: ActionTypes.WORLD_CEREAL.CONFIGURATION.UPDATE,
		data,
	};
};

/**
 * Update whole visat state from view definition
 * @param data {Object}
 */
function updateStateFromView(data) {
	return dispatch => {
		if (data) {
			dispatch(actionUpdate(data));
		}
	};
}

function addComponentToOpen(
	configurationGroupKey,
	configurationPath,
	componentKey
) {
	if (configurationGroupKey && componentKey) {
		return {
			type: ActionTypes.WORLD_CEREAL.CONFIGURATION.OPEN.ADD,
			configurationGroupKey,
			configurationPath,
			componentKey,
		};
	}
}

function removeComponentFromOpen(
	configurationGroupKey,
	configurationPath,
	componentKey
) {
	return {
		type: ActionTypes.WORLD_CEREAL.CONFIGURATION.OPEN.REMOVE,
		configurationGroupKey,
		configurationPath,
		componentKey,
	};
}

export default {
	addComponentToOpen,
	removeComponentFromOpen,

	updateStateFromView,
};
