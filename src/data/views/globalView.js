import backgroundLayers from '../layers/backgroundLayers';

export default {
	key: 'fc3aac1e-ffb2-4925-ae38-c95b8e8311c7',
	data: {
		nameDisplay: 'Global view',
		nameInternal: 'globalView',
		description: 'on WorldCereal products',
		state: {
			worldCereal: {
				productMetadataFilter: {
					activeFilter: {},
				},
				configuration: {
					mapSetTools: {
						'globalView-mapSet': {
							open: [
								'zoomControls',
								'layerControls',
								'mapAttribution',
								'addMap',
								'compareMaps',
								'scale',
								'searchPlace',
								'overviewMap',
							],
							available: [
								'searchPlace',
								'layerControls',
								'addMap',
								'compareMaps',
								'zoomControls',
								'overviewMap',
							],
							componentsByKey: {
								zoomControls: {
									icon: 'plus-thick',
									title: 'Zoom controls',
									settings: {
										horizontal: false,
									},
								},
								mapAttribution: {
									icon: 'info',
									title: 'Map Attribution',
								},
								layerControls: {
									icon: 'layers',
									title: 'Background layers control',
								},
								searchPlace: {
									icon: 'ri-location-search',
									title: 'Search place',
								},
								overviewMap: {
									icon: 'ri-square',
									title: 'Overview map',
								},
								addMap: {
									icon: 'ri-add-map',
									title: 'Add map',
								},
								compareMaps: {
									icon: 'ri-compare',
									title: 'Compare maps',
								},
							},
						},
					},
				},
			},
			components: {
				Maps: {
					mode: 'set',
				},
			},
			maps: {
				activeMapKey: '60ce4b74-d3ce-4f8b-a160-676fd0c6e0b7',
				activeSetKey: 'globalView-mapSet',
				maps: {
					'60ce4b74-d3ce-4f8b-a160-676fd0c6e0b7': {
						key: '60ce4b74-d3ce-4f8b-a160-676fd0c6e0b7',
					},
					overview: {
						key: 'overview',
						data: {
							backgroundLayer: backgroundLayers.esri_WorldGrayCanvas,
							view: {
								boxRange: 12000000,
								center: {
									lat: 40,
									lon: 0,
								},
							},
							viewLimits: {
								boxRangeRange: [1000000, 100000000],
							},
							layers: [
								{
									key: 'extent',
									type: 'vector',
									options: {
										style: {
											rules: [
												{
													styles: [
														{
															outlineWidth: 2,
															outlineColor: '#ff0000',
														},
													],
												},
											],
										},
									},
								},
							],
						},
					},
				},
				sets: {
					'globalView-mapSet': {
						key: 'globalView-mapSet',
						activeMapKey: '60ce4b74-d3ce-4f8b-a160-676fd0c6e0b7',
						maps: ['60ce4b74-d3ce-4f8b-a160-676fd0c6e0b7'],
						sync: {
							center: true,
							boxRange: true,
						},
						data: {
							backgroundLayer: backgroundLayers.esri_WorldImagery,
							view: {
								boxRange: 12000000,
								center: {
									lat: 40,
									lon: 0,
								},
							},
							viewLimits: {
								boxRangeRange: [400, 10000000],
							},
						},
					},
				},
			},
		},
	},
};
