import React from 'react';

import './style.scss';

const ProductFilterOption = ({
	value,
	count,
	parameterKey,
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

export default ProductFilterOption;
