import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import ComponentRenderer from '../ComponentRenderer';

const AddMapControl = ({addMap, mapMode, maps, maxMapsCount}) => {
	return (
		<ComponentRenderer
			component={'addMap'}
			configurationGroupKey={'mapSetTools'}
		>
			<IconTool
				tooltip={{text: 'Add map', position: 'left', component: Tooltip}}
				disabled={maps?.length >= maxMapsCount || mapMode === 'compare'}
				onClick={() => addMap()}
				floating
				medium
				icon="ri-add-map"
			/>
		</ComponentRenderer>
	);
};

AddMapControl.propTypes = {
	addMap: PropTypes.func,
	mapMode: PropTypes.string,
	maps: PropTypes.array,
	maxMapsCount: PropTypes.number,
};

export default AddMapControl;
