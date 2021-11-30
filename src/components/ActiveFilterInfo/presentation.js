import React from 'react';
import classnames from 'classnames';
import {Button} from '@gisatcz/ptr-atoms';
import {MIN_FILTER_PARAMETER_VALUES_FOR_GROUPING} from '../../constants/app';
import RemovableLabel, {RemovableLabelContainer} from '../atoms/RemovableLabel';

import './style.scss';

const FilterParameterLabels = ({
	parameter,
	onValueRemove,
	onAllValuesRemove,
}) => {
	const numOfLabels = parameter.values.length;

	if (numOfLabels >= MIN_FILTER_PARAMETER_VALUES_FOR_GROUPING) {
		return (
			<RemovableLabel
				key={parameter.parameter.key}
				small
				onRemove={e => {
					e.stopPropagation();
					onAllValuesRemove(parameter.parameter.key);
				}}
			>
				{`${numOfLabels} ${parameter.parameter.name}s`}
			</RemovableLabel>
		);
	} else {
		return (
			<React.Fragment key={parameter.key}>
				{parameter.values.map(value => {
					const valueKey = value.key || value;
					const valueName = value.data?.nameDisplay || value;

					return (
						<RemovableLabel
							key={valueKey}
							small
							onRemove={e => {
								e.stopPropagation();
								onValueRemove(parameter.parameter.key, valueKey);
							}}
						>
							{parameter.parameter.name}: {valueName}
						</RemovableLabel>
					);
				})}
			</React.Fragment>
		);
	}
};

const ActiveFilterInfo = ({
	activeFilterParameters,
	availableProductMetadata,
	onValueRemove,
	onAllValuesRemove,
	onClearAll,
	isInteractivityLimited,
}) => {
	let numOfFilters = 0;
	if (activeFilterParameters?.length) {
		activeFilterParameters.forEach(item => {
			if (item.values?.length) {
				numOfFilters += item.values.length;
			}
		});
	}

	const classes = classnames('worldCereal-ActiveFilterInfo', {
		disabled: isInteractivityLimited,
	});

	return (
		<div className={classes}>
			<div className="worldCereal-ActiveFilterInfo-summary">
				<em>{availableProductMetadata?.length || 0}</em> filtered product
				{availableProductMetadata?.length > 1 ? 's' : ''}
			</div>
			{activeFilterParameters ? (
				<RemovableLabelContainer className="worldCereal-ActiveFilterInfo-filters">
					{activeFilterParameters.map(parameter => (
						<FilterParameterLabels
							parameter={parameter}
							onValueRemove={onValueRemove}
							onAllValuesRemove={onAllValuesRemove}
						/>
					))}
					{numOfFilters > 1 ? (
						<Button
							icon="times"
							className="worldCereal-ActiveFilterInfo-clearAllButton"
							small
							invisible
							onClick={e => {
								e.stopPropagation();
								onClearAll();
							}}
						>
							Clear all filters
						</Button>
					) : null}
				</RemovableLabelContainer>
			) : null}
		</div>
	);
};

export default ActiveFilterInfo;
