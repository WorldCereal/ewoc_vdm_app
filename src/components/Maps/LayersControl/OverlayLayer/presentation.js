import PropTypes from 'prop-types';
import classnames from 'classnames';
import images from './images';

import '../style.scss';

const OverlayLayer = ({onChange, aezIsActive}) => {
	const classes = classnames(
		'worldCereal-LayersControl-layerTile',
		{},
		aezIsActive ? 'active' : ''
	);
	return (
		<div className="worldCereal-LayersControl-layers">
			<div className={classes} onClick={() => onChange(aezIsActive)}>
				<img
					className="worldCereal-LayersControl-layerPreview"
					src={images.aez}
					alt={'AEZ'}
				/>
				<label
					className="worldCereal-LayersControl-layerName "
					title={'Agro-ecological zones (AEZ)'}
				>
					Agro-ecological zones (AEZ)
				</label>
			</div>
		</div>
	);
};

OverlayLayer.propTypes = {
	onChange: PropTypes.func,
	title: PropTypes.string,
	visible: PropTypes.bool,
	Legend: PropTypes.node,
	aezIsActive: PropTypes.bool,
};

export default OverlayLayer;
