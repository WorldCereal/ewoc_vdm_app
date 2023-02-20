import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Intro = () => (
	<TourStepsContainer>
		<p style={{marginBottom: '0.4rem'}}>
			Welcome to the <b>Detailed exploration</b> template.
		</p>
		<p style={{marginBottom: 0}}>
			You can explore all individual products that are based on Agro-ecological
			zones (AEZ) within this mapping template.
		</p>
	</TourStepsContainer>
);

export default Intro;
