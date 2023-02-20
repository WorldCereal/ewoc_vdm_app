// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RetractableWindow from '../../../atoms/RetractableWindow';
import ActiveFilterInfo from './ActiveFilterInfo';
import ProductFilter from './ProductFilter';

import './style.scss';

const Filter = ({
	tourGuideFilterExpanded,
	tourGuideIsOpen,
	isTimelineCollapsed,
}) => {
	const classes = classnames('worldCereal-FilterWindow ptr-dark', {
		'is-hidden': isTimelineCollapsed,
	});

	return (
		<RetractableWindow
			className={classes}
			retracted
			tourGuideFilterExpanded={tourGuideFilterExpanded}
			tourGuideIsOpen={tourGuideIsOpen}
			centered
			bottomPosition={10}
			bodyHeight={8}
			controlBarContent={<ActiveFilterInfo />}
		>
			<ProductFilter />
		</RetractableWindow>
	);
};

Filter.propTypes = {
	tourGuideFilterExpanded: PropTypes.object,
	tourGuideIsOpen: PropTypes.bool,
	isTimelineCollapsed: PropTypes.bool,
};

export default Filter;
