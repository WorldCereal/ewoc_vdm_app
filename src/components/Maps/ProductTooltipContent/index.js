import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	const productMetadata = Select.worldCereal.productMetadata.getByKey(
		state,
		ownProps.productKey
	);
	const globalProductMetadata =
		Select.worldCereal.globalProductMetadata.getByKey(
			state,
			ownProps.productKey
		);
	const productTemplate = Select.worldCereal.getProductTemplateByKey(
		state,
		productMetadata?.data?.product || globalProductMetadata?.data?.product
	);
	const value = Select.worldCereal.getProductValue(
		productTemplate?.key,
		ownProps.response.value_list
	);
	return {
		productMetadata: productMetadata || globalProductMetadata,
		productTemplate,
		value,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
