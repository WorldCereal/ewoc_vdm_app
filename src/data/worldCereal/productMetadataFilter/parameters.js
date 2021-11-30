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
			'wheat',
			'maize',
			'activecropland',
			'irrigation-v2',
			'cereals',
			// ???
			// 'springcereals',
			// 'wintercereals',
			// 'springwheat',
			// 'winterwheat',
			// 'irrigation-v1',
			// 'irrigation-v2',
		],
	},
	season: {
		key: 'season',
		name: 'Season',
		type: 'checkbox',
		orderDirection: 'asc',
		options: ['annual', 'summer1', 'summer2', 'winter'],
	},
};
