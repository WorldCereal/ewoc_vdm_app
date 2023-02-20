// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	ReactCompareSlider,
	ReactCompareSliderHandle,
} from 'react-compare-slider';
import {MapSet, PresentationMap, DeckGlMap} from '@gisatcz/ptr-maps';
import MapAttribution from './MapAttribution';
import MapContainer from './MapContainer';
import MapSetContainer from './MapSetContainer';
import MapWrapper from './MapWrapper';

import ZoomControls from './ZoomControls';
import MapComponentsGroup from './MapComponentsGroup';
import LayersControl from './LayersControl';
import Scale from './Scale';
import OverviewMap from './OverviewMap';
import CompareMapsControl from './CompareMapsControl';
import AddMapControl from './AddMapControl';
import SearchPlaceControl from './SearchPlaceControl';
import StyleBasedLegend from '../common/maps/MapLegends/StyleBasedLegend';

import MapTooltip from './MapTooltip';
import GetFeatureInfoTooltipContent from './RasterTooltipContent';

import {MAX_MAPS_IN_MAP_SET} from '../../constants/app';

import './style.scss';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = MapSetContainer(MapSet);

const Map = MapContainer(PresentationMap);

const Tooltip = props => {
	return (
		<MapTooltip {...props}>
			<GetFeatureInfoTooltipContent />
		</MapTooltip>
	);
};

const Maps = ({
	mode,
	mapSetKey,
	maps,
	viewLimits,
	view,
	noDataForCurrentSettings,
}) => {
	const componentsByLayer = !noDataForCurrentSettings
		? [
				{
					layerKey: 'statistics-global',
					legend: {
						component: StyleBasedLegend,
					},
				},
		  ]
		: null;

	const attributionScaleContainerClasses = classnames(
		'worldCereal-AttributionScaleContainer',
		{
			'is-shifted': view?.data?.nameInternal !== 'statistics',
		}
	);

	return mode === 'compare' ? (
		<ReactCompareSlider
			onlyHandleDraggable
			handle={
				<ReactCompareSliderHandle
					buttonStyle={{position: 'absolute', top: 'calc(50% - 30px)'}}
				/>
			}
			className="worldCereal-CompareSlider"
			itemOne={
				<Map
					wrapper={MapWrapper}
					wrapperProps={{noTools: true, componentsByLayer}}
					mapComponent={DeckGlMap}
					stateMapKey={maps[0].key}
					Tooltip={Tooltip}
					tooltipProps={{}}
				/>
			}
			itemTwo={
				<Map
					wrapper={MapWrapper}
					wrapperProps={{labelsRight: true, noTools: true, componentsByLayer}}
					mapComponent={DeckGlMap}
					stateMapKey={maps[1].key}
					Tooltip={Tooltip}
					tooltipProps={{}}
				>
					<MapComponentsGroup className="worldCereal-MapInfoElements">
						<OverviewMap overviewMapKey="overview" />
						<MapComponentsGroup className={attributionScaleContainerClasses}>
							<MapAttribution mapSetKey={mapSetKey} />
							<Scale />
						</MapComponentsGroup>
					</MapComponentsGroup>
					<MapComponentsGroup className="worldCereal-MapSetControls">
						<SearchPlaceControl mapSetKey={mapSetKey} />
						<AddMapControl
							mapSetKey={mapSetKey}
							maxMapsCount={MAX_MAPS_IN_MAP_SET}
						/>
						<CompareMapsControl mapSetKey={mapSetKey} />
						<LayersControl mapSetKey={mapSetKey} />
						<ZoomControls viewLimits={viewLimits} />
					</MapComponentsGroup>
				</Map>
			}
		/>
	) : (
		<ConnectedMapSet
			Tooltip={Tooltip}
			tooltipProps={{
				width: 350,
			}}
			stateMapSetKey={mapSetKey}
			mapComponent={DeckGlMap}
			connectedMapComponent={ConnectedMap}
			wrapper={MapWrapper}
			wrapperProps={{
				componentsByLayer,
			}}
		>
			<MapComponentsGroup className="worldCereal-MapSetControls">
				<SearchPlaceControl mapSetKey={mapSetKey} />
				<AddMapControl
					mapSetKey={mapSetKey}
					maxMapsCount={MAX_MAPS_IN_MAP_SET}
				/>
				<CompareMapsControl mapSetKey={mapSetKey} />
				<LayersControl mapSetKey={mapSetKey} />
				<ZoomControls viewLimits={viewLimits} />
			</MapComponentsGroup>
			<MapComponentsGroup className="worldCereal-MapInfoElements">
				<OverviewMap overviewMapKey="overview" />
				<MapComponentsGroup className={attributionScaleContainerClasses}>
					<MapAttribution mapSetKey={mapSetKey} />
					<Scale />
				</MapComponentsGroup>
			</MapComponentsGroup>
		</ConnectedMapSet>
	);
};

Maps.propTypes = {
	mode: PropTypes.string,
	maps: PropTypes.array,
	mapSetKey: PropTypes.string,
	viewLimits: PropTypes.object,
	view: PropTypes.object,
	noDataForCurrentSettings: PropTypes.bool,
};

export default Maps;
