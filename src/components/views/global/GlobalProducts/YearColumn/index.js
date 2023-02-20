import PropTypes from 'prop-types';
import GlobalProductsCell from '../GlobalProductsCell';
import GlobalProductsColumn from '../GlobalProductsColumn';
import Product from '../Product';

import './style.scss';

const YearColumn = ({year, products, onProductClick}) => {
	return (
		<GlobalProductsColumn className="worldCereal-YearColumn">
			<GlobalProductsCell className="worldCereal-YearHeader">
				{year}
			</GlobalProductsCell>
			{products.map(product => {
				return (
					<GlobalProductsCell
						className="worldCereal-YearCell"
						key={`${product.product}_${year}`}
					>
						{product.products?.[year]
							? product.products?.[year].map(p => (
									<Product
										key={p.key}
										product={p}
										onProductClick={onProductClick}
									/>
							  ))
							: null}
					</GlobalProductsCell>
				);
			})}
		</GlobalProductsColumn>
	);
};

YearColumn.propTypes = {
	products: PropTypes.array,
	year: PropTypes.string,
	onProductClick: PropTypes.func,
};

export default YearColumn;
