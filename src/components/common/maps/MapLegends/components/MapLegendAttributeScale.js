import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.scss';

const MapLegendAttributeScale = ({values, isExpanded}) => {
	const classes = classNames('worldCereal-MapLegend-AttributeScale', {
		'is-expanded': isExpanded,
	});

	if (values?.fill) {
		const {inputInterval, outputInterval} = values.fill;
		return (
			<div className={classes}>
				<span>{inputInterval[0]}</span>
				<div
					style={{
						backgroundImage: `linear-gradient(90deg, ${outputInterval.join(
							','
						)})`,
					}}
				/>
				<span>{inputInterval[1]}</span>
			</div>
		);
	}
};

MapLegendAttributeScale.propTypes = {
	values: PropTypes.object,
	isExpanded: PropTypes.bool,
};

export default MapLegendAttributeScale;
