import React from 'react';
import {Form, Modal,Message,Icon,Button} from 'semantic-ui-react';

import axios from 'axios'


import i18n from '../i18n/i18n.js';
import '../css/modal.css';
import '../css/main.css'
 

class EditConfigurationModal extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.state = { open: false ,name:this.props.row.value,index:this.props.row.key,data:[]
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



onConfirm()
{
	
	if(this.state.name === '')
	{
		this.setState({error: 'error.missing-fields'});
		
	}
	else
	{
		let config = {value: this.props.row.value};
		if(this.props.row.value !== this.state.name)
		{
			config.name = this.state.name;
		}
		if(config.name)

		{  let url ='http://localhost:4000/lang/t';
		
			axios({
				method: 'PUT',
				url: url,
				timeout: 3000,
				data: this.state.name,
				headers: { 
					'x-apikey': '59a7ad19f5a9fa0808f11931',
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				  }
			});
		}
				this.handleClose()

		

		
	
	
		}

	}


	render()
	{
		
		const { open } = this.state
		const editIcon = (
			<Button  icon labelPosition='left' id='botton'>
     EDIT
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
			  trigger={editIcon}
			  onClose={this.props.onDismiss}
			>
			 	<Modal.Header content={i18n.get('edit-configuration',{user:this.state.index})} />
				<Modal.Content>
					<Form error loading={this.state.busy}>
					{error}
						<Form.Input name='name' label={i18n.get('value')} value={this.state.name} placeholder={i18n.get('value')} onChange={this.handleChange} />
					
					</Form>
				</Modal.Content>
				<Modal.Actions>
	
				

					<Button basic color='red' inverted onClick={this.handleClose}>{i18n.get('cancel')}</Button>
					<Button color='green' inverted onClick={this.onConfirm}>{i18n.get('update')}</Button>
				</Modal.Actions>
			</Modal>
		  )
		}
	  }
export default EditConfigurationModal;
