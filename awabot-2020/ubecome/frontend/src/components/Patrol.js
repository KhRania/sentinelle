import React from 'react';
import AbstractComponent from './AbstractComponent.js';
import { LocationOnOutlined } from '@material-ui/icons';
import MapComponentPatrol from './MapComponentPatrol.js'

class Patrol extends AbstractComponent
{
	

	

	render()
	{
		

		return (
			
					
 					<div id='pilot-patrol2'>
					 <LocationOnOutlined id='map'
 color='disabled' inverted style={{ fontSize: 35,fill: "white" }}>	</LocationOnOutlined>
			<h1 id='h1'>Plan du batiment</h1>
				<h3 id='h2'>Selectionner la ou les Points d'analyse</h3>
					
				<div id="map-global">
					
					<MapComponentPatrol ></MapComponentPatrol></div>
						

				
					</div>
                 
					
					
                

			
		);
	}
}

export default Patrol;
