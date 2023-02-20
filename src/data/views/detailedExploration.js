import backgroundLayers from '../layers/backgroundLayers';

export default {
	key: '371846f9-0270-4e43-a46a-db009cd5946a',
	data: {
		nameDisplay: 'Detailed exploration',
		nameInternal: 'detailedExploration',
		description: 'of WorldCereal products',
		state: {
			worldCereal: {
				productMetadataFilter: {
					activeFilter: {},
				},
				configuration: {
					mapSetTools: {
						'detailedExploration-mapSet': {
							open: [
								'zoomControls',
								'layerControls',
								'addMap',
								'compareMaps',
								'mapAttribution',
								'scale',
								'overviewMap',
								'searchPlace',
							],
							available: [
								'searchPlace',
								'addMap',
								'compareMaps',
								'layerControls',
								'zoomControls',
								'overviewMap',
							],
							componentsByKey: {
								addMap: {
									icon: 'ri-add-map',
									title: 'Add map',
								},
								compareMaps: {
									icon: 'ri-compare',
									title: 'Compare maps',
								},
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
							},
						},
					},
				},
			},
			components: {
				ProductFilter: {
					activeParameter: 'product',
					parameterOrder: ['product', 'season'],
				},
				Maps: {
					mode: 'set',
				},
			},
			maps: {
				activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
				activeSetKey: 'detailedExploration-mapSet',
				maps: {
					'ea10b274-dd71-4e58-b627-d2803ab891f7': {
						key: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
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
					'detailedExploration-mapSet': {
						key: 'detailedExploration-mapSet',
						activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
						maps: ['ea10b274-dd71-4e58-b627-d2803ab891f7'],
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
