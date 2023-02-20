import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Select from '../../../../../state/Select';
import Action from '../../../../../state/Action';
import {STATISTICSLAYERKEY} from '../../../../../constants/app';

const componentId = 'StyleBasedLegend';

const mapStateToProps = (state, ownProps) => {
	let styleKey;
	if (ownProps.styleKey) {
		styleKey = ownProps.styleKey;
	} else {
		styleKey = Select.worldCereal.statistics.getStyleKeyForActiveMapAndLayerKey(
			state,
			ownProps.mapKey,
			STATISTICSLAYERKEY
		);
	}

	let style;
	if (ownProps.style) {
		style = ownProps.style;
	} else {
		style = styleKey ? Select.styles.getByKey(state, styleKey) : null;
	}

	return {
		styleKey,
		baseStyle: style?.data?.definition?.rules?.[0]?.styles[0],
		attributeStyle: style?.data?.definition?.rules?.[0]?.styles[1],
		attributeMetadata: style?.data?.definition?.rules?.[0]?.styles[1]
			?.attributeKey
			? Select.attributes.getByKey(
					state,
					style?.data?.definition?.rules?.[0]?.styles[1]?.attributeKey
			  )
			: null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAttributeChange: attributeKey => {
			dispatch(Action.attributes.useKeys([attributeKey], componentId));
		},
		onStyleChange: styleKey => {
			dispatch(Action.styles.useKeys([styleKey], componentId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
