import React from 'react';
import {Icon} from 'semantic-ui-react';
//import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import Alert from '@material-ui/lab/Alert';

class BatteryIndicator extends React.Component
{
/*
    Props:
        level      : int - Charging level, between 0 and 100
        charging   : boolean
        robotState : string
*/
    constructor(props)
    {
        super(props);
        this.state = { setOpenB :true,setOpenA:true,open:true, setOpen:false, secondaryColor:'white',date: new Date()};
    }
    componentWillReceiveProps(nextProps)
    {
        let {level} = nextProps;
        if (level && level !== this.props.level)
        {
            // HSL color with hue value from red (0) to green (120)
            let mainColor = 'hsl(' + (level / 100 * 120) +', 80%, 45%)';
            let secondaryColor = 'none';
            this.setState({mainColor, secondaryColor });
        }
    }
    hideAlert() {
        this.setState({
          setOpenA: false,
        });}
        hideAlertB() {
            this.setState({
              setOpenB: false,
            });}
        componentDidMount() {
            setInterval(() => {
              this.setState({ setOpenA: true})
            }, 60000);
            setInterval(() => {
                this.setState({ setOpenB: true})
              }, 3600000);
            }
    render()
    {
        if( this.state.setOpenA && this.state.setOpenB){
            if (this.props.batteryLevel <  40 || this.props.sensorsStateHum <20 ) {
        return (
            <div>
            <div id="size">
                {/* <svg >
                    <path  stroke={this.state.mainColor} strokeWidth="2" strokeMiterlimit="20" fill={this.state.secondaryColor}
                     d="M16.67 4H15V2H9v2H7.33A1.33 1.33 0 0 0 6 5.33v15.33C6 21.4 6.6 22 7.33 22h9.33c.74 0 1.34-.6 1.34-1.33V5.33C18 4.6 17.4 4 16.67 4M11 20v-5.5H9L13 7v5.5h2" fill="white"/>
                <rect id='battery-indicator-level' stroke="none" fill={this.state.mainColor} x="3" y="3" width={this.props.level/100 * 41.5} height="19" rx="1" />
                   <path id='battery-indicator-power' hidden={!this.props.charging} stroke={this.state.mainColor} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="rgb(255, 255, 255)" d="M 8.57,17.82 L 26.44,6.89 25.86,11.84 39.43,6.89 21.56,17.82 22.14,12.87 8.57,17.82 Z M 8.57,17.82" />
                </svg> */}
                <Icon name="battery full" rotated='counterclockwise' inverted style={{ fontSize: 20}}/>
{/*                 <BatteryChargingFullIcon inverted style={{ color :"white" ,fontSize: 30}}/>
 */}                <input type="text2" disabled="disabled" value={this.props.batteryLevel+'%'}  name="name" /></div>
  <div id='alert' >
 <Alert   open={this.state.setOpen} onClose={() => this.hideAlert()}  variant="filled"  icon={<Icon name='battery quarter
' inverted style={{ color :"white" ,fontSize: 30}}/>}severity="error" dismissible
   >
       <div id='time'>
   {this.state.date.toLocaleTimeString()}<br></br>
    Batterie faible</div>
 </Alert>
</div>
</div>
        );
    }
else{
    return (
    <div>
    <div id="size">
        {/* <svg >
            <path  stroke={this.state.mainColor} strokeWidth="2" strokeMiterlimit="20" fill={this.state.secondaryColor}
             d="M16.67 4H15V2H9v2H7.33A1.33 1.33 0 0 0 6 5.33v15.33C6 21.4 6.6 22 7.33 22h9.33c.74 0 1.34-.6 1.34-1.33V5.33C18 4.6 17.4 4 16.67 4M11 20v-5.5H9L13 7v5.5h2" fill="white"/>
        <rect id='battery-indicator-level' stroke="none" fill={this.state.mainColor} x="3" y="3" width={this.props.level/100 * 41.5} height="19" rx="1" />
           <path id='battery-indicator-power' hidden={!this.props.charging} stroke={this.state.mainColor} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="rgb(255, 255, 255)" d="M 8.57,17.82 L 26.44,6.89 25.86,11.84 39.43,6.89 21.56,17.82 22.14,12.87 8.57,17.82 Z M 8.57,17.82" />
        </svg> */}
        <Icon name="battery full" rotated='counterclockwise' inverted style={{ fontSize: 20}}/>
{/*                 <BatteryChargingFullIcon inverted style={{ color :"white" ,fontSize: 30}}/>
*/}                <input type="text2" disabled="disabled" value={this.props.batteryLevel+'%'}  name="name" /></div>
<div id='alert' >
<Alert   open={this.state.setOpen} onClose={() => this.hideAlertB()}  variant="filled"  icon={<Icon name='battery quarter
' inverted style={{ color :"white" ,fontSize: 30}}/>}severity="info" dismissible
>
<div id='time'>
{this.state.date.toLocaleTimeString()}<br></br>
Batterie chargée</div>
</Alert>
</div>
</div>
);}
}
    return (
        <div id="size">
            {/* <svg >
                <path  stroke={this.state.mainColor} strokeWidth="2" strokeMiterlimit="20" fill={this.state.secondaryColor}
                 d="M16.67 4H15V2H9v2H7.33A1.33 1.33 0 0 0 6 5.33v15.33C6 21.4 6.6 22 7.33 22h9.33c.74 0 1.34-.6 1.34-1.33V5.33C18 4.6 17.4 4 16.67 4M11 20v-5.5H9L13 7v5.5h2" fill="white"/>
            <rect id='battery-indicator-level' stroke="none" fill={this.state.mainColor} x="3" y="3" width={this.props.level/100 * 41.5} height="19" rx="1" />
               <path id='battery-indicator-power' hidden={!this.props.charging} stroke={this.state.mainColor} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="rgb(255, 255, 255)" d="M 8.57,17.82 L 26.44,6.89 25.86,11.84 39.43,6.89 21.56,17.82 22.14,12.87 8.57,17.82 Z M 8.57,17.82" />
            </svg> */}
            <Icon name="battery full" rotated='counterclockwise' inverted style={{ fontSize: 20}}/>
{/*                 <BatteryChargingFullIcon inverted style={{ color :"white" ,fontSize: 30}}/>
*/}                <input type="text2" disabled="disabled" value={this.props.batteryLevel+'%'}  name="name" />
        </div>
    );}
}
export default BatteryIndicator;