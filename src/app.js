import React from 'react';
import Helmet from 'react-helmet';

import {connects} from '@gisatcz/ptr-state';
import {create as createRouter} from '@gisatcz/ptr-router';
import {AppContainer} from '@gisatcz/ptr-components';

import Action from './state/Action';
import {init as initCore} from './core';
import {appKey} from './constants/app';

// base styles need to be imported before all components
import '@gisatcz/ptr-core/lib/styles/reset.css';
import '@gisatcz/ptr-core/lib/styles/base.scss';
import './styles/index.scss';

import AppContent from './components/AppContent';

const path = process.env.PUBLIC_URL;

function createRoutes(Store, isPreloaded) {
	return {
		'': {
			name: 'home',
		},
	};
}

function initApp(Store, {absPath, isPreloaded, currentUrl, navHandler}) {
	/**
	 * Creates router instance that can be used to manipulate urls.
	 *
	 * App handler updates store with current page and it's up to views to react to the change.
	 * In case of url change, redux selector possibly retrieves different data and passes them
	 * into some the component.
	 *
	 */
	const router = createRouter({
		rootUrl: absPath,
		currentUrl,
		routes: createRoutes(Store, isPreloaded),
		navHandler,
	});

	initCore({router});

	if (isPreloaded) {
		return;
	}

	Store.dispatch(Action.init(path));
}

const ConnectedAppContainer = connects.AppContainer(AppContainer);

const App = () => {
	return (
		<>
			<Helmet defaultTitle="WorldCereal | Product Viewer" />
			<ConnectedAppContainer appKey={appKey}>
				<AppContent />
			</ConnectedAppContainer>
		</>
	);
};

export {App, initApp};
