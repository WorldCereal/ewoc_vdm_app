import PropTypes from 'prop-types';
import MapLegendClassItem from './MapLegendClassItem';
import './style.scss';

const NoData = ({style}) => {
	return (
		<MapLegendClassItem color={style?.fill} label={style?.name || 'No data'} />
	);
};

NoData.propTypes = {
	style: PropTypes.object,
};

export default NoData;
