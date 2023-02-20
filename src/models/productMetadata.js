export default item => {
	const {
		tile_collection_id,
		sos,
		eos,
		season,
		aez_id,
		aez_group,
		geometry,
		product,
		type,
		public: isPublic,
		tiles,
		related_products,
		merged,
		model,
		training_refids,
		dataSource,
	} = item.data.data;

	return {
		key: item.key,
		data: {
			id: tile_collection_id,
			sos,
			eos,
			season,
			aez: aez_id,
			aez_group,
			geometry,
			product,
			type,
			public: isPublic,
			tiles,
			relatedProducts: related_products,
			model,
			merged,
			training_refids,
			dataSource,
		},
	};
};
