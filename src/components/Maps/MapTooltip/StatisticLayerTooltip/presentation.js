import PropTypes from 'prop-types';
import {useEffect} from 'react';

const StatisticLayerTooltip = ({
	areaShare,
	name,
	// areaTotal,
	ensureAbsoluteData,
	relativeAttributeName,
	onFidChange,
	fid,
	nameAttributeKey,
}) => {
	useEffect(() => {
		ensureAbsoluteData();
	}, [name]);

	useEffect(() => {
		if (!name) {
			onFidChange(fid, nameAttributeKey);
		}
	}, [name, fid, nameAttributeKey]);

	return (
		<div className={'VectorMapTooltip-layer'}>
			<h4>{name}</h4>
			<div>
				{areaShare ? (
					<>
						<div className="VectorMapTooltip-attribute">
							{relativeAttributeName}:{' '}
						</div>
						<div className="VectorMapTooltip-value">{`${areaShare} %`}</div>
					</>
				) : null}
			</div>
			{/* <label>Total area:</label>
			<div>{`${areaTotal} %`}</div> */}
		</div>
	);
};

StatisticLayerTooltip.propTypes = {
	areaShare: PropTypes.number,
	areaTotal: PropTypes.string,
	name: PropTypes.string,
	ensureAbsoluteData: PropTypes.func,
	relativeAttributeName: PropTypes.string,
	onFidChange: PropTypes.func,
	nameAttributeKey: PropTypes.string,
	fid: PropTypes.string,
};

export default StatisticLayerTooltip;
