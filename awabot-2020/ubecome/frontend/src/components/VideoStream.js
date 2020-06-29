import React from 'react';
import dateFormat from 'dateformat';
import {Loader, Icon} from 'semantic-ui-react';
import AbstractComponent from './AbstractComponent.js';
import tools from '../common/tools.js';
import i18n from '../i18n/i18n.js';
import '../css/video-stream.css';
import { videoSettings } from '../common/config';
import SocketIOClient from '../common/SocketIOClient.js';
import ajax from '../common/ajax';
import noVideo from '../assets/no-video.png';
import io from 'socket.io-client';
import Play from './Play.js'
import JSMpeg from "jsmpeg-player";


class VideoStream extends AbstractComponent
{
	constructor(props)
	{
		super(props);
		this.socket = io();
		this.state = {
			robotConnectionState: 0, // 0 : connecting | 1 : connected | 2 : failed
			videoPanelOpened: true,
			videoSettingsOpened: false,
			cameraCount:4,
			videoSourceIndex:1,
			videoConfigIndex: videoSettings.defaults.qualityIndex,
			screenShotState: 0,
			address :'',
		};
		this.checkRobotConnection = this.checkRobotConnection.bind(this);
		this.onVideoPanelSwitchClicked = this.onVideoPanelSwitchClicked.bind(this);
		this.onSettingsClicked = this.onSettingsClicked.bind(this);
		this.onRecordClicked = this.onRecordClicked.bind(this);
		this.onScreenShotClicked = this.onScreenShotClicked.bind(this);
		this.onMultiScreenShotClicked = this.onMultiScreenShotClicked.bind(this);
		this.canvasRef = React.createRef();
	}
	init()
	{
		ajax('GET', 'robot/config', null, (resp) =>
		{
			if(resp.ok && resp.data)
			{
				this.setState({robotConfig: resp.data.config});
			}
		});
		this.subscribeEvent('start-recording-response', (ok) =>
		{
			this.startRecordingCallback(ok);
			this.startRecordingCallback = undefined;
		});
		this.subscribeEvent('pilot-recording-remaining-time', (recordingRemainingTime) =>
		{
			this.setState({recordingRemainingTime});
		});
		this.subscribeEvent('pilot-recording-stopped', (recordedVideoURL) =>
		{
			this.setState({recordedVideoURL, recordingRemainingTime: undefined});
			if(this.stopRecordingCallback)
			{
				this.stopRecordingCallback(recordedVideoURL !== undefined);
				this.stopRecordingCallback = undefined;
			}
		});
	}
	componentDidMount()
	{
		this.checkRobotConnection(2);
		
	}
	checkRobotConnection(retryCount)
	{
		if (this.state.robotConnectionState === 0)
		{
			//ajax("GET", "test/toto", null, (response) =>
			this.connectionTester(retryCount, (response) =>
			{
				if (response === true)
				{
					this.setState({robotConnectionState: 1});
				}
				else if (retryCount === 0)
				{
					this.setState({robotConnectionState: 2});
				}
			});
			if (retryCount > 0)
			{
				setTimeout(this.checkRobotConnection, 2000, retryCount-1);
			}
		}
	}
	connectionTester(count, callback)
	{
		if (count>0)
		{
			callback(true);
		}
		else
		{
			callback(true);
		}
	}
	onVideoPanelSwitchClicked()
	{
		this.setState({ videoSettingsOpened: true});
		console.log('ok')
	}
	generateCameraURL1(camera, resolution, compression)
	{
		if(this.state.robotConfig)
		{ 
			const {port} = this.state.robotConfig;
           
			let url = ' http://10.78.51.201:'+ port.camera + '/axis-cgi/mjpg/video.cgi?camera=' + camera;
            url += '&resolution=' + resolution;
            url += '&compression=' + compression;
	
	
			return url
				 
		}
		else
		{
			return ''
		}
	}
	generateScreenshotFileName()
	{
		return 'Screenshot_' + dateFormat(new Date(), 'dd.mm.yyyy_HH.MM.ss.l');
	}
	onScreenShotClicked(cb)
	{
		const img = document.createElement('img');
		const timeoutHandler = setTimeout(() => cb(false), 9000);
		img.addEventListener('load', () =>
		{
			const canvas = document.createElement('canvas');
			canvas.width = 800;
			canvas.height = 600;
			canvas.getContext('2d').drawImage(img, 0, 0, 800, 600);
			tools.screenshot(canvas.toDataURL('image/jpeg'), this.generateScreenshotFileName() + '.jpg');
			clearTimeout(timeoutHandler);
			cb(true);
		});
		img.addEventListener('error', () =>
		{
			clearTimeout(timeoutHandler);
			cb(false);
		});
		img.src = '/api/robot/screenshot/' + this.state.videoSourceIndex + '?t=' + Date.now();
	}
	onMultiScreenShotClicked(cb)
	{
		const fileName = this.generateScreenshotFileName();
		const timeoutHandler = setTimeout(() => cb(false), 9000);
		const url = window.location.origin + '/api/robot/screenshot?fileName=' + fileName;
		tools.blobURLfromURL(url, (blobURL) =>
		{  
			clearTimeout(timeoutHandler);
			if(blobURL)
			{
				tools.download(blobURL, fileName + '.zip');
				cb(true);
			}
			else
			{
				cb(false);
			}
			
		});
		console.log("url",url)
	}
	onSettingsClicked()
	{
		this.setState({videoSettingsOpened: !this.state.videoSettingsOpened});
	}
	startRecording(cb)
	{
		this.startRecordingCallback = cb;
		SocketIOClient.emit('start-recording', this.state.videoSourceIndex);
	}
	stopRecording(cb)
	{
		this.stopRecordingCallback = cb;
		SocketIOClient.emit('stop-recording');
	}
	onRecordClicked(cb)
	{
		if(!this.state.recordingRemainingTime)
		{
			this.startRecording(cb);
		}
		else
		{
			this.stopRecording(cb);
		}
	}
	handlePlay = () => {
		this.setState({isPlaying: true});
	  };
	  handlePause = () => {
		this.setState({isPlaying: false});
	  };
	  
	  handleVolume = value => {
		this.setState({volume: value});
	  };

	render()
	{ 
		if (this.state.robotConnectionState === 1)
		{
			let videoThumbnails = [];
			let currentVideoConfig = videoSettings.qualityConfigs[this.state.videoConfigIndex];
			let videoSettingsItems = [<div className='video-settings-title' key='video-quality-title'>{i18n.get('video-settings.title')}</div>];
			
			
			for(let i =4; i <= this.state.cameraCount; i++)
			{
				const src1= "jsmpeg.js"
				const src2 = this.state.videoPanelOpened ? new JSMpeg.Player('ws://localhost:8080', {
					canvas: document.getElementById('canvas') 
					 }):noVideo
console.log(src1,src2)
				videoThumbnails.push(
				<canvas id="canvas" className={'video-item' + (this.state.videoSourceIndex === 5? ' selected' : '')} onClick={() => this.setState({videoSourceIndex: 5})} alt={'camera ' + 5 + ' - no signal'} key={5}>
</canvas> );
					
				}
			for(let i = 1; i <= this.state.cameraCount; i++)
			{ 
				
				const src = this.state.videoPanelOpened ? this.generateCameraURL1(i, videoSettings.thumbNail.videoResolution, videoSettings.thumbNail.videoCompression) : noVideo;
				videoThumbnails.push(<img className={'video-item' + (this.state.videoSourceIndex === i ? ' selected' : '')} src={src} onClick={() => this.setState({videoSourceIndex: i})} alt={'camera ' + i + ' - no signal'} key={i} />);
			}
			

			for (let index = 0; index < videoSettings.qualityConfigs.length; index++)
			{
				videoSettingsItems.push(
					<div className={'video-settings-item' + (this.state.videoConfigIndex === index ? ' selected' : '')} key={index} onClick={() => this.setState({videoConfigIndex: index, videoSettingsOpened: false})}>
						{i18n.get(videoSettings.qualityConfigs[index].name)}
					</div>
				);
			}
			const videoPlayer = [];
			if(this.state.recordedVideoURL)
			{
				videoPlayer.push();
			}
			const videoRecording = [];
			if(this.state.recordingRemainingTime)
			{
				videoRecording.push(
					<div id='video-recording' key={0}>
						<div>
							<Icon name={'circle'} style={{color: 'red'}} size='large' />
						</div>
						<div id='video-recording-time'>
							{tools.secToMinSec(this.state.recordingRemainingTime)}
						</div>
					</div>
				);
			}
			const videoimg = [];
			if(this.state.videoSourceIndex === 5)
			{
				videoimg.push(
					
					<div id='main-video-container1'>
						
						
<Play></Play>
</div>
				);
			}
			else {
				videoimg.push(
					
					<div id='main-video-container'>
						
						
						<img id='main-video' src={this.generateCameraURL1(this.state.videoSourceIndex, currentVideoConfig.videoResolution, currentVideoConfig.videoCompression)} onClick={() => this.setState({videoPanelOpened: false, videoSettingsOpened: false})} alt='main-video' />
					</div>
				);
			}
			return (
				<div  id='video-stream-container'>
					{videoimg}
				
				
					

					<div id='video-multiple-panel'>
					
					<div id='video-panel'>
						<div id='video-panel-switch'  onClick={this.onVideoPanelSwitchClicked}>
							<div id="scrollbar-mask">
								<div >
									{videoThumbnails}
								</div>
							</div>

						</div>
					</div>
					{videoRecording}
                    {videoPlayer}
				</div>
				
               
                    

				</div>
			);
		}
		else
		{
			return (
				<div id='video-stream-container'>
					<div id='video-overlay'>
						<div id='video-overlay-content'>
							<Loader active size='large' key='loader' />
							<div className='connecting-message' hidden={(this.state.robotConnectionState !== 0)} >{i18n.get('robot-connection.connecting')}</div>
							<div className='connection-failed-message' hidden={(this.state.robotConnectionState !== 2)} >{i18n.get('robot-connection.failed')}</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
export default VideoStream;