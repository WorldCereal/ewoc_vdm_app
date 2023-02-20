import PropTypes from 'prop-types';

import '../style.scss';

const TourStepsContainer = ({children}) => (
	<div className="worldCereal-tour-steps-Container">{children}</div>
);

TourStepsContainer.propTypes = {
	children: PropTypes.node,
};

export default TourStepsContainer;
