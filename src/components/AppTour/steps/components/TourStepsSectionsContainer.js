import PropTypes from 'prop-types';

import '../style.scss';

const TourStepsSectionsContainer = ({children}) => (
	<div className="worldCereal-tour-steps-SectionsContainer">{children}</div>
);

TourStepsSectionsContainer.propTypes = {
	children: PropTypes.node,
};

export default TourStepsSectionsContainer;
