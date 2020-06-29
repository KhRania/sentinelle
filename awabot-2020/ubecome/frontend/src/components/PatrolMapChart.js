import React from 'react';
import AbstractComponent from './AbstractComponent.js';
import Patrol from './Patrol.js';
import PatrolComponent from './PatrolComponent.js';
import "../css/patrol.css";
import { CallSplitOutlined } from '@material-ui/icons';
//import SimpleChart from './PatrolChart.js'
import { mapSettings } from "../common/config";
class PatrolMapChart extends AbstractComponent
{
	constructor(props)
	{
		super(props);
		this.state = this.state = {
			shouldFollowTarget: mapSettings.defaults.shouldFollowTarget,
			miniatureOpen: true,
			theta: undefined,
			x: undefined,
			y: undefined,
			mapWidth: undefined,
			mapHeight: undefined,
			positionX: 0,
			positionY: 0,
			animate: true,
			patrol: [],
			goal_x: undefined,
			goal_y: undefined,
			goal_theta: undefined,
			zones: [],
			data:[],
			points: [],
			path: [],
			patrols:[],
			modalOpen: false,
			editingId:"",
			childVisible: false
	  
			
		  };
	}
	componentDidMount() {

		fetch('http://127.0.0.1:40054/patrol')
			
			.then(response => response.json())
			.then(success => { //console.log('')
           
                let obj = success.listpatrol.patrols
                this.setState({
                    patrols: obj});
                   
 
            })
           
            }
	
	render()
	{
		
		
		/*let points = this.state;
		const x2=	this.state.patrols.map((patrol,key) => {
	
		  return (
			 <div>
	
		  {patrol.points.map((c, i) => {
			return(<div>
			  {this.state.selected === c.id &&<SimpleChart c={c}></SimpleChart>
		  }
			</div>
		  )
		} )
			}
		
			</div>
		  
			) });*/

		return (
			<div id='pilot-interface-patrol'>
			<div id='Patrol-chart-map'>
				<div id='Patrol-map-design'><Patrol></Patrol> </div>
				
						
				<div id='pilot-map-chart'>  <div id='pilot-patrol-list'>	
		
             
                         
     
       {/*  <center>{x2}</center> */}
     
            
             
	   <CallSplitOutlined id='map'
 color='disabled' inverted style={{ fontSize: 35,fill: "white" }}>  </CallSplitOutlined>
            <h1 id='h1'>Liste des Patrols</h1>
                <h3 id='h2'>Selectionner le patrole d'analyse</h3>  <PatrolComponent />

				</div>
	</div> 

					
						</div>
						</div>
						
		);
	}
}

export default PatrolMapChart;
