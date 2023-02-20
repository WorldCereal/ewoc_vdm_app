import PropTypes from 'prop-types';
import MapLegendClassItem from './MapLegendClassItem';
import './style.scss';

const roundValue = value => {
	let specialCharacter = '';
	if (typeof value === 'string') {
		if (value?.includes('=')) {
			value = value.replace('=', '');
			specialCharacter = '=';
		}
		if (value?.includes('<')) {
			value = value.replace('<', '');
			specialCharacter = '<';
		}

		if (value?.includes('>')) {
			value = value.replace('>', '');
			specialCharacter = '>';
		}
	}

	const valueFloat = typeof value === 'string' && Number.parseFloat(value);

	return value
		? `${specialCharacter} ${Math.round((valueFloat || value) * 1000) / 1000}`
		: value;
};

const ClassesBarLabel = ({children}) => (
	<div className="worldCereal-MapLegendClassesBar-label">{children}</div>
);

ClassesBarLabel.propTypes = {
	children: PropTypes.node,
};

const ClassesBar = ({intervals}) => (
	<div className="worldCereal-MapLegendClassesBar-bar">
		{intervals.map(interval => (
			<div
				title={
					interval.name ||
					`${roundValue(interval?.interval[0])} - ${roundValue(
						interval?.interval[1]
					)}`
				}
				key={interval.interval}
				style={{background: interval.fill}}
			/>
		))}
	</div>
);

ClassesBar.propTypes = {
	intervals: PropTypes.array,
};

const MapLegendClassesBar = ({intervals}) => {
	const [firstInterval, ...restIntervals] = intervals;
	const isFirstIntervalValue =
		firstInterval?.interval[1] - firstInterval?.interval[0] === 0;
	if (isFirstIntervalValue) {
		return (
			<div className="worldCereal-MapLegendClassesBar">
				<MapLegendClassItem
					color={firstInterval?.fill}
					label={firstInterval?.name}
				/>
				{intervals[1] ? (
					<>
						<ClassesBarLabel>
							{roundValue(intervals[1].name || intervals[1].interval[0])}
						</ClassesBarLabel>
						<ClassesBar intervals={restIntervals} />
						<ClassesBarLabel>
							{roundValue(
								intervals[intervals.length - 1].name ||
									intervals[intervals.length - 1].interval[1]
							)}
						</ClassesBarLabel>
					</>
				) : null}
			</div>
		);
	} else {
		//pokud je jen jeden "interval", tak renderovat pouze ten
		return (
			<div className="worldCereal-MapLegendClassesBar">
				<ClassesBarLabel>
					{roundValue(intervals?.[0]?.name || intervals?.[0]?.interval?.[0])}
				</ClassesBarLabel>
				{intervals[1] ? (
					<>
						<ClassesBar intervals={intervals} />
						<ClassesBarLabel>
							{roundValue(
								intervals?.[intervals.length - 1]?.name ||
									intervals?.[intervals.length - 1]?.interval[1]
							)}
						</ClassesBarLabel>{' '}
					</>
				) : null}
			</div>
		);
	}
};

MapLegendClassesBar.propTypes = {
	intervals: PropTypes.array,
};

export default MapLegendClassesBar;
