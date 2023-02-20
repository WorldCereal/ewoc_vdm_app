import {config as getConfig} from '@gisatcz/ptr-core';
import {Action as CommonAction} from '@gisatcz/ptr-state';
import Select from './Select';

require('dotenv').config();

import {appKey} from '../constants/app';

import worldCerealActions from './worldCereal/actions';
import chartsActions from './worldCereal/charts/actions';
import configurationActions from './worldCereal/configuration/actions';
import productMetadataActions from './worldCereal/ProductMetadata/actions';
import productMetadataFilterActions from './worldCereal/ProductMetadataFilter/actions';
import globalProductMetadataActions from './worldCereal/GlobalProductMetadata/actions';
import statisticsActions from './worldCereal/Statistics/actions';

// TODO load view from BE
import views from '../data/views';
import cases from '../data/metadata/cases';
import styles from '../data/metadata/styles';
import utils from '../utils';

const getAppEnvConfig = () => {
	if (process?.env) {
		const apiBackendProtocol = process.env?.REACT_APP_apiBackendProtocol;
		const apiBackendHost = process.env?.REACT_APP_apiBackendHost;
		const apiBackendPath = process.env?.REACT_APP_apiBackendPath;
		const requestPageSize = process.env?.REACT_APP_requestPageSize;
		const requestPageSizeXX = process.env?.REACT_APP_requestPageSizeXX;

		return {
			...(apiBackendProtocol ? {apiBackendProtocol} : {}),
			...(apiBackendHost ? {apiBackendHost} : {}),
			...(apiBackendPath ? {apiBackendPath} : {}),
			...(requestPageSize ? {requestPageSize} : {}),
			...(requestPageSizeXX ? {requestPageSizeXX} : {}),
		};
	} else {
		return {};
	}
};

function init(path) {
	return dispatch => {
		dispatch(CommonAction.app.setBaseUrl(path));

		const config = getConfig(getAppEnvConfig());
		dispatch(CommonAction.app.updateLocalConfiguration(config));
		dispatch(CommonAction.app.setKey(appKey));
		dispatch(CommonAction.app.loadConfiguration());

		// user

		// const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		// const {userKey: devUserKey} = localConfig;
		// const activeUser = Select.users.getActiveKey(getState());
		// For local development
		// Set active user key from local config if exists
		// TODO handle users (or SSR build)
		// if (!activeUser && devUserKey) {
		// 	dispatch(CommonAction.users.setActiveKey(devUserKey));
		// }
		dispatch(
			CommonAction.users.setActiveKey('3fdd158d-4b78-4d11-92c7-403b4adab4d8')
		);
		dispatch(resetSession());

		// add views
		dispatch(CommonAction.views.add(views));

		// add metadata
		dispatch(CommonAction.cases.add(cases));
		dispatch(CommonAction.styles.add(styles));
	};
}

/**
 * Reset session
 */
function resetSession() {
	return (dispatch, getState) => {
		const config = Select.app.getCompleteLocalConfiguration(getState());
		if (config) {
			const userKey = Select.users.getActiveKey(getState());
			const {apiBackendProtocol, apiBackendHost, apiBackendPath} = config;
			const path = 'rest/project/worldCereal/user/sessionStart';
			const url = `${apiBackendProtocol}://${apiBackendHost}/${apiBackendPath}/${path}`;
			const method = 'GET';

			utils
				.request(url, method, null, null, userKey)
				.catch(
					err => new Error(`Failed to load product metadata. Error: ${err}`)
				);
		} else {
			throw new Error("Action/resetUser: Config wasn't found!");
		}
	};
}

export default {
	...CommonAction,
	init,
	worldCereal: {
		charts: chartsActions,
		configuration: configurationActions,
		productMetadata: productMetadataActions,
		globalProductMetadata: globalProductMetadataActions,
		productMetadataFilter: productMetadataFilterActions,
		statistics: statisticsActions,
		...worldCerealActions,
	},
};
