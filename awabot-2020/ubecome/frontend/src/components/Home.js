import React from 'react';
import AbstractComponent from './AbstractComponent.js';
import SocketIOClient from '../common/SocketIOClient.js';
import VideoStream from './VideoStream.js';
import MapComponentPatrol from './MapComponentPatrol';
import Joystick from './Joystick'
import SensorsPanel from './SensorsPanel';
import { Button } from 'semantic-ui-react'

class Home extends AbstractComponent
{	static PATROL ='Patrol';

    constructor(props)
    {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);

    }
    onSocketIOConnected()
    {
        SocketIOClient.emit('home-on');
    }
    onSocketIOOnClose()
    {
        SocketIOClient.emit('home-off');
    }
    terminate()
    {
        SocketIOClient.emit('home-off');
    }

    handleClick() {
        this.props.history.push('/Patrol');   
    console.log('ok')   }

    render()
    {
        return (
                <div id="home-container" >
                <div id='pilot-video'>
                <div id='pilot-board'>
                        <VideoStream /></div></div>
                        <div><SensorsPanel></SensorsPanel></div>
                        <div id="map-panel-acceuil">
                            <div class="map-panel">
                                <div id='map-home'>     <MapComponentPatrol/>
                            </div>
                            <Button  onClick={this.handleClick} id='icone' size='large' icon='search' style={{color:'white',position:'absolute',size:'large'}} />
                                <Joystick></Joystick>
                            </div>
                           
                            </div>
                        </div>
        );
    }
}
export default Home;