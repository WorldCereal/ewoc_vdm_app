import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ResponsiveBar} from '@nivo/bar';
import colorUtils from '../../../../utils/colors';
import helpers from '../helpers';
import ChartTooltip from '../ChartTooltip';

import './style.scss';

const BarChart = ({
	onMount,
	onUnmount,
	data,
	metadata,
	selectedFeatureKeys,
	onClick,
	onSelectedFeaturesChange,
}) => {
	const {valueAttributeKeys, settings, options} = metadata;
	const colorMap = colorUtils.getColorMap(valueAttributeKeys);

	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount(selectedFeatureKeys); // TODO is this common?
		}
		if (typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	useEffect(() => {
		if (options?.selectedFeaturesOnly) {
			onSelectedFeaturesChange(selectedFeatureKeys);
		}
	}, [selectedFeatureKeys]);

	const onColumnClick = (chartData, e) => {
		const {data} = chartData;
		const {ctrlKey, metaKey} = e;
		if (data) {
			onClick(
				helpers.getSelectedFeatureKeysOnClick(
					data.key.toString(),
					ctrlKey || metaKey,
					selectedFeatureKeys
				)
			);
		}
	};

	return (
		<ResponsiveBar
			onClick={onColumnClick}
			data={data}
			keys={valueAttributeKeys}
			colors={({indexValue, id}) => {
				if (
					selectedFeatureKeys?.length &&
					indexValue &&
					selectedFeatureKeys.includes(indexValue.toString())
				) {
					return colorMap?.[id]?.highlighted || '#11bda3';
				} else {
					return colorMap?.[id]?.base || '#97e2d5';
				}
			}}
			axisLeft={{
				...settings.axisLeft,
				format: v => {
					const length = settings.margin.left / 7;
					return v.length > length ? (
						<tspan>
							{v.substring(0, length) + '...'}
							<title>{v}</title>
						</tspan>
					) : (
						v
					);
				},
			}}
			tooltip={properties => {
				const data = {...properties.data};
				if (data) {
					const {key, id, name, ...attributes} = data;
					return (
						<ChartTooltip
							attributes={attributes}
							featureKey={key}
							id={id}
							name={name}
						/>
					);
				} else {
					return null;
				}
			}}
			{...settings}
		/>
	);
};

BarChart.propTypes = {
	onClick: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	data: PropTypes.array,
	metadata: PropTypes.object,
	selectedFeatureKeys: PropTypes.array,
	onSelectedFeaturesChange: PropTypes.func,
};

export default BarChart;
