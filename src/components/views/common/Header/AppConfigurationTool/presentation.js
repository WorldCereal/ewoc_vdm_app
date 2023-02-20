import PropTypes from 'prop-types';
import {IconTool, Modal} from '@gisatcz/ptr-atoms';
import AppConfiguration from '../../AppConfiguration';
// import Tooltip from '../../Tooltip';

import './style.scss';

Modal.setAppElement('#root');
const ModalWindow = Modal.default;

const AppConfigurationTool = ({isOpen, setOpen}) => {
	return (
		<>
			<IconTool
				active={isOpen}
				// tooltip={{
				// 	id: 'AppConfigurationButton',
				// 	text: 'Configuration',
				// 	position: 'bottom',
				// 	component: Tooltip,
				// }}
				className="worldCereal-AppTool"
				medium
				icon="ri-tune"
				onClick={() => setOpen(true)}
			/>
			<ModalWindow
				className="worldCereal-AppConfigurationModal"
				isOpen={isOpen || false}
				onClose={() => setOpen(false)}
			>
				<AppConfiguration />
			</ModalWindow>
		</>
	);
};

AppConfigurationTool.propTypes = {
	isOpen: PropTypes.bool,
	setOpen: PropTypes.func,
};

export default AppConfigurationTool;
