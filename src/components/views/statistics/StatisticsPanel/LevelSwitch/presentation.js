import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';
import StatisticsConfigurationItem from '../StatisticsConfigurationItem';
import './style.scss';

const LevelSwitch = ({
	onMount,
	onUnmount,
	setLayer,
	activeLevelKey,
	activePlaceKeys,
	levels,
	onActiveLevelChange,
	countryLevelDisabled,
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount(activeLevelKey);
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);
	useEffect(() => {
		setLayer(activeLevelKey);
	}, [activeLevelKey]);

	return (
		<StatisticsConfigurationItem label="Level">
			<ButtonSwitch
				className="ptr-dark worldCereal-LevelSwitch worldCereal-ButtonSwitch"
				onClick={onActiveLevelChange}
			>
				{levels?.map(level => (
					<ButtonSwitchOption
						key={level.key}
						value={level.key}
						active={level.key === activeLevelKey}
						disabled={activePlaceKeys?.length !== 1 || countryLevelDisabled}
					>
						{level.data.nameDisplay}
					</ButtonSwitchOption>
				))}
			</ButtonSwitch>
		</StatisticsConfigurationItem>
	);
};

LevelSwitch.propTypes = {
	activeLevelKey: PropTypes.string,
	activePlaceKeys: PropTypes.array,
	onActiveLevelChange: PropTypes.func,
	levels: PropTypes.array,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	setLayer: PropTypes.func,
	countryLevelDisabled: PropTypes.bool,
};

export default LevelSwitch;
