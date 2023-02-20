import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
