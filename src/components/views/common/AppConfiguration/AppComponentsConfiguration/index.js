import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	const configurations =
		Select.worldCereal.configuration.getConfigGroupAvailableComponentsConfiguration(
			state,
			ownProps.configurationGroupKey,
			ownProps.configurationPath
		);
	return {
		configurations,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
