import {useState, useEffect, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {point} from '@turf/helpers';
import {toMercator} from '@turf/projection';

const composeGetFeatureInfoRequestURL = (
	url,
	layers,
	bbox,
	width,
	height,
	x,
	y,
	crs
) => {
	let validBBOX = bbox;
	let validCrs = 'EPSG:3857';
	if (crs === 'EPSG:4326') {
		const bl = point([bbox[0], bbox[1]]);
		const tr = point([bbox[2], bbox[3]]);
		validBBOX = [
			...toMercator(bl).geometry.coordinates,
			...toMercator(tr).geometry.coordinates,
		];
	}
	return `${url}?request=GetFeatureInfo&INFO_FORMAT=text/plain&bbox=${validBBOX}&height=${height}&width=${width}&i=${x}&j=${y}&&crs=${validCrs}&version=1.3.0&query_layers=${layers}&layers=${layers}`;
};

const GetFeatureInfoTooltip = ({
	bbox,
	layers,
	url,
	width,
	height,
	x,
	y,
	crs,
	children,
	onLoadEnd,
	onLoadStart,
	responseValidator,
	round,
}) => {
	const [jsonResponse, setJsonResponse] = useState([]);

	const queryData = async () => {
		const queryUrl = composeGetFeatureInfoRequestURL(
			url,
			layers,
			bbox,
			width,
			height,
			x,
			y,
			crs
		);
		try {
			const response = await fetch(queryUrl);
			let responseText = await response.text();
			responseText = responseText.replaceAll(/\n/g, '').replaceAll('}{', '},{');
			const parsedResponse = JSON.parse(`[${responseText}]`);
			setJsonResponse(parsedResponse);
			if (
				parsedResponse.length > 0 &&
				typeof responseValidator === 'function'
			) {
				onLoadEnd(round, responseValidator(parsedResponse));
			} else {
				onLoadEnd(round, parsedResponse.length > 0);
			}
		} catch (error) {
			onLoadEnd(round, false);
		}
	};

	useEffect(() => {
		onLoadStart(round);
		queryData();
	}, [x, y]);

	const childrenWithProps = cloneElement(children, {response: jsonResponse});

	return (
		<div className="ptr-FeatureTooltip-content">
			{jsonResponse?.length ? childrenWithProps : null}
		</div>
	);
};

GetFeatureInfoTooltip.propTypes = {
	bbox: PropTypes.array,
	layers: PropTypes.array,
	url: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	x: PropTypes.number,
	y: PropTypes.number,
	crs: PropTypes.string,
	children: PropTypes.node,
	onLoadEnd: PropTypes.func,
	onLoadStart: PropTypes.func,
	responseValidator: PropTypes.func,
	round: PropTypes.number,
};

export default GetFeatureInfoTooltip;
