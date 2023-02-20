import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		attributesMetadata: Select.attributes.getByKeysAsObject(
			state,
			Object.keys(ownProps?.attributes || {})
		),
	};
};

const mapDispatchToPropsFactory = () => {
	return (dispatch, ownProps) => {
		return {
			onMount: () => {
				dispatch(
					Action.attributes.useKeys(
						Object.keys(ownProps?.attributes || {}),
						'ChartTooltip'
					)
				);
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(presentation);
