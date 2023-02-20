import PropTypes from 'prop-types';
import {useEffect} from 'react';
import StatisticsSelect from '../StatisticsSelect';
import './style.scss';

const RegionSelect = ({
	activeRegionKeys,
	regions,
	onActiveRegionChange,
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

	const options = regions?.map(region => {
		return {value: region.key, label: region.name};
	});
	const values =
		activeRegionKeys?.length > 0 &&
		options?.filter(option => activeRegionKeys.includes(option.value));

	const setActiveRegions = regions => {
		onActiveRegionChange(regions.map(region => region.value));
	};

	return (
		<StatisticsSelect
			label="Regions"
			regionholder="Select one or multiple regions to see detailed statistics..."
			options={options}
			value={values}
			onChange={setActiveRegions}
			isSearchable
			isMulti
		/>
	);
};

RegionSelect.propTypes = {
	activeLevel: PropTypes.object,
	activeRegionKeys: PropTypes.array,
	regions: PropTypes.array,
	onActiveRegionChange: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default RegionSelect;
