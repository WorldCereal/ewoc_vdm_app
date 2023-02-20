import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	//TODO
	const active = Object.hasOwn(ownProps, 'active')
		? ownProps.active
		: Select.components.get(state, ownProps.componentKey, 'active');
	return {
		active,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: active => {
			if (typeof ownProps.onClick === 'function') {
				ownProps.onClick(active);
			} else {
				if (active) {
					dispatch(
						Action.worldCereal.configuration.addComponentToOpen(
							ownProps.configurationGroupKey,
							ownProps.configurationPath,
							ownProps.componentKey
						)
					);
				} else {
					dispatch(
						Action.worldCereal.configuration.removeComponentFromOpen(
							ownProps.configurationGroupKey,
							ownProps.configurationPath,
							ownProps.componentKey
						)
					);
				}
			}
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
