import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const ExpandableLabelHeader = ({
	className,
	expanded,
	onExpand,
	children,
}) => {
	const classes = classnames(`ptr-ExpandableLabelHeader ${className || ''}`, {
		'is-expanded': expanded,
	});

	return (
		<div className={classes}>
			<div className="ptr-ExpandableLabelHeader-content">{children}</div>
			<div>
				<Button
					className="ptr-ExpandableLabelHeader-controlButton"
					icon="chevron-left"
					invisible
					onClick={() => onExpand(!expanded)}
				/>
			</div>
		</div>
	);
};

ExpandableLabelHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	expanded: PropTypes.bool,
	onExpand: PropTypes.func,
};

ExpandableLabelHeader.proptypes = {
	className: PropTypes.string,
	children: PropTypes.array,
	expanded: PropTypes.bool,
	onExpand: PropTypes.func,
};

export const ExpandableLabelBody = ({
	className,
	expanded,
	height,
	children,
}) => {
	const classes = classnames(`ptr-ExpandableLabelBody ${className || ''}`, {
		'is-expanded': expanded,
	});

	let bodyStyle = {};
	if (height && expanded) {
		bodyStyle.height = `${height}rem`;
	}

	let contentStyle = {};
	if (height) {
		contentStyle.height = `${height}rem`;
	}

	return (
		<div className={classes} style={bodyStyle}>
			<div style={contentStyle}>{children}</div>
		</div>
	);
};

ExpandableLabelBody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	expanded: PropTypes.bool,
	height: PropTypes.number,
};

ExpandableLabelBody.proptypes = {
	children: PropTypes.array,
	className: PropTypes.string,
	expanded: PropTypes.bool,
	height: PropTypes.number,
};

const ExpandableLabel = ({
	className,
	expanded,
	tourGuideProductLabelExpanded,
	tourGuideIsOpen,
	floating,
	zIndex,
	children,
}) => {
	const [isExpanded, setExpanded] = useState(expanded);

	useEffect(() => {
		setExpanded(tourGuideProductLabelExpanded);
	}, [tourGuideProductLabelExpanded, tourGuideIsOpen]);

	const classes = classnames(`ptr-ExpandableLabel ${className || ''}`, {
		'is-expanded': isExpanded,
		'is-floating': floating,
	});

	return (
		<div className={classes} style={{zIndex: zIndex ? zIndex : 0}}>
			{React.Children.map(children, child => {
				if (child.type === ExpandableLabelHeader) {
					return React.cloneElement(child, {
						...child.props,
						onExpand: setExpanded,
						expanded: isExpanded,
					});
				} else if (child.type === ExpandableLabelBody) {
					return React.cloneElement(child, {
						...child.props,
						expanded: isExpanded,
					});
				} else {
					return child;
				}
			})}
		</div>
	);
};

ExpandableLabel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	expanded: PropTypes.bool,
	floating: PropTypes.bool,
	zIndex: PropTypes.number,
	tourGuideProductLabelExpanded: PropTypes.bool,
	tourGuideIsOpen: PropTypes.bool,
};

ExpandableLabel.proptypes = {
	children: PropTypes.array,
	className: PropTypes.string,
	expanded: PropTypes.bool,
	floating: PropTypes.bool,
	zIndex: PropTypes.number,
};

export default ExpandableLabel;
