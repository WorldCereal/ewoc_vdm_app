import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon, Tooltip} from '@gisatcz/ptr-atoms';
import './style.scss';

const TimelineControlButton = ({collapsed, onClick}) => {
	const classes = classnames('worldCereal-TimelineControlButton ptr-dark', {
		'is-collapsed': collapsed,
	});

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			onClick(!collapsed);
		}
	};

	return (
		<>
			<div
				className={classes}
				tabIndex={0}
				onKeyDown={handleKeyDown}
				onClick={() => onClick(!collapsed)}
				data-tip="Collapse timeline"
				data-for="timeline-collapse"
			>
				<Icon icon="ri-chevron-down" />
			</div>
			{!collapsed ? (
				<Tooltip
					id="timeline-collapse"
					place="top"
					effect="solid"
					delayShow={500}
				/>
			) : null}
		</>
	);
};

TimelineControlButton.propTypes = {
	collapsed: PropTypes.bool,
	onClick: PropTypes.func,
};

export default TimelineControlButton;
