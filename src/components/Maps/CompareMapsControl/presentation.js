import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import ComponentRenderer from '../ComponentRenderer';

const CompareMapsControl = ({maps, mapMode, setMapMode}) => {
	return (
		<ComponentRenderer
			component={'compareMaps'}
			configurationGroupKey={'mapSetTools'}
		>
			<IconTool
				tooltip={{text: 'Compare mode', position: 'left', component: Tooltip}}
				active={mapMode === 'compare'}
				onClick={() => setMapMode(mapMode === 'compare' ? 'set' : 'compare')}
				disabled={maps?.length !== 2}
				floating
				medium
				icon="ri-compare"
			/>
		</ComponentRenderer>
	);
};

CompareMapsControl.propTypes = {
	maps: PropTypes.array,
	mapMode: PropTypes.string,
	setMapMode: PropTypes.func,
};

export default CompareMapsControl;
