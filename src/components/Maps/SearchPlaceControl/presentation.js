import PropTypes from 'prop-types';
import {useState} from 'react';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import {GeonamesSearch} from '@gisatcz/ptr-components';
import ComponentRenderer from '../ComponentRenderer';

import './style.scss';

const SearchPlaceControl = ({setMapView}) => {
	const [searchBoxOpen, setSearchBoxOpen] = useState(false);

	return (
		<ComponentRenderer
			component={'searchPlace'}
			configurationGroupKey={'mapSetTools'}
		>
			<>
				<IconTool
					active={searchBoxOpen}
					tooltip={{text: 'Search place', position: 'left', component: Tooltip}}
					onClick={() => {
						setSearchBoxOpen(!searchBoxOpen);
					}}
					floating
					medium
					icon="ri-location-search"
				/>
				{searchBoxOpen ? (
					<GeonamesSearch
						autoFocus={true}
						maxPlaces={7}
						onPlaceSelect={setMapView}
						placeholder="Type location name..."
						hideClearIcon={true}
						className="ptr-GeonamesSearchBox"
					/>
				) : null}
			</>
		</ComponentRenderer>
	);
};

SearchPlaceControl.propTypes = {
	setMapView: PropTypes.func,
};

export default SearchPlaceControl;
