import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	const mapSetKey = Select.maps.getActiveSetKey(state);

	return {
		activeParameter: Select.components.get(
			state,
			'ProductFilter',
			'activeParameter'
		),
		filterParameters:
			Select.worldCereal.productMetadataFilter.getFilterParametersOrdered(
				state
			),
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(
			state,
			mapSetKey
		),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
