import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		activeParameter: Select.components.get(
			state,
			'productFilter',
			'activeParameter'
		),
		filterParameters:
			Select.worldCereal.productMetadataFilter.getFilterParametersOrdered(
				state
			),
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(state),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
