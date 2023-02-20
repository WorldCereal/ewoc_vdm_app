import PropTypes from 'prop-types';
import {cloneElement, isValidElement, Children} from 'react';
import classNames from 'classnames';
import './style.scss';

const MapLegendContent = ({isExpanded, children}) => {
	const classes = classNames('worldCereal-MapLegendContent', {
		'is-expanded': isExpanded,
	});

	const childrenWithProps = Children.map(children, child => {
		if (isValidElement(child)) {
			return cloneElement(child, {isExpanded});
		}
		return child;
	});

	return <div className={classes}>{childrenWithProps}</div>;
};

MapLegendContent.propTypes = {
	children: PropTypes.node,
	isExpanded: PropTypes.bool,
};

export default MapLegendContent;
