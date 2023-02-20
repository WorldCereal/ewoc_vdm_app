import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

const getSeasonName = season => {
	switch (season) {
		case 'summer1':
			return 'Summer1';
		case 'summer2':
			return 'Summer2';
		case 'winter':
			return 'Winter';
		case 'annual':
			return 'Annual';
	}
};

const Product = ({product, onProductClick}) => {
	return (
		<Button
			className="worldCereal-Product"
			small
			inverted
			onClick={() => onProductClick(product)}
			primary={product.active}
		>
			{getSeasonName(product.data.season)}
		</Button>
	);
};

Product.propTypes = {
	product: PropTypes.object,
	onProductClick: PropTypes.func,
};

export default Product;
