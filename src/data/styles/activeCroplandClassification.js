export default {
	key: '829f8a76-9746-40f7-bb19-2bb2a09e99a2',
	data: {
		nameInternal: 'Active cropland - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#2ca52a',
						},
						{
							bandIndex: 0,
							valueClasses: [
								{
									interval: [0, 1],
									intervalBounds: [true, false],
									color: null,
								},
								{
									interval: [1, 2],
									intervalBounds: [true, false],
									color: '#a8a8a8',
								},
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
