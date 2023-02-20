import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Select from '../../../state/Select';
import Action from '../../../state/Action';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		maps: Select.maps.getMapSetMapKeys(state, ownProps.mapSetKey),
		mapMode: Select.components.get(state, 'Maps', 'mode'),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addMap: () => {
			const mapKey = utils.uuid();
			dispatch(Action.maps.addMap({key: mapKey}));
			dispatch(Action.maps.addMapToSet(mapKey, ownProps.mapSetKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
