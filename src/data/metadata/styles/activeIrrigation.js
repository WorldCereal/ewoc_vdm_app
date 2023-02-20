export default {
	key: 'fb76c73c-0e54-4f7c-b331-66110d13856f',
	data: {
		nameInternal: 'Active irrigation - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: 'rgb(104, 149, 197)',
						},
						{
							bandIndex: 0,
							legend: true,
							values: {
								0: {
									color: null,
								},
								1: {
									color: 'rgb(255, 132, 132)',
									name: 'Rainfed',
								},
								2: {
									color: 'rgb(104, 149, 197)',
									name: 'Irrigated',
								},
							},
						},
						{
							bandIndex: 0,
							valueClasses: [
								{
									interval: [3, 255],
									intervalBounds: [true, true],
									color: null,
								},
							],
						},
					],
				},
			],
		},
	},
};
