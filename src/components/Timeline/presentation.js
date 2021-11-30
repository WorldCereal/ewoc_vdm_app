import React from 'react';
import chroma from 'chroma-js';
import classnames from 'classnames';
import {find as _find} from 'lodash';
import PropTypes from 'prop-types';
import {Mouse} from '@gisatcz/ptr-timeline';
import Months from '../MapTimeline/Months';
import Years from '../MapTimeline/Years';
import MapTimeline from '../MapTimeline';

import './style.scss';

// TODO dynamic
const periodLimit = {
	start: '2018-05-01',
	end: '2020-03-31',
};

const LEVELS = [
	{
		level: 'year',
		end: 2,
	},
	{
		level: 'month',
		end: 5,
	},
];

const Levels = props => {
	const {activeLevel} = props;
	switch (activeLevel) {
		case 'year':
			return React.createElement(Years, {...props, key: 'year'});
		case 'month':
			return React.createElement(Months, {...props, key: 'month'});
	}
	return React.createElement(Months, {...props, key: 'month'});
};

class Timeline extends React.PureComponent {
	static propTypes = {
		isInteractivityLimited: PropTypes.bool,
	};

	render() {
		const {
			productMetadata,
			productTemplates,
			activeLayers,
			handleProductInActiveMap,
			isInteractivityLimited,
		} = this.props;

		const layersByProducts = {};
		let layers = [];

		// TODO prepare this in selector
		if (productMetadata?.length) {
			productMetadata.forEach((product, i) => {
				const placeID = product.data.aez;
				const productID = product.data.product;
				const seasonID = product.data.season;

				const productTemplate = productTemplates[productID];
				const productName = productTemplate?.data?.nameDisplay || productID;

				if (!layersByProducts.hasOwnProperty(productID)) {
					layersByProducts[productID] = {};
				}

				if (!layersByProducts[productID].hasOwnProperty(placeID)) {
					layersByProducts[productID][placeID] = {};
				}

				if (!layersByProducts[productID][placeID].hasOwnProperty(seasonID)) {
					layersByProducts[productID][placeID][seasonID] = [];
				}

				const activeProductColor =
					productTemplate?.data?.style?.data?.definition?.rules[0]?.styles[0]
						?.color;
				const productColor = activeProductColor
					? chroma(activeProductColor).desaturate(3).hex()
					: null;
				// push data from same place and same product to the same line in timeline
				layersByProducts[productID][placeID][seasonID].push({
					key: product.key,
					layerTemplateKey: product.key,
					period: [
						{
							start: product.data.sos,
							end: product.data.eos,
						},
					],
					color: productColor || 'var(--base60)',
					activeColor: activeProductColor || 'var(--base40)',
					active: !!_find(
						activeLayers,
						layer => layer.layerKey === product.key
					),
					activePeriodIndex: 0,
					title: `${productName}`,
					subtitle: `(${seasonID}, zone ${placeID})`,
					// zIndex: i,
				});
			});
		}

		for (const product of Object.keys(layersByProducts)) {
			for (const place of Object.keys(layersByProducts[product])) {
				for (const season of Object.keys(layersByProducts[product][place])) {
					layers = [...layers, layersByProducts[product][place][season]];
				}
			}
		}

		const classes = classnames('worldCereal-Timeline', {
			disabled: isInteractivityLimited,
		});

		return (
			<div className={classes}>
				{layers ? (
					<MapTimeline
						periodLimit={periodLimit}
						vertical={false}
						levels={LEVELS}
						selectMode={true}
						layers={layers}
						legend={true}
						onLayerClick={handleProductInActiveMap}
					>
						<Levels />
						<Mouse mouseBufferWidth={20} key="mouse" />
					</MapTimeline>
				) : null}
			</div>
		);
	}
}

export default Timeline;
