import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

import {aez} from '../../../../data/layers/vectorLayers';

const mapStateToProps = (state, ownProps) => {
	const aezIsActive =
		Select.maps.getLayerStateByLayerKeyAndMapKey(
			state,
			ownProps.mapKey,
			'aez'
		) !== null;
	return {
		aezIsActive: aezIsActive,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: aezIsActive => {
			aezIsActive
				? dispatch(Action.maps.removeMapLayer(ownProps.mapKey, 'aez'))
				: dispatch(Action.maps.addMapLayers(ownProps.mapKey, [aez]));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
