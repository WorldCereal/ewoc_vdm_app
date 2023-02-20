import PropTypes from 'prop-types';
import './style.scss';

const MapLegendValueItem = ({color, label}) => {
	return (
		<div className="worldCereal-MapLegendValueItem">
			<div style={{background: color}} />
			<span>{label}</span>
		</div>
	);
};

MapLegendValueItem.propTypes = {
	color: PropTypes.string,
	label: PropTypes.string,
};

export default MapLegendValueItem;
