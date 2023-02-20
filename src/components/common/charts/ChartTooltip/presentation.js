import './style.scss';
import {useEffect, useState} from 'react';
import {map as _map} from 'lodash';
import PropTypes from 'prop-types';

const ChartTooltip = ({
	attributesMetadata,
	attributes,
	featureKey,
	name,
	onMount,
	onUnmount,
}) => {
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount();

			// prevent ugly positioning flashing
			setTimeout(() => {
				setOpacity(1);
			}, 50);
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	if (attributes && attributesMetadata) {
		return (
			<div className="ptr-ChartTooltip-content" style={{opacity}}>
				<div className="ptr-ChartTooltip-header">{`${name} (${featureKey})`}</div>
				<div className="ptr-ChartTooltip-body">
					{_map(attributes, (value, key) => {
						const attributeMetadata = attributesMetadata[key];
						const formattedValue =
							value % 1 === 0 ? value.toLocaleString() : value;
						if (attributeMetadata) {
							return (
								<div key={key} className="ptr-ChartTooltip-item">
									<div className="ptr-ChartTooltip-item-attribute">{`${attributeMetadata?.data?.nameDisplay}: `}</div>
									<div className="ptr-ChartTooltip-item-value">
										{`${formattedValue} ${
											attributeMetadata?.data?.unit || null
										}`}
									</div>
								</div>
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

ChartTooltip.propTypes = {
	attributesMetadata: PropTypes.object,
	attributes: PropTypes.object,
	featureKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	name: PropTypes.string,
	id: PropTypes.string,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default ChartTooltip;
