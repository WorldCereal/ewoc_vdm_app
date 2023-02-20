// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useState} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {find as _find, forIn as _forIn} from 'lodash';
import {Icon} from '@gisatcz/ptr-atoms';
import ExpandableLabel, {
	ExpandableLabelBody,
	ExpandableLabelHeader,
} from '../../atoms/ExpandableLabel';
import ModalWindow from '../../atoms/ModalWindow';
import {MetadataInfoTitle} from './MetadataInfo/presentation';
import MetadataInfo from './MetadataInfo';
import ConfidenceLayerControl from './ConfidenceLayerControl';
import OpacitySlider from '../../atoms/OpacitySlider';

import './style.scss';

Modal.setAppElement('#root');

const ProductLabel = ({
	layersOpacity,
	productMetadata,
	productTemplate,
	productKey,
	productMetadataKeys,
	onProductRemove,
	onOpacityChange,
	zIndex,
	tourGuideProductLabelExpanded,
	tourGuideIsOpen,
	confidenceLayerActive,
	onConfidenceLayerActiveChange,
}) => {
	const [modalIsOpen, setModalOpen] = useState(false);
	const productCount = productMetadataKeys?.length;
	const styles = productTemplate?.data?.style?.rules?.[0]?.styles;
	const styleForLegend = _find(styles, style => style.legend);
	const styleForConfidenceLayer = {
		bandIndex: 0,
		legend: true,
		values: [
			{color: null},
			{color: '#ab0527', name: 'Low'},
			{color: '#f7f8af', name: 'Midle'},
			{color: '#046e39', name: 'High'},
		],
	};
	const color = productTemplate?.data?.color;

	return (
		<>
			<ExpandableLabel
				floating
				className="worldCereal-ProductLabel"
				zIndex={zIndex}
				tourGuideProductLabelExpanded={tourGuideProductLabelExpanded}
				tourGuideIsOpen={tourGuideIsOpen}
			>
				<ExpandableLabelHeader>
					<ProductLabelHeader
						product={productTemplate?.data?.nameDisplay || productKey}
						productMetadata={productMetadata}
						count={productCount}
						color={color}
					/>
				</ExpandableLabelHeader>
				<ExpandableLabelBody
					height={confidenceLayerActive ? 12.5 : styleForLegend ? 11.5 : 8}
				>
					<div className="worldCereal-ProductLabelBody">
						<div>
							<ProductLabelBodyItem title="Set opacity">
								<OpacitySlider
									value={layersOpacity}
									onChange={onOpacityChange}
								/>
							</ProductLabelBodyItem>
							<ProductLabelBodyItem
								onClick={() => setModalOpen(true)}
								title="Show metadata"
							>
								<Icon icon="info" />
							</ProductLabelBodyItem>
							<ProductLabelBodyItem
								onClick={onProductRemove}
								title="Remove layer"
								// dangerous
							>
								<Icon icon="close" />
							</ProductLabelBodyItem>
							<ConfidenceLayerControl
								active={confidenceLayerActive}
								onChange={onConfidenceLayerActiveChange}
							/>
						</div>
						<ProductLabelLegend
							height={confidenceLayerActive ? '4.5rem' : '3.5rem'}
							style={
								confidenceLayerActive ? styleForConfidenceLayer : styleForLegend
							}
						/>
					</div>
				</ExpandableLabelBody>
			</ExpandableLabel>
			<ModalWindow
				title={
					<MetadataInfoTitle
						isGlobal={!!productMetadata?.[0]?.data?.isGlobal}
					/>
				}
				isOpen={modalIsOpen}
				onClose={() => setModalOpen(false)}
				className="worldCereal-Modal"
			>
				<MetadataInfo productMetadata={productMetadata} />
			</ModalWindow>
		</>
	);
};

ProductLabel.propTypes = {
	productMetadata: PropTypes.array,
	productTemplate: PropTypes.object,
	productMetadataKeys: PropTypes.array,
	productKey: PropTypes.string,
	onProductRemove: PropTypes.func,
	layersOpacity: PropTypes.number,
	onOpacityChange: PropTypes.func,
	zIndex: PropTypes.number,
	tourGuideProductLabelExpanded: PropTypes.object,
	tourGuideIsOpen: PropTypes.bool,
	confidenceLayerActive: PropTypes.bool,
	onConfidenceLayerActiveChange: PropTypes.func,
};

const ProductLabelHeader = ({count, product, productMetadata, color}) => {
	if (count === 1) {
		const {sos, eos, aez, season, isGlobal} = productMetadata[0].data;

		const startDate = isGlobal
			? season[0].toUpperCase() + season.slice(1, season.length) + ' - '
			: sos;
		const endDate = isGlobal ? eos.slice(0, 4) : eos;
		const fullDate = isGlobal
			? startDate + endDate
			: startDate + ' / ' + endDate;

		return (
			<SingleProductLabelHeader
				product={product}
				zone={aez}
				date={fullDate}
				color={color}
			/>
		);
	} else {
		return (
			<MultipleProductLabelHeader
				product={product}
				count={count}
				color={color}
			/>
		);
	}
};

ProductLabelHeader.propTypes = {
	color: PropTypes.string,
	count: PropTypes.number,
	product: PropTypes.string,
	productMetadata: PropTypes.array,
};

const SingleProductLabelHeader = ({product, zone, color, date}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div
				className="worldCereal-ProductLabelHeader-color"
				style={{background: color}}
			/>
			<div className="worldCereal-ProductLabelHeader-body">
				<div className="worldCereal-ProductLabelHeader-title">
					<span className="worldCereal-ProductLabelHeader-product">
						{product}
					</span>
					{zone ? (
						<span className="worldCereal-ProductLabelHeader-zone">
							(zone {zone})
						</span>
					) : null}
				</div>
				<div className="worldCereal-ProductLabelHeader-period">{date}</div>
			</div>
		</div>
	);
};

SingleProductLabelHeader.propTypes = {
	color: PropTypes.string,
	product: PropTypes.string,
	zone: PropTypes.number,
	date: PropTypes.string,
};

const MultipleProductLabelHeader = ({product, count, color}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div
				className="worldCereal-ProductLabelHeader-color"
				style={{background: color}}
			/>
			<div className="worldCereal-ProductLabelHeader-body">
				<div className="worldCereal-ProductLabelHeader-title">
					<span className="worldCereal-ProductLabelHeader-product">
						{product}
					</span>
				</div>
				<div className="worldCereal-ProductLabelHeader-productsCount">
					<em>{count}</em> products
				</div>
			</div>
		</div>
	);
};

MultipleProductLabelHeader.propTypes = {
	color: PropTypes.string,
	count: PropTypes.number,
	product: PropTypes.string,
};

const ProductLabelBodyItem = ({title, dangerous, onClick, children}) => {
	const classes = classnames('worldCereal-ProductLabelBodyItem', {
		'is-hoverable': !!onClick,
		'is-dangerous': dangerous,
	});

	return (
		<div className={classes} onClick={onClick}>
			<div className="worldCereal-ProductLabelBodyItem-title">{title}</div>
			<div className="worldCereal-ProductLabelBodyItem-tool">{children}</div>
		</div>
	);
};

ProductLabelBodyItem.propTypes = {
	children: PropTypes.node,
	dangerous: PropTypes.bool,
	onClick: PropTypes.func,
	title: PropTypes.string,
};

const ProductLabelLegend = ({style, height}) => {
	// for cogs values only
	if (style) {
		let legendItems = [];
		_forIn(style.values, options => {
			if (options.name) {
				legendItems.push(options);
			}
		});

		return (
			<div className="worldCereal-ProductLabelLegend" style={{height}}>
				{legendItems.reverse().map((item, i) => {
					return (
						<ProductLabelLegendItem
							key={i}
							color={item.color}
							name={item.name}
						/>
					);
				})}
			</div>
		);
	} else {
		return null;
	}
};

ProductLabelLegend.propTypes = {
	height: PropTypes.number,
	style: PropTypes.shape({
		values: PropTypes.object,
	}),
};

export const ProductLabelLegendItem = ({color, name}) => {
	return (
		<div className="worldCereal-ProductLabelLegendItem">
			<div style={{background: color}} />
			<span>{name}</span>
		</div>
	);
};

ProductLabelLegendItem.propTypes = {
	color: PropTypes.string,
	name: PropTypes.string,
};

export default ProductLabel;
