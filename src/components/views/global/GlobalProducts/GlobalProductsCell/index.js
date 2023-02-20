import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const GlobalProductsCell = ({children, className}) => {
	const classes = classnames('worldCereal-GlobalProductsCell', {}, className);
	return <div className={classes}>{children}</div>;
};

GlobalProductsCell.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default GlobalProductsCell;
