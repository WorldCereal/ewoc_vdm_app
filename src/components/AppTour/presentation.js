import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {TourProvider} from '@reactour/tour';

import steps from './steps';

import './style.scss';

const defaultMapLayerKey = 'b8ae22a1-5444-52db-bcd3-096faf2315cc';
const alternativeMapLayerKey = '78cb0bb1-093e-5e5d-8314-3627d9b03ea9';

const defaultMapSpatialKey = 'f7e2d7d4-55af-5077-99dc-d72ce9b748e2';
const alternativeMapSpatialKey = 'a7046b1a-d8e1-5356-91e1-75ef2df16f9c';

const AppTour = ({
	children,

	activeView,
	introOverlayIsOpen,

	openIntroOverlay,
	redirectToDetailedView,
	redirectToGlobalView,
	redirectToStatisticsView,

	controlTourGuide,
	activateDefaultLayer,
	expandProductLabel,
	expandFilterWindow,
	removeAllFilters,
	addDefaultFilter,
	zoomInMap,
	addNewMapWindow,
	activateMapWindow,

	activeFilters,
	activeMapWindows,
	activeMapWindow,
}) => {
	const [openTour, setOpenTour] = useState(false);
	const [step, setStep] = useState(0);
	const [openMapLayer, setOpenMapLayer] = useState(false);

	const style = {
		popover: base => ({
			...base,
			maxWidth: '80%',
			'--reactour-accent': 'rgb(233, 177, 22)',
		}),
		badge: base => ({
			...base,
			backgroundColor: 'rgb(233, 177, 22)',
			color: 'black',
			height: step > 8 ? '2.5em' : '1.875em',
			lineHeight: step > 8 ? 2.6 : 2,
		}),
	};

	// on tour open
	const setTourIsOpen = () => {
		// set the current step depending on the user's location
		if (introOverlayIsOpen) {
			setStep(0);
		} else if (
			activeView?.data?.nameInternal === 'detailedExploration' &&
			activeMapWindows?.length === 1
		) {
			setStep(2);
		} else if (
			activeView?.data?.nameInternal === 'detailedExploration' &&
			activeMapWindows?.length > 1
		) {
			setStep(5);
		} else if (activeView?.data?.nameInternal === 'globalView') {
			setStep(7);
		} else if (activeView?.data?.nameInternal === 'statistics') {
			setStep(8);
		}

		// if default layer is already added to the map
		if (
			activeMapWindow?.data?.layers?.length > 0 &&
			activeView?.data?.nameInternal === 'detailedExploration' &&
			!openMapLayer
		) {
			setOpenMapLayer(true);
			activeMapWindow?.data?.layers
				.map(layer => {
					return layer.layerKey === defaultMapLayerKey;
				})
				.includes(true)
				? null
				: activateDefaultLayer(defaultMapLayerKey, defaultMapSpatialKey);
		} else {
			setOpenMapLayer(false);
		}

		if (
			activeMapWindows?.length > 1 &&
			activeView?.data?.nameInternal === 'detailedExploration'
		) {
			activateMapWindow(activeMapWindow?.key);
		}

		removeAllFilters();
		setOpenTour(true);
		controlTourGuide(true);
	};

	// add or remove default layer
	if (
		!openMapLayer &&
		activeView?.data?.nameInternal === 'detailedExploration' &&
		!introOverlayIsOpen &&
		openTour
	) {
		activateDefaultLayer(defaultMapLayerKey, defaultMapSpatialKey);
		setOpenMapLayer(true);
	} else if (
		openMapLayer &&
		activeView?.data?.nameInternal === 'globalView' &&
		!introOverlayIsOpen &&
		openTour
	) {
		// layers get removed just by changing views
		setOpenMapLayer(false);
	} else if (
		openMapLayer &&
		activeView?.data?.nameInternal === 'statistics' &&
		!introOverlayIsOpen &&
		openTour
	) {
		// layers get removed just by changing views
		setOpenMapLayer(false);
	} else if (openMapLayer && introOverlayIsOpen && openTour) {
		activateDefaultLayer(defaultMapLayerKey, defaultMapSpatialKey);
		setOpenMapLayer(false);
	}

	const setCurrentStep = step => {
		switch (step) {
			case 0:
				openIntroOverlay(true);
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 1:
				openIntroOverlay(true);
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 2:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				activateMapWindow(activeMapWindow?.key);
				break;
			case 3:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				activateMapWindow(activeMapWindow?.key);
				break;
			case 4:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(true);
				expandFilterWindow(false);
				removeAllFilters();
				activateMapWindow(activeMapWindow?.key);
				break;
			case 5:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 6:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 7:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				activateMapWindow(activeMapWindow?.key);
				break;
			case 8:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(true);
				activateMapWindow(activeMapWindow?.key);
				break;
			case 9:
				openIntroOverlay(false);
				redirectToGlobalView();
				expandProductLabel(false);
				expandFilterWindow(false);
				break;
			case 10:
				openIntroOverlay(false);
				redirectToStatisticsView();
				expandProductLabel(false);
				expandFilterWindow(false);
				break;
			case 11:
				openIntroOverlay(false);
				redirectToStatisticsView();
				expandProductLabel(false);
				expandFilterWindow(false);
				break;
			case 12:
				openIntroOverlay(false);
				redirectToStatisticsView();
				expandProductLabel(false);
				expandFilterWindow(false);
				break;
			default:
				break;
		}
		setStep(step);
	};

	// when the user skips directly to the 6th step, in order to add the default filter (4,5,6 for zoom in the map),
	// it is necessary to wait for the active filters to get set, otherwise the filters get cleaned up.
	// I found out that it is just fine to wait for the active layer and then set the default filter.
	useEffect(() => {
		if (
			(step === 4 || step === 5 || step === 6 || step === 7 || step === 8) &&
			openTour
		) {
			zoomInMap();
		}

		if (
			(step === 5 || step === 6) &&
			openTour &&
			activeMapWindows?.length === 1
		) {
			addNewMapWindow();
		} else if (step === 6 && openTour && activeMapWindows?.length > 1) {
			activateMapWindow(activeMapWindows[1].key);
			if (activeMapWindows[1]?.data?.layers?.length > 0) {
				activeMapWindows[1]?.data?.layers
					.map(layer => {
						return layer.layerKey === alternativeMapLayerKey;
					})
					.includes(true)
					? null
					: activateDefaultLayer(
							alternativeMapLayerKey,
							alternativeMapSpatialKey
					  );
			} else {
				activateDefaultLayer(alternativeMapLayerKey, alternativeMapSpatialKey);
			}
		} else if (step === 8 && !activeFilters?.product?.length > 0 && openTour) {
			addDefaultFilter();
		}
	}, [step, activeMapWindow]);

	const getTourPadding = () => {
		if (step === 3) {
			return {popover: [12, 12]};
		} else if (step === 8) {
			return {mask: [-1, 165], popover: [13, 85.5]};
		} else {
			return {popover: [13, 8]};
		}
	};

	return (
		<TourProvider
			styles={style}
			steps={steps}
			currentStep={step}
			setCurrentStep={setCurrentStep}
			afterOpen={setTourIsOpen}
			beforeClose={() => {
				// clean up
				setOpenTour(false);
				setOpenMapLayer(false);
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				controlTourGuide(false);
			}}
			padding={getTourPadding()}
		>
			{children}
		</TourProvider>
	);
};

AppTour.propTypes = {
	children: PropTypes.node,
	openIntroOverlay: PropTypes.func,
	redirectToDetailedView: PropTypes.func,
	redirectToGlobalView: PropTypes.func,
	redirectToStatisticsView: PropTypes.func,
	activeView: PropTypes.object,
	introOverlayIsOpen: PropTypes.bool,
	activateDefaultLayer: PropTypes.func,
	expandProductLabel: PropTypes.func,
	expandFilterWindow: PropTypes.func,
	removeAllFilters: PropTypes.func,
	addDefaultFilter: PropTypes.func,
	controlTourGuide: PropTypes.func,
	activeFilters: PropTypes.object,
	zoomInMap: PropTypes.func,
	addNewMapWindow: PropTypes.func,
	activeMapWindows: PropTypes.array,
	activateMapWindow: PropTypes.func,
	activeMapWindow: PropTypes.object,
};

export default AppTour;
