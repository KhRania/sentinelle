import React from 'react';
import {Button} from 'semantic-ui-react';
import SimpleChart from './PatrolChart.js'
import PropTypes from 'prop-types'
//import ajax from "../common/ajax.js";

import '../css/modal.css';
import '../css/patrol.css';


class PatrolModal extends React.Component
{
	constructor(props)
	{
		super(props);
		
	
		this.state = {  showModal: 0 ,data:[] ,name:this.props.val,selected:''
		}
	}

	componentDidMount() {

		fetch('http://localhost:40054/patrol')
		  
		  .then(response => response.json())
		  .then(success => { //console.log('')
			   
					let obj = success.listpatrol.patrols
			 // console.log("data",obj)
					this.setState({
						data: obj});
					   
	 
				})
			   
				}
				

			toggleHidden = key => {
				this.setState({ opened: !this.state.opened, selected: key });
				//console.log(key)
			  };

			 
			  

	render()
	{ 					


				const x1=	this.state.data.map((patrol,key) => {

					return (
						 <div>


						
					{patrol.points.map((c, i) => {
						return(<div>
							
							<Button   onClick={() => this.toggleHidden(c.id)}>chartPoint{c.id}</Button>

							
   
							{this.state.selected === c.id &&<SimpleChart c={c}></SimpleChart>
						  
						 
							 
					}
						</div>
					)
				} )
						}
				
						</div>
					
						) });
      
	

	

		return (
			<div>
			<div><h1>hello</h1></div>
                    
<div>
		<center>{x1}</center></div>

		</div>
		  )
		}
      }
      PatrolModal.propTypes = {
        modalOpen: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        valueIntoModal: PropTypes.string.isRequired
      }
export default PatrolModal;
