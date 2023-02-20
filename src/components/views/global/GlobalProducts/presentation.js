import {useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TimelineControlButton from '../../common/TimelineControlButton';
import LegendColumn from './LegendColumn';
import YearColumn from './YearColumn';
import GlobalProductsColumn from './GlobalProductsColumn';
import GlobalProductsCell from './GlobalProductsCell';

import './style.scss';

const GlobalProducts = ({
	onMount,
	years,
	products,
	onProductClick,
	isCollapsed,
	onCollapse,
}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
	}, []);

	const classes = classnames('worldCereal-GlobalProducts', {
		'is-collapsed': isCollapsed,
	});

	return (
		<div className={classes}>
			<TimelineControlButton collapsed={isCollapsed} onClick={onCollapse} />
			<LegendColumn products={products} />
			{years.map(year => (
				<YearColumn
					key={year}
					year={year}
					products={products}
					onProductClick={onProductClick}
				/>
			))}

			{/* TODO solve better*/}
			<GlobalProductsColumn className="worldCereal-GlobalProductsColumn-placeholder">
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
			</GlobalProductsColumn>
		</div>
	);
};

GlobalProducts.propTypes = {
	isCollapsed: PropTypes.bool,
	onCollapse: PropTypes.func,
	onMount: PropTypes.func,
	years: PropTypes.array,
	products: PropTypes.array,
	onProductClick: PropTypes.func,
};

export default GlobalProducts;
