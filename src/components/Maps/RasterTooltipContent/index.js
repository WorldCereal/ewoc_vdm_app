import PropTypes from 'prop-types';
import ProductTooltipContent from '../ProductTooltipContent';

const RasterTooltipContent = ({response, event, layer}) => {
	return (
		<div className="ptr-FeatureTooltip-body">
			<div>
				{response?.length ? (
					// Temporary take only first result
					// it is problem on Mapserver, sometime it return two same responses
					<ProductTooltipContent
						key={`${layer?.layer?.props?.layerKey}`}
						productKey={layer?.layer?.props?.layerKey}
						color={layer?.pixelColor?.toString()}
						response={response[0]}
						event={event}
					/>
				) : null}
			</div>
		</div>
	);
};

RasterTooltipContent.propTypes = {
	response: PropTypes.array,
	mapKey: PropTypes.string,
	layer: PropTypes.object,
	event: PropTypes.object,
	layerKey: PropTypes.string,
};

export default RasterTooltipContent;
