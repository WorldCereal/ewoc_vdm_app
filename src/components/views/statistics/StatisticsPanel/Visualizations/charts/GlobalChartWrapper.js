import PropTypes from 'prop-types';
import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../../../state/Action';
import {Children, cloneElement} from 'react';

const GlobalChart = ({children, ...props}) => {
	return Children.map(children, child => cloneElement(child, props));
};

GlobalChart.propTypes = {
	children: PropTypes.node,
	onChatClick: PropTypes.func,
};

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onChartClick: () => {
			dispatch(
				Action.worldCereal.statistics.setActivePlaceKeysByActiveSelectionFeatureKeys()
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChart);
