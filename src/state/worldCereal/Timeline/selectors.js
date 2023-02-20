import {createSelector} from 'reselect';
import chroma from 'chroma-js';
import worldCerealSelectors from '../selectors';
import {Select as CommonSelect} from '@gisatcz/ptr-state';

import {
	timelineLayerElementHeight,
	timelineLayerLineHeight,
	timelineLayerOrder,
} from '../../../constants/app';
const getTimelineLayers = createSelector(
	[
		CommonSelect.cases.getAllAsObject,
		worldCerealSelectors.getActiveProductMetadataByActiveFilter,
	],
	(cases, productMetadata) => {
		let timelineLayers = [];
		const layersByProducts = {};

		if (productMetadata?.length) {
			productMetadata.forEach((product, index) => {
				const placeID = product.data.aez;
				const productID = product.data.product;
				const seasonID = product.data.season;

				const productTemplate = cases[productID];
				const productName = productTemplate?.data?.nameDisplay || productID;

				if (!Object.hasOwn(layersByProducts, productID)) {
					layersByProducts[productID] = {};
				}

				if (!Object.hasOwn(layersByProducts[productID], placeID)) {
					layersByProducts[productID][placeID] = {};
				}

				if (!Object.hasOwn(layersByProducts[productID][placeID], seasonID)) {
					layersByProducts[productID][placeID][seasonID] = [];
				}

				const activeProductColor = productTemplate?.data?.color;
				const productColor = activeProductColor
					? chroma(activeProductColor).desaturate(3).hex()
					: null;

				const config = {
					lineHeight: timelineLayerLineHeight,
					elementHeight: timelineLayerElementHeight,
					legend: {
						title: productName,
						subtitle: `(${seasonID}, zone ${placeID})`,
						key: product.key,
					},
					items: [
						{
							periods: [
								{
									data: {
										start: product.data.sos,
										end: product.data.eos,
									},
								},
							],
							colors: {
								basic: productColor || 'var(--base60)',
								active: activeProductColor || 'var(--base40)',
							},
							states: ['basic', 'active', 'hover', 'disabled'],
							activeStates: ['basic'],
							mapZIndex: index,
							layerState: {
								layerKey: product.key, //used only as a key for outline layer
								key: product.data.dataSource.product, //used only as a key for outline layer
								spatialDataSourceKey: product.data.dataSource.product, //used only as a key fot outline layer
							},
						},
					],
					controlMapState: false,
					allowNonActiveLayer: false,
				};

				layersByProducts[productID][placeID][seasonID].push(config);
			});
		}

		// order layers by product/place/season
		for (const product of Object.keys(layersByProducts)) {
			for (const place of Object.keys(layersByProducts[product])) {
				for (const season of Object.keys(layersByProducts[product][place])) {
					timelineLayers = [
						...timelineLayers,
						...layersByProducts[product][place][season],
					];
				}
			}
		}

		// sort layers
		timelineLayers?.sort((a, b) => {
			return (
				timelineLayerOrder.indexOf(a.legend.title) -
				timelineLayerOrder.indexOf(b.legend.title)
			);
		});

		return timelineLayers;
	}
);

export default {
	getTimelineLayers,
};
