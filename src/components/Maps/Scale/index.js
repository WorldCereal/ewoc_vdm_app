import {MapScale} from '@gisatcz/ptr-maps';
import ComponentRenderer from '../ComponentRenderer';
import './style.scss';

const Scale = props => {
	return (
		<ComponentRenderer
			component={'scale'}
			configurationGroupKey={'mapSetTools'}
		>
			<MapScale className="ptr-Scale" maxWidth={100} {...props} />
		</ComponentRenderer>
	);
};

Scale.propTypes = {};

export default Scale;
