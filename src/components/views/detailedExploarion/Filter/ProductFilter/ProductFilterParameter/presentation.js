// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import ProductFilterOption from '../ProductFilterOption';

import './style.scss';

const ProductFilterParameter = ({options, parameterKey}) => {
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

ProductFilterParameter.propTypes = {
	options: PropTypes.array,
	parameterKey: PropTypes.string,
};

export default ProductFilterParameter;
