export default {
	key: 'fb76c73c-0e54-4f7c-b331-66110d13856f',
	data: {
		nameInternal: 'Active irrigation - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#0065ea',
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
