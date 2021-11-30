import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import RemovableLabel from '../atoms/RemovableLabel';
import ModalWindow from '../atoms/ModalWindow';
import {MetadataInfoTitle} from '../MetadataInfo/presentation';
import MetadataInfo from '../MetadataInfo';

Modal.setAppElement('#root');

const MapProductLabel = ({
	productMetadata,
	productTemplate,
	productKey,
	productMetadataKeys,
	onProductRemove,
}) => {
	const [modalIsOpen, setModalOpen] = React.useState(false);

	const productCount = productMetadataKeys?.length;
	const color = productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

	if (productCount) {
		return (
			<>
				<RemovableLabel
					stripColor={color}
					onRemove={onProductRemove}
					onClick={() => {
						setModalOpen(true);
					}}
					active={true}
					floating
				>
					<MapProductLabelContent
						product={productTemplate?.data?.nameDisplay || productKey}
						productMetadata={productMetadata}
						count={productCount}
					/>
				</RemovableLabel>
				<ModalWindow
					title={<MetadataInfoTitle />}
					isOpen={modalIsOpen}
					onClose={() => setModalOpen(false)}
					className="worldCereal-Modal"
				>
					<MetadataInfo productMetadata={productMetadata} />
				</ModalWindow>
			</>
		);
	} else {
		return null;
	}
};

MapProductLabel.proptypes = {
	productMetadata: PropTypes.array,
	productTemplate: PropTypes.object,
	productMetadataKeys: PropTypes.array,
	productKey: PropTypes.string,
};

const MapProductLabelContent = ({count, product, productMetadata}) => {
	if (count === 1) {
		const {sos, eos, aez} = productMetadata[0].data;
		return (
			<MapSingleProductLabelContent
				product={product}
				zone={aez}
				start={sos}
				end={eos}
			/>
		);
	} else {
		return <MapMultipleProductLabelContent product={product} count={count} />;
	}
};

const MapSingleProductLabelContent = ({product, zone, start, end}) => {
	return (
		<>
			<div className="worldCereal-MapProductLabel-header">
				<div>
					<span className="worldCereal-MapProductLabel-product">{product}</span>
					<span className="worldCereal-MapProductLabel-zone">
						(zone {zone})
					</span>
				</div>
			</div>
			<div className="worldCereal-MapProductLabel-period">
				{start} / {end}
			</div>
		</>
	);
};

const MapMultipleProductLabelContent = ({product, count}) => {
	return (
		<>
			<div className="worldCereal-MapProductLabel-header">
				<div>
					<span className="worldCereal-MapProductLabel-product">{product}</span>
				</div>
			</div>
			<div className="worldCereal-MapProductLabel-productsCount">
				<em>{count}</em> products
			</div>
		</>
	);
};

export default MapProductLabel;
