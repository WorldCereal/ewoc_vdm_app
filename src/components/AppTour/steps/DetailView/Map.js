import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Map = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 1rem 0'}}>Map window</h3>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Map</b> - Main window to visualise WorldCereals products and
					supporting datasets.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Product Tag</b> - Get the metadata information about displayed
					product and define basic visualisation parameters.
				</p>
			</TourStepsSection>
			<TourStepsSection isRight>
				<p>
					<b>Minimap</b> - See the location of current Area of Interest (AOI) on
					global map.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Map toolbar</b> - Open tools for controlling the map window.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Map;
