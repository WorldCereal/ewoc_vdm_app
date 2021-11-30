import React from 'react';
import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';

import './style.scss';

const mapStateToProps = (state, ownProps) => {
	return {
		// isProductInVisibleArea:
		// 	Select.worldCereal.productMetadata.isModelInMapExtent(
		// 		state,
		// 		ownProps.productMetadataKey,
		// 		mapSetKey
		// 	),
		productTemplate: Select.worldCereal.getProductTemplateByKey(
			state,
			ownProps.productKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onProductRemove: () => {
			dispatch(
				Action.worldCereal.removeAllLayersFromMapByLayerKeys(
					ownProps.mapKey,
					ownProps.productMetadataKeys
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
