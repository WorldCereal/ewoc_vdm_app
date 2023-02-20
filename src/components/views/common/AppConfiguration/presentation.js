import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from '@gisatcz/ptr-atoms';
import AppConfigurationSection from './AppConfigurationSection';
import AppComponentsConfiguration from './AppComponentsConfiguration';
import './style.scss';

const AppConfiguration = ({mapSetKey}) => {
	const classes = classnames('worldCereal-AppConfiguration', {});

	return (
		<div className={classes}>
			<div className="worldCereal-AppConfiguration-title">
				<Icon icon="ri-tune" />
				<h2>Configuration</h2>
			</div>
			<div className="worldCereal-AppConfiguration-body">
				<AppConfigurationSection title="Map tools">
					<AppComponentsConfiguration
						configurationGroupKey={'mapSetTools'}
						configurationPath={mapSetKey}
					/>
				</AppConfigurationSection>
			</div>
		</div>
	);
};

AppConfiguration.propTypes = {
	mapSetKey: PropTypes.string,
};

export default AppConfiguration;
