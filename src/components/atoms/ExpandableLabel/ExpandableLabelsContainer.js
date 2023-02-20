// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {Children, cloneElement} from 'react';
import classnames from 'classnames';

import './style.scss';

const ExpandableLabelsContainer = ({className, children}) => {
	const classes = classnames('ptr-ExpandableLabelsContainer', className);
	const labelsCount = Children.count(children);

	return (
		<div className={classes}>
			{Children.map(children, (child, i) =>
				cloneElement(child, {...child.props, zIndex: labelsCount - i})
			)}
		</div>
	);
};

ExpandableLabelsContainer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default ExpandableLabelsContainer;
