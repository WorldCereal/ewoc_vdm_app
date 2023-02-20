import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Panel = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Statistical panel</h3>
		<p>
			Define parameters to generate various charts presenting statistical
			figures derived from WorldCereal products.
		</p>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Product</b> - Select product for statistical exploration.
				</p>
				<p>
					<b>Period</b> - Select period for statistical exploration.
				</p>
				<p>
					<b>Level</b> - Switch between global and country level.
				</p>
				<p>
					<b>Countries</b> - Select country(s) for statistical exploration.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Regions</b> - Select region(s) for statistical exploration.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Panel;
