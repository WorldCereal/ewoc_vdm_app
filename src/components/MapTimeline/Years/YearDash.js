import React from 'react';
import PropTypes from 'prop-types';
import {utils} from '@gisatcz/ptr-timeline';

const YearsDash = props => {
	const {x, label, vertical} = props;
	return (
		<g className={'ptr-timeline-year'}>
			{React.createElement(utils.dash.D1, {x,vertical})}
			{label}
		</g>
	);
};

YearsDash.propTypes = {
	x: PropTypes.number,
	label: PropTypes.element,
	vertical: PropTypes.bool,
};

YearsDash.defaultProps = {
	vertical: false,
	label: null,
};

export default YearsDash;