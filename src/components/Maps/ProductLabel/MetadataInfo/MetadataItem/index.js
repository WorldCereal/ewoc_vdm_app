import {connect} from '@gisatcz/ptr-state';

import Presentation from './presentation';
import Select from '../../../../../state/Select';

const mapStateToProps = (state, ownProps) => {
	return {
		productTemplate: Select.worldCereal.getProductTemplateByKey(
			state,
			ownProps.productMetadata?.product
		),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
