import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Admin from './Admin.js';
import Account from './Account.js';
import Configure from './Configure.js'
import Patrol from './Patrol.js'
import TelechargementRonde from './TelechargementRonde';
import PatrolMapChart from './PatrolMapChart.js';
import PatrolModal from './PatrolModal.js';
import VideoStream from './VideoStream.js';
class Body extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	render()
	{
		return (
			<div id='body-container'>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/login' component={Login}/>
					<Route path='/account' component={Account}/>
					<Route path='/admin' component={Admin}/>
					<Route path='/configure' component={Configure}/>
					<Route path='/patrol' component={Patrol}/>
					<Route path='/ronde' component={TelechargementRonde}/>
					<Route path='/patrolMapChart' component={PatrolMapChart}/>
					<Route path='/PatrolModal' component={PatrolModal}/>
					<Route path='/Video' component={VideoStream}/>


				</Switch>
			</div>
		);
	}
}

export default Body;
