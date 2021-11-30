import React from 'react';
import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

import './style.scss';

const mapStateToProps = (state, ownProps) => {
	const mapSet = Select.maps.getMapSetByKey(state, mapSetKey);

	return {
		backgroundLayer: mapSet?.data?.backgroundLayer,
	};
};

export default connect(mapStateToProps)(Presentation);
