import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Timeline = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Product timeline</h3>
		<p style={{marginBottom: 0}}>
			See and scroll through the list of products that overlap with current AOI
			and add them to the map by clicking on corresponding bar. Identify the AEZ
			and the season to which each product belongs. Check visually the duration
			of the season. Zoom with the mouse wheel in the timeline.
		</p>
	</TourStepsContainer>
);

export default Timeline;
