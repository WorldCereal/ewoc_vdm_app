import {stateManagement} from '@gisatcz/ptr-utils';

/**
 * Get selected feature keys (based on selection type)
 * @param currentFeatureKey {string}
 * @param isMultiSelect {boolean}
 * @param selectedFeatureKeys {Array}
 * @return {Array} List of feature keys
 */
function getSelectedFeatureKeysOnClick(
	currentFeatureKey,
	isMultiSelect,
	selectedFeatureKeys
) {
	if (selectedFeatureKeys?.length) {
		const alreadySelectedIndex = selectedFeatureKeys.indexOf(currentFeatureKey);

		if (isMultiSelect) {
			if (alreadySelectedIndex !== -1) {
				return stateManagement.removeItemByIndex(
					selectedFeatureKeys,
					alreadySelectedIndex
				);
			} else {
				return [...selectedFeatureKeys, currentFeatureKey];
			}
		} else {
			if (alreadySelectedIndex !== -1) {
				return [];
			} else {
				return [currentFeatureKey];
			}
		}
	} else {
		return [currentFeatureKey];
	}
}

export default {
	getSelectedFeatureKeysOnClick,
};
