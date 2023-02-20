import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';
import Presentation from './presentation';
import Action from '../../../state/Action';

const mapStateToProps = (state, ownProps) => {
	return {
		layersOpacity: Select.worldCereal.getMapLayerOpacity(
			state,
			ownProps.mapKey,
			ownProps.layer.layerKey
		),
		layerTooltipActive: !!Select.worldCereal.getMapLayerOptionValueByKey(
			state,
			ownProps.mapKey,
			ownProps.layer.layerKey,
			'selectable'
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onProductRemove: () => {
			dispatch(
				Action.worldCereal.removeAllLayersFromMapByLayerKeys(ownProps.mapKey, [
					ownProps.layer.layerKey,
				])
			);
		},
		onOpacityChange: opacity => {
			dispatch(
				Action.worldCereal.setOpacityByLayerKeys(
					ownProps.mapKey,
					[ownProps.layer.layerKey],
					opacity / 100
				)
			);
		},
		onLayerTooltipActiveChange: active => {
			dispatch(
				Action.maps.setMapLayerOption(
					ownProps.mapKey,
					ownProps.layer.layerKey,
					'selectable',
					active
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
