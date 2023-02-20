import PropTypes from 'prop-types';
import classNames from 'classnames';
import {MapControls} from '@gisatcz/ptr-maps';
import ComponentRenderer from '../ComponentRenderer';
import './style.scss';

const ZoomControls = props => {
	const classes = classNames('ptr-ZoomControls', {
		'is-horizontal': props?.componentConfiguration?.settings?.horizontal,
	});
	return (
		<div className={classes}>
			<MapControls levelsBased zoomOnly {...props} />
		</div>
	);
};

ZoomControls.propTypes = {
	componentConfiguration: PropTypes.object,
};

const ZoomControlsWrapper = props => {
	return (
		<ComponentRenderer
			component={'zoomControls'}
			configurationGroupKey={'mapSetTools'}
		>
			<ZoomControls {...props} />
		</ComponentRenderer>
	);
};

export default ZoomControlsWrapper;
