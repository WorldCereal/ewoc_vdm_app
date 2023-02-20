import {Select as CommonSelect} from '@gisatcz/ptr-state';

import globalProductMetadataSelectors from './worldCereal/GlobalProductMetadata/selectors';
import productMetadataSelectors from './worldCereal/ProductMetadata/selectors';
import productMetadataFilterSelectors from './worldCereal/ProductMetadataFilter/selectors';
import chartsSelectors from './worldCereal/charts/selectors';
import configurationSelectors from './worldCereal/configuration/selectors';
import timelineSelect from './worldCereal/Timeline/selectors';
import statisticsSelectors from './worldCereal/Statistics/selectors';
import worldCerealSelectors from './worldCereal/selectors';

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,
		globalProductMetadata: globalProductMetadataSelectors,
		productMetadataFilter: productMetadataFilterSelectors,
		timeline: timelineSelect,
		charts: chartsSelectors,
		configuration: configurationSelectors,
		statistics: statisticsSelectors,

		...worldCerealSelectors,
	},
};
