import PropTypes from 'prop-types';
import classnames from 'classnames';
import images from './images';

import '../style.scss';

const Tile = ({layerKey, active, title, thumbnail, onSelect}) => {
	const classes = classnames('worldCereal-LayersControl-layerTile', {
		active,
	});

	let previewParam = {};
	const image = images[thumbnail];
	if (image) {
		if (typeof image === 'object') {
			previewParam['src'] = image.default;
		} else {
			previewParam['src'] = image;
		}
		previewParam['alt'] = thumbnail;
	} else {
		previewParam['src'] = images.noPreview;
		previewParam['alt'] = 'thumbnail';
	}

	return (
		<div key={layerKey} className={classes} onClick={() => onSelect(layerKey)}>
			<img
				className="worldCereal-LayersControl-layerPreview"
				src={previewParam.src}
				alt={previewParam.alt}
			/>
			<label className="worldCereal-LayersControl-layerName " title={title}>
				{title}
			</label>
		</div>
	);
};

Tile.propTypes = {
	active: PropTypes.bool,
	layerKey: PropTypes.string,
	onSelect: PropTypes.func,
	title: PropTypes.string,
	thumbnail: PropTypes.string,
};

const BackgroundLayersControl = ({
	onSelect,
	backgroundLayers,
	activeBackgroundLayerKey,
}) => {
	if (backgroundLayers) {
		return (
			<div className="worldCereal-LayersControl-layers">
				{backgroundLayers.map(backgroundLayer => (
					<Tile
						key={backgroundLayer.key}
						layerKey={backgroundLayer.key}
						active={backgroundLayer.key === activeBackgroundLayerKey}
						thumbnail={backgroundLayer?.data?.thumbnail}
						title={backgroundLayer?.data?.nameDisplay}
						onSelect={onSelect}
					/>
				))}
			</div>
		);
	} else {
		return null;
	}
};

BackgroundLayersControl.propTypes = {
	activeBackgroundLayerKey: PropTypes.string,
	backgroundLayers: PropTypes.array,
	onSelect: PropTypes.func,
};

export default BackgroundLayersControl;
