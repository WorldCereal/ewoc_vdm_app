import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactResizeDetector from 'react-resize-detector';

import {utils} from '@gisatcz/ptr-utils';
import {
	Timeline,
	Overlay,
	TimeLineHover,
	HoverHandler,
	position,
	utils as timelineUtils,
} from '@gisatcz/ptr-timeline';
import XAxis from './XAxis';
import MapTimelineLegend from './MapTimelineLegend';
import './style.scss';

const {getIntersectionOverlays, overlap} = timelineUtils.overlays;
const CONTROLS_WIDTH = 0;
const TOOLTIP_PADDING = 5;
const MOUSEBUFFERWIDTH = 20;
const MIN_TIMELINE_HEIGHT = 8;
const {getTootlipPosition} = position;

const getOverlayCfg = options => {
	const otherOptions = options.options || {};
	return {
		key: options.key,
		layerTemplateKey: options.layerTemplateKey,
		start: moment(options.period.start),
		end: moment(options.period.end),
		period: options.period,
		periodIndex: options.periodIndex,
		backdroundColor: options.backdroundColor,
		hideLabel: options.hideLabel,
		height: options.height,
		top: options.top,
		// label: options.title, //label for tooltip
		title: options.title, //label for tooltip
		subtitle: options.subtitle, //label for tooltip
		options: {
			...otherOptions,
		},
	};
};

const proccessLayerCfg = (layerCfg, top, rowHeight) => {
	if (layerCfg && layerCfg.period && layerCfg.period.length > 0) {
		const otherOptions = layerCfg.options || {};
		const cfgs = layerCfg.period.map((period, index) => {
			return getOverlayCfg({
				key: `${layerCfg.key}-${index}`,
				layerTemplateKey: layerCfg.layerTemplateKey,
				period: period,
				periodIndex: index,
				backdroundColor:
					layerCfg.active && layerCfg.activePeriodIndex === index
						? layerCfg.activeColor
						: layerCfg.color,
				hideLabel: true,
				height: rowHeight * utils.getRemSize(),
				top: top * utils.getRemSize(),
				title: layerCfg.title,
				subtitle: layerCfg.subtitle,
				options: {
					...otherOptions,
				},
			});
		});
		return cfgs;
	} else if (layerCfg.period && layerCfg.period.start && layerCfg.period.end) {
		const otherOptions = layerCfg.options || {};
		const cfg = getOverlayCfg({
			key: layerCfg.key,
			layerTemplateKey: layerCfg.layerTemplateKey,
			period: layerCfg.period,
			periodIndex: 0,
			backdroundColor: layerCfg.active ? layerCfg.activeColor : layerCfg.color,
			label: layerCfg.title,
			hideLabel: true,
			height: rowHeight * utils.getRemSize(),
			top: top * utils.getRemSize(),
			title: layerCfg.title,
			subtitle: layerCfg.subtitle,
			options: {
				// classes: 'overlay5',
				...otherOptions,
			},
		});

		return [cfg];
	} else {
		return [];
	}
};

const getOverlaysCfg = layers => {
	const LINEHEIGHT = 1;
	const ROWHEIGHT = 0.6; //in rem
	let line = -1;
	let PADDING = (LINEHEIGHT - ROWHEIGHT) / 2;
	layers.sort((a, b) => {
		let aZIndex = 0;
		if (a.length > 0) {
			aZIndex = a[0].zIndex;
		} else {
			aZIndex = a.zIndex;
		}

		let bZIndex = 0;
		if (b.length > 0) {
			bZIndex = b[0].zIndex;
		} else {
			bZIndex = b.zIndex;
		}
		return aZIndex - bZIndex;
	});

	let lastZIndex = layers?.[0]?.zIndex || 0;

	let top = PADDING;
	return layers.reduce((acc, layerCfg) => {
		// if (lastZIndex !== layerCfg.zIndex) {
		// 	line = line + 1;
		// 	lastZIndex = layerCfg.zIndex;
		// 	//todo rem
		// 	// fixme
		// 	top = line * LINEHEIGHT + PADDING;
		// }

		if (layerCfg && layerCfg.length > 0) {
			line = line + 1;
			top = line * LINEHEIGHT + PADDING;
			let lcfgs = [];
			layerCfg.forEach(
				lcfg => (lcfgs = [...lcfgs, ...proccessLayerCfg(lcfg, top, ROWHEIGHT)])
			);
			return [...acc, ...lcfgs];
		} else {
			line = line + 1;
			top = line * LINEHEIGHT + PADDING;
			return [...acc, ...proccessLayerCfg(layerCfg, top, ROWHEIGHT)];
		}
	}, []);
};

class MapTimeline extends React.PureComponent {
	static propTypes = {
		periodLimit: PropTypes.shape({
			start: PropTypes.string,
			end: PropTypes.string,
		}).isRequired,
		period: PropTypes.shape({
			start: PropTypes.string,
			end: PropTypes.string,
		}),
		dayWidth: PropTypes.number,
		centerTime: PropTypes.func,
		contentHeight: PropTypes.number, //Default contentHeight is calculated fron layers count
		width: PropTypes.number,
		height: PropTypes.number,

		onHover: PropTypes.func,
		onClick: PropTypes.func,

		periodLimitOnCenter: PropTypes.bool,
		vertical: PropTypes.bool,

		levels: PropTypes.arrayOf(
			PropTypes.shape({
				end: PropTypes.number,
				level: PropTypes.string,
			})
		), //ordered levels by higher level.end
		onChange: PropTypes.func,
		selectMode: PropTypes.bool, //whether change time while zoom
		//MapTimeline specific
		onLayerClick: PropTypes.func,
		layers: PropTypes.array, //which layers display in timeline
		legend: PropTypes.bool, //Display legend part on left side in horizontal view
	};

	static defaultProps = {
		dayWidth: 1.5,
		onHover: () => {},
		onClick: () => {},
		onLayerClick: () => {},
		width: 100,
		height: 100,
		selectMode: false,
		vertical: false,
		layers: [],
		legend: false,
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.getHorizontalTootlipStyle = this.getHorizontalTootlipStyle.bind(this);
		this.getX = this.getX.bind(this);
		this.getHoverContent = this.getHoverContent.bind(this);
		this.wrapperRef = React.createRef();
		this.state = {
			period: {start: new Date(), end: new Date()},
			dayWidth: null,
			timelineWidth: null,
		};
	}

	getZIndexCount(layers) {
		const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

		//merge layers on same level
		let lastZIndex = -1;
		const layersCount = sortedLayers.reduce((acc, layer) => {
			if (lastZIndex < layer.zIndex) {
				lastZIndex = layer.zIndex;
				return acc + 1;
			} else {
				return acc;
			}
		}, 0);

		return layersCount;
	}

	onChange(change) {
		const update = {};
		if (change.dayWidth !== this.state.dayWidth) {
			update.dayWidth = change.dayWidth;
		}
		if (change.period !== this.state.period) {
			update.period = change.period;
		}
		if (change.activeLevel !== this.state.activeLevel) {
			update.activeLevel = change.activeLevel;
		}
		this.setState(update);
	}

	getX(date) {
		date = moment(date);
		let diff = date.unix() - moment(this.state.period.start).unix();
		let diffDays = diff / (60 * 60 * 24);
		return diffDays * this.state.dayWidth;
	}

	getHoverContent(x, time, evt) {
		const {layers} = this.props;
		const overlays = getOverlaysCfg(layers);
		let intersectionOverlays = getIntersectionOverlays(
			time,
			overlays,
			// MOUSEBUFFERWIDTH,
			0,
			evt.dayWidth
		);

		const clientY = evt.clientY;

		intersectionOverlays.sort((a, b) => a.top - b.top);
		intersectionOverlays = intersectionOverlays.filter(
			i => i.top <= clientY && i.top + 16 >= clientY
		);
		const intersectionOverlaysElms = intersectionOverlays.map(overlay => {
			return (
				<div key={overlay.key} className={'ptr-timeline-tooltip-layer'}>
					<div>
						<span
							className="dot"
							style={{backgroundColor: overlay.backdroundColor}}
						></span>
					</div>
					<div>
						<div>
							<em>{overlay.title}</em> {overlay.subtitle}
						</div>
						<div>{`${overlay.period.start} / ${overlay.period.end}`}</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				<div className={'ptr-timeline-tooltip-time'}>
					<b>{`${time.format('YYYY')}`}</b>-<b>{`${time.format('MM')}`}</b>-
					<b>{`${time.format('DD')}`}</b>
				</div>
				{intersectionOverlaysElms}
			</div>
		);
	}

	getHorizontalTootlipStyle() {
		const referencePoint = 'center';

		return () => {
			const windowScrollTop = window.document.documentElement.scrollTop;
			const windowScrollLeft = window.document.documentElement.scrollLeft;
			const windowHeight = window.document.documentElement.clientHeight;
			const windowWidth = window.document.documentElement.clientWidth;
			const windowBBox = [
				windowScrollTop,
				windowScrollLeft + windowWidth,
				windowScrollTop + windowHeight,
				windowScrollLeft,
			];
			// return (position,origPosX,origPosY,width,height,hoveredElemen) => {
			return (origPosX, origPosY, width, height, hoveredElemen) => {
				const position = getTootlipPosition(
					referencePoint,
					['bottom', 'top'],
					windowBBox,
					TOOLTIP_PADDING
				)(origPosX, origPosY, width, height, this.wrapperRef.current);
				return {top: position.top, left: position.left};
			};
		};
	}

	render() {
		const {
			levels,
			periodLimit,
			onHover,
			onClick,
			onChange,
			vertical,
			children,
			periodLimitOnCenter,
			selectMode,
			contentHeight,
			onLayerClick,
			layers,
			legend,
		} = this.props;

		const overlays = getOverlaysCfg(layers);
		// const contentHeightByLayers =
		// 	(this.getZIndexCount(layers) + 1) * utils.getRemSize();
		const contentHeightByLayers = layers.length * utils.getRemSize();
		const minTimelineHeight = MIN_TIMELINE_HEIGHT * utils.getRemSize();
		let childArray = React.Children.toArray(children);
		childArray = [
			...childArray,
			<Overlay key={'layers'} overlays={overlays} onClick={onLayerClick} />,
		];

		return (
			<div ref={this.wrapperRef}>
				<XAxis
					period={this.state.period}
					getX={this.getX}
					dayWidth={this.state.dayWidth}
					vertical={vertical}
					activeLevel={this.state.activeLevel}
					passedWidth={this.state.timelineWidth}
				/>
				<div className={'ptr-maptimeline-scrollable'}>
					<div className={'ptr-maptimeline'}>
						{legend && !vertical ? <MapTimelineLegend layers={layers} /> : null}
						<div className={'ptr-timeline'}>
							<ReactResizeDetector
								handleWidth
								skipOnMount={false}
								onResize={width => {
									this.setState({timelineWidth: width});
								}}
							>
								<HoverHandler getStyle={this.getHorizontalTootlipStyle()}>
									<TimeLineHover getHoverContent={this.getHoverContent}>
										<Timeline
											periodLimit={periodLimit}
											periodLimitOnCenter={periodLimitOnCenter}
											onChange={this.onChange}
											onHover={onHover}
											onClick={onClick}
											vertical={vertical}
											levels={levels}
											contentHeight={Math.max(
												contentHeightByLayers,
												minTimelineHeight
											)}
											// contentHeight={200}
											selectMode={selectMode}
										>
											{childArray}
										</Timeline>
									</TimeLineHover>
								</HoverHandler>
							</ReactResizeDetector>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MapTimeline;
