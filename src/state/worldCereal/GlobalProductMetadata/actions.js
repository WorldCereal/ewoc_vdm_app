import {commonActions} from '@gisatcz/ptr-state';
import utils from '../../../utils';
import globalProductMetadata from '../../../models/globalProductMetadata';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import ProductMetadataActions from '../ProductMetadata/actions';

/**
 * Add models to store
 * @param items {Array} A collection of incoming items
 */
function add(items) {
	return dispatch => {
		const models = items.map(item => globalProductMetadata(item));
		dispatch(
			commonActions.add(ActionTypes.WORLD_CEREAL.GLOBAL_PRODUCT_METADATA)(
				models
			)
		);
	};
}

/**
 * Load product metadata based on current map set view
 */
function load() {
	return (dispatch, getState) => {
		const state = getState();
		const config = Select.app.getCompleteLocalConfiguration(state);
		if (config) {
			const {apiBackendProtocol, apiBackendHost, apiBackendPath} = config;
			const path = 'rest/project/worldCereal/product/global';
			const url = `${apiBackendProtocol}://${apiBackendHost}/${apiBackendPath}/${path}`;
			const method = 'GET';

			utils
				.request(url, method, null, null)
				.then(data => {
					if (data) {
						dispatch(handleLoadResponse(data));
					}
				})
				.catch(
					err => new Error(`Failed to load product metadata. Error: ${err}`)
				);
		}
	};
}

/**
 * @param data {products: Array, tiles: Array} products: A collection of products metadata. tiles: List of S2 tiles for given mapView.
 **/
function handleLoadResponse(data) {
	return dispatch => {
		const {products} = data;

		let models = [];
		let keys = [];
		products.forEach(product => {
			if (product.data) {
				models.push(product);
			}

			keys.push(product.key);
		});

		if (models.length) {
			dispatch(add(models));
		}
	};
}

const addProductToMap = product => {
	return dispatch => {
		dispatch(
			ProductMetadataActions.handleProductInActiveMap(
				product.key,
				product.data.dataSource.product
			)
		);
	};
};

export default {
	add,
	load,
	addProductToMap,
};
