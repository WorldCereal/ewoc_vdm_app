export default {
	key: '92519f8a-59b4-4b09-b076-1df38b7cab50',
	data: {
		nameInternal: 'Annual cropland - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#e41a1c',
						},
						{
							bandIndex: 0,
							valueClasses: [
								{
									interval: [0, 99],
									intervalBounds: [true, true],
									color: null,
								},
								{
									interval: [101, 255],
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
