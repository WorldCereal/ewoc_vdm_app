import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		tourGuideFilterExpanded: Select.components.get(
			state,
			'tourGuide',
			'filterWindow.expanded'
		),
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
		isTimelineCollapsed: Select.components.get(state, 'Timeline', 'collapsed'),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
