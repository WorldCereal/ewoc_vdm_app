import PropTypes from 'prop-types';
import {useEffect} from 'react';
import StatisticsSelect from '../StatisticsSelect';
import './style.scss';

const ProductSelect = ({
	activeCaseKey,
	cases,
	onActiveCaseChange,
	onMount,
	onUnmount,
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount(activeCaseKey);
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	const options = cases?.map(caseItem => {
		return {value: caseItem.key, label: caseItem.data.nameDisplay};
	});
	const value = options?.find(option => option.value === activeCaseKey);

	const setActiveCaseKey = caseItem => {
		onActiveCaseChange(caseItem.value);
	};

	return (
		<StatisticsSelect
			label="Product"
			options={options}
			value={value}
			onChange={setActiveCaseKey}
		/>
	);
};

ProductSelect.propTypes = {
	activeCaseKey: PropTypes.string,
	cases: PropTypes.array,
	onActiveCaseChange: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default ProductSelect;
