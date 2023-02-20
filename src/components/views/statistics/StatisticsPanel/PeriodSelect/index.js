import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

export const periodsFilter = {
	filterByActive: {application: true, scope: true},
	filter: {},
	order: [['nameDisplay', 'ascending']],
	start: 1,
	length: 500,
};

const mapStateToProps = state => {
	return {
		activePeriodKey: Select.periods.getActiveKey(state),
		periods: Select.worldCereal.statistics.getPeriods(
			state,
			periodsFilter.filterByActive,
			periodsFilter.filter,
			periodsFilter.order,
			periodsFilter.start,
			periodsFilter.length
		),
		availablePeriods:
			Select.worldCereal.statistics.getAvailablePeriodsForActiveCase(state),
	};
};

const mapDispatchToPropsFactory = dispatch => {
	const componentId = `PeriodSelect_${utils.uuid()}`;
	return () => {
		return {
			onActivePeriodChange: activePeriodKey => {
				dispatch(Action.periods.setActiveKey(activePeriodKey));
			},
			onMount: () => {
				dispatch(
					Action.periods.useIndexed(
						periodsFilter.filterByActive,
						periodsFilter.filter,
						periodsFilter.order,
						periodsFilter.start,
						periodsFilter.length,
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
