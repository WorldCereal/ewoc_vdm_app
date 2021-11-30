import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
	return {
		productTemplates: Select.worldCereal.getProductTemplates(state),
		productMetadata:
			Select.worldCereal.getActiveProductMetadataByActiveFilter(state),
		activeLayers: Select.maps.getMapSetActiveMapLayers(state, mapSetKey),
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(state),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleProductInActiveMap: data =>
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(
					data.layerTemplateKey
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
