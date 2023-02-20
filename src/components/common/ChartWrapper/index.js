import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		type: Select.data.components.getComponentStateByKey(
			state,
			ownProps.componentKey
		)?.type,
		title: Select.worldCereal.charts.getChartTitle(
			state,
			ownProps.componentKey,
			ownProps.title
		),
		subtitle: Select.worldCereal.charts.getChartSubtitle(
			state,
			ownProps.componentKey,
			ownProps.subtitle
		),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
