import PropTypes from 'prop-types';
import RasterMapTooltip from './RasterMapTooltip';
import RasterContentWrapper from './RasterContentWrapper';
import VectorMapTooltip from './VectorMapTooltip';
import './style.scss';

const MapTooltip = ({children, event, raster, vector}) => {
	const vectorIDs = [];
	const rasterContent = [];

	const vectorContent = vector.reduce((acc, val, i) => {
		// vector tooltip should come here
		if (!vectorIDs.includes(val.layer.id)) {
			vectorIDs.push(val.layer.id);
			return [
				...acc,
				<VectorMapTooltip
					key={`${i}_${val.layer.props.layerKey || val.layer.props.key}`}
					{...{layer: val, event}}
				></VectorMapTooltip>,
			];
		} else {
			return acc;
		}
	}, []);

	for (const rasterLayer of raster) {
		rasterContent.push(
			<RasterMapTooltip
				key={rasterLayer.layer.props.layerKey || rasterLayer.layer.props.key}
				{...{layer: rasterLayer, event}}
			>
				{children}
			</RasterMapTooltip>
		);
	}
	return (
		<div>
			{vectorContent}
			{raster?.length > 0 ? (
				<RasterContentWrapper {...{event}}>
					{rasterContent}
				</RasterContentWrapper>
			) : null}
		</div>
	);
};

MapTooltip.propTypes = {
	event: PropTypes.object,
	vector: PropTypes.array,
	raster: PropTypes.array,

	children: PropTypes.node,
};

export default MapTooltip;
