import PropTypes from 'prop-types';
import {ProductLabelLegendItem} from '../ProductLabel/presentation';

const SingleProductLabelHeader = ({product, zone, color, children, date}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			{color ? (
				<div
					className="worldCereal-ProductLabelHeader-color"
					style={{background: color}}
				/>
			) : null}
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
				<div className="worldCereal-ProductLabelHeader-value">{children}</div>
			</div>
		</div>
	);
};

SingleProductLabelHeader.propTypes = {
	color: PropTypes.string,
	product: PropTypes.string,
	zone: PropTypes.number,
	children: PropTypes.node,
	date: PropTypes.string,
};

const ProductTooltipContent = ({
	productTemplate,
	productMetadata,
	color,
	value,
}) => {
	const {aez, sos, eos, season, isGlobal} = productMetadata.data;

	const startDate = isGlobal
		? season[0].toUpperCase() + season.slice(1, season.length) + ' - '
		: sos;
	const endDate = isGlobal ? eos.slice(0, 4) : eos;
	const fullDate = isGlobal ? startDate + endDate : startDate + ' / ' + endDate;

	return (
		<>
			<SingleProductLabelHeader
				product={productTemplate?.data?.nameDisplay}
				zone={aez}
				date={fullDate}
			>
				<>
					<ProductLabelLegendItem color={`rgba(${color})`} name={value} />
				</>
			</SingleProductLabelHeader>
		</>
	);
};

ProductTooltipContent.propTypes = {
	response: PropTypes.object,
	mapKey: PropTypes.string,
	layerKey: PropTypes.string,
	productTemplate: PropTypes.object,
	productMetadata: PropTypes.object,
	color: PropTypes.string,
	value: PropTypes.string,
};

export default ProductTooltipContent;
