import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

import {IconTool} from '@gisatcz/ptr-atoms';

const MultipleMaps = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Multiple map windows</h3>
		<p>
			It is possible to open multiple map windows and add different products to
			each of them.
		</p>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<div className="worldCereal-tour-steps-descriptionSections">
					<IconTool
						icon={'ri-add-map'}
						className="worldCereal-tour-steps-mapIcons"
					/>
					<p className="worldCereal-tour-steps-mapIconsDescription">
						<b>Add</b> - Opens a new map window.
					</p>
				</div>
				<div className="worldCereal-tour-steps-descriptionSections">
					<IconTool
						icon={'ri-compare'}
						className="worldCereal-tour-steps-mapIcons"
					/>
					<p className="worldCereal-tour-steps-mapIconsDescription">
						<b>Compare</b> - Creates a slider between the map windows that
						enables comparison of the maps.
					</p>
				</div>
				<div
					className="worldCereal-tour-steps-descriptionSections"
					style={{marginBottom: 0}}
				>
					<IconTool
						icon={'ri-close'}
						className="worldCereal-tour-steps-mapIcons"
					/>
					<p className="worldCereal-tour-steps-mapIconsDescription">
						<b>Close</b> - Removes the map window.
					</p>
				</div>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default MultipleMaps;
