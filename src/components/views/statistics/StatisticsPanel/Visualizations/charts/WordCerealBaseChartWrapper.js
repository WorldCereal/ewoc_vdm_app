import {Children, cloneElement, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../../../state/Select';
import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../../state/Action';

const WorldCerealBaseChartWrapper = ({
	onMount,
	onUnmount,
	children,
	...props
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount();
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	return Children.map(children, child => cloneElement(child, props));
};

WorldCerealBaseChartWrapper.propTypes = {
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	children: PropTypes.node,
	onChatClick: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
	return {
		title: Select.cases.getActive(state)?.data?.nameDisplay,
		subtitle: Select.worldCereal.statistics.getSubtitleForBaseChartWrapper(
			state,
			ownProps.componentKey
		),
	};
};

const mapDispatchToPropsFactory = (dispatch, ownProps) => {
	const componentId = `WorldCerealBaseChartWrapper_${utils.uuid()}`;
	return () => {
		return {
			onMount: () => {
				dispatch(
					Action.worldCereal.statistics.useChartAttributes(
						ownProps.componentKey,
						componentId
					)
				);
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(WorldCerealBaseChartWrapper);
