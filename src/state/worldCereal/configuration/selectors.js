import {createCachedSelector} from 're-reselect';

/**
 * Helper collecting the config data
 * @param componentKey {string}
 * @param openKeys {Array}
 * @param disabledKeys {Array}
 * @param configData {Object}
 * @return {Object}
 */
const getConfigContent = (componentKey, openKeys, disabledKeys, configData) => {
	return {
		active: openKeys?.includes(componentKey),
		disabled: disabledKeys?.includes(componentKey),
		key: componentKey,
		...configData,
	};
};

const getSubstate = state => state.worldCereal.configuration;

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @param path {string} [optional] Currently supporting just one nesting level
 * @return {Object}
 */
const getConfigGroup = createCachedSelector(
	[getSubstate, (state, key) => key, (state, key, path) => path],
	(substate, key, path) => {
		return path ? substate?.[key]?.[path] : substate?.[key];
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @return {Array} list of open component keys
 */
const getConfigGroupOpenComponentKeys = createCachedSelector(
	[getConfigGroup],
	configGroup => {
		return configGroup?.open;
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @return {Array} list of disabled component keys
 */
const getConfigGroupDisabledComponentKeys = createCachedSelector(
	[getConfigGroup],
	configGroup => {
		return configGroup?.disabled;
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @return {Object} all config group components
 */
const getAllConfigGroupComponents = createCachedSelector(
	[getConfigGroup],
	configGroup => {
		return configGroup?.componentsByKey;
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

const getComponentConfiguration = createCachedSelector(
	[
		(state, groupKey, path) =>
			getConfigGroupOpenComponentKeys(state, groupKey, path),
		(state, groupKey, path) =>
			getConfigGroupDisabledComponentKeys(state, groupKey, path),
		(state, groupKey, path) =>
			getAllConfigGroupComponents(state, groupKey, path),
		(state, groupKey, path, componentKey) => componentKey,
	],
	(open, disabled, components, componentKey) => {
		const configData = components?.[componentKey];
		return getConfigContent(componentKey, open, disabled, configData);
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

const getConfigGroupAvailableComponentsConfiguration = createCachedSelector(
	[getConfigGroup],
	configGroup => {
		if (configGroup) {
			return configGroup?.available?.map(componentKey => {
				const configData = configGroup.componentsByKey[componentKey];
				return getConfigContent(
					componentKey,
					configGroup.open,
					configGroup.disabled,
					configData
				);
			});
		} else {
			return null;
		}
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

const getConfigGroupOpenComponentsConfiguration = createCachedSelector(
	[getConfigGroup],
	configGroup => {
		if (configGroup) {
			return configGroup.open.map(componentKey => {
				const configData = configGroup.componentsByKey[componentKey];
				return getConfigContent(
					componentKey,
					configGroup.open,
					configGroup.disabled,
					configData
				);
			});
		} else {
			return null;
		}
	}
)((state, groupKey, path) => `${groupKey}_${path || ''}`);

export default {
	getComponentConfiguration,
	getConfigGroupAvailableComponentsConfiguration,
	getConfigGroupOpenComponentsConfiguration,
};
