// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ProductFilterOption = ({
	value,
	count,
	selected,
	metadata,
	onValueChange,
	isInteractivityLimited,
}) => {
	const name = metadata?.data?.nameDisplay || value;

	return (
		<div className="worldCereal-ProductFilterOption">
			<input
				type="checkbox"
				disabled={isInteractivityLimited ? true : count === 0}
				id={value}
				name={value}
				checked={selected}
				onChange={e => {
					onValueChange(value, e.target.checked);
				}}
			/>
			<label htmlFor={value}>
				{name} <span>({isInteractivityLimited ? 0 : count})</span>
			</label>
		</div>
	);
};

ProductFilterOption.propTypes = {
	count: PropTypes.number,
	isInteractivityLimited: PropTypes.bool,
	metadata: PropTypes.object,
	onValueChange: PropTypes.func,
	selected: PropTypes.bool,
	value: PropTypes.string,
};

export default ProductFilterOption;
