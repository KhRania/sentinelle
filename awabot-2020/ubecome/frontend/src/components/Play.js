import React from 'react';
import '../css/play.css';
import '../css/video-stream.css';
import JSMpeg from "jsmpeg-player";
import 'semantic-ui-css/semantic.min.css'
class Player extends React.Component {
  constructor(props)
	{
		super(props);
	
		this.state = {
			robotConnectionState: 0, // 0 : connecting | 1 : connected | 2 : failed
			videoPanelOpened: true,
			videoSettingsOpened: true,
			cameraCount: 4,
			videoSourceIndex:'',
			screenShotState: 0,
			address :'',
			selected:0
		
		};
		this.onVideoPanelSwitchClicked = this.onVideoPanelSwitchClicked.bind(this);
		
  }
  onVideoPanelSwitchClicked()
	{
		this.setState({videoPanelOpened: !this.state.videoPanelOpened, videoSettingsOpened: true});
	}
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "jsmpeg.js";
    
    script.player = new JSMpeg.Player('ws://localhost:8080', {
    canvas: document.getElementById('mycanvas') 
     });
  
}
  render() {
    return (
      <div id="position">
        <canvas  id="mycanvas" ></canvas> 
      
      </div>
    );
  }
}
export default Player;