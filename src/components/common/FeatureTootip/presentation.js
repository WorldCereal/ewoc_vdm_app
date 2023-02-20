import './style.scss';
import {useEffect} from 'react';
import {map as _map} from 'lodash';
import PropTypes from 'prop-types';

const FeatureTooltip = ({
	attributesMetadata,
	attributes,
	featureKey,
	nameAttributeKey,
	onMount,
	onUnmount,
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount();
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	if (attributes && attributesMetadata) {
		const properties = {...attributes};
		const name = properties[nameAttributeKey];
		delete properties[nameAttributeKey];

		return (
			<div className="ptr-FeatureTooltip-content">
				<div className="ptr-FeatureTooltip-header">{`${name} (${featureKey})`}</div>
				<div className="ptr-FeatureTooltip-body">
					{_map(properties, (value, key) => {
						const attributeMetadata = attributesMetadata[key];
						if (attributeMetadata) {
							return (
								<div key={key} className="ptr-FeatureTooltip-item">{`${
									attributeMetadata?.data?.nameDisplay
								}: ${value} ${attributeMetadata?.data?.unit || null}`}</div>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

FeatureTooltip.propTypes = {
	attributesMetadata: PropTypes.object,
	attributes: PropTypes.object,
	featureKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	nameAttributeKey: PropTypes.string,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default FeatureTooltip;
