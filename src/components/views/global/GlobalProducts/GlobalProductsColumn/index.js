import classnames from 'classnames';
import PropTypes from 'prop-types';

const GlobalProductsColumn = ({children, className}) => {
	const classes = classnames('worldCereal-GlobalProductsColumn', {}, className);
	return <div className={classes}>{children}</div>;
};

GlobalProductsColumn.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default GlobalProductsColumn;
