import React from 'react';
import {Form, Modal,Message,Button,Label} from 'semantic-ui-react';
import SimpleChart from './PatrolChart.js'
import PropTypes from 'prop-types'
import ajax from "../common/ajax.js";

import i18n from '../i18n/i18n.js';
import '../css/modal.css';
import '../css/patrol.css';


class PatrolModal extends React.Component
{
	constructor(props)
	{
		super(props);
		
	
		this.state = {  showModal: 0 ,data:[]
		}
	}

	componentDidMount() {

		fetch('http://localhost:40054/patrol')
		  
		  .then(response => response.json())
		  .then(success => { //console.log('')
			   
					let obj = success.listpatrol.patrols
			  console.log("data",obj)
					this.setState({
						data: obj});
					   
	 
				})
			   
				}
				getModal = value => {
					this.setState({ showModal: value });
				  };
				
				  hideModal = value => {
					this.setState({ showModal: 0 });
				  };

			toggleHidden = key => {
				this.setState({ opened: !this.state.opened, selected: key });
				console.log(key)
			  };

			  open = () => this.setState({ open: true })
			  close = () => this.setState({ open: false })

	render()
	{ 
		/*const x=	this.state.data.map(item => {
		return (<div>


		
				
				{ item.points.map((c, i) => {
			  
			 
			
			  if (typeof(c.values) !== 'undefined') {
				  //console.log(c.values)
				  return(
			c.values.map((a, i) => {
			  
			return (<td id='label'>{!this.state.opened && this.state.selected === c.id &&
				
				
				<table>
                    <tbody >
                          {this.state.data.map(filename => {
                            return (
                              
                               <tr className="TableRow" >

                                <td style={{width: 500, height:50}}>{a.temp}</td>
                         
                                
                                
                                </tr>

                     
                            );
                          })}
                          </tbody>
                       </table>
				
				
				}</td>);
			
	
			
				
			  }) )
			
		}}) }

</div>);


				})*/

			
				const x1=	this.state.data.map((patrol,key) => {
			
					return (
						 <div>
					{patrol.points.map((c, i) => {
						return(<div>
						 <Button  key={key} onClick={() => this.toggleHidden(c.id)}>drddrd
						{this.state.selected === c 
						  
						 
							 
						  }</Button>
							
							
							
						
						
						 
					
						   {this.state.selected === c.id &&
						  
<SimpleChart c={c}></SimpleChart>}

						
						</div>
					)
				} )
						}
						</div>
						) });
      
	

		let error = [];
		if(this.state.error)
		{
			error.push(<Message error header={i18n.get('error')} content={i18n.get(this.state.error)} key='0' />);
		}


		return (
			<Modal
            open={this.props.modalOpen}
            size='small'
            closeOnEscape={true}
			closeOnRootNodeClick={true}
		
			>
			 	<Modal.Header  />
				<Modal.Content>
					<Form error loading={this.state.busy}>
					{error}
						
                    

		<center>{x1}</center>

					</Form>
				
				</Modal.Content>
              
				<Modal.Actions>
					<Button  color='green' inverted  onClick={this.props.handleClose}>{i18n.get('ok')}</Button>
					
				</Modal.Actions>
			</Modal>
		  )
		}
      }
      PatrolModal.propTypes = {
        modalOpen: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        valueIntoModal: PropTypes.string.isRequired
      }
export default PatrolModal;
