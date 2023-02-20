//eslint-disable-next-line no-unused-vars
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from '@gisatcz/ptr-state';

import createStore from './state/Store';
import {App} from './app';
import AppTour from './components/AppTour';

const {store} = createStore();

const Application = () => (
	<Provider store={store}>
		<AppTour>
			<App />
		</AppTour>
	</Provider>
);

function renderApp() {
	const container = document.getElementById('root');
	const root = createRoot(container); // createRoot(container!) if you use TypeScript
	root.render(<Application />);
}

renderApp();
