import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';

import Presentation from './presentation';

import './style.scss';
import Action from '../../../state/Action';

const mapStateToProps = (state, ownProps) => {
	return {
		productTemplate: Select.worldCereal.getProductTemplateByKey(
			state,
			ownProps.productKey
		),
		layersOpacity: Select.worldCereal.getMapLayersOpacity(
			state,
			ownProps.mapKey,
			ownProps.productMetadataKeys
		),
		tourGuideProductLabelExpanded: Select.components.get(
			state,
			'tourGuide',
			'productLabel.expanded'
		),
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
		confidenceLayerActive: Select.worldCereal.getMapLayersConfidenceActive(
			state,
			ownProps.mapKey,
			ownProps.productMetadataKeys
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
		onOpacityChange: opacity => {
			dispatch(
				Action.worldCereal.setOpacityByLayerKeys(
					ownProps.mapKey,
					ownProps.productMetadataKeys,
					opacity / 100
				)
			);
		},
		onConfidenceLayerActiveChange: confidenceLayerActive => {
			dispatch(
				Action.worldCereal.setConfidenceLayerActive(
					ownProps.mapKey,
					ownProps.productMetadataKeys,
					confidenceLayerActive,
					ownProps.productMetadata
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
