import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

export const placesFilter = {
	filterByActive: {application: true, scope: true},
	filter: {},
	order: [['nameDisplay', 'ascending']],
	start: 1,
	length: 500,
};

const mapStateToProps = state => {
	return {
		activeLevel: Select.areas.areaTreeLevels.getActive(state),
		activePlaceKeys: Select.places.getActiveKeys(state),
		places: Select.places.getIndexed(
			state,
			placesFilter.filterByActive,
			placesFilter.filter,
			placesFilter.order,
			placesFilter.start,
			placesFilter.length
		),
	};
};

const mapDispatchToPropsFactory = dispatch => {
	const componentId = `PlaceSelect_${utils.uuid()}`;
	return () => {
		return {
			onActivePlacesChange: activePlaceKeys => {
				dispatch(
					Action.places.setActiveKeys(
						activePlaceKeys?.length ? activePlaceKeys : null
					)
				);
				dispatch(
					Action.worldCereal.statistics.setActiveSelectionFeatureKeysByActivePlaceKeys()
				);
			},
			onMount: () => {
				dispatch(
					Action.places.useIndexed(
						placesFilter.filterByActive,
						placesFilter.filter,
						placesFilter.order,
						placesFilter.start,
						placesFilter.length,
						componentId
					)
				);
			},
			onUnmount: () => {
				dispatch(Action.places.useIndexedClear(componentId));
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
