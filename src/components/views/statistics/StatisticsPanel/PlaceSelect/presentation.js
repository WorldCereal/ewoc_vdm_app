import PropTypes from 'prop-types';
import {useEffect} from 'react';
import StatisticsSelect from '../StatisticsSelect';
import './style.scss';

const PlaceSelect = ({
	activeLevel,
	activePlaceKeys,
	places,
	onActivePlacesChange,
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

	const options = places?.map(place => {
		return {value: place.key, label: place.data.nameDisplay};
	});
	const values =
		activePlaceKeys?.length > 0 &&
		options?.filter(option => activePlaceKeys.includes(option.value));

	const setActivePlaceKeys = places => {
		onActivePlacesChange(places.map(place => place.value));
	};

	return (
		<StatisticsSelect
			label="Countries"
			placeholder="Select one or multiple countries to see detailed statistics..."
			options={options}
			value={values}
			disabled={activeLevel?.data?.level === 2}
			onChange={setActivePlaceKeys}
			isSearchable
			isMulti
		/>
	);
};

PlaceSelect.propTypes = {
	activeLevel: PropTypes.object,
	activePlaceKeys: PropTypes.array,
	places: PropTypes.array,
	onActivePlacesChange: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default PlaceSelect;
