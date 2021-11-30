import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const BackgroundMapAttribution = ({layerKey}) => {
	switch (layerKey) {
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

const MapAttribution = ({backgroundLayer}) => {
	return (
		<div className="worldCereal-MapAttribution">
			<a
				href="https://leafletjs.com/"
				target="_blank"
				rel="noreferrer noopener"
			>
				Leaflet
			</a>{' '}
			| Background map:{' '}
			<BackgroundMapAttribution layerKey={backgroundLayer?.key} />
		</div>
	);
};

MapAttribution.propTypes = {
	backgroundLayerAttribution: PropTypes.element,
};

export default MapAttribution;
