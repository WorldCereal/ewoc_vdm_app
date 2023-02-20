import PropTypes from 'prop-types';
import StatisticLayerTooltip from './StatisticLayerTooltip';
import {STATISTICSLAYERKEY, AEZLAYERKEY} from '../../../constants/app';

const VectorMapTooltip = ({layer}) => {
	const layerKey = layer?.sourceLayer?.props?.layerKey;

	switch (layerKey) {
		case STATISTICSLAYERKEY:
			return <StatisticLayerTooltip layer={layer} />;
		case AEZLAYERKEY:
			return (
				<div className={'VectorMapTooltip-layer'}>
					<div>
						<div className="VectorMapTooltip-attribute">AEZ: </div>
						<div className="VectorMapTooltip-value">
							{layer?.object?.properties?.aez_id}
						</div>
					</div>
				</div>
			);

		default:
			return null;
	}
};

VectorMapTooltip.propTypes = {
	layer: PropTypes.object,
};

export default VectorMapTooltip;
