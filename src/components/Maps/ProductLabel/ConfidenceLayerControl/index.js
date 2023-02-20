import PropTypes from 'prop-types';
import {Toggle} from '@gisatcz/ptr-atoms';
import LayerLabelTool from '../LayerLabelTool';

const ConfidenceLayerControl = ({active, onChange}) => {
	return (
		<LayerLabelTool
			title="Confidence layer"
			key="confidence"
			onClick={() => onChange(!active)}
		>
			<Toggle className="ptr-dark" notInteractive on={active} />
		</LayerLabelTool>
	);
};

ConfidenceLayerControl.propTypes = {
	active: PropTypes.bool,
	onChange: PropTypes.func,
};

export default ConfidenceLayerControl;
