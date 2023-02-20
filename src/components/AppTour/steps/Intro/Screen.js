import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Screen = () => (
	<TourStepsContainer>
		<p style={{marginBottom: '0.4rem'}}>
			Welcome to the <b>WorldCereal visualisation portal</b>.
		</p>
		<p style={{marginBottom: 0}}>
			This is a tour guide that presents the main functionalities and principles
			of this web application.
		</p>
	</TourStepsContainer>
);

export default Screen;
