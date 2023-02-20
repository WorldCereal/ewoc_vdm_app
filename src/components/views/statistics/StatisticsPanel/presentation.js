import PropTypes from 'prop-types';
import Title from '../../common/Title';
import EsaLogo from '../../../atoms/EsaLogo';
import ProductSelect from './ProductSelect';
import LevelSwitch from './LevelSwitch';
import PlaceSelect from './PlaceSelect';
import PeriodSelect from './PeriodSelect';
import RegionSelect from './RegionSelect';
import Visualizations from './Visualizations';

import './style.scss';
import {useEffect} from 'react';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import {useTour} from '@reactour/tour';
import classNames from 'classnames';

const StatisticsPanel = ({
	activeAreaTreeLevel,
	statisticLayerState,
	recalculateStatisticLayerStyle,
	tourGuideIsOpen,
}) => {
	const {setIsOpen} = useTour();
	useEffect(() => {
		recalculateStatisticLayerStyle(statisticLayerState);
	}, [statisticLayerState]);
	const level = activeAreaTreeLevel?.data?.level;

	return (
		<div className="worldCereal-StatisticsPanel">
			<div className="worldCereal-StatisticsPanel-header">
				<Title />
				<div className="worldCereal-StatisticsPanel-header-isRight">
					<EsaLogo className="worldCereal-Header-esaLogo" />
					<IconTool
						className={classNames(
							'worldCereal-Header-tourIcon',
							{},
							tourGuideIsOpen ? 'is-active' : ''
						)}
						icon={'ri-help'}
						medium
						onClick={() => setIsOpen(true)}
						tooltip={{
							text: 'Tourguide',
							position: 'bottom',
							component: Tooltip,
						}}
					/>
				</div>
			</div>
			<div className="worldCereal-StatisticsPanel-body">
				<div className="worldCereal-StatisticsPanel-configurations">
					<div>
						<ProductSelect />
						<PeriodSelect />
						<LevelSwitch />
					</div>
					<div>
						<PlaceSelect />
					</div>
					{level === 2 ? (
						<div>
							<RegionSelect />
						</div>
					) : null}
				</div>
				<div className="worldCereal-StatisticsPanel-visualizations">
					<Visualizations />
				</div>
			</div>
		</div>
	);
};

StatisticsPanel.propTypes = {
	activeAreaTreeLevel: PropTypes.object,
	statisticLayerState: PropTypes.object,
	recalculateStatisticLayerStyle: PropTypes.func,
	tourGuideIsOpen: PropTypes.bool,
};

export default StatisticsPanel;
