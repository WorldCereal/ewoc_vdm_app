import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	setRecomputeState(state);

	return {
		noDataForCurrentSettings:
			!Select.worldCereal.statistics.isDataForCurrentSettings(state),
		componentSet:
			Select.worldCereal.statistics.getVisualizationComponentSet(state),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
