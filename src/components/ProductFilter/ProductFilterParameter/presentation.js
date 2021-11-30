import React from 'react';
import ProductFilterOption from '../ProductFilterOption';

import './style.scss';

const ProductFilterParameter = ({name, options, parameterKey}) => {
	return (
		<div className="worldCereal-ProductFilterParameter">
			{options.map(option => (
				<ProductFilterOption
					key={option}
					parameterKey={parameterKey}
					value={option}
				/>
			))}
		</div>
	);
};

export default ProductFilterParameter;
