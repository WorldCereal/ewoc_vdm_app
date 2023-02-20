import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const componentKey = 'RegionSelect';

const mapStateToProps = state => {
	setRecomputeState(state);

	return {
		regions: Select.worldCereal.statistics.getRegions(componentKey),
		activeRegionKeys:
			Select.selections.getActive(state)?.data?.featureKeysFilter?.keys,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMount: () => dispatch(Action.data.components.use(componentKey)),
		onUnmount: () =>
			dispatch(Action.data.components.componentUseClear(componentKey)),
		onActiveRegionChange: keys => {
			dispatch(Action.selections.setActiveSelectionFeatureKeysFilterKeys(keys));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
