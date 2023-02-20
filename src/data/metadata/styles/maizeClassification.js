export default {
	key: 'e8b73cf7-0cb5-4e68-92a0-7f3106422c13',
	data: {
		nameInternal: 'Maize - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: 'rgb(252, 207, 5)',
						},
						{
							bandIndex: 0,
							legend: true,
							values: {
								0: {
									color: null,
								},
								// 1: {
								// 	color: 'rgb(186, 186, 186)',
								// 	name: 'Other crop',
								// },
								2: {
									color: 'rgb(252, 207, 5)',
									name: 'Maize',
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
