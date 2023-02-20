import PropTypes from 'prop-types';
import classNames from 'classnames';
import MapLegendClassItem from './MapLegendClassItem';
import MapLegendClassesBar from './MapLegendClassesBar';
import './style.scss';

const roundValue = value => {
	try {
		const valueFloat = Number.parseFloat(value);

		return Math.round(valueFloat * 1000) / 1000;
	} catch (error) {
		return value;
	}
};

const MapLegendAttributeClasses = ({intervals, isExpanded}) => {
	const classes = classNames('worldCereal-MapLegend-AttributeClasses', {
		'is-expanded': isExpanded,
	});

	const intervalsKey = intervals.map(i => i.interval.toString()).join(',');

	return (
		<div className={classes}>
			{isExpanded ? (
				intervals.map(interval => (
					<MapLegendClassItem
						key={`${intervalsKey}_${interval.interval}`}
						color={interval.fill}
						label={
							interval?.name ||
							`${roundValue(interval?.interval[0])} - ${roundValue(
								interval?.interval[1]
							)}`
						}
					/>
				))
			) : (
				<MapLegendClassesBar intervals={intervals} />
			)}
		</div>
	);
};

MapLegendAttributeClasses.propTypes = {
	intervals: PropTypes.array,
	isExpanded: PropTypes.bool,
};

export default MapLegendAttributeClasses;
