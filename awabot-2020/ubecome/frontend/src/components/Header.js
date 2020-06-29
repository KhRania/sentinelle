import React from 'react';
import AbstractComponent from './AbstractComponent.js';
import { withRouter } from 'react-router-dom';
import {Menu,Sidebar} from 'semantic-ui-react';
import StateManager from '../common/StateManager.js';
import ajax from '../common/ajax.js';
import '../css/main.css';
import {Icon} from 'semantic-ui-react';
import { PinDropOutlined} from '@material-ui/icons';
import Tooltip from "@material-ui/core/Tooltip";


//import { useBooleanKnob } from '@stardust-ui/docs-components';


class Header extends AbstractComponent
{
	static HOME = 'home';
	static ACCOUNT = 'account';
	static TOOLS = 'tools';
	static ADMIN = 'admin';
	static LOGOUT = 'logout';
	static PATROL ='Patrol';
	static PATROLMAPCHART ='PatrolMapChart';
	static Configure ='configure';
	static Rondedownload ='ronde';
	static Video ='Video';
	

	

	constructor(props)
	{
		super(props);

		var currentLocation = this.props.location.pathname.substring(1); // To remove the '/' in the path

		this.state = {activeItem: currentLocation,visible:true };
	}

	handleItemClicked = (e, {name}) =>
	{
		this.setState({activeItem: name});

		switch (name)
		{
			case Header.HOME:
				this.props.history.push('/');
				break;
			case Header.LOGOUT:
				this.setState({activeItem: Header.HOME});
				ajax('POST', 'auth/logout', null, () => { this.fireEvent('logged-user', undefined, true) });
				break;
			default:
				this.props.history.push('/' + name);
		}
	};

	toggleModal = () => {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	  }
	render()
	{
		const {activeItem} = this.state;
		let buttons = [];
		const { visible } = this.state;
		
		
		
		if(StateManager.get('logged-user') !== undefined)
		{
			
		
				
				


			
			buttons.push(
				<Tooltip id='tooltip'title="HOME" placement='right' >

				<Menu.Item name={Header.HOME} active={activeItem === Header.HOME} onClick={this.handleItemClicked}>
					<Icon id="item" name='home' size='large'></Icon>
				</Menu.Item>
				</Tooltip>
			);

			buttons.push(
				<Tooltip id='tooltip' title="ACCOUNT" placement='right' >

				<Menu.Item name={Header.ACCOUNT} active={activeItem === Header.ACCOUNT} onClick={this.handleItemClicked}  >
				
				<Icon name='user' size='large'></Icon>


				</Menu.Item>
				</Tooltip>
			);
			buttons.push(
				<Tooltip id='tooltip' title="ADMIN" placement='right' >

				<Menu.Item name={Header.ADMIN} active={activeItem === Header.ADMIN} onClick={this.handleItemClicked} >
				
				<Icon  name='user plus
' size='large' ></Icon>


				</Menu.Item>
				</Tooltip>
			);

			

			buttons.push(
				<Tooltip id='tooltip' title="CHART" placement='right' >

				<Menu.Item name={Header.PATROLMAPCHART} active={activeItem === Header.PATROLMAPCHART} onClick={this.handleItemClicked} >
				
				<Icon id="item" name='chart line' size='large' ></Icon>


				</Menu.Item>
				</Tooltip>
			);
		
			/* buttons.push(

				<Menu.Item >
				
				<Icon id="item" name='bell outline
' size='large' ></Icon>


				</Menu.Item>
			); */
			
			buttons.push(
				<Tooltip id='tooltip' title="Télécharger fichier" placement='right'>
				<Menu.Item  name={Header.Rondedownload} active={activeItem === Header.Rondedownload} onClick={this.handleItemClicked}>
			
				<Icon id="item" name='download
' size='large' ></Icon>


				</Menu.Item>
				</Tooltip>
			);
			buttons.push(
				<Tooltip id='tooltip' title="CONFIGURATION" placement='right' >

				<Menu.Item  name={Header.Configure} active={activeItem === Header.Configure} onClick={this.handleItemClicked} >
				
				<Icon  name='cogs
' size='large' ></Icon>


				</Menu.Item>
				</Tooltip>
			);
			
			buttons.push(
				<Tooltip id='tooltip' title="CARTE DU SITE" placement='right' >

			<Menu.Item  name={Header.PATROL} active={activeItem === Header.PATROL} onClick={this.handleItemClicked}>
				
				<PinDropOutlined  color='disabled' inverted style={{ fontSize: 32,fill: "white" }} size="large"
>	</PinDropOutlined>



				</Menu.Item>
				</Tooltip>
    
			);
			buttons.push(
				<Tooltip id='tooltip' title="LOGOUT" placement='right' style={{ size: 50 }}>

				<Menu.Item id='menu-item' name={Header.LOGOUT} onClick={this.handleItemClicked}>
					
				<Icon name='sign out alternate'
 size='large' ></Icon>
	
	
	
					</Menu.Item>
					</Tooltip>
		
				);

			


		
		}

		return (
		
	
			<Sidebar  as={Menu}
			id='top-menu'
		icon='labeled'
		inverted 
        vertical
		visible={visible} >
			<img  src='ub2018.png' id='logo' alt="Ubecome"
 ></img>
			{buttons}
			
				
			</Sidebar>
			
		
		
		);
	}
}

export default withRouter(Header);