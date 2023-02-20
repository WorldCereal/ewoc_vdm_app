export default {
	key: '50a51155-6230-4766-85fe-c6afa29437f3',
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
									name: 'Spring cereals',
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
