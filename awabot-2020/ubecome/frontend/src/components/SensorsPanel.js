import React from "react";
import AbstractComponent from "./AbstractComponent.js";
import BatteryIndicator from "./BatteryIndicator";
import GamepadManager from "../common/GamepadManager.js";
import Temperature from "./Temperature.js";
import Humidity from "./Humidity.js";

class SensorsPanel extends AbstractComponent
{
    constructor(props)
    {
        super(props);
            this.state = {
                controlState: 0, // 0 : hidden | 1 : disabled | 2 enabled
                batteryLevel: 0,
                logs: [],
                sensorsStateTemp: "",
                sensorsStateHum: "",
                humidity: "",
           config :[],
              };
            }
            init() {
              GamepadManager.init(gamepadState => {
                this.fireEvent("gamepad-state", gamepadState);
              });
            }
            onSocketIOConnected(SocketIOClient) {
              this.subscribeEvent("robot-battery-level", batteryLevel => {
                this.setState({ batteryLevel });
                //console.log(batteryLevel)
              });
              this.subscribeEvent("robot-state", robotState => {
                this.setState({ robotState });
               //console.log({robotState})
              });
              this.subscribeEvent("temperature-state", sensorsStateTemp => {
                this.setState({sensorsStateTemp});
               // console.log(sensorsStateTemp);
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
    render()
    {
       
        return (
            <div id="menu-tools">
                <p id="blink">Résultats Actuelles</p>
        <Humidity sensorsStateHum={this.state.sensorsStateHum}/>
        <Temperature  sensorsStateTemp={this.state.sensorsStateTemp} />
           <BatteryIndicator
            batteryLevel={this.state.batteryLevel}
          />
{           <div style={{ fontSize: 25,color: "white" ,paddingLeft:71,paddingTop: 0.5,position:'absolute'}}>|</div>
 }
         <div id='state-robot'>
         <input type="texte3" disabled="disabled" value={this.state.robotState}  />
                </div>
                </div>
        );
    }
}
export default SensorsPanel;