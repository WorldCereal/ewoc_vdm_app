import queryString from 'query-string';
import fetch from 'isomorphic-fetch';

import {map as mapUtils} from '@gisatcz/ptr-utils';
import {mapConstants} from '@gisatcz/ptr-core';

/**
 * TODO move to ptr-utils
 * Get visible map extent from Panther map view and viewport. For maps in EPSG 3857 (WebMercator) projection only.
 * @param view {Object} Panther map view
 * @param viewport {height: number, width: number}
 * @returns {{minLon: number, maxLat: number, minLat: number, maxLon: number}}
 */
function getExtentFromMapView(view, viewport) {
	return mapUtils.view.getBoundingBoxFromViewForEpsg3857(
		view.center,
		view.boxRange,
		viewport.width / viewport.height,
		mapConstants.averageLatitude
	);
}

/**
 * TODO move to ptr-utils
 * @param extent {{minLon: number, maxLat: number, minLat: number, maxLon: number}}
 * @returns {GeoJSON.Feature}
 */
function getFeatureFromExtent(extent) {
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[extent.minLon, extent.minLat],
					[extent.minLon, extent.maxLat],
					[extent.maxLon, extent.maxLat],
					[extent.maxLon, extent.minLat],
					[extent.minLon, extent.minLat],
				],
			],
		},
	};
}

/**
 * TODO move to ptr-utils
 * Get visible map extent from Panther map view and viewport as GeoJSON feature. For maps in EPSG 3857 (WebMercator) projection only.
 * @param view {Object} Panther map view
 * @param viewport {height: number, width: number}
 * @returns {GeoJSON.Feature}
 */
function getExtentFromMapViewAsFeature(view, viewport) {
	return getFeatureFromExtent(getExtentFromMapView(view, viewport));
}

/**
 * @param url {string}
 * @param method {string} HTTP method
 * @param query {Object}
 * @param payload {Object}
 * @returns {Promise}
 */
function request(url, method, query, payload, userKey) {
	if (query) {
		url += '?' + queryString.stringify(query);
	}

	let headers = {
		'Content-Type': 'application/json',
	};

	if (userKey) {
		headers['X-User-Info'] = userKey;
	}

	return fetch(url, {
		headers,
		method: method,
		body: payload ? JSON.stringify(payload) : null,
	})
		.then(
			response => {
				if (response.ok) {
					return response.json().then(body => {
						if (body) {
							return body;
						} else {
							throw new Error('no data returned');
						}
					});
				} else {
					throw new Error('response error');
				}
			},
			error => {
				throw error;
			}
		)
		.catch(err => new Error(`Failed to fetch. Error: ${err}`));
}

export default {
	getExtentFromMapViewAsFeature,
	request,
};
