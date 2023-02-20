import {connect} from '@gisatcz/ptr-state';
import {Select as CommonSelect} from '@gisatcz/ptr-state';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		dataSource: CommonSelect.data.spatialDataSources.getByKeyObserver(
			ownProps.spatialDataSourceKey
		),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
