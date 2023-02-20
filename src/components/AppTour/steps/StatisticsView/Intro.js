import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Intro = () => (
	<TourStepsContainer>
		<p style={{marginBottom: '0.4rem'}}>
			Welcome to the <b>Statistics view</b> template.
		</p>
		<p style={{marginBottom: 0}}>
			You can explore various statistics derived from WorldCereal products
			within this mapping template.
		</p>
	</TourStepsContainer>
);

export default Intro;
