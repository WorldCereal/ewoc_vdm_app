import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	const mapSetKey = Select.maps.getActiveSetKey(state);
	const layers = Select.worldCereal.timeline.getTimelineLayers(state);
	const activeMapKey = Select.maps.getMapSetActiveMapKey(state, mapSetKey);
	return {
		layers,
		activeMapKey,
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(
			state,
			mapSetKey
		),
		isCollapsed: Select.components.get(state, 'Timeline', 'collapsed'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLayerClick: (timelineLayerPeriodItem, timelineLayer) => {
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(
					timelineLayer?.layerState?.layerKey,
					timelineLayer?.layerState?.spatialDataSourceKey
				)
			);
		},
		onCollapse: collapsed => {
			dispatch(Action.components.set('Timeline', 'collapsed', collapsed));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
