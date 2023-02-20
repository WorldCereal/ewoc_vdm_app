import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Header = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Header</h3>
		<p>
			The header includes the basic navigation tools within the application.
		</p>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Project Logo & Title</b> - Go back to the portal home page.
				</p>
				<p style={{marginBottom: 0}}>
					<b>ESA Logo</b> - Link to the ESA home page.
				</p>
			</TourStepsSection>
			<TourStepsSection isRight>
				<p>
					<b>Configuration </b> - Open configuration panel for Map toolbar.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Tour</b> - Start the application tour guide.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Header;
