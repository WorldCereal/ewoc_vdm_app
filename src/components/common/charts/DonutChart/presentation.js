import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ResponsivePie} from '@nivo/pie';

import './style.scss';

const CenteredMetric = ({dataWithArc, centerX, centerY, style}) => {
	const value = dataWithArc?.[0]?.formattedValue;
	return (
		<text
			x={centerX}
			y={centerY}
			textAnchor="middle"
			dominantBaseline="central"
			style={style}
		>
			{value ? `${value} %` : ''}
		</text>
	);
};

CenteredMetric.propTypes = {
	dataWithArc: PropTypes.array,
	centerX: PropTypes.number,
	centerY: PropTypes.number,
	style: PropTypes.object,
};

const DonutChart = ({
	onMount,
	onUnmount,
	data,
	metadata,
	selectedFeatureKeys,
	onSelectedFeaturesChange,
}) => {
	const {settings, options} = metadata;

	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount(selectedFeatureKeys); // TODO is this common?
		}
		if (typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	useEffect(() => {
		onSelectedFeaturesChange(selectedFeatureKeys);
	}, [selectedFeatureKeys]);

	if (options?.oneValue && options?.valuesAsPercentage) {
		return (
			<ResponsivePie
				data={data || []}
				tooltip={() => {}}
				layers={[
					'arcs',
					props => <CenteredMetric style={options.centeredMetric} {...props} />,
				]}
				colors={datum => datum.data.color || 'var(--accent70)'}
				animate={false}
				{...settings}
			/>
		);
	} else {
		return <ResponsivePie data={data || []} tooltip={() => {}} {...settings} />;
	}
};

DonutChart.propTypes = {
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	data: PropTypes.array,
	metadata: PropTypes.object,
	selectedFeatureKeys: PropTypes.array,
	onSelectedFeaturesChange: PropTypes.func,
};

export default DonutChart;
