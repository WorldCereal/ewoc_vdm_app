import PropTypes from 'prop-types';
import AppConfigurationSwitcher from '../AppConfigurationSwitcher';

const AppComponentsConfiguration = ({
	configurations,
	configurationGroupKey,
	configurationPath,
}) => {
	return (
		<>
			{configurations?.map(w => {
				return (
					<AppConfigurationSwitcher
						key={w.key}
						configurationGroupKey={configurationGroupKey}
						configurationPath={configurationPath}
						componentKey={w.key}
						active={w.active}
						icon={w.icon}
						name={w.title}
						disabled={w.disabled}
					/>
				);
			})}
		</>
	);
};

AppComponentsConfiguration.propTypes = {
	configurations: PropTypes.array,
	configurationGroupKey: PropTypes.string,
	configurationPath: PropTypes.string,
};

export default AppComponentsConfiguration;
