import {cloneElement} from 'react';
import PropTypes from 'prop-types';
import GetFeatureInfoTooltip from '../GetFeatureInfoTooltip';
const RasterMapTooltip = ({
	children,
	onLoadEnd,
	onLoadStart,
	responseValidator,
	round,
	...props
}) => {
	const viewport = props?.layer?.layer?.context?.viewport;
	const bbox = viewport && viewport.getBounds();
	const coordinates = props.layer.coordinate;
	const layers = props?.layer?.layer?.props?.options?.params?.layers;
	const url = props?.layer?.layer?.props?.options?.url;
	const childWithProps = cloneElement(children, {
		...children.props,
		...props,
	});

	return (
		<GetFeatureInfoTooltip
			timeout={200}
			coordinates={coordinates}
			bbox={bbox}
			layers={[layers]}
			url={url}
			width={props.event.viewport.width}
			height={props.event.viewport.height}
			x={props.event.x}
			y={props.event.y}
			crs={'EPSG:4326'}
			onLoadEnd={onLoadEnd}
			onLoadStart={onLoadStart}
			round={round}
			responseValidator={responseValidator}
		>
			{childWithProps}
		</GetFeatureInfoTooltip>
	);
};

RasterMapTooltip.propTypes = {
	layerKey: PropTypes.string,
	feature: PropTypes.object,
	info: PropTypes.object,
	children: PropTypes.node,
	event: PropTypes.object,
	layer: PropTypes.object,
	onLoadEnd: PropTypes.func,
	onLoadStart: PropTypes.func,
	responseValidator: PropTypes.func,
	round: PropTypes.number,
};

export default RasterMapTooltip;
