import {createElement} from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers';
import './style.scss';

const MapLegends = ({layersState, componentsByLayer, mapKey, className}) => {
	if (layersState?.length && componentsByLayer) {
		return (
			<div className={className}>
				{layersState.map(layerState => {
					const layerKey = layerState.layerKey || layerState.key;
					const layerTemplateKey = layerState.layerTemplateKey;
					const isHidden = layerState?.options?.legendHidden;

					if (!isHidden) {
						const components = helpers.getConfigByLayerState(
							componentsByLayer,
							layerState
						);
						const componentsElms = components.reduce((acc, component) => {
							const legend = component?.legend;
							if (legend) {
								acc.push(
									createElement(legend.component, {
										...legend.props,
										mapKey,
										// layerKey,
										layerState,
										layerTemplateKey,
										key: layerKey,
									})
								);
							}
							return acc;
						}, []);
						return componentsElms;
					} else {
						return null;
					}
				})}
			</div>
		);
	} else {
		return null;
	}
};

MapLegends.propTypes = {
	className: PropTypes.string,
	layersState: PropTypes.array,
	componentsByLayer: PropTypes.array,
	mapKey: PropTypes.string,
};

export default MapLegends;
