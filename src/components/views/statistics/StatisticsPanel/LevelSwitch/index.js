import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Select from '../../../../../state/Select';
import Action from '../../../../../state/Action';
import Presentation from './presentation';

export const levelsFilter = {
	filterByActive: {application: true, scope: true},
	filter: {
		areaTreeKey: '79b65d72-9d4c-4959-a7fa-579c3a372406',
	},
	order: [['level', 'ascending']],
	start: 1,
	length: 2,
};

const mapStateToProps = state => {
	return {
		countryLevelDisabled:
			Select.worldCereal.statistics.isCountryLevelDisabled(state),
		activeLevelKey: Select.areas.areaTreeLevels.getActiveKey(state),
		activePlaceKeys: Select.places.getActiveKeys(state),
		levels: Select.areas.areaTreeLevels.getIndexed(
			state,
			levelsFilter.filterByActive,
			levelsFilter.filter,
			levelsFilter.order,
			levelsFilter.start,
			levelsFilter.length
		),
	};
};

const mapDispatchToPropsFactory = dispatch => {
	const componentId = `LevelSwitch_${utils.uuid()}`;
	return () => {
		return {
			onActiveLevelChange: activeLevelKey => {
				// TODO clear use for all data components
				dispatch(
					Action.data.components.componentUseClear('GlobalSharePieChart')
				);
				dispatch(
					Action.data.components.componentUseClear('CountryTopTenBarChart')
				);
				dispatch(
					Action.data.components.componentUseClear('CountrySharePieChart')
				);
				dispatch(
					Action.data.components.componentUseClear('CountryRegionsBarChart')
				);

				dispatch(Action.areas.areaTreeLevels.setActiveKey(activeLevelKey));
				dispatch(
					Action.worldCereal.statistics.setActiveSelectionForActiveAreaTreeLevel()
				);

				//zoom to place
				dispatch(
					Action.worldCereal.statistics.zoomToActivePlace(activeLevelKey)
				);
			},
			setLayer: activeLevelKey => {
				dispatch(
					Action.worldCereal.statistics.setMapLayerActiveAreaTreeLevelKey(
						activeLevelKey
					)
				);
			},
			onMount: () => {
				dispatch(
					Action.areas.areaTreeLevels.useIndexed(
						levelsFilter.filterByActive,
						levelsFilter.filter,
						levelsFilter.order,
						levelsFilter.start,
						levelsFilter.length,
						componentId
					)
				);
			},
			onUnmount: () => {
				dispatch(Action.periods.useIndexedClear(componentId));
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
