// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';

import './style.scss';

const OpacitySlider = ({value, onChange}) => {
	return (
		<ReactSlider
			value={value}
			onChange={onChange}
			className="ptr-OpacitySlider ptr-dark"
			thumbClassName="ptr-OpacitySlider-thumb"
			trackClassName="ptr-OpacitySlider-track"
			renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
		/>
	);
};

OpacitySlider.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.number,
};

export default OpacitySlider;
