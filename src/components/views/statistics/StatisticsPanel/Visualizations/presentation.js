import PropTypes from 'prop-types';
import ChartWrapper from '../../../../common/ChartWrapper';
import GlobalChartWrapper from './charts/GlobalChartWrapper';
import WordCerealBaseChartWrapper from './charts/WordCerealBaseChartWrapper';
import './style.scss';

const getComponent = component => {
	switch (component) {
		case 'GlobalTopTenBarChart':
		case 'GlobalTopTenBarChartShare':
		case 'GlobalSharePieChart':
		case 'GlobalCountriesBarChart':
		case 'GlobalCountriesBarChartShare':
			return (
				<GlobalChartWrapper key={component}>
					<WordCerealBaseChartWrapper componentKey={component}>
						<ChartWrapper />
					</WordCerealBaseChartWrapper>
				</GlobalChartWrapper>
			);
		case 'GlobalSharePieChartActiveIrrigation2020Summer1':
		case 'GlobalSharePieChartMaize2020Summer1':
		case 'GlobalSharePieChartCereals2020Summer1':
		case 'GlobalSharePieChartCereals2020Winter':
			return (
				<GlobalChartWrapper key={component}>
					<ChartWrapper small componentKey={component} />
				</GlobalChartWrapper>
			);
		case 'CountrySharePieChartMaize2020Summer1':
		case 'CountrySharePieChartCereals2020Summer1':
		case 'CountrySharePieChartCereals2020Winter':
			return <ChartWrapper small key={component} componentKey={component} />;
		default:
			return (
				<WordCerealBaseChartWrapper key={component} componentKey={component}>
					<ChartWrapper />
				</WordCerealBaseChartWrapper>
			);
	}
};

const Visualizations = ({componentSet, noDataForCurrentSettings}) => {
	return (
		<div className="worldCereal-Visualizations ptr-dark">
			{noDataForCurrentSettings ? (
				<div className="worldCereal-Visualizations-noDataInfo">
					No data for selected period! Please choose another one.
				</div>
			) : (
				componentSet?.components?.map(component => getComponent(component))
			)}
		</div>
	);
};

Visualizations.propTypes = {
	componentSet: PropTypes.object,
	noDataForCurrentSettings: PropTypes.bool,
};

export default Visualizations;
