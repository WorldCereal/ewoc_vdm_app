import PropTypes from 'prop-types';
import {PresentationMap, ReactLeafletMap} from '@gisatcz/ptr-maps';
import {connects} from '@gisatcz/ptr-state';
import ComponentRenderer from '../ComponentRenderer';

import './style.scss';

const Map = connects.Map(PresentationMap);

const OverviewMap = ({overviewMapKey}) => {
	const stopPropagation = event => {
		//onwheel still buble
		event.stopPropagation();
		event.preventDefault();
		return false;
	};
	return (
		<ComponentRenderer
			component={'overviewMap'}
			configurationGroupKey={'mapSetTools'}
		>
			<div
				className={'ptr-OverviewMap'}
				onPointerDown={stopPropagation}
				onPointerMove={stopPropagation}
				onPointerUp={stopPropagation}
				onGotPointerCapture={stopPropagation}
				onClick={stopPropagation}
				onDoubleClick={stopPropagation}
				onMouseDown={stopPropagation}
				onMouseUp={stopPropagation}
				onWheel={stopPropagation}
				onScroll={stopPropagation}
				onTouchStart={stopPropagation}
				onTouchMove={stopPropagation}
			>
				<Map mapComponent={ReactLeafletMap} stateMapKey={overviewMapKey} />
			</div>
		</ComponentRenderer>
	);
};

OverviewMap.propTypes = {
	overviewMapKey: PropTypes.string,
};

export default OverviewMap;
