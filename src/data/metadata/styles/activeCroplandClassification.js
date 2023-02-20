export default {
	key: '829f8a76-9746-40f7-bb19-2bb2a09e99a2',
	data: {
		nameInternal: 'Active cropland - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: 'rgb(77, 216, 39)',
						},
						{
							bandIndex: 0,
							legend: true,
							values: {
								0: {
									color: null,
								},
								1: {
									color: 'rgb(232, 55, 39)',
									name: 'Inactive cropland',
								},
								2: {
									color: 'rgb(77, 216, 39)',
									name: 'Active cropland',
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
