import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		mapSetKey: Select.maps.getActiveSetKey(state),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
