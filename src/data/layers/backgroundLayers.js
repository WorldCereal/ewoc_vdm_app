import React from 'react';

export default {
	esri_WorldTopoMap: {
		key: 'esri_WorldTopoMap',
		name: 'ESRI Topomap',
		type: 'wmts',
		options: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
			maxNativeZoom: 16,
		},
	},
	esri_WorldImagery: {
		key: 'esri_WorldImagery',
		name: 'ESRI Imagery',
		type: 'wmts',
		options: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			maxNativeZoom: 17,
		},
	},
	esri_WorldGrayCanvas: {
		key: 'esri_WorldGrayCanvas',
		name: 'ESRI Grey Canvas',
		type: 'wmts',
		options: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
			maxNativeZoom: 16,
		},
	},
	openStreetMap_Mapnik: {
		key: 'openStreetMap_Mapnik',
		name: 'OpenStreetMap',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		},
	},
};
