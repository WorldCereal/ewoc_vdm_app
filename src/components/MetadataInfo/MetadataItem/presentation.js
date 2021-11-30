import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {isArray as _isArray} from 'lodash';

import './style.scss';
import {Button, Icon} from '@gisatcz/ptr-atoms';

const MetadataInfoItemRec = ({label, small, children}) => {
	const classes = classnames('worldCereal-MetadataInfoItemRec', {
		small,
	});

	let values = _isArray(children) ? children.join(', ') : children;

	return (
		<div className={classes}>
			<span className="worldCereal-MetadataInfoItemRec-label">{label}: </span>
			<span className="worldCereal-MetadataInfoItemRec-value">
				{values || '-'}
			</span>
		</div>
	);
};

class MetadataInfoItem extends React.PureComponent {
	static propTypes = {
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {productMetadata, productTemplate} = this.props;

		const {
			product,
			season,
			sos,
			eos,
			aez,
			aez_group,
			id,
			model,
			public: isPublic,
			tiles,
		} = productMetadata;

		const productName = productTemplate?.data?.nameDisplay || product;
		const color = productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

		const style = {
			borderColor: color,
		};

		return (
			<div className="worldCereal-MetadataInfoItem" style={style}>
				<div className="worldCereal-MetadataInfoItemHeader">
					<h4 className="worldCereal-MetadataInfoItemHeader-title">
						{productName} - zone {aez} - season {season}
					</h4>
					{/*<div className="worldCereal-MetadataInfoItemHeader-tools">*/}
					{/*	<Button*/}
					{/*		className="worldCereal-MetadataInfoItemHeader-download"*/}
					{/*		ghost*/}
					{/*		small*/}
					{/*		disabled*/}
					{/*		icon="download"*/}
					{/*	>*/}
					{/*		Download*/}
					{/*	</Button>*/}
					{/*</div>*/}
				</div>
				<div className="worldCereal-MetadataInfoItemBasics">
					<MetadataInfoItemRec label="Tile collection ID">
						{id}
					</MetadataInfoItemRec>
					<MetadataInfoItemRec label="product">
						{productName}
					</MetadataInfoItemRec>
					<MetadataInfoItemRec label="season">{season}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="start of season">
						{sos}
					</MetadataInfoItemRec>
					<MetadataInfoItemRec label="end of season">{eos}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="zone (AEZ)">{aez}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="zone group">
						{aez_group}
					</MetadataInfoItemRec>
					<MetadataInfoItemRec label="public">{isPublic}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="model">{model}</MetadataInfoItemRec>
				</div>
				<div className="worldCereal-MetadataInfoItemTiles">
					<div className="worldCereal-MetadataInfoItemTiles-header">
						Original data for S2 tiles:
					</div>
					<div className="worldCereal-MetadataInfoItemTiles-content">
						{tiles.map(tile => (
							<a target="_blank" rel="noopener noreferrer" href={tile.product}>
								{tile.tile}
							</a>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default MetadataInfoItem;
