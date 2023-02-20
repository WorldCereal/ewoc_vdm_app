import {createSelector} from 'reselect';
import {
	find as _find,
	omit as _omit,
	includes as _includes,
	isObject as _isObject,
} from 'lodash';
import {
	recomputeSelectorOptions,
	createRecomputeSelector,
	createRecomputeObserver,
	Select as CommonSelect,
	commonSelectors,
	commonHelpers,
} from '@gisatcz/ptr-state';
import {STATISTICSLAYERKEY, globalAreaLevelKey} from '../../../constants/app';
import {createCachedSelector} from 're-reselect';

const getComponentSetByLevelKeyBySelectedFeaturesCountByCaseKeyConfig =
	createRecomputeObserver(state =>
		CommonSelect.app.getConfiguration(
			state,
			'componentSetByLevelKeyBySelectedFeaturesCountByCaseKey'
		)
	);

const getActiveSelection = createRecomputeObserver(
	CommonSelect.selections.getActive
);

const getActiveCaseKey = createRecomputeObserver(
	CommonSelect.cases.getActiveKey
);

const getActiveLevelKey = createRecomputeObserver(
	CommonSelect.areas.areaTreeLevels.getActiveKey
);
const getComponentSetByKey = createRecomputeObserver(
	CommonSelect.data.components.getSetStateByKey
);

const getComponentSetKeyByActivePlaceNumberOfSelectedFeatureKeys =
	createRecomputeSelector(() => {
		const componentSetsConfig =
			getComponentSetByLevelKeyBySelectedFeaturesCountByCaseKeyConfig();
		const activeSelection = getActiveSelection();
		const numberOfSelectedFeatures =
			activeSelection?.data?.featureKeysFilter?.keys?.length;
		const activeLevelKey = getActiveLevelKey();
		const activeCaseKey = getActiveCaseKey();

		if (activeLevelKey && activeCaseKey && componentSetsConfig) {
			let configByCaseKey;
			if (numberOfSelectedFeatures > 1) {
				configByCaseKey =
					componentSetsConfig[activeLevelKey]?.['multiple-selected'];
			} else if (numberOfSelectedFeatures === 1) {
				configByCaseKey = componentSetsConfig[activeLevelKey]?.['one-selected'];
			} else {
				configByCaseKey = componentSetsConfig[activeLevelKey]?.['no-selected'];
			}

			return _isObject(configByCaseKey)
				? configByCaseKey[activeCaseKey]
				: configByCaseKey;
		} else {
			return null;
		}
	});

/**
 * Get component set state
 * @returns {Object} state of component set
 */
const getVisualizationComponentSet = createRecomputeSelector(() => {
	const componentSetKey =
		getComponentSetKeyByActivePlaceNumberOfSelectedFeatureKeys();
	return getComponentSetByKey(componentSetKey);
}, recomputeSelectorOptions);

/**
 * Get regions from attribute data
 */
const getRegions = createRecomputeSelector(componentKey => {
	const data = CommonSelect.data.components.getData(componentKey);
	const metadata =
		CommonSelect.data.components.getComponentStateByKeyObserver(componentKey);
	const nameAttributeKey = metadata?.attributeKeys[0];

	if (data && nameAttributeKey) {
		return data.map(item => {
			return {
				key: item.key,
				name: item.data[nameAttributeKey],
			};
		});
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * TODO for now there is a limitation in configuration
 */
const getPeriods = createSelector(
	[
		CommonSelect.periods.getIndexed,
		state => CommonSelect.app.getConfiguration(state, 'unavailablePeriodKeys'),
	],
	(periods, unavailablePeriodKeys) => {
		if (periods) {
			return periods.filter(period =>
				unavailablePeriodKeys
					? !_includes(unavailablePeriodKeys, period.key)
					: period
			);
		} else {
			return null;
		}
	}
);

/**
 * TODO for now there is a limitation in configuration
 */
const isCountryLevelDisabled = createSelector(
	[
		CommonSelect.places.getActiveKeys,
		state =>
			CommonSelect.app.getConfiguration(
				state,
				'availableCountryLevelForPlaceKey'
			),
	],
	(activePlaceKeys, availableForPlaceKey) => {
		return !(
			activePlaceKeys?.length === 1 &&
			activePlaceKeys[0] === availableForPlaceKey
		);
	}
);

/**
 * Get selection associated wit country level
 * @returns {string}
 */
const getSelectionKeyForCountryLevel = createSelector(
	[
		CommonSelect.areas.areaTreeLevels.getAll,
		state =>
			CommonSelect.app.getConfiguration(state, 'selectionByAreaTreeLevelKey'),
	],
	(levels, selectionByLevelKey) => {
		if (levels && selectionByLevelKey) {
			const countryLevel = _find(levels, level => level.data.level === 2);
			if (countryLevel) {
				return selectionByLevelKey[countryLevel.key];
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
);

/**
 * @param state,
 */
const getStatisticsLayerForActiveMap = createRecomputeSelector(mapKey => {
	const mapLayers = CommonSelect.maps.getMapLayers(mapKey);
	return mapLayers?.find(l => l?.layerKey === STATISTICSLAYERKEY);
});

/**
 * @param state,
 * @param mapKey,
 * @param layerKey,
 */
const getUpdatedLayerStateByPlaces = createSelector(
	[
		CommonSelect.maps.getActiveMapKey,
		CommonSelect.maps.getLayerStateByLayerKeyAndMapKey,
		(state, mapKey, layerKey, activePlaceKeys) => activePlaceKeys,
	],
	(mapKey, layer, activePlaceKeys) => {
		const layerSettings = {
			areaTreeLevelKey: layer.areaTreeLevelKey,
			key: layer.key,
			layerKey: layer.layerKey,
			filterByActive: layer.filterByActive,
			metadataModifiers: {
				..._omit(layer.metadataModifiers, 'placeKey'),
				...(activePlaceKeys?.length ? {placeKey: activePlaceKeys[0]} : {}),
			},
			options: layer.options,
			styleKey: layer.styleKey,
		};
		return layerSettings;
	}
);

/**
 * @param state,
 * @param mapKey,
 * @param layerKey,
 */
const getStyleKeyForActiveMapAndLayerKey = createSelector(
	[CommonSelect.maps.getLayerStateByLayerKeyAndMapKey],
	layer => {
		return layer?.styleKey;
	}
);
/**
 * @param state,
 * @param mapKey,
 * @param layerKey,
 */
const getTooltipTitle = createSelector(
	[
		CommonSelect.areas.areaTreeLevels.getActiveKey,
		CommonSelect.places.getAllAsObject,
		CommonSelect.app.getCompleteConfiguration,
		(state, featureName) => featureName,
	],
	(activeAreaLevelKey, placesAsObject, configuration, featureName) => {
		if (activeAreaLevelKey === globalAreaLevelKey) {
			const placeKey =
				configuration?.placeKeyByCountryFeatureKey?.[featureName];

			return placesAsObject?.[placeKey]?.data?.nameDisplay;
		}
	}
);

/**
 * @param state,
 */
const getActiveRelativeAttributeKey = createSelector(
	[CommonSelect.cases.getActiveKey, CommonSelect.app.getCompleteConfiguration],
	(activeCaseKey, configuration) => {
		const configByCaseKey = configuration?.['configByCaseKey'];
		return configByCaseKey?.[activeCaseKey]?.['relativeAttributeKey'];
	}
);

/**
 * @param state,
 */
const getActiveRelativeAttributeName = createSelector(
	[
		CommonSelect.cases.getActiveKey,
		CommonSelect.app.getCompleteConfiguration,
		CommonSelect.attributes.getAllAsObject,
	],
	(activeCaseKey, configuration, attributes) => {
		const configByCaseKey = configuration?.['configByCaseKey'];
		const relativeAttributeKey =
			configByCaseKey?.[activeCaseKey]?.['relativeAttributeKey'];
		return attributes?.[relativeAttributeKey]?.data?.nameDisplay;
	}
);

/**
 * @param state,
 */
const getSubtitleForBaseChartWrapper = createCachedSelector(
	[
		CommonSelect.data.components.getComponentStateByKey,
		CommonSelect.attributes.getAllAsObject,
	],
	(componentState, attributes) => {
		if (componentState && attributes) {
			const attributeKey = componentState.attributeKeys?.[0];
			const attributeMetadata = attributes[attributeKey];
			if (attributeMetadata) {
				const {nameDisplay, unit} = attributeMetadata.data;
				return `${nameDisplay || ''} ${unit ? `[${unit}]` : ''}`;
			} else {
				return '';
			}
		} else {
			return '';
		}
	}
)((state, componentKey) => componentKey);

/**
 * Get available periods from config
 * @param state {Object}
 * @param {Array}
 */
const getAvailablePeriodsForActiveCase = createSelector(
	[
		CommonSelect.cases.getActiveKey,
		state => CommonSelect.app.getConfiguration(state, 'configByCaseKey'),
	],
	(activeCaseKey, configByCaseKey) => {
		return configByCaseKey?.[activeCaseKey]?.availablePeriodKeys || null;
	}
);

/**
 * Is data for current case-period combination
 * @param state {Object}
 * @returns {boolean}
 */
const isDataForCurrentSettings = createSelector(
	[CommonSelect.periods.getActiveKey, getAvailablePeriodsForActiveCase],
	(activePeriodKey, availablePeriods) => {
		return (
			availablePeriods &&
			availablePeriods &&
			_includes(availablePeriods, activePeriodKey)
		);
	}
);

/**
 * Get subregion name by FID and attributeKeys
 */
const getRegionName = createSelector(
	[
		commonSelectors.getAllActiveKeys,
		(state, filter) => filter,
		(state, filter, fid) => fid,
	],
	(activeKeys, filter, fid) => {
		let fullFilter = commonHelpers.mergeFilters(
			activeKeys,
			filter.filterByActive,
			filter.filter
		);

		const finalFilter = {
			attributeKeys: fullFilter.attributeKeys,
			areaTreeLevelKey: fullFilter.areaTreeLevelKey,
			modifiers: {
				placeKey: fullFilter.placeKey,
				scopeKey: fullFilter.scopeKey,
				applicationKey: fullFilter.applicationKey,
			},
		};

		const DS = CommonSelect.data.attributeRelations.getIndexed(finalFilter);

		const attributeDSKey = DS?.[0]?.data?.attributeDataSourceKey;
		const attributeName = 'title';
		const regionNameData =
			CommonSelect.data.attributeData.getAttributesByDataSourceKeysForFeatureKey(
				{[attributeDSKey]: attributeName},
				fid
			);

		return regionNameData?.[attributeName];
	}
);

export default {
	isCountryLevelDisabled,
	isDataForCurrentSettings,
	getVisualizationComponentSet,
	getPeriods,
	getAvailablePeriodsForActiveCase,
	getRegions,
	getSelectionKeyForCountryLevel,
	getUpdatedLayerStateByPlaces,
	getStatisticsLayerForActiveMap,
	getTooltipTitle,
	getActiveRelativeAttributeKey,
	getActiveRelativeAttributeName,
	getStyleKeyForActiveMapAndLayerKey,
	getSubtitleForBaseChartWrapper,
	getRegionName,
};
