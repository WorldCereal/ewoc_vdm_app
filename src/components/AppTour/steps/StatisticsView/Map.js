import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Map = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Map window</h3>
		<p style={{marginBottom: 0}}>
			See the map of administrative units (country, regions) for which
			statistical figures are available. Click on the map to select country or
			region. Ctrl & click to add more countries or regions to the comparison
			chart.
		</p>
	</TourStepsContainer>
);

export default Map;
