import {filter as _filter} from 'lodash';

/**
 * Get config for layer by layerKey of layerTemplateKey
 * @param configs {Array}
 * @param layerState {Object} Panther's layerState
 * @return {null|Object}
 */
function getConfigByLayerState(configs, layerState) {
	if (configs?.length && layerState) {
		const {key: layerKey, layerTemplateKey} = layerState;
		return _filter(configs, component => {
			return (
				(component.layerKey && component.layerKey === layerKey) ||
				(component.layerTemplateKey &&
					component.layerTemplateKey === layerTemplateKey)
			);
		});
	} else {
		return null;
	}
}

export default {
	getConfigByLayerState,
};
