import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Select from '../../state/Select';

const mapStateToProps = state => {
	return {
		open:
			Select.components.get(state, 'IntroOverlay', 'open') === false
				? false
				: true,
	};
};

export default connect(mapStateToProps)(Presentation);
