// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createElement, useEffect} from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';
import {Mouse, Months, Years, MapTimeline} from '@gisatcz/ptr-timeline';
import {connects} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';

import MapTimelineLegend from './MapTimelineLegend';
import TimelineControlButton from '../../common/TimelineControlButton';
import './style.scss';

const MapTimelinePresentation = MapTimeline.MapTimelinePresentation;
const LayerRowPresentation = MapTimeline.LayerRowPresentation;
const LayerRowItemPresentation = MapTimeline.LayerRowItemPresentation;
const LayerRowPeriodItemPresentation =
	MapTimeline.LayerRowPeriodItemPresentation;

const LayerRowComponent = connects.timeline.LayerRow(LayerRowPresentation);
const LayerRowItemComponent = connects.timeline.LayerRowItem(
	LayerRowItemPresentation
);
const LayerRowPeriodItemComponent = connects.timeline.LayerRowPeriodItem(
	LayerRowPeriodItemPresentation
);

const LayerRowItemComponentWrapped = props => (
	<LayerRowItemComponent
		{...props}
		LayerRowPeriodItemComponent={LayerRowPeriodItemComponent}
	/>
);
const LayerRowComponentWrapped = props => (
	<LayerRowComponent
		{...props}
		LayerRowItemComponent={LayerRowItemComponentWrapped}
	/>
);

const timelinePeriod = {
	start: '2020-02-01',
	end: '2022-03-31',
};

const LEVELS = [
	{
		level: 'year',
		end: 2,
	},
	{
		level: 'month',
		end: 5,
	},
];

const MIN_TIMELINE_HEIGHT = 8;

const Levels = ({activeLevel, ...restProps}) => {
	switch (activeLevel) {
		case 'year':
			return createElement(Years, {...restProps, key: 'year'});
		case 'month':
			return createElement(Months, {...restProps, key: 'month'});
	}
	return createElement(Months, {...restProps, key: 'month'});
};
Levels.propTypes = {
	activeLevel: propTypes.string,
};

const getHoverContent = (x, time, evt, hoverContext, layerRows) => {
	const clientY = evt.clientY;

	// remove timeline as a overlay
	const hoveredOverlays = hoverContext?.hoveredItems?.filter(
		i => i.key !== 'timeline'
	);

	let top = 0;
	// select row by mouse position
	const layerRowMouseIntersection = layerRows?.find(layerRow => {
		top = top + (layerRow.lineHeight - layerRow.elementHeight) / 2;
		const layerRowTop = top;
		top = top + layerRow.elementHeight;
		const layerRowBottom = top;
		top = top + (layerRow.lineHeight - layerRow.elementHeight) / 2;
		const mouseIntersectRow =
			layerRowTop <= clientY && layerRowBottom >= clientY;
		return mouseIntersectRow;
	});
	const intersectionOverlaysElms =
		hoveredOverlays?.length > 0 && layerRowMouseIntersection ? (
			<div
				key={hoveredOverlays[0].overlay.key}
				className={'ptr-timeline-tooltip-layer'}
			>
				<div>
					<span
						className="dot"
						style={{
							backgroundColor: layerRowMouseIntersection.items[0].colors.basic,
						}}
					></span>
				</div>
				<div>
					<div>
						<em>{layerRowMouseIntersection.legend.title}</em>{' '}
						{layerRowMouseIntersection.legend.subtitle}
					</div>
					<div>{`${hoveredOverlays[0].overlay?.origin?.originPeriod?.data?.start} / ${hoveredOverlays[0].overlay?.origin?.originPeriod?.data?.end}`}</div>
				</div>
			</div>
		) : null;

	return (
		<div>
			<div className={'ptr-timeline-tooltip-time'}>
				<b>{`${time.format('YYYY')}`}</b>-<b>{`${time.format('MM')}`}</b>-
				<b>{`${time.format('DD')}`}</b>
			</div>
			{intersectionOverlaysElms}
		</div>
	);
};

const minTimelineHeight = MIN_TIMELINE_HEIGHT * utils.getRemSize();

const Timeline = ({
	onLayerClick,
	layers,
	onMount,
	activeMapKey,
	isInteractivityLimited,
	isCollapsed,
	onCollapse,
}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
	});

	const classes = classnames('worldCereal-Timeline', {
		disabled: isInteractivityLimited,
		'is-collapsed': isCollapsed,
	});

	return (
		<div className={classes}>
			<TimelineControlButton collapsed={isCollapsed} onClick={onCollapse} />
			{layers.length > 0 ? (
				<MapTimelinePresentation
					LayerRowComponent={LayerRowComponentWrapped}
					mapKey={activeMapKey}
					getHoverContent={(...rest) => getHoverContent(...rest, layers)}
					onLayerClick={onLayerClick}
					periodLimit={timelinePeriod}
					initPeriod={timelinePeriod}
					vertical={false}
					levels={LEVELS}
					selectMode={true}
					layers={layers}
					minTimelineHeight={minTimelineHeight}
					LegendComponent={MapTimelineLegend}
				>
					<Levels />
					<Mouse mouseBufferWidth={20} key="mouse" />
				</MapTimelinePresentation>
			) : (
				<div className="worldCereal-Timeline-noDataInfo">
					No data in this area.
				</div>
			)}
		</div>
	);
};

Timeline.propTypes = {
	isInteractivityLimited: propTypes.bool,
	activeMapKey: propTypes.string,
	activeLayers: propTypes.array,
	layers: propTypes.array,
	onLayerClick: propTypes.func,
	onMount: propTypes.func,
	onCollapse: propTypes.func,
	isCollapsed: propTypes.bool,
};

export default Timeline;
