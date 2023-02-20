// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useSize from '@react-hook/size';
import classnames from 'classnames';
import {Icon} from '@gisatcz/ptr-atoms';

import './style.scss';

const RetractableWindowControlBar = ({
	children,
	centered,
	onClick,
	onHeightChange,
}) => {
	const ref = useRef(null);
	const [, height] = useSize(ref);

	const classes = classnames(`ptr-RetractableWindowControlBar`, {
		'is-centered': centered,
	});

	useEffect(() => {
		onHeightChange(height);
	}, [height]);

	return (
		<div
			ref={ref}
			onClick={onClick}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					onClick();
				}
			}}
			className={classes}
			tabIndex={0}
		>
			<Icon icon="chevron-left" className="retract" />
			{children}
		</div>
	);
};

RetractableWindowControlBar.propTypes = {
	centered: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func,
	onHeightChange: PropTypes.func,
};

const RetractableWindowBody = ({children, centered, height}) => {
	const style = {
		height: `${height}rem`,
	};

	const classes = classnames(`ptr-RetractableWindowBody`, {
		'is-centered': centered,
	});

	return (
		<div className={classes} style={style}>
			{children}
		</div>
	);
};

RetractableWindowBody.propTypes = {
	centered: PropTypes.bool,
	children: PropTypes.node,
	height: PropTypes.number,
};

const RetractableWindow = ({
	children,
	centered,
	controlBarContent,
	retracted,
	bottomPosition,
	bodyHeight,
	tourGuideFilterExpanded,
	tourGuideIsOpen,
	className,
}) => {
	const ref = useRef(null);
	const [width] = useSize(ref);

	const [isRetracted, handleRetraction] = useState(retracted);
	const [verticalPositionOffset, handleVerticalPosition] = useState(0);
	const [horizontalPositionOffset, handleHorizontalPosition] = useState(0);

	useEffect(() => {
		handleRetraction(!tourGuideFilterExpanded);
	}, [tourGuideFilterExpanded, tourGuideIsOpen]);

	const classes = classnames(`ptr-RetractableWindow ${className}`, {
		'is-retracted': isRetracted,
	});

	let style = {
		top: `calc(100% - ${verticalPositionOffset}px - ${
			isRetracted ? bottomPosition : bottomPosition + bodyHeight
		}rem)`,
	};

	if (centered && horizontalPositionOffset) {
		style.left = `calc(50% - ${horizontalPositionOffset / 2}px`;
	}

	useEffect(() => {
		handleHorizontalPosition(width);
	}, [width]);

	return (
		<div className={classes} style={style} ref={ref}>
			<RetractableWindowControlBar
				onHeightChange={height => handleVerticalPosition(height)}
				onClick={() => handleRetraction(!isRetracted)}
				centered={centered}
			>
				{controlBarContent}
			</RetractableWindowControlBar>
			<RetractableWindowBody height={bodyHeight} centered={centered}>
				{children}
			</RetractableWindowBody>
		</div>
	);
};

RetractableWindow.propTypes = {
	children: PropTypes.node,
	centered: PropTypes.bool,
	controlBarContent: PropTypes.node,
	retracted: PropTypes.bool,
	bottomPosition: PropTypes.number,
	bodyHeight: PropTypes.number,
	tourGuideFilterExpanded: PropTypes.bool,
	tourGuideIsOpen: PropTypes.bool,
	className: PropTypes.string,
};

export default RetractableWindow;
