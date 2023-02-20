import PropTypes from 'prop-types';
import {Children, cloneElement} from 'react';

const ComponentRenderer = ({renderComponent, children, ...restProps}) => {
	const isActive = restProps.componentConfiguration?.active;
	if (isActive) {
		if (renderComponent) {
			return renderComponent(restProps);
		} else {
			return Children.map(children, child => {
				if (typeof child.type === 'string') {
					return child;
				} else {
					return cloneElement(child, restProps);
				}
			});
		}
	} else {
		return null;
	}
};

ComponentRenderer.propTypes = {
	children: PropTypes.node,
	renderComponent: PropTypes.func,
};

export default ComponentRenderer;
