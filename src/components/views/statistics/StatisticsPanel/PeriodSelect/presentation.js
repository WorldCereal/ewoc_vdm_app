import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {includes as _includes} from 'lodash';
import StatisticsSelect from '../StatisticsSelect';
import './style.scss';

const PeriodSelect = ({
	availablePeriods,
	activePeriodKey,
	periods,
	onActivePeriodChange,
	onMount,
	onUnmount,
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount();
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	const options = periods?.map(periodItem => {
		return {
			value: periodItem.key,
			label: periodItem.data.nameDisplay,
			isDisabled: !_includes(availablePeriods, periodItem.key),
		};
	});
	const value = options?.find(option => option.value === activePeriodKey);

	const setActivePeriodKey = periodItem => {
		onActivePeriodChange(periodItem.value);
	};

	return (
		<StatisticsSelect
			label="Period"
			options={options}
			value={value}
			onChange={setActivePeriodKey}
		/>
	);
};

PeriodSelect.propTypes = {
	activePeriodKey: PropTypes.string,
	availablePeriods: PropTypes.array,
	periods: PropTypes.array,
	onActivePeriodChange: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default PeriodSelect;
