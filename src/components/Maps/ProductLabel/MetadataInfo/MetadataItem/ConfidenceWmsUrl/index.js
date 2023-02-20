import {connect} from '@gisatcz/ptr-state';
import {Select as CommonSelect} from '@gisatcz/ptr-state';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	const dataSource = CommonSelect.data.spatialDataSources.getByKeyObserver(
		ownProps.spatialDataSourceKey
	);

	const urlMatch = dataSource?.data?.url.match(/.+(\/.+)$/);
	const newWmsUrl = dataSource?.data?.url.replace(
		urlMatch?.[1],
		`/${ownProps.confidence}`
	);
	return {
		url: newWmsUrl,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
