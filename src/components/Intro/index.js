import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Action from '../../state/Action';
import Select from '../../state/Select';

const mapStateToProps = state => {
	return {
		views: Select.views.getAll(state),
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onViewSelect: viewKey => {
			dispatch(Action.worldCereal.applyView(viewKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
