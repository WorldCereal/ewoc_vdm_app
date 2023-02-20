// eslint-disable-next-line no-unused-vars
import React from 'react';
import {isEmpty as _isEmpty, forIn as _forIn} from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import ExpandableLabelsContainer from '../../atoms/ExpandableLabel/ExpandableLabelsContainer';
import ExpandableProductLabel from '../ProductLabel';
import ExpandableLayerLabel from '../ExpandableLayerLabel';
import MapLegends from '../../common/maps/MapLegends/';
import {MIN_PRODUCT_MAP_LABELS_FOR_GROUPING} from '../../../constants/app';

import './style.scss';

const MapWrapper = ({
	children,
	mapKey,
	activeMapKey,
	removeMap,
	mapSetMapKeys,
	productsMetadata,
	removeAllLayers,
	toggleDataQuery,
	dataQueryActive,
	noTools,
	labelsRight,
	overlayLayer,
	componentsByLayer,
	layersState,
	showRemoveAllLayers,
}) => {
	const wrapperClasses = classnames('ptr-map-wrapper worldCereal-MapWrapper', {
		active: mapKey === activeMapKey,
		'one-map': mapSetMapKeys?.length === 1,
	});

	const labelContainerClasses = classnames(
		'worldCereal-MapProductLabelContainer',
		{
			'is-right': labelsRight,
		}
	);

	const noMetadata = _isEmpty(productsMetadata);

	const renderMapProductLabel = (key, productKey, productMetadata) => {
		const productMetadataKeys = productMetadata.map(item => item.key);

		return (
			<ExpandableProductLabel
				key={key}
				productKey={productKey}
				productMetadataKeys={productMetadataKeys}
				productMetadata={productMetadata}
				mapKey={mapKey}
			/>
		);
	};

	const renderMapOverlayLayerLabel = layer => {
		return <ExpandableLayerLabel key={'key'} layer={layer} mapKey={mapKey} />;
	};

	const renderMapProductLabels = productsMetadata => {
		let labels = [];
		_forIn(productsMetadata, (models, product) => {
			if (models.length >= MIN_PRODUCT_MAP_LABELS_FOR_GROUPING) {
				labels.push(renderMapProductLabel(product, product, models));
			} else {
				models.forEach(model => {
					labels.push(renderMapProductLabel(model.key, product, [model]));
				});
			}
		});

		return labels.length ? labels : null;
	};

	return (
		<div className={wrapperClasses}>
			{!noMetadata || overlayLayer ? (
				<ExpandableLabelsContainer className={labelContainerClasses}>
					{noMetadata ? <></> : renderMapProductLabels(productsMetadata)}
					{overlayLayer ? [renderMapOverlayLayerLabel(overlayLayer)] : <></>}
				</ExpandableLabelsContainer>
			) : null}
			{!noTools ? (
				<div className="worldCereal-MapTools">
					{(!noMetadata || overlayLayer) && showRemoveAllLayers ? (
						<IconTool
							className="worldCereal-RemoveMapIcon"
							tooltip={{
								text: 'Remove all layers',
								position: 'left',
								component: Tooltip,
							}}
							onClick={() => removeAllLayers(mapKey)}
							floating
							medium
							icon="ri-remove-layers"
						/>
					) : null}
					{!noMetadata || overlayLayer ? (
						<IconTool
							className={`worldCereal-toggleDataQuery ${
								dataQueryActive ? 'active' : ''
							}`}
							tooltip={{
								text: 'Allow data query',
								position: 'left',
								component: Tooltip,
							}}
							onClick={() => toggleDataQuery(mapKey, !dataQueryActive)}
							floating
							medium
							icon="ri-tooltip"
						/>
					) : null}
					{mapSetMapKeys?.length > 1 ? (
						<IconTool
							className="worldCereal-RemoveMapIcon"
							tooltip={{
								text: 'Remove map',
								position: 'left',
								component: Tooltip,
							}}
							onClick={() => removeMap(mapKey)}
							floating
							medium
							icon="ri-close"
						/>
					) : null}
				</div>
			) : null}
			<MapLegends
				layersState={layersState}
				componentsByLayer={componentsByLayer}
				className={'worldCereal-MapLegends is-left'}
				mapKey={mapKey}
			/>

			{children}
		</div>
	);
};

MapWrapper.propTypes = {
	children: PropTypes.node,
	activeMapKey: PropTypes.string,
	mapKey: PropTypes.string,
	mapSetMapKeys: PropTypes.array,
	productsMetadata: PropTypes.object,
	labelsRight: PropTypes.bool,
	noTools: PropTypes.bool,
	removeMap: PropTypes.func,
	removeAllLayers: PropTypes.func,
	toggleDataQuery: PropTypes.func,
	dataQueryActive: PropTypes.bool,
	overlayLayer: PropTypes.object,
	componentsByLayer: PropTypes.array,
	layersState: PropTypes.array,
	showRemoveAllLayers: PropTypes.bool,
};

export default MapWrapper;
