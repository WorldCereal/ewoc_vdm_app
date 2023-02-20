import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const ActiveMaps = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 1rem 0'}}>Active map window</h3>
		<p style={{marginBottom: 0}}>
			To add products to the new map window, you must first click on it to make
			it active. Yellow dashed border indicates active map window.
		</p>
	</TourStepsContainer>
);

export default ActiveMaps;
