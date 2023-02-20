import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';
import Action from '../../../state/Action';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		maps: Select.maps.getMapSetMapKeys(state, ownProps.mapSetKey),
		mapMode: Select.components.get(state, 'Maps', 'mode'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setMapMode: mode => {
			dispatch(Action.components.set('Maps', 'mode', mode));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
