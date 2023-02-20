import PropTypes from 'prop-types';
import GlobalProductsColumn from '../GlobalProductsColumn';
import GlobalProductsCell from '../GlobalProductsCell';

import './style.scss';

const LegendColumn = ({products}) => {
	return (
		<GlobalProductsColumn className="worldCereal-LegendColumn">
			<GlobalProductsCell />
			{products.map(p => (
				<GlobalProductsCell className="worldCereal-LegendCell" key={p.product}>
					<div
						className="worldCereal-LegendCell-icon"
						style={{background: p.color}}
					/>
					{p.nameDisplay}
				</GlobalProductsCell>
			))}
		</GlobalProductsColumn>
	);
};

LegendColumn.propTypes = {
	products: PropTypes.array,
};

export default LegendColumn;
