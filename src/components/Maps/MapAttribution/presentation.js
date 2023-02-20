// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import ComponentRenderer from '../ComponentRenderer';

import './style.scss';

const BackgroundMapAttribution = ({layerKey}) => {
	switch (layerKey) {
		case 'cartoDB_Light':
		case 'cartoDB_LightNoLabels':
		case 'cartoDB_DarkMatter':
			return (
				<>
					&copy;{' '}
					<a
						href="https://www.openstreetmap.org/copyright"
						target="_blank"
						rel="noreferrer noopener"
					>
						OpenStreetMap
					</a>{' '}
					contributors,{' '}
					<a
						href="https://creativecommons.org/licenses/by-sa/2.0/"
						target="_blank"
						rel="noreferrer noopener"
					>
						CC-BY-SA
					</a>
					,&copy;{' '}
					<a
						href="https://carto.com/about-carto/"
						target="_blank"
						rel="noreferrer noopener"
					>
						CartoDB
					</a>{' '}
				</>
			);
		case 'esri_WorldTopoMap':
			return <>Esri, USGS | Esri, HERE, Garmin, FAO, NOAA, USGS</>;
		case 'esri_WorldImagery':
			return <>Esri, USGS | Esri, Garmin, FAO, NOAA | Earthstar Geographics</>;
		case 'esri_WorldGrayCanvas':
			return <>Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ</>;
		case 'openStreetMap_Mapnik':
			return (
				<>
					©{' '}
					<a
						href="https://www.openstreetmap.org/copyright"
						target="_blank"
						rel="noreferrer noopener"
					>
						OpenStreetMap
					</a>{' '}
					contributors
				</>
			);
		default:
			return null;
	}
};

BackgroundMapAttribution.propTypes = {
	layerKey: PropTypes.string,
};

const MapAttribution = ({backgroundLayer}) => {
	return (
		<ComponentRenderer
			component={'mapAttribution'}
			configurationGroupKey={'mapSetTools'}
		>
			<div className="ptr-MapAttribution">
				<a href="https://deck.gl/" target="_blank" rel="noreferrer noopener">
					deck.gl
				</a>{' '}
				| Background map:{' '}
				<BackgroundMapAttribution layerKey={backgroundLayer?.key} />
			</div>
		</ComponentRenderer>
	);
};

MapAttribution.propTypes = {
	backgroundLayer: PropTypes.shape({
		key: PropTypes.string,
	}),
};

export default MapAttribution;
