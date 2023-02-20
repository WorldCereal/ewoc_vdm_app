import PropTypes from 'prop-types';
import './style.scss';

const StatisticsConfigurationItem = ({label, children}) => {
	return (
		<div className="worldCereal-StatisticsConfigurationItem">
			<span className="worldCereal-StatisticsConfigurationItem-label">
				{label}
			</span>
			{children}
		</div>
	);
};

StatisticsConfigurationItem.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

export default StatisticsConfigurationItem;
