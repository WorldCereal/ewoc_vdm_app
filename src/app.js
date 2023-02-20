// eslint-disable-next-line no-unused-vars
import React from 'react';
import Favicon from 'react-favicon';

import {connects, setFetch} from '@gisatcz/ptr-state';
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
import favicon from './assets/favicon.ico';

const path = process.env.PUBLIC_URL;

function createRoutes() {
	return {
		'': {
			name: 'home',
		},
	};
}

/**
 * Modify every fetch call
 * Add X-User-Info header for autentization
 * @param {*} getXUser
 * TODO solve it better. Not every fetch has to be authorised
 */
// eslint-disable-next-line no-unused-vars
const setWindowFetch = getXUser => {
	if (typeof window !== 'undefined') {
		window.fetch = new Proxy(window.fetch, {
			apply(fetch, that, args) {
				// Forward function call to the original fetch
				if (args.length > 1) {
					if (!args[1].headers) {
						args[1].headers = {};
					}

					if (typeof args[1].headers.append === 'function') {
						args[1].headers.append('X-User-Info', getXUser());
					} else {
						args[1].headers['X-User-Info'] = getXUser();
					}
				}

				const result = fetch.apply(that, args);

				return result;
			},
		});

		setFetch(window.fetch);
	}
};

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

	// Uncomment to allow modification of the request headers
	// add utils to modify header
	// setWindowFetch(() => Select.users.getActiveKey(Store.getState()));

	if (isPreloaded) {
		return;
	}

	Store.dispatch(Action.init(path));
}

const ConnectedAppContainer = connects.AppContainer(AppContainer);

const App = () => {
	return (
		<>
			<Favicon url={favicon} />
			<ConnectedAppContainer appKey={appKey}>
				<AppContent />
			</ConnectedAppContainer>
		</>
	);
};

export {App, initApp};
