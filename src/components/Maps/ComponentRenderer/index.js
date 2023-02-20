import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	const mapSetKey = Select.maps.getActiveSetKey(state);
	const componentConfiguration =
		Select.worldCereal.configuration.getComponentConfiguration(
			state,
			ownProps.configurationGroupKey,
			mapSetKey,
			ownProps.component
		);
	return {
		componentConfiguration,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
