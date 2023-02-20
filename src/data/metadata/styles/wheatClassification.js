export default {
	key: 'c2ea3a49-8da1-473d-ad7b-3860c95a4cc7',
	data: {
		nameInternal: 'Wheat - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: 'rgb(186, 113, 53)',
						},
						{
							bandIndex: 0,
							legend: true,
							values: {
								0: {
									color: null,
								},
								1: {
									color: 'rgb(186, 186, 186)',
									name: 'Other crop',
								},
								2: {
									color: 'rgb(186, 113, 53)',
									name: 'Wheat',
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
