import PropTypes from 'prop-types';
import classNames from 'classnames';
import {forIn as _forIn} from 'lodash';
import MapLegendValueItem from './MapLegendValueItem';
import './style.scss';

const MapLegendAttributeValues = ({values, isExpanded}) => {
	const classes = classNames('worldCereal-MapLegend-AttributeValues', {
		'is-expanded': isExpanded,
	});

	let content = [];
	_forIn(values, (value, key) => {
		content.push(
			<MapLegendValueItem
				key={key}
				color={value.fill}
				label={value.name || key}
			/>
		);
	});

	return <div className={classes}>{content}</div>;
};

MapLegendAttributeValues.propTypes = {
	values: PropTypes.object,
	isExpanded: PropTypes.bool,
};

export default MapLegendAttributeValues;
