// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const RemovableLabelContainer = ({className, children}) => {
	const classes = classnames('ptr-RemovableLabelContainer', className);

	return <div className={classes}>{children}</div>;
};

RemovableLabelContainer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

const RemovableLabel = ({
	active,
	floating,
	small,
	stripColor,
	onClick,
	onRemove,
	children,
	className,
}) => {
	const classes = classnames(`ptr-RemovableLabel ${className || ''}`, {
		'is-active': active,
		'has-strip': stripColor,
		'is-floating': floating,
		'is-small': small,
		'is-clickable': !!onClick,
	});

	return (
		<div className={classes} style={{borderColor: stripColor}}>
			<div onClick={onClick} className="ptr-RemovableLabel-content">
				{children}
			</div>
			{onRemove ? (
				<Button
					className="ptr-RemovableLabel-removeButton"
					side="left"
					icon="close"
					small
					invisible
					onClick={onRemove}
				/>
			) : null}
		</div>
	);
};

RemovableLabel.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	floating: PropTypes.bool,
	onClick: PropTypes.func,
	onRemove: PropTypes.func,
	small: PropTypes.bool,
	stripColor: PropTypes.string,
};

export default RemovableLabel;
