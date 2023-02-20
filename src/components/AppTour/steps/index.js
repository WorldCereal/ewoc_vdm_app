import IntroScreen from './Intro/Screen';
import IntroCards from './Intro/Cards';
import DetailViewIntro from './DetailView/Intro';
import DetailViewHeader from './DetailView/Header';
import DetailViewMap from './DetailView/Map';
import DetailViewMultipleMaps from './DetailView/MultipleMaps';
import DetailViewActiveMaps from './DetailView/ActiveMaps';
import DetailViewTimeline from './DetailView/Timeline';
import DetailViewFilters from './DetailView/Filters';
import GlobalViewIntro from './GlobalView/Intro';
import StatisticsViewIntro from './StatisticsView/Intro';
import StatisticsMap from './StatisticsView/Map';
import StatisticsPanel from './StatisticsView/Panel';

export default [
	{
		selector: '.worldCereal-Intro-header',
		content: IntroScreen,
	},
	{
		selector: '.worldCereal-Intro-cards',
		content: IntroCards,
	},
	{
		selector: '.worldCereal-Title',
		content: DetailViewIntro,
	},
	{
		selector: '.worldCereal-Header',
		content: DetailViewHeader,
	},
	{
		selector: '.worldCereal-ProductViewer .ptr-map-set',
		content: DetailViewMap,
	},
	{
		selector: '.worldCereal-ProductViewer .ptr-map-set',
		content: DetailViewMultipleMaps,
	},
	{
		selector: '.ptr-map-grid-cell.row1.col2',
		content: DetailViewActiveMaps,
	},
	{
		selector: '.worldCereal-Timeline',
		content: DetailViewTimeline,
	},
	// because filter is a toggle window, it is better to highlight the timeline and add padding to show timeline + filters
	{
		selector: '.worldCereal-Timeline',
		content: DetailViewFilters,
	},
	{
		selector: '.worldCereal-Title',
		content: GlobalViewIntro,
	},
	{
		selector: '.worldCereal-Title',
		content: StatisticsViewIntro,
	},
	{
		selector: '.ptr-map-set',
		content: StatisticsMap,
	},
	{
		selector: '.worldCereal-StatisticsPanel-body',
		content: StatisticsPanel,
	},
];
