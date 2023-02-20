import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Filters = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Filters</h3>
		<p style={{marginBottom: 0}}>
			Select product categories and seasons to be displayed in the timeline.
		</p>
	</TourStepsContainer>
);

export default Filters;
