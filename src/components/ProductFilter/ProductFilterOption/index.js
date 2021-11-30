import {connect} from '@gisatcz/ptr-state';
import Action from '../../../state/Action';
import Select from '../../../state/Select';
import {mapSetKey} from '../../../constants/app';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		selected: Select.worldCereal.productMetadataFilter.isValueInActiveFilter(
			state,
			ownProps.parameterKey,
			ownProps.value
		),
		count: Select.worldCereal.getProductMetadataCountForFilterOption(
			state,
			mapSetKey,
			ownProps.parameterKey,
			ownProps.value
		),
		metadata: Select.worldCereal.productMetadataFilter.getValueMetadata(
			state,
			ownProps.parameterKey,
			ownProps.value
		),
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(state),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onValueChange: (value, checked) => {
			if (checked) {
				dispatch(
					Action.worldCereal.productMetadataFilter.addValueToActiveFilter(
						ownProps.parameterKey,
						value
					)
				);
			} else {
				dispatch(
					Action.worldCereal.productMetadataFilter.removeValueFromActiveFilter(
						ownProps.parameterKey,
						value
					)
				);
			}
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
