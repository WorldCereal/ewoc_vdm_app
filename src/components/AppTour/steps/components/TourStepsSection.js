import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../style.scss';

const TourStepsSection = ({children, isRight}) => (
	<div
		className={classnames(
			'worldCereal-tour-steps-Section',
			{},
			isRight ? 'is-right' : ''
		)}
	>
		{children}
	</div>
);

TourStepsSection.propTypes = {
	children: PropTypes.node,
	isRight: PropTypes.bool,
};

export default TourStepsSection;
