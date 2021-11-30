export default {
	key: 'e8b73cf7-0cb5-4e68-92a0-7f3106422c13',
	data: {
		nameInternal: 'Maize - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#e0cd00',
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
