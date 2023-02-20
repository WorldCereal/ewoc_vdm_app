// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import MetadataInfoItem from './MetadataItem';

import './style.scss';

export const MetadataInfoTitle = ({isGlobal}) => {
	return isGlobal ? (
		<h3 className="worldCereal-MetadataInfoTitle">Product metadata</h3>
	) : (
		<h3 className="worldCereal-MetadataInfoTitle">Tile collection metadata</h3>
	);
};

MetadataInfoTitle.propTypes = {
	isGlobal: PropTypes.bool,
};

const MetadataInfo = ({productMetadata}) => {
	if (productMetadata.length) {
		return (
			<div className="worldCereal-MetadataInfo">
				{productMetadata.map(productMetadataItem => {
					return (
						<MetadataInfoItem
							key={productMetadataItem.key}
							productMetadata={productMetadataItem?.data}
						/>
					);
				})}
			</div>
		);
	} else {
		return null;
	}
};

MetadataInfo.propTypes = {
	productMetadata: PropTypes.array,
};

export default MetadataInfo;
