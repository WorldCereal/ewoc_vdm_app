import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	const activeMapSetKey = Select.maps.getActiveSetKey(state);
	const mapKey = Select.maps.getMapSetActiveMapKey(state, activeMapSetKey);
	return {
		years: Select.worldCereal.globalProductMetadata.getYears(state),
		products: Select.worldCereal.globalProductMetadata.getAll(state, mapKey),
		isCollapsed: Select.components.get(state, 'GlobalProducts', 'collapsed'),
	};
};

const mapDispatchToProps = () => {
	return dispatch => {
		return {
			onMount: () => {
				dispatch(Action.worldCereal.globalProductMetadata.load());
			},
			onProductClick: product => {
				dispatch(
					Action.worldCereal.globalProductMetadata.addProductToMap(product)
				);
			},
			onCollapse: collapsed => {
				dispatch(
					Action.components.set('GlobalProducts', 'collapsed', collapsed)
				);
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
