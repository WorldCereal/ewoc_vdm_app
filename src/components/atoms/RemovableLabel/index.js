import React from 'react';
import classnames from 'classnames';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const RemovableLabelContainer = ({className, children}) => {
	const classes = classnames('ptr-RemovableLabelContainer', className);

	return <div className={classes}>{children}</div>;
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

export default RemovableLabel;
