import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';

import Presentation from './presentation';

import './style.scss';

const mapStateToProps = (state, ownProps) => {
	const mapSet = Select.maps.getMapSetByKey(state, ownProps.mapSetKey);

	return {
		backgroundLayer: ownProps.backgroundLayer || mapSet?.data?.backgroundLayer,
	};
};

export default connect(mapStateToProps)(Presentation);
