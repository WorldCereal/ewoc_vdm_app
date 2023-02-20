import {createBrowserHistory, createMemoryHistory} from 'history';
import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
	thunk,
	reduxBatch,
	logger,
	activeMetadataActions,
	baseStores,
} from '@gisatcz/ptr-state';
import {
	createAsyncMiddleware,
	createRequestCounter,
	isServer,
} from '@gisatcz/ptr-core';
import {initApp} from '../app';

import configuration from './worldCereal/configuration/reducers';
import productMetadata from './worldCereal/ProductMetadata/reducers';
import productMetadataFilter from './worldCereal/ProductMetadataFilter/reducers';
import globalProductMetadata from './worldCereal/GlobalProductMetadata/reducers';

export const history = isServer
	? createMemoryHistory()
	: createBrowserHistory();

function createMiddleware(requestCounter, withoutLogger) {
	const enhancedThunk = thunk.withExtraArgument(activeMetadataActions);

	const middlewares = [
		createAsyncMiddleware(requestCounter),
		enhancedThunk,
		process.env.NODE_ENV === 'development' &&
			!isServer &&
			!withoutLogger &&
			logger,
	];

	return applyMiddleware(...middlewares.filter(v => v !== false));
}

function createReducer() {
	const reducers = combineReducers({
		configuration,
		productMetadata,
		productMetadataFilter,
		globalProductMetadata,
	});

	return combineReducers({
		...baseStores,
		worldCereal: reducers,
	});
}

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({})) ||
	compose;

function createEnhancer(requestCounter) {
	return composeEnhancers(
		reduxBatch,
		createMiddleware(requestCounter),
		reduxBatch,
		createMiddleware(requestCounter, true),
		reduxBatch
	);
}

/**
 * Returns object with keys `store`, `readyP`.
 * - `readyP` - Promise that resolves once the app is initialized (helpful with SSR).
 * - `store` - Redux store.
 */
function createAppStore(options, pregeneratedState = {}) {
	const isPreloaded = !isServer && window.__PRELOADED_STATE__ != null;
	const initialState = isPreloaded
		? window.__PRELOADED_STATE__
		: {...pregeneratedState};
	if (isPreloaded) {
		delete window.__PRELOADED_STATE__;
	}

	const requestCounter = createRequestCounter();
	const store = createStore(
		createReducer(),
		initialState,
		createEnhancer(requestCounter)
	);

	const absPath =
		options?.absPath ??
		window.location.protocol +
			'//' +
			window.location.host +
			process.env.PUBLIC_URL;

	initApp(store, {
		absPath,
		isPreloaded,
		currentUrl: options?.currentUrl,
		navHandler: options?.navHandler,
	});

	return {
		store: store,
		requestCounter: requestCounter,
	};
}

export default createAppStore;
