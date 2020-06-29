import React from "react";
import AbstractComponent from "./AbstractComponent.js";
import GamepadManager from "../common/GamepadManager.js";
import StateManager from "../common/StateManager";
import Daemon from "../common/Daemon.js";
import ajax from "../common/ajax.js";
import 'semantic-ui-css/semantic.min.css';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
class ControlPanel extends AbstractComponent {
  constructor(props) {
    super(props);
    this.joystick = {};
    this.state = {
      controlState: 0, // 0 : hidden | 1 : disabled | 2 enabled
      batteryLevel: 0,   
      logs: [],
    sensorsStateTemp: "",
    sensorsStateHum: "",
      humidity: "",
 config :[],
    };
    this.logValue = undefined;
    this.onDrag = this.onDrag.bind(this);
    this.submitLog = this.submitLog.bind(this);
    this.closeLogModal = this.closeLogModal.bind(this);
    this.toggleLight = this.toggleLight.bind(this);
    this.toggleAlarm = this.toggleAlarm.bind(this);
    this.gotoDock = this.gotoDock.bind(this);
  }
  init() {
    GamepadManager.init(gamepadState => {
      this.fireEvent("gamepad-state", gamepadState);
    });
  }
  onSocketIOConnected(SocketIOClient) {
    this.subscribeEvent("robot-battery-level", batteryLevel => {
      this.setState({ batteryLevel });
      /*console.log(batteryLevel)*/
    });
    this.subscribeEvent("robot-state", robotState => {
      this.setState({ robotState });
     //console.log({robotState})
    });
    this.subscribeEvent("temperature-state", sensorsStateTemp => {
      this.setState({sensorsStateTemp});
    /*console.log(sensorsStateTemp);*/
  });
  this.subscribeEvent("humidity-state", sensorsStateHum => {
    this.setState({sensorsStateHum});
    });
    this.subscribeEvent("robot-docking-state", docked => {
      this.setState({ docked });
    });
    this.subscribeEvent("pilot-changed", pilot => {
      if (!this.checkSpectator()) {
        const controlState = pilot && pilot.yourself === true ? 2 : 1;
        const lightOn = false;
        this.setState({ controlState, lightOn });
      }
    });
    this.subscribeEvent("pilot-remaining-time", time => {
      this.setState({ remainingTime: time });
    });
    SocketIOClient.emit("robot-battery-level-request");
    SocketIOClient.emit("robot-state-request");
    SocketIOClient.emit("robot-docking-state-request");
  SocketIOClient.emit("temperature-state-request");
  SocketIOClient.emit("humidity-state-request");
  }
   onDrag(x, y) {
    this.joystick.x = x;
    this.joystick.y = y;
    if (x !== 0 || y !== 0) {
      if (!this.daemon) {
        this.daemon = new Daemon(
          "sending-joytick-values",
          0,
          500,
          undefined,
          () => {
            ajax("POST", "robot/move", {
              x: this.joystick.y,
              y: -this.joystick.x
            });
          }
        );
      }
    } else if (this.daemon) {
      this.daemon.running = false;
      this.daemon = undefined;
    }
  }
  turnBy(theta) {
    ajax("POST", "robot/turn-by", { theta });
  }
  terminate() {
    GamepadManager.terminate();
  }
  toggleLight() {
    ajax("POST", "robot/light", { state: !this.state.lightOn });
    this.setState({ lightOn: !this.state.lightOn });
  }
  toggleAlarm() {
    ajax("POST", "robot/siren", { state: !this.state.alarmOn });
    this.setState({ alarmOn: !this.state.alarmOn });
  }
  closeLogModal() {
    this.setState({ displayLogModal: false });
    this.logValue = undefined;
  }
  submitLog() {
    if (this.logValue) {
      ajax("POST", "robot/log", { data: this.logValue });
    }
    this.closeLogModal();
  }
  checkSpectator() {
    return StateManager.get("logged-user").profile === "profile.spectator";
  }
  /*componentDidMount(){
    this.getState();
  /*}
  _addLog(timestamp, text)
  {
    let logs = this.state.logs;
    logs.unshift(timestamp + ' - ' + text);
    ajax('GET', 'robot/log', null, ( logs ) =>
    { console.log("fonction ok")
    if (logs.length > 5)
    {
      logs = logs.slice(0, 5);
    }
    console.log(logs)
    this.setState({ logs });
  });
  }*/
  gotoDock() {
    ajax("POST", "robot/goto-dock", null, () => {
      this.fireEvent("goto-dock");
    });
  }
  render() {
    
    return (
      <div >
        <div >
        <svg  xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" height="550" width="2000">
         <ellipse cx="850" cy="305" rx="150" ry="40" id="manual-button" />
         <KeyboardArrowRightIcon width="50" height="40" x="950" y="270" clip-path="url(#manual-button)" style={{fill: "white" }}/>
         <KeyboardArrowLeftIcon width="50" height="40" x="700" y="270" clip-path="url(#manual-button)" style={{fill: "white" }}/>
         <KeyboardArrowDownIcon width="50" height="40" x="820" y="300" clip-path="url(#manual-button)" style={{ fill: "white" }}/>
         <KeyboardArrowUpIcon width="50" height="40" x="820" y="250" clip-path="url(#manual-button)" style={{fill: "white" }}/>
         <circle cx="630" cy="300" r="25"   fill="#5D67FF" id="circleViewA" />
         <UndoIcon  width="30" height="30" x="610" y="280"  clip-path="url(#circleViewA)" style={{fill: "white" }}/>
         <circle cx="1070" cy="295" r="25"   fill="#5D67FF" id="circleViewB" />
         <RedoIcon width="30" height="30" x="1050" y="280"  clip-path="url(#circleViewB)" style={{ fill: "white" }}/>
            </svg>
         </div>
      </div>
    );
  }
}
export default ControlPanel;