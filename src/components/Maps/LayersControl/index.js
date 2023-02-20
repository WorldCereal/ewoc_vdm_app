import {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BackgroundLayersControl from './BackgroundLayersControl';
import OverlayLayer from './OverlayLayer';
import ComponentRenderer from '../ComponentRenderer';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';

import './style.scss';

const LayersControl = props => {
	const wrapperEl = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleClickOutside = () => {
		if (isOpen) {
			setIsOpen(false);
		}
	};
	useOnClickOutside(wrapperEl, handleClickOutside);

	const menuClasses = classnames('worldCereal-LayerControls-menu', {
		open: isOpen,
	});

	const containerClasses = classnames('worldCereal-LayerControls', {
		open: isOpen,
	});

	return (
		<ComponentRenderer
			component={'layerControls'}
			configurationGroupKey={'mapSetTools'}
		>
			<div className={containerClasses} ref={wrapperEl}>
				<IconTool
					tooltip={{text: 'Add layers', position: 'left', component: Tooltip}}
					onClick={() => setIsOpen(!isOpen)}
					floating
					medium
					icon="layers"
				/>
				<div className={menuClasses}>
					<div className="worldCereal-LayerControls-layersContent">
						<div
							className="worldCereal-LayerControls-section"
							style={{width: '10rem'}}
						>
							<div className="worldCereal-LayerControls-section-label">
								Layers
							</div>
							<OverlayLayer {...props} />
						</div>
						<div
							className="worldCereal-LayerControls-section"
							style={{width: '24rem'}}
						>
							<div className="worldCereal-LayerControls-section-label">
								Background layers
							</div>
							<BackgroundLayersControl {...props} />
						</div>
					</div>
				</div>
			</div>
		</ComponentRenderer>
	);
};

LayersControl.propTypes = {
	opensRight: PropTypes.bool,
	left: PropTypes.number,
	top: PropTypes.number,
	right: PropTypes.number,
	bottom: PropTypes.number,
	mapSetKey: PropTypes.string,
	onMount: PropTypes.func,
};

export default LayersControl;

// Hook
function useOnClickOutside(ref, handler) {
	useEffect(
		() => {
			const listener = event => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}
				handler(event);
			};
			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);
			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[ref, handler]
	);
}
