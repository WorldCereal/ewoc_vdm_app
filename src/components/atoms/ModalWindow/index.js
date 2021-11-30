import React from 'react';
import {Button} from '@gisatcz/ptr-atoms';
import Modal from 'react-modal';

import './style.scss';

const ModalWindow = ({isOpen, onClose, title, className, children}) => {
	const classes = `ptr-Modal ${className}`;

	return (
		<Modal
			isOpen={isOpen}
			onAfterOpen={() => {}}
			className={classes}
			overlayClassName="ptr-ModalOverlay ptr-light"
			onRequestClose={onClose}
			shouldCloseOnOverlayClick={true}
		>
			<div className="ptr-Modal-header">
				<div className="ptr-Modal-title">{title}</div>
				<Button
					onClick={onClose}
					invisible
					icon="close"
					className="ptr-Modal-closeButton"
				/>
			</div>
			<div className="ptr-Modal-content">
				<div>{children}</div>
			</div>
		</Modal>
	);
};

export default ModalWindow;
