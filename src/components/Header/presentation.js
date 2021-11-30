import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import StatusLabel from '../atoms/StatusLabel';
import {MAX_MAPS_IN_MAP_SET} from '../../constants/app';
import logo from '../../assests/logo.png';
import logoData from './logo';
import './style.scss';

class Header extends React.PureComponent {
	static propTypes = {
		addMap: PropTypes.func,
		mapSetMapKeys: PropTypes.array,
		showStatusInfo: PropTypes.bool,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {addMap, mapSetMapKeys, showStatusInfo} = this.props;
		const mapsInMapSet = mapSetMapKeys?.length;

		return (
			<div className="worldCereal-Header">
				<div className="worldCereal-Header-logo">
					<div>
					<img src={`data:image/jpeg;base64,${logoData}`}/>
					</div>
					<h1>
						<span>World Cereal</span>
						<span>Product Viewer</span>
					</h1>
				</div>
				<div className="worldCereal-Header-tools">
					{/*{showStatusInfo ? (*/}
					{/*	<StatusLabel small status="warning">*/}
					{/*		Zoom in to work with layers!*/}
					{/*	</StatusLabel>*/}
					{/*) : null}*/}
					<Button
						className="ptr-dark"
						onClick={addMap}
						ghost
						small
						icon="plus-thick"
						disabled={mapsInMapSet >= MAX_MAPS_IN_MAP_SET}
					>
						Add map
					</Button>
				</div>
			</div>
		);
	}
}

export default Header;
