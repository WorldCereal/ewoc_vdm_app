import {
	baseChartColorPalette,
	highlightedChartColorPalette,
} from '../constants/app';

/**
 * Get color map from predefined colors based on key
 * @param keys
 * @return {{}|null}
 */
function getColorMap(keys) {
	if (keys?.length) {
		const map = {};
		keys.forEach((key, i) => {
			map[key] = {
				base: baseChartColorPalette[i],
				highlighted: highlightedChartColorPalette[i],
			};
		});

		return map;
	} else {
		return null;
	}
}

export default {
	getColorMap,
};
