// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {utils} from '@gisatcz/ptr-utils';

const defaultLineHeight = utils.getRemSize();

const MapTimelineLegend = ({layers, lineHeight = defaultLineHeight}) => {
	const layersElms = layers.reduce((acc, layer) => {
		return [
			...acc,
			<span
				key={layer.legend.key}
				className={'ptr-maptimeline-legenditem'}
				style={{lineHeight: `${lineHeight}px`}}
				title={`${layer.legend.title}`}
			>
				<em>{layer.legend.title}</em> {layer.legend.subtitle}
			</span>,
		];
	}, []);

	return <div className={'ptr-maptimelinelegend'}>{layersElms}</div>;
};

MapTimelineLegend.propTypes = {
	layers: PropTypes.array,
	lineHeight: PropTypes.number,
};

export default MapTimelineLegend;
