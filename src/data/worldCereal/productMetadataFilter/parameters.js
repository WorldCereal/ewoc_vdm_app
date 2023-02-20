export default {
	aez: {
		key: 'aez',
		name: 'Zone',
		type: 'checkbox',
		orderDirection: 'asc',
		// disabled: true,
		options: [7039, 8046, 11071, 15097, 17106, 34190, 35191, 40224, 41226],
	},
	product: {
		key: 'product',
		dataType: 'cases',
		name: 'Product',
		type: 'checkbox',
		orderDirection: 'asc',
		options: [
			'annualcropland',
			'wintercereals',
			'springcereals',
			'maize',
			'irrigation',
			'activecropland',
			// ???
			// 'irrigation-v1',
			// 'irrigation-v2',
		],
	},
	season: {
		key: 'season',
		name: 'Season',
		type: 'checkbox',
		orderDirection: 'asc',
		options: ['annual', 'winter', 'summer1', 'summer2'],
	},
};
