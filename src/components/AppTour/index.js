import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Presentation from './presentation';
import Select from '../../state/Select';

const mapStateToProps = state => {
	return {
		activeView: Select.views.getActive(state),
		introOverlayIsOpen: Select.components.get(state, 'IntroOverlay', 'open'),
		activeFilters:
			Select.worldCereal.productMetadataFilter.getActiveFilter(state),
		activeMapWindows: Select.maps.getMapSetMaps(
			state,
			'detailedExploration-mapSet'
		),
		activeMapWindow: Select.maps.getActiveMap(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openIntroOverlay: open => {
			dispatch(Action.components.set('IntroOverlay', 'open', open));
		},
		redirectToDetailedView: () => {
			dispatch(
				Action.worldCereal.applyView('371846f9-0270-4e43-a46a-db009cd5946a')
			);
		},
		redirectToGlobalView: () => {
			dispatch(
				Action.worldCereal.applyView('fc3aac1e-ffb2-4925-ae38-c95b8e8311c7')
			);
		},
		redirectToStatisticsView: () => {
			dispatch(
				Action.worldCereal.applyView('95ad1c41-9027-4546-9fd4-f7210cdbf493')
			);
		},
		activateDefaultLayer: (layerKey, sourceKey) => {
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(
					layerKey,
					sourceKey
				)
			);
		},
		controlTourGuide: isOpen => {
			dispatch(Action.components.set('tourGuide', 'isOpen', isOpen));
		},
		expandProductLabel: expand => {
			dispatch(
				Action.components.set('tourGuide', 'productLabel', {expanded: expand})
			);
		},
		expandFilterWindow: expand => {
			dispatch(
				Action.components.set('tourGuide', 'filterWindow', {expanded: expand})
			);
		},
		removeAllFilters: () => {
			dispatch(
				Action.worldCereal.productMetadataFilter.removeAllValuesFromActiveFilter()
			);
		},
		addDefaultFilter: () => {
			dispatch(
				Action.worldCereal.productMetadataFilter.addValueToActiveFilter(
					'product',
					'annualcropland'
				)
			);
		},
		zoomInMap: () => {
			dispatch(
				Action.maps.updateSetView('detailedExploration-mapSet', {
					boxRange: 2172324.668919344,
					center: {lat: -3.3839640766864236, lon: -54.54809768288524},
				})
			);
			dispatch(Action.worldCereal.updateOverviewMap());
			dispatch(Action.worldCereal.loadProducts());
		},
		addNewMapWindow: () => {
			dispatch(
				Action.maps.addMap({key: '377062eb-2aeb-437f-b6ea-f6964b28157d'})
			);
			dispatch(
				Action.maps.addMapToSet(
					'377062eb-2aeb-437f-b6ea-f6964b28157d',
					'detailedExploration-mapSet'
				)
			);
		},
		activateMapWindow: mapKey => {
			dispatch(Action.maps.setMapSetActiveMapKey(mapKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
