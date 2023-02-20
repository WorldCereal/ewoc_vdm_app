import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import MapLegendTitle from '../components/MapLegendTitle';
import MapLegendContent from '../components/MapLegendContent';
import NoData from '../components/NoData';
import MapLegendAttributeClasses from '../components/MapLegendAttributeClasses';
import MapLegendAttributeScale from '../components/MapLegendAttributeScale';
import MapLegendAttributeValues from '../components/MapLegendAttributeValues';
import './style.scss';

const MapLegendType = ({isExpanded, attributeStyle}) => {
	if (attributeStyle?.attributeClasses) {
		return (
			<MapLegendAttributeClasses
				isExpanded={isExpanded}
				intervals={attributeStyle?.attributeClasses}
			/>
		);
	} else if (attributeStyle?.attributeScale) {
		return (
			<MapLegendAttributeScale
				isExpanded={isExpanded}
				values={attributeStyle?.attributeScale}
			/>
		);
	} else if (attributeStyle?.attributeValues) {
		return (
			<MapLegendAttributeValues
				isExpanded={isExpanded}
				values={attributeStyle?.attributeValues}
			/>
		);
	} else {
		return null;
	}
};

MapLegendType.propTypes = {
	isExpanded: PropTypes.bool,
	attributeStyle: PropTypes.object,
};

const StyleBasedLegend = ({
	attributeStyle,
	attributeMetadata,
	baseStyle,
	styleKey,
	title,
	unit,
	noData = true,
	onAttributeChange,
	onStyleChange,
	expandable = true,
}) => {
	const attributeKey = attributeStyle?.attributeKey;
	const [isExpanded, setExpanded] = useState(false);
	const classes = classNames('worldCereal-StyleBasedLegend', {
		'is-expanded': isExpanded,
		expandable: expandable,
	});

	useEffect(() => {
		if (attributeKey && onAttributeChange) {
			onAttributeChange(attributeKey);
		}
	}, [attributeKey]);

	useEffect(() => {
		if (styleKey && onStyleChange) {
			onStyleChange(styleKey);
		}
	}, [styleKey]);

	return (
		<div
			data-tour="map-legend"
			className={classes}
			onClick={() => (expandable ? setExpanded(!isExpanded) : null)}
		>
			<MapLegendTitle unit={unit || attributeMetadata?.data?.unit}>
				{title || attributeMetadata?.data?.nameDisplay}
			</MapLegendTitle>
			<MapLegendContent isExpanded={isExpanded}>
				<MapLegendType
					isExpanded={isExpanded}
					attributeStyle={attributeStyle}
				/>
				{noData ? <NoData style={baseStyle} /> : null}
			</MapLegendContent>
		</div>
	);
};

StyleBasedLegend.propTypes = {
	attributeMetadata: PropTypes.object,
	attributeStyle: PropTypes.object,
	baseStyle: PropTypes.object,
	styleKey: PropTypes.string,
	onAttributeChange: PropTypes.func,
	onStyleChange: PropTypes.func,
	noData: PropTypes.bool,
	title: PropTypes.string,
	unit: PropTypes.string,
	expandable: PropTypes.bool,
};

export default StyleBasedLegend;
