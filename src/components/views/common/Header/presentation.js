// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import {useTour} from '@reactour/tour';
import classNames from 'classnames';
import Title from '../Title';
import AppConfigurationTool from './AppConfigurationTool';
import EsaLogo from '../../../atoms/EsaLogo';
import './style.scss';

const Header = ({tourGuideIsOpen}) => {
	const {setIsOpen} = useTour();

	return (
		<div className="worldCereal-Header">
			<Title />
			<div className="worldCereal-Header-tools">
				<EsaLogo className="worldCereal-Header-esaLogo" />
				<AppConfigurationTool />
				<IconTool
					className={classNames(
						'worldCereal-Header-tourIcon',
						{},
						tourGuideIsOpen ? 'is-active' : ''
					)}
					icon={'ri-help'}
					medium
					onClick={() => setIsOpen(true)}
					tooltip={{text: 'Tourguide', position: 'bottom', component: Tooltip}}
				/>
			</div>
		</div>
	);
};

Header.propTypes = {
	tourGuideIsOpen: PropTypes.bool,
};

export default Header;
