import PropTypes from 'prop-types';

const ConfidenceWmsUrl = ({url}) => {
	return <a href={url}>{url}</a>;
};

ConfidenceWmsUrl.propTypes = {
	url: PropTypes.string,
};
export default ConfidenceWmsUrl;
