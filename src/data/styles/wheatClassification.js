export default {
	key: 'c2ea3a49-8da1-473d-ad7b-3860c95a4cc7',
	data: {
		nameInternal: 'Wheat - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#d97501',
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
