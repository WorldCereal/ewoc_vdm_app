import backgroundLayers from '../layers/backgroundLayers';

export default {
	key: '95ad1c41-9027-4546-9fd4-f7210cdbf493',
	data: {
		nameDisplay: 'Statistics',
		nameInternal: 'statistics',
		description: 'based on WorldCereal products',
		state: {
			worldCereal: {
				configuration: {
					mapSetTools: {
						'statistics-mapSet': {
							open: [
								'zoomControls',
								'layerControls',
								'mapAttribution',
								'scale',
							],
							available: ['layerControls', 'zoomControls'],
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
							},
						},
					},
				},
			},
			components: {
				Maps: {
					mode: 'set',
				},
				GlobalTopTenBarChart: {
					title: '',
					subtitle: 'Top 10 countries: ',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 13,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalTopTenBarChartShare: {
					title: '',
					subtitle: 'Top 10 countries: ',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						maxValue: 100,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 13,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalSharePieChart: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						margin: {top: 10, right: 10, bottom: 10, left: 10},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalSharePieChartActiveIrrigation2020Summer1: {
					title: 'Active irrigation (summer1)',
					subtitle: 'Irrigated/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalSharePieChartMaize2020Summer1: {
					title: 'Maize (summer1)',
					subtitle: 'Maize/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalSharePieChartCereals2020Summer1: {
					title: 'Cereals (summer1)',
					subtitle: 'Cereals/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalSharePieChartCereals2020Winter: {
					title: 'Cereals (winter)',
					subtitle: 'Cereals/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalShareCountryProductsBarChart: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						// maxValue: 100,
						padding: 0.1,
						innerPadding: 3,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 13,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalCountriesBarChart: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 15,
						labelSkipWidth: 60,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				GlobalCountriesBarChartShare: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-.2r',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						maxValue: 100,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 15,
						labelSkipWidth: 20,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountryTopTenBarChart: {
					title: '',
					subtitle: 'Top 10 regions: ',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 13,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountryTopTenBarChartShare: {
					title: '',
					subtitle: 'Top 10 regions: ',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 13,
						maxValue: 100,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountrySharePieChart: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						margin: {top: 10, right: 10, bottom: 10, left: 10},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountrySharePieChartMaize2020Summer1: {
					title: 'Maize (summer1)',
					subtitle: 'Maize/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountrySharePieChartCereals2020Summer1: {
					title: 'Cereals (summer1)',
					subtitle: 'Cereals/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountrySharePieChartCereals2020Winter: {
					title: 'Cereals (winter)',
					subtitle: 'Cereals/cropland area share [%]',
					settings: {
						indexBy: 'id',
						margin: {top: 5, right: 5, bottom: 5, left: 5},
						innerRadius: 0.7,
						padAngle: 1,
						cornerRadius: 0,
						activeOuterRadiusOffset: 8,
						arcLabelsTextColor: 'theme',
						enableArcLinkLabels: false,
						enableArcLabels: false,
						isInteractive: false,
						motionConfig: 'slow',
						transitionMode: 'startAngle',
						theme: {
							fontSize: 11,
							textColor: 'var(--base30)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountryRegionsBarChart: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-,d',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 15,
						labelSkipWidth: 50,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
				CountryRegionsBarChartShare: {
					title: '',
					subtitle: '',
					settings: {
						indexBy: 'id',
						layout: 'horizontal',
						margin: {top: 0, right: 25, bottom: 20, left: 100},
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						valueFormat: ' >-.2r',
						axisTop: null,
						axisRight: null,
						axisBottom: {
							values: false,
							enable: true,
							// legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: 33,
							tickPadding: 0,
							tickValues: 4,
							format: ' >-,d',
						},
						padding: 0.5,
						maxValue: 100,
						groupMode: 'grouped',
						enableGridY: false,
						enableGridX: true,
						enableLabel: true,
						labelSkipHeight: 13,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base70)',
							axis: {
								legend: {
									text: {
										fontSize: 13,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base20)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
							labels: {
								text: {
									fontSize: 13,
									fontWeight: 'bold',
								},
							},
						},
					},
				},
			},
			data: {
				components: {
					RegionSelect: {
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							place: true,
						},
						attributeKeys: ['5f6a119b-addf-467e-ab1f-e07e4cdf79a6'],
						start: 1,
						length: 300,
					},
					CountryNames: {
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
						},
						attributeKeys: ['5f6a119b-addf-467e-ab1f-e07e4cdf79a6'],
						start: 1,
						length: 300,
					},
					GlobalTopTenBarChart: {
						type: 'barChart',
						options: {
							nameComponentKey: 'CountryNames',
							attributeType: 'absolute',
							limit: 10,
						},
						attributeOrder: [['4fb212bb-ff1a-46d7-8fce-e341e7f08376', 'desc']],
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
						},
						attributeKeys: ['4fb212bb-ff1a-46d7-8fce-e341e7f08376'],
						start: 1,
						length: 300,
					},
					GlobalTopTenBarChartShare: {
						type: 'barChart',
						options: {
							nameComponentKey: 'CountryNames',
							attributeType: 'relative',
							limit: 10,
						},
						attributeOrder: [['73e3bd86-8701-47e4-b27b-9d2555d68304', 'desc']],
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
						},
						attributeKeys: ['73e3bd86-8701-47e4-b27b-9d2555d68304'],
						start: 1,
						length: 300,
					},
					GlobalSharePieChart: {
						type: 'donutChart',
						options: {
							attributeType: 'relative',
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.5rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
						},
						attributeKeys: ['73e3bd86-8701-47e4-b27b-9d2555d68304'],
						start: 1,
						length: 1,
					},
					GlobalSharePieChartActiveIrrigation2020Summer1: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: '66f490a6-d8df-45a3-adcb-d3648715ddd5',
							periodKey: 'f3293b7c-4725-49a6-beeb-19718083ab6c',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
						},
						attributeKeys: ['934a9fa2-ddb9-49a8-b4b2-170e39ef531e'],
						start: 1,
						length: 1,
					},
					GlobalSharePieChartMaize2020Summer1: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: '33caa296-cf88-4d5c-a67d-ffba11376d4a',
							periodKey: 'f3293b7c-4725-49a6-beeb-19718083ab6c',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
						},
						attributeKeys: ['8e71e4da-5a90-4222-9350-f1c1f1bad5c5'],
						start: 1,
						length: 1,
					},
					GlobalSharePieChartCereals2020Summer1: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: 'd439a6db-8f7b-4123-9e93-3892cad157f7',
							periodKey: 'f3293b7c-4725-49a6-beeb-19718083ab6c',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
						},
						attributeKeys: ['eb9dce86-39c6-480b-b7e3-2fac2101eac0'],
						start: 1,
						length: 1,
					},
					GlobalSharePieChartCereals2020Winter: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: 'd439a6db-8f7b-4123-9e93-3892cad157f7',
							periodKey: 'd93a6ec5-e6e2-4f9a-a368-8a8f2aa8c0fe',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
						},
						attributeKeys: ['eb9dce86-39c6-480b-b7e3-2fac2101eac0'],
						start: 1,
						length: 1,
					},
					GlobalShareCountryProductsBarChart: {
						type: 'barChart',
						options: {
							nameComponentKey: 'CountryNames',
							selectedFeaturesOnly: true,
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
						},
						attributeKeys: [
							'73e3bd86-8701-47e4-b27b-9d2555d68304',
							'934a9fa2-ddb9-49a8-b4b2-170e39ef531e',
							'8e71e4da-5a90-4222-9350-f1c1f1bad5c5',
							'eb9dce86-39c6-480b-b7e3-2fac2101eac0',
						],
						start: 1,
						length: 100,
					},
					GlobalCountriesBarChart: {
						type: 'barChart',
						options: {
							nameComponentKey: 'CountryNames',
							attributeType: 'absolute',
							selectedFeaturesOnly: true,
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
						},
						attributeKeys: ['4fb212bb-ff1a-46d7-8fce-e341e7f08376'],
						start: 1,
						length: 100,
					},
					GlobalCountriesBarChartShare: {
						type: 'barChart',
						options: {
							nameComponentKey: 'CountryNames',
							attributeType: 'relative',
							selectedFeaturesOnly: true,
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
						},
						attributeKeys: ['73e3bd86-8701-47e4-b27b-9d2555d68304'],
						start: 1,
						length: 100,
					},
					CountryTopTenBarChart: {
						type: 'barChart',
						options: {
							nameComponentKey: 'RegionSelect',
							attributeType: 'absolute',
							limit: 10,
						},
						attributeOrder: [['4fb212bb-ff1a-46d7-8fce-e341e7f08376', 'desc']],
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
							place: true,
						},
						attributeKeys: ['4fb212bb-ff1a-46d7-8fce-e341e7f08376'],
						start: 1,
						length: 300,
					},
					CountryTopTenBarChartShare: {
						type: 'barChart',
						options: {
							nameComponentKey: 'RegionSelect',
							attributeType: 'relative',
							limit: 10,
						},
						attributeOrder: [['73e3bd86-8701-47e4-b27b-9d2555d68304', 'desc']],
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
							place: true,
						},
						attributeKeys: ['73e3bd86-8701-47e4-b27b-9d2555d68304'],
						start: 1,
						length: 300,
					},
					CountrySharePieChart: {
						type: 'donutChart',
						options: {
							attributeType: 'relative',
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.5rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
							place: true,
						},
						attributeKeys: ['73e3bd86-8701-47e4-b27b-9d2555d68304'],
						start: 1,
						length: 1,
					},
					CountrySharePieChartMaize2020Summer1: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: '33caa296-cf88-4d5c-a67d-ffba11376d4a',
							periodKey: 'f3293b7c-4725-49a6-beeb-19718083ab6c',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							place: true,
						},
						attributeKeys: ['8e71e4da-5a90-4222-9350-f1c1f1bad5c5'],
						start: 1,
						length: 1,
					},
					CountrySharePieChartCereals2020Summer1: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: 'd439a6db-8f7b-4123-9e93-3892cad157f7',
							periodKey: 'f3293b7c-4725-49a6-beeb-19718083ab6c',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							place: true,
						},
						attributeKeys: ['eb9dce86-39c6-480b-b7e3-2fac2101eac0'],
						start: 1,
						length: 1,
					},
					CountrySharePieChartCereals2020Winter: {
						type: 'donutChart',
						options: {
							valuesAsPercentage: true,
							oneValue: true,
							centeredMetric: {
								fontSize: '1.15rem',
								fontWeight: 700,
								fill: 'var(--base85)',
							},
						},
						metadataModifiers: {
							caseKey: 'd439a6db-8f7b-4123-9e93-3892cad157f7',
							periodKey: 'd93a6ec5-e6e2-4f9a-a368-8a8f2aa8c0fe',
						},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							place: true,
						},
						attributeKeys: ['eb9dce86-39c6-480b-b7e3-2fac2101eac0'],
						start: 1,
						length: 1,
					},
					CountryRegionsBarChart: {
						type: 'barChart',
						options: {
							nameComponentKey: 'RegionSelect',
							attributeType: 'absolute',
							selectedFeaturesOnly: true,
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
							place: true,
						},
						attributeKeys: ['4fb212bb-ff1a-46d7-8fce-e341e7f08376'],
						start: 1,
						length: 300,
					},
					CountryRegionsBarChartShare: {
						type: 'barChart',
						options: {
							nameComponentKey: 'RegionSelect',
							attributeType: 'relative',
							selectedFeaturesOnly: true,
						},
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
							place: true,
						},
						attributeKeys: ['73e3bd86-8701-47e4-b27b-9d2555d68304'],
						start: 1,
						length: 300,
					},
				},
				sets: {
					GlobalNoSelected: {
						components: ['GlobalTopTenBarChart', 'GlobalTopTenBarChartShare'],
					},
					GlobalOneSelected: {
						components: ['GlobalSharePieChart'],
					},
					GlobalOneSelectedAnnualCropland: {
						components: [
							'GlobalSharePieChart',
							'GlobalSharePieChartActiveIrrigation2020Summer1',
							'GlobalSharePieChartMaize2020Summer1',
							'GlobalSharePieChartCereals2020Winter',
							'GlobalSharePieChartCereals2020Summer1',
						],
					},
					GlobalMultipleSelected: {
						components: [
							'GlobalCountriesBarChart',
							'GlobalCountriesBarChartShare',
						],
					},
					CountryNoSelectedRegion: {
						components: ['CountryTopTenBarChart', 'CountryTopTenBarChartShare'],
					},
					CountryOneSelectedRegion: {
						components: ['CountrySharePieChart'],
					},
					CountryOneSelectedRegionAnnualCropland: {
						components: [
							'CountrySharePieChart',
							'CountrySharePieChartMaize2020Summer1',
							'CountrySharePieChartCereals2020Winter',
							'CountrySharePieChartCereals2020Summer1',
						],
					},
					CountryMultipleSelectedRegions: {
						components: [
							'CountryRegionsBarChart',
							'CountryRegionsBarChartShare',
						],
					},
				},
			},
			maps: {
				activeMapKey: 'e44839a8-b1f5-4f6f-8049-30aeb967eecf',
				activeSetKey: 'statistics-mapSet',
				maps: {
					'e44839a8-b1f5-4f6f-8049-30aeb967eecf': {
						key: 'e44839a8-b1f5-4f6f-8049-30aeb967eecf',
						data: {
							layers: [
								{
									key: 'statistics-global',
									layerKey: 'statistics-global',
									options: {
										hoverable: true,
										selectable: true,
										selected: {
											'764ff34a-2eee-4d82-8ffe-87da6ed1a3f7': {},
										},
										nameAttributeKey: '5f6a119b-addf-467e-ab1f-e07e4cdf79a6',
										attributeFilter: {},
									},

									filterByActive: {
										period: true,
										application: true,
										scope: true,
									},
									metadataModifiers: {},
								},
							],
						},
					},
				},
				sets: {
					'statistics-mapSet': {
						key: 'statistics-mapSet',
						activeMapKey: 'e44839a8-b1f5-4f6f-8049-30aeb967eecf',
						maps: ['e44839a8-b1f5-4f6f-8049-30aeb967eecf'],
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
								boxRangeRange: [1000, 20000000],
							},
						},
					},
				},
			},
			areas: {
				areaTreeLevels: {
					activeKey: 'a53a54dd-8a0b-4e28-b7aa-aa566cd2ba47',
				},
			},
			cases: {
				activeKey: '577b253f-754f-421e-94a2-092f092b4947',
			},
			scopes: {
				activeKey: '10de783b-810b-4f8a-aceb-4c9e9f91d4d3',
			},
			periods: {
				activeKey: '6a7a4193-1339-4172-b54d-817c3e8cd6f7',
			},
			selections: {
				activeKey: '764ff34a-2eee-4d82-8ffe-87da6ed1a3f7',
				data: [
					{
						key: '764ff34a-2eee-4d82-8ffe-87da6ed1a3f7',
						data: {
							color: '#00fffe',
							hoveredColor: '#1efbff',
						},
					},
					{
						key: 'b35beddf-0656-4294-acef-e8af91e86fa3',
						data: {
							color: '#e600ff',
							hoveredColor: '#e600ff',
						},
					},
				],
			},
		},
	},
};
