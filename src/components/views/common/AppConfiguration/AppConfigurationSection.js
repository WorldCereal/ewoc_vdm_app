import PropTypes from 'prop-types';

const AppConfigurationSection = ({children, title}) => {
	return (
		<div className="visat-AppConfigurationSection">
			<h3 className="visat-AppConfigurationSection-title">{title}</h3>
			{children}
		</div>
	);
};

AppConfigurationSection.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default AppConfigurationSection;
