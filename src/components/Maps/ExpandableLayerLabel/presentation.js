// eslint-disable-next-line no-unused-vars
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {forIn as _forIn} from 'lodash';
import {Icon} from '@gisatcz/ptr-atoms';
import ExpandableLabel, {
	ExpandableLabelBody,
	ExpandableLabelHeader,
} from '../../atoms/ExpandableLabel';
import TooltipControl from '../ProductLabel/TooltipControl';
import OpacitySlider from '../../atoms/OpacitySlider';

Modal.setAppElement('#root');

const ProductLabel = ({
	layersOpacity,
	layerTooltipActive,
	onLayerTooltipActiveChange,
	onProductRemove,
	onOpacityChange,
	zIndex,
	layer,
}) => {
	return (
		<>
			<ExpandableLabel
				floating
				className="worldCereal-ProductLabel worldCereal-LayerLabel"
				zIndex={zIndex}
			>
				<ExpandableLabelHeader>
					<SingleProductLabelHeader product={layer.name} />
				</ExpandableLabelHeader>
				<ExpandableLabelBody height={6}>
					<div className="worldCereal-ProductLabelBody">
						<div>
							<ProductLabelBodyItem title="Set opacity">
								<OpacitySlider
									value={layersOpacity}
									onChange={onOpacityChange}
								/>
							</ProductLabelBodyItem>
							<ProductLabelBodyItem
								onClick={onProductRemove}
								title="Remove layer"
								// dangerous
							>
								<Icon icon="close" />
							</ProductLabelBodyItem>
							<TooltipControl
								active={layerTooltipActive}
								onChange={onLayerTooltipActiveChange}
							/>
						</div>
					</div>
				</ExpandableLabelBody>
			</ExpandableLabel>
		</>
	);
};

ProductLabel.propTypes = {
	onProductRemove: PropTypes.func,
	layersOpacity: PropTypes.number,
	onOpacityChange: PropTypes.func,
	zIndex: PropTypes.number,
	layerTooltipActive: PropTypes.bool,
	onLayerTooltipActiveChange: PropTypes.func,
	layer: PropTypes.object,
};

const SingleProductLabelHeader = ({product}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div className="worldCereal-ProductLabelHeader-body">
				<div className="worldCereal-ProductLabelHeader-title">
					<span className="worldCereal-ProductLabelHeader-product">
						{product}
					</span>
				</div>
			</div>
		</div>
	);
};

SingleProductLabelHeader.propTypes = {
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

const ProductLabelLegend = ({style}) => {
	// for cogs values only
	if (style) {
		let legendItems = [];
		_forIn(style.values, options => {
			if (options.name) {
				legendItems.push(options);
			}
		});

		return (
			<div className="worldCereal-ProductLabelLegend">
				{legendItems.map((item, i) => {
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
