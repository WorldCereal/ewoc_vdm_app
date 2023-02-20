// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {
	useEffect,
	useState,
	Children,
	isValidElement,
	cloneElement,
} from 'react';

import classnames from 'classnames';

import './style.scss';

// helpers
function passPropsToChildren(props, children) {
	return Children.map(children, child => {
		if (isValidElement(child)) {
			return cloneElement(child, props);
		}
		return child;
	});
}

export const PageSwitcherMenuItem = ({
	children,
	disabled,
	active,
	pageKey,
	activePageKey,
	setActivePage,
}) => {
	useEffect(() => {
		if (active && !activePageKey) {
			setActivePage(pageKey);
		}
	});

	const classes = classnames('ptr-PageSwitcherMenuItem', {
		'is-active': activePageKey === pageKey,
		'is-disabled': disabled,
	});

	return (
		<div
			key={pageKey}
			className={classes}
			onClick={() => setActivePage(pageKey)}
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					setActivePage(pageKey);
				}
			}}
		>
			{children}
		</div>
	);
};

PageSwitcherMenuItem.propTypes = {
	active: PropTypes.bool,
	activePageKey: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	pageKey: PropTypes.string,
	setActivePage: PropTypes.func,
};

export const PageSwitcherPage = ({children, pageKey, activePageKey}) => {
	return activePageKey === pageKey ? (
		<div className="ptr-PageSwitcherPage">{children}</div>
	) : null;
};

PageSwitcherPage.propTypes = {
	activePageKey: PropTypes.string,
	children: PropTypes.node,
	pageKey: PropTypes.string,
};

export const PageSwitcherContent = ({
	children,
	activePageKey,
	setActivePage,
}) => {
	const childrenWithProps = passPropsToChildren(
		{activePageKey, setActivePage},
		children
	);
	return <div className="ptr-PageSwitcherContent">{childrenWithProps}</div>;
};

PageSwitcherContent.propTypes = {
	activePageKey: PropTypes.string,
	children: PropTypes.node,
	setActivePage: PropTypes.func,
};

export const PageSwitcherMenu = ({children, activePageKey, setActivePage}) => {
	const childrenWithProps = passPropsToChildren(
		{activePageKey, setActivePage},
		children
	);
	return <div className="ptr-PageSwitcherMenu">{childrenWithProps}</div>;
};

PageSwitcherMenu.propTypes = {
	activePageKey: PropTypes.string,
	children: PropTypes.node,
	setActivePage: PropTypes.func,
};

const PageSwitcher = ({children, className, activeKey}) => {
	const [activePageKey, setActivePage] = useState(activeKey);
	const classes = classnames(`ptr-PageSwitcher ${className}`, {});
	const childrenWithProps = passPropsToChildren(
		{activePageKey: activePageKey || activeKey, setActivePage},
		children
	);
	return <div className={classes}>{childrenWithProps}</div>;
};

PageSwitcher.propTypes = {
	activeKey: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default PageSwitcher;
