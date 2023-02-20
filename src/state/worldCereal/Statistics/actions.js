import {
	Action as CommonAction,
	commonSelectors,
	commonHelpers,
} from '@gisatcz/ptr-state';
import {forIn as _forIn, isEqual as _isEqual, isNumber} from 'lodash';
import Action from '../../Action';
import Select from '../../Select';
import {STATISTICSLAYERKEY, globalAreaLevelKey} from '../../../constants/app';
import {map as mapUtils} from '@gisatcz/ptr-utils';

const CLASSES_COUNT = 5;
const COLORS = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];

function clearCountryLevelSelection() {
	return (dispatch, getState) => {
		const selectionKey =
			Select.worldCereal.statistics.getSelectionKeyForCountryLevel(getState());
		if (selectionKey) {
			dispatch(CommonAction.selections.clearFeatureKeysFilter(selectionKey));
		}
	};
}

/**
 * Set active place keys by active selection feature keys. The linking should be stored in app configuration.
 */
function setActivePlaceKeysByActiveSelectionFeatureKeys() {
	return (dispatch, getState) => {
		const placeKeyByFeatureKey = Select.app.getConfiguration(
			getState(),
			'placeKeyByCountryFeatureKey'
		);
		const featureKeys = Select.selections.getActive(getState())?.data
			?.featureKeysFilter?.keys;

		if (placeKeyByFeatureKey && featureKeys) {
			const placeKeys = featureKeys.map(
				featureKey => placeKeyByFeatureKey[featureKey]
			);

			dispatch(clearCountryLevelSelection());
			dispatch(
				CommonAction.places.setActiveKeys(placeKeys.length ? placeKeys : null)
			);
		}
	};
}

/**
 * Set selected feature keys in active selection by place keys. The linking should be stored in app configuration.
 */
function setActiveSelectionFeatureKeysByActivePlaceKeys() {
	return (dispatch, getState) => {
		const placeKeyByFeatureKey = Select.app.getConfiguration(
			getState(),
			'placeKeyByCountryFeatureKey'
		);

		const placeKeys = Select.places.getActiveKeys(getState());

		if (placeKeyByFeatureKey) {
			const featureKeys = [];
			placeKeys?.forEach(placeKey => {
				_forIn(placeKeyByFeatureKey, (value, featureKey) => {
					if (placeKey === value) {
						featureKeys.push(featureKey);
					}
				});
			});

			dispatch(clearCountryLevelSelection());
			dispatch(
				CommonAction.selections.setActiveSelectionFeatureKeysFilterKeys(
					featureKeys
				)
			);
		}
	};
}

/**
 * Set selected feature keys in active selection by place keys. The linking should be stored in app configuration.
 */
function setActiveSelectionForActiveAreaTreeLevel() {
	return (dispatch, getState) => {
		const selectionConfig = Select.app.getConfiguration(
			getState(),
			'selectionByAreaTreeLevelKey'
		);
		const activeAreaTreeLevelKey = Select.areas.areaTreeLevels.getActiveKey(
			getState()
		);
		const selectionKey = selectionConfig?.[activeAreaTreeLevelKey];

		if (selectionKey) {
			dispatch(CommonAction.selections.setActiveKey(selectionKey));
		}
	};
}

/**
 * Zoom to active place when switching from global level to regional level.
 */
function zoomToActivePlace(activeLevelKey) {
	return (dispatch, getState) => {
		if (activeLevelKey !== globalAreaLevelKey) {
			const activePlaceKeys = Select.places.getActiveKeys(getState());
			if (activePlaceKeys?.length === 1) {
				const activePlaceKey = activePlaceKeys[0];
				const activePlace = Select.places.getByKey(getState(), activePlaceKey);

				const view = mapUtils.view.getViewFromGeometry(activePlace.data.bbox);

				const mapSetKey = Select.maps.getActiveSetKey(getState());

				dispatch(CommonAction.maps.updateSetView(mapSetKey, view));
			}
		}
	};
}

/**
 * Set statistics layer styleKey based on active caseKey
 */
function setMapLayerActiveStyleKeyByCaseKey(caseKey) {
	return (dispatch, getState) => {
		const configByCaseKey = Select.app.getConfiguration(
			getState(),
			'configByCaseKey'
		);

		const caseConfiguration = configByCaseKey?.[caseKey];
		const styleKey = caseConfiguration?.styleKey;

		if (styleKey) {
			const mapKey = Select.maps.getActiveMapKey(getState());
			dispatch(
				Action.maps.setMapLayerStyleKey(mapKey, STATISTICSLAYERKEY, styleKey)
			);
		}
	};
}

/**
 * Set statistics layer styleKey based on active caseKey
 */
function setCaseDependentChartsAttributeByActiveCaseKey(caseKey) {
	return (dispatch, getState) => {
		const configByCaseKey = Select.app.getConfiguration(
			getState(),
			'configByCaseKey'
		);

		const caseConfiguration = configByCaseKey?.[caseKey];
		const components = Select.data.components.getAllComponentsAsObject(
			getState()
		);

		if (components && caseConfiguration) {
			const absoluteAttributeKey = caseConfiguration?.absoluteAttributeKey;
			const relativeAttributeKey = caseConfiguration?.relativeAttributeKey;

			_forIn(components, (metadata, key) => {
				const attributeType = metadata?.options?.attributeType;
				const attributeOrder = metadata?.attributeOrder;
				if (attributeType) {
					if (attributeType === 'absolute') {
						dispatch(
							CommonAction.data.components.setAttributeKeys(key, [
								absoluteAttributeKey,
							])
						);

						dispatch(
							CommonAction.attributes.useKeys(
								[absoluteAttributeKey],
								'setCaseDependentChartsAttributeByActiveCaseKey'
							)
						);

						if (attributeOrder) {
							dispatch(
								CommonAction.data.components.setAttributeOrder(key, [
									[absoluteAttributeKey, attributeOrder[0][1]],
								])
							);
						}
					}

					if (attributeType === 'relative') {
						dispatch(
							CommonAction.data.components.setAttributeKeys(key, [
								relativeAttributeKey,
							])
						);
						if (attributeOrder) {
							dispatch(
								CommonAction.data.components.setAttributeOrder(key, [
									[relativeAttributeKey, attributeOrder[0][1]],
								])
							);
						}
					}
				}
			});
		}
	};
}

/**
 * Set statistics layer areaTreeLevelKey
 */
function setMapLayerActiveAreaTreeLevelKey(areaTreeLevelKey) {
	return (dispatch, getState) => {
		const mapKey = Select.maps.getActiveMapKey(getState());
		const activeSelectionKey = Select.selections.getActiveKey(getState());

		let layerSettings = null;
		if (areaTreeLevelKey === globalAreaLevelKey) {
			layerSettings =
				Select.worldCereal.statistics.getUpdatedLayerStateByPlaces(
					getState(),
					mapKey,
					STATISTICSLAYERKEY,
					[]
				);
		} else {
			const activePlaceKey = Select.places.getActiveKeys(getState());
			layerSettings =
				Select.worldCereal.statistics.getUpdatedLayerStateByPlaces(
					getState(),
					mapKey,
					STATISTICSLAYERKEY,
					activePlaceKey
				);
		}

		layerSettings = {
			...layerSettings,
			areaTreeLevelKey,
			key: layerSettings.key,
			layerKey: layerSettings.layerKey,
			filterByActive: layerSettings.filterByActive,
			metadataModifiers: layerSettings.metadataModifiers,
			options: {...layerSettings.options, selected: {[activeSelectionKey]: {}}},
			styleKey: layerSettings.styleKey,
		};
		dispatch(Action.maps.removeMapLayer(mapKey, STATISTICSLAYERKEY));
		dispatch(Action.maps.addMapLayers(mapKey, [layerSettings]));
	};
}

/**
 * Set statistics layer areaTreeLevelKey
 */
function setMapLayerActivePlaceKey(activePlaceKeys) {
	return (dispatch, getState) => {
		const mapKey = Select.maps.getActiveMapKey(getState());

		const layerSettings =
			Select.worldCereal.statistics.getUpdatedLayerStateByPlaces(
				getState(),
				mapKey,
				STATISTICSLAYERKEY,
				activePlaceKeys
			);
		dispatch(Action.maps.removeMapLayer(mapKey, STATISTICSLAYERKEY));
		dispatch(Action.maps.addMapLayers(mapKey, [layerSettings]));
	};
}

/**
 * Set active place by featureKeys on global areaLevel
 */
function onLayerClick() {
	return (dispatch, getState) => {
		const activeAreaTreeLevelKey = Select.areas.areaTreeLevels.getActiveKey(
			getState()
		);
		if (activeAreaTreeLevelKey === globalAreaLevelKey) {
			dispatch(
				Action.worldCereal.statistics.setActivePlaceKeysByActiveSelectionFeatureKeys()
			);
		}
	};
}

/**
 * Set active place by featureKeys on global areaLevel
 */
function recalculateStatisticLayerStyle(statisticLayer) {
	return (dispatch, getState) => {
		const layerStyle = statisticLayer?.options?.style;
		const layerFeatures = statisticLayer?.options?.features || [];
		const attributeKey = layerStyle?.rules?.[0]?.styles?.[1]?.attributeKey;

		let minValue = null;
		let maxValue = null;

		layerFeatures.forEach(feature => {
			const value = feature?.properties?.[attributeKey];
			if (isNumber(value)) {
				if (minValue == null) {
					minValue = value;
				} else {
					minValue = value < minValue ? value : minValue;
				}

				if (maxValue == null) {
					maxValue = value;
				} else {
					maxValue = value > maxValue ? value : maxValue;
				}
			}
		});

		const range = maxValue - minValue;
		const classRange = range / CLASSES_COUNT;

		const mapKey = Select.maps.getActiveMapKey(getState());
		const layer =
			statisticLayer &&
			Select.maps.getLayerStateByLayerKeyAndMapKey(
				getState(),
				mapKey,
				statisticLayer?.layerKey
			);
		const style = layer && Select.styles.getByKey(getState(), layer?.styleKey);

		let attributeClasses = [];

		for (let i = 0; i < CLASSES_COUNT; i++) {
			const max =
				i === CLASSES_COUNT - 1 ? maxValue : minValue + (i + 1) * classRange;
			const min =
				i === 0 ? minValue + i * classRange : minValue + i * classRange;
			attributeClasses.push({
				intervalBounds: [true, i === CLASSES_COUNT - 1 ? true : false],
				fill: COLORS[i],
				interval: [min, max],
			});
		}

		const styles = [
			{...(style?.data?.definition?.rules?.[0]?.styles?.[0] || {})},
			{
				attributeKey: attributeKey,
				...(range === 0 ? {attributeClasses: []} : {attributeClasses}),
			},
		];
		//check if same style is not applied to prevent cycle of changes
		if (
			!_isEqual(style?.data?.definition?.rules?.[0]?.styles, styles) &&
			style?.key
		) {
			dispatch(
				Action.styles.add({
					key: style?.key,
					data: {
						...style?.data,
						definition: {
							rules: [
								{
									styles,
								},
							],
						},
					},
				})
			);
		}
	};
}

/**
 * Use attributes for component
 */
function useChartAttributes(componentKey, componentId) {
	return (dispatch, getState) => {
		const componentState = Select.data.components.getComponentStateByKey(
			getState(),
			componentKey
		);
		const attributeKeys = componentState?.attributeKeys;
		if (attributeKeys?.length) {
			dispatch(Action.attributes.useKeys(attributeKeys, componentId));
		}
	};
}

function ensureRegionName(fid, nameAttributeKey) {
	return (dispatch, getState) => {
		const order = null;

		const filterByActive = {
			areaTreeLevel: true,
			place: true,
			scope: true,
			application: true,
		};

		const activeKeys = commonSelectors.getAllActiveKeys(getState());
		let fullFilter = commonHelpers.mergeFilters(activeKeys, filterByActive, {});

		const commonFilter = {
			attributeKeys: [nameAttributeKey],
			areaTreeLevelKey: fullFilter.areaTreeLevelKey,
			modifiers: {
				placeKey: fullFilter.placeKey,
				scopeKey: fullFilter.scopeKey,
				applicationKey: fullFilter.applicationKey,
			},
		};

		const attributeDataFilterExtension = {featureKeys: [fid]};
		const loadRelations = false;
		const loadData = true;
		const relationsPagination = {
			offset: 0,
			limit: 1,
		};
		const attributeDataPagination = {
			offset: 0,
			limit: 1,
		};

		dispatch(
			Action.data.components.loadIndexedPage(
				order,
				commonFilter,
				attributeDataFilterExtension,
				loadRelations,
				loadData,
				relationsPagination,
				attributeDataPagination
			)
		);
	};
}

export default {
	setActiveSelectionFeatureKeysByActivePlaceKeys,
	setActivePlaceKeysByActiveSelectionFeatureKeys,
	setActiveSelectionForActiveAreaTreeLevel,
	setCaseDependentChartsAttributeByActiveCaseKey,
	setMapLayerActiveStyleKeyByCaseKey,
	setMapLayerActiveAreaTreeLevelKey,
	setMapLayerActivePlaceKey,
	onLayerClick,
	recalculateStatisticLayerStyle,
	useChartAttributes,
	zoomToActivePlace,
	ensureRegionName,
};
