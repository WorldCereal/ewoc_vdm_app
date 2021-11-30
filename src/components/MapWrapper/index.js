import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
	return {
		activeMapKey: Select.maps.getMapSetActiveMapKey(state, mapSetKey),
		mapSetMapKeys: Select.maps.getMapSetMapKeys(state, mapSetKey),
		productsMetadata:
			Select.worldCereal.productMetadata.getModelsByMapKeyGroupedByParam(
				state,
				ownProps.mapKey,
				'product'
			),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		removeMap: mapKey => {
			dispatch(Action.maps.removeMap(mapKey));
		},
		removeAllLayers: mapKey => {
			dispatch(Action.worldCereal.removeAllMapLayers(mapKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
