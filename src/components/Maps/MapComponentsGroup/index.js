import classnames from 'classnames';
import {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';

const MapComponentsGroup = props => {
	const {children, className, dataTour, ...restProps} = props;
	const classes = classnames('', {}, className);

	return (
		<div className={classes} data-tour={dataTour}>
			{Children.map(children, child => {
				return cloneElement(child, {...restProps});
			})}
		</div>
	);
};

MapComponentsGroup.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	dataTour: PropTypes.string,
};

export default MapComponentsGroup;
