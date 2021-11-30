import React from 'react';
import PropTypes from 'prop-types';
import MetadataInfoItem from './MetadataItem';

import './style.scss';

export const MetadataInfoTitle = () => (
	<h3 className="worldCereal-MetadataInfoTitle">Tile collection metadata</h3>
);

class MetadataInfo extends React.PureComponent {
	static propTypes = {
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {productMetadata} = this.props;

		if (productMetadata.length) {
			return (
				<div className="worldCereal-MetadataInfo">
					{productMetadata.map(productMetadataItem => {
						return (
							<MetadataInfoItem productMetadata={productMetadataItem?.data} />
						);
					})}
				</div>
			);
		} else {
			return null;
		}
	}
}

export default MetadataInfo;
