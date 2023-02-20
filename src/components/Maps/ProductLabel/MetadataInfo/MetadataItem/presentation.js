// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {isArray as _isArray} from 'lodash';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import WmsUrl from './WmsUrl';
import ConfidenceWmsUrl from './ConfidenceWmsUrl';

import './style.scss';
import {useState} from 'react';

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

MetadataInfoItemRec.propTypes = {
	children: PropTypes.node,
	label: PropTypes.string,
	small: PropTypes.bool,
};

const MetadataInfoItem = ({productMetadata, productTemplate}) => {
	const [showAllTiles, setShowAllTiles] = useState(true);
	const {
		isGlobal,
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
		merged,
		dataSource,
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
					{productName} {!isGlobal ? `- zone ${aez}` : null} - season {season}
				</h4>
			</div>
			<div className="worldCereal-MetadataInfoItemBasics">
				{tiles ? (
					<MetadataInfoItemRec label="Tile collection ID">
						{id}
					</MetadataInfoItemRec>
				) : merged?.id ? (
					<MetadataInfoItemRec label="ID">{merged.id}</MetadataInfoItemRec>
				) : null}
				<MetadataInfoItemRec label="product">{productName}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="season">{season}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="start of season">{sos}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="end of season">{eos}</MetadataInfoItemRec>
				{!isGlobal ? (
					<MetadataInfoItemRec label="zone (AEZ)">{aez}</MetadataInfoItemRec>
				) : null}
				{!isGlobal ? (
					<MetadataInfoItemRec label="zone group">
						{aez_group}
					</MetadataInfoItemRec>
				) : null}
				<MetadataInfoItemRec label="public">{isPublic}</MetadataInfoItemRec>
				{!isGlobal ? (
					<MetadataInfoItemRec label="model">{model}</MetadataInfoItemRec>
				) : null}
			</div>
			<div className="worldCereal-MetadataInfoItemUrl">
				<MetadataInfoItemRec label="product wms url">
					<WmsUrl spatialDataSourceKey={dataSource.product} />
				</MetadataInfoItemRec>
				<MetadataInfoItemRec label="confidence wms url">
					<ConfidenceWmsUrl
						spatialDataSourceKey={dataSource.product}
						confidence={dataSource.confidence}
					/>
				</MetadataInfoItemRec>
			</div>
			{!isGlobal ? (
				tiles ? (
					<div className="worldCereal-MetadataInfoItemTiles">
						<MetadataInfoItemRec
							label={'Original data for S2 tiles (' + tiles.length + ')'}
						>
							<a
								key={tiles[0].tile}
								target="_blank"
								rel="noopener noreferrer"
								className="worldCereal-MetadataInfoItemTiles-content"
							>
								{tiles[0].tile}
							</a>
						</MetadataInfoItemRec>
						{!showAllTiles
							? tiles.map((tile, index) =>
									index > 0 ? (
										<a
											key={tile.tile}
											target="_blank"
											rel="noopener noreferrer"
											className="worldCereal-MetadataInfoItemTiles-content"
										>
											{tile.tile}
										</a>
									) : null
							  )
							: null}
						<div
							className="worldCereal-MetadataInfoItemTiles-BtnShowTiles"
							style={
								showAllTiles
									? {transform: 'rotate(0deg)'}
									: {transform: 'rotate(180deg)'}
							}
						>
							<IconTool
								icon={'ri-read-more'}
								tooltip={{
									text: showAllTiles ? 'Show all' : '',
									position: 'right',
									component: Tooltip,
								}}
								onClick={() => setShowAllTiles(!showAllTiles)}
							/>
						</div>
					</div>
				) : (
					<div className="worldCereal-MetadataInfoItemTiles">
						<MetadataInfoItemRec label="Download original data">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={merged?.product}
								className="worldCereal-MetadataInfoItemTiles-content"
							>
								{merged?.id}
							</a>
						</MetadataInfoItemRec>
					</div>
				)
			) : null}
		</div>
	);
};

MetadataInfoItem.propTypes = {
	productMetadata: PropTypes.object,
	productTemplate: PropTypes.object,
};

export default MetadataInfoItem;
