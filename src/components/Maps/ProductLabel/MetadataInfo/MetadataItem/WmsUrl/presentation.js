import PropTypes from 'prop-types';

const WmsUrl = ({dataSource}) => {
	return <a href={dataSource.data.url}>{dataSource.data.url}</a>;
};

WmsUrl.propTypes = {
	dataSource: PropTypes.object,
};
export default WmsUrl;
