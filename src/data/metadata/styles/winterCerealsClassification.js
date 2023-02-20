export default {
	key: '80bf99a9-5a02-4ea4-be09-9bef765c1c22',
	data: {
		nameInternal: 'Cereals - classification',
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
								// 1: {
								// 	color: 'rgb(186, 186, 186)',
								// 	name: 'Other crop',
								// },
								2: {
									color: 'rgb(186, 113, 53)',
									name: 'Winter cereals',
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
