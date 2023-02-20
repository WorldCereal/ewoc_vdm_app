import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Select from '../../../../state/Select';
import Action from '../../../../state/Action';

const mapStateToProps = state => {
	setRecomputeState(state);

	const mapKey = Select.maps.getActiveMapKey(state);
	const statisticsLayer =
		Select.worldCereal.statistics.getStatisticsLayerForActiveMap(mapKey);

	return {
		activeAreaTreeLevel: Select.areas.areaTreeLevels.getActive(state),
		statisticLayerState: statisticsLayer,
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
	};
};

const mapDispatchToProps = () => {
	return dispatch => {
		return {
			recalculateStatisticLayerStyle: statisticLayer => {
				dispatch(
					Action.worldCereal.statistics.recalculateStatisticLayerStyle(
						statisticLayer
					)
				);
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
