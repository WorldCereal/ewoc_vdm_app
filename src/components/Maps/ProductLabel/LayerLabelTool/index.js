import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const LayerLabelTool = ({
	title,
	url,
	isLink,
	dangerous,
	disabled,
	onClick,
	children,
	className,
}) => {
	const hoverable = !disabled && (!!onClick || isLink);
	const classes = classnames(
		'ptr-LayerLabelTool',
		{
			'is-hoverable': hoverable,
			'is-dangerous': dangerous,
			'is-disabled': disabled,
		},
		className
	);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			onClick();
		}
	};

	if (isLink) {
		return (
			<a className={classes} href={url}>
				<div className="ptr-LayerLabelTool-title">{title}</div>
				<div className="ptr-LayerLabelTool-control">{children}</div>
			</a>
		);
	} else {
		return (
			<div
				className={classes}
				onClick={onClick}
				tabIndex={hoverable ? 0 : -1}
				onKeyDown={handleKeyDown}
			>
				<div className="ptr-LayerLabelTool-title">{title}</div>
				{children ? (
					<div className="ptr-LayerLabelTool-control">{children}</div>
				) : null}
			</div>
		);
	}
};

LayerLabelTool.propTypes = {
	title: PropTypes.string,
	dangerous: PropTypes.bool,
	disabled: PropTypes.bool,
	isLink: PropTypes.bool,
	onClick: PropTypes.func,
	url: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default LayerLabelTool;
