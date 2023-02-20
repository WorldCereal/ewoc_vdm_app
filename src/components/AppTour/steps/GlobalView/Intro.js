import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Intro = () => (
	<TourStepsContainer>
		<p style={{marginBottom: '0.4rem'}}>
			Welcome to the <b>Global view</b> template.
		</p>
		<p style={{marginBottom: 0}}>
			You can explore all WorldCereal products aggregated by products categories
			and individual seasons within this mapping template.
		</p>
	</TourStepsContainer>
);

export default Intro;
