import PropTypes from 'prop-types';
import './style.scss';

const MapLegendClassItem = ({color, label}) => {
	return (
		<div className="worldCereal-MapLegendClassItem">
			<div style={{background: color}} />
			<span>{label}</span>
		</div>
	);
};

MapLegendClassItem.propTypes = {
	color: PropTypes.string,
	label: PropTypes.string,
};

export default MapLegendClassItem;
