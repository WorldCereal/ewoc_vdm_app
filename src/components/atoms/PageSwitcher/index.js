import React, {useEffect, useState} from 'react';
import classnames from 'classnames';

import './style.scss';

// helpers
function passPropsToChildren(props, children) {
	return React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, props);
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

export const PageSwitcherPage = ({children, pageKey, activePageKey}) => {
	return activePageKey === pageKey ? (
		<div className="ptr-PageSwitcherPage">{children}</div>
	) : null;
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

export const PageSwitcherMenu = ({children, activePageKey, setActivePage}) => {
	const childrenWithProps = passPropsToChildren(
		{activePageKey, setActivePage},
		children
	);
	return <div className="ptr-PageSwitcherMenu">{childrenWithProps}</div>;
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

export default PageSwitcher;
