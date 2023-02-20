import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const componentKey = 'AppConfiguration';

const mapStateToProps = state => {
	return {
		isOpen: Select.components.get(state, componentKey, 'open'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setOpen: open => {
			dispatch(Action.components.set(componentKey, 'open', open));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
