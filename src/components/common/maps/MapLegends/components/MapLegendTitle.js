import PropTypes from 'prop-types';
import './style.scss';

const MapLegendTitle = ({unit, children}) => {
	return (
		<div className="worldCereal-MapLegendTitle">
			<span className="worldCereal-MapLegendTitle-name">{children}</span>
			{unit ? (
				<span className="worldCereal-MapLegendTitle-unit">[{unit}]</span>
			) : null}
		</div>
	);
};

MapLegendTitle.propTypes = {
	children: PropTypes.node,
	unit: PropTypes.string,
};

export default MapLegendTitle;
