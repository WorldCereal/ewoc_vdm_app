import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

export const casesFilter = {
	filterByActive: {application: true, scope: true},
	filter: {},
	order: [['nameDisplay', 'ascending']],
	start: 1,
	length: 500,
};

const mapStateToProps = state => {
	return {
		activeCaseKey: Select.cases.getActiveKey(state),
		cases: Select.cases.getIndexed(
			state,
			casesFilter.filterByActive,
			casesFilter.filter,
			casesFilter.order,
			casesFilter.start,
			casesFilter.length
		),
	};
};

const mapDispatchToPropsFactory = dispatch => {
	const componentId = `CaseSelect_${utils.uuid()}`;
	return () => {
		return {
			onActiveCaseChange: activeCaseKey => {
				dispatch(
					Action.worldCereal.statistics.setCaseDependentChartsAttributeByActiveCaseKey(
						activeCaseKey
					)
				);
				dispatch(Action.cases.setActiveKey(activeCaseKey));
				dispatch(
					Action.worldCereal.statistics.setMapLayerActiveStyleKeyByCaseKey(
						activeCaseKey
					)
				);
			},
			onMount: activeCaseKey => {
				dispatch(
					Action.cases.useIndexed(
						casesFilter.filterByActive,
						casesFilter.filter,
						casesFilter.order,
						casesFilter.start,
						casesFilter.length,
						componentId
					)
				);
				dispatch(
					Action.worldCereal.statistics.setMapLayerActiveStyleKeyByCaseKey(
						activeCaseKey
					)
				);
			},
			onUnmount: () => {
				dispatch(Action.cases.useIndexedClear(componentId));
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
