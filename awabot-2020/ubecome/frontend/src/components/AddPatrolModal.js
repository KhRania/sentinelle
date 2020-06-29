import React from 'react';
import {Form, Modal,Message,Icon,Button,Label} from 'semantic-ui-react';


import i18n from '../i18n/i18n.js';
import '../css/modal.css';
import '../css/patrol.css';


class EditConfigurationModal extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
	
		this.state = { open: false ,data:[],selected: ""
		}
	}


  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  

  handleClose = () => {
	this.setState({ open: false })
}
handleChange(e, {name, value})
{
	this.setState({[name]: value});
}
toggleHidden = key => {
	this.setState({ opened: !this.state.opened, selected: key });
	console.log("key")
  };

componentDidMount() {

	ajax('GET', 'robot/patrol', null, ( patrol ) =>{
	  
	  
		   
				let obj = patrol.patrols
		  
				this.setState({
					data: obj});
				   
 
			})
		   
			}



	render()
	{
		/*const x=	this.state.data.map(item => {
		return (<div>


		
				
				{ item.points.map((c, i) => {
			  
			 
			
			  if (typeof(c.values) !== 'undefined') {
				  return(
			c.values.map((a, i) => {
			  
			return (<td id='label'>{a.temp}°C</td>);
			
	
			
				
			  }) )
			
		}}) }





</div>);


				})*/
				const x1=	this.state.data.map(patrol => {
					return (<div>
					{patrol.points.map((c, i) => {
					
						return (
						   <div key={patrol.name}>
						   <p>{c.id}</p>
						   <button onClick={() => this.toggleHidden(patrol.name)}>abc</button>
						   {!this.state.opened && this.state.selected === patrol.name && <h1 >{c.id}</h1>}
						 </div>
						
					)} )
						}
						</div>
						) });



		const { open } = this.state
		const editIconShow = (
			<Button  icon labelPosition='left' id='bottonedit'>
                 Show details
      <Icon name='edit' color="gray" />
    </Button>
          );

		let error = [];
		if(this.state.error)
		{
			error.push(<Message error header={i18n.get('error')} content={i18n.get(this.state.error)} key='0' />);
		}


		return (
			<Modal
			  dimmer={true}
			  open={open}
			  onOpen={this.open}
			 
			  size='small'
			  trigger={editIconShow}
			  onClose={this.props.onDismiss}
			>
			 	<Modal.Header content={i18n.get('edit-configuration',{user:this.state.index})} />
				<Modal.Content>
					<Form error loading={this.state.busy}>
					{error}
						
{x1}
            
					</Form>
				</Modal.Content>
				<Modal.Actions>

					<Button color='green' inverted onClick={this.close}>{i18n.get('ok')}</Button>
				</Modal.Actions>
			</Modal>
		  )
		}
	  }
export default EditConfigurationModal;
