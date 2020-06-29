import React from 'react';
import AbstractComponent from './AbstractComponent.js';

import { LocationOnOutlined } from '@material-ui/icons';
import {Form, Modal} from 'semantic-ui-react';


import Test from './Test.js';
import PatrolComponent from './PatrolComponent.js';

import MapComponentPatrol from './MapComponentPatrol.js'
import SimpleChart from './PatrolChart.js'


class Maptest extends AbstractComponent
{
	constructor(props)
	{
		super(props);
		this.state = { x2:this.props.x2,
     
      path: [],
      patrols:[],
      modalOpen: false,
      editingId:"",
      
    };

	}
  toggleHidden1 = key => {
    this.setState({editingId: key});
    this.setState({  selected: key });
  
    
  
    };
  close = () => this.setState({ modalOpen: false })
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
   
		return (
			
					
 					<div id='pilot-patrol2'>
{this.state.x2}					</div>
                 
					
					
                

			
		);
	}
}

export default Maptest;
