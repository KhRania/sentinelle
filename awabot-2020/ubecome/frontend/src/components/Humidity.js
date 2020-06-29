import React from 'react';
import '../css/main.css';
import Swal from "sweetalert2";
import Alert from '@material-ui/lab/Alert';
import {Icon} from 'semantic-ui-react';
class Humidity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {setOpenB: true, open:true, setOpen:false, secondaryColor:'white',date: new Date(),setOpenA:true};
        this.HandleClick = this.HandleClick.bind(this);
      }
      hideAlert() {
        this.setState({
          setOpenA: false,
        });
      }
      hideAlertB() {
        this.setState({
          setOpenB: false,
        });}
      HandleClick() {
        Swal.fire({
          title: "Alert Hydrometry ",
          html:
            "<b>The Hydrometry reaches the MAX value </b>: " +
            this.props.sensorsStateHum,
          imageUrl: "HumGif4.gif"
        });
      }
      componentDidMount() {
        setInterval(() => {
          this.setState({ setOpenA: true})
        }, 60000);
        setInterval(() => {
          this.setState({ setOpenB: true})
        }, 3600000);
        }
  render() {
    if( this.state.setOpenA && this.state.setOpenB){
    if (this.props.sensorsStateHum >  30 || this.props.sensorsStateHum <15) {
      return(
        <div  id="Humidity-tools">
              <Icon name="tint" inverted style={{ marginRight:10 ,fontSize: 30}}></Icon>
              <input type="text1" disabled="disabled" value={this.props.sensorsStateHum+'°'}  name="name" />
               <div style={{ fontSize: 25,color: "white" ,marginLeft:90,marginRight:90,paddingTop: 0.5,position:'absolute'}}>| <div id='alert-hum'>
                <Alert  onClose={() => this.hideAlert()}
                    icon={<Icon name='tint' inverted style={{ color :"white" ,fontSize:35,paddingTop:4}}/>} variant='filled'open={this.state.open}  severity="error">
                 <div id='time'>
                 {this.state.date.toLocaleTimeString()}<br></br>
                 L'humidité  est maximale</div>
                 </Alert>
                 </div>
 </div>
        </div>
    );
      }
    else{
      return(
        <div  id="Humidity-tools">
              <Icon name="tint" inverted style={{ marginRight:10 ,fontSize: 30}}></Icon>
              <input type="text1" disabled="disabled" value={this.props.sensorsStateHum+'°'}  name="name" />
               <div style={{ fontSize: 25,color: "white" ,marginLeft:90,marginRight:90,paddingTop: 0.5,position:'absolute'}}>| <div id='alert-hum'>
                <Alert  onClose={() => this.hideAlertB()}
                    icon={<Icon name='tint' inverted style={{ color :"white" ,fontSize:35,paddingTop:4}}/>} variant='filled'open={this.state.open}  severity="info">
                 <div id='time'>
                 {this.state.date.toLocaleTimeString()}<br></br>
                 L'humidité  est normal</div>
                 </Alert>
                 </div>
 </div>
        </div>
    );
    }}
    return(
      <div  id="Humidity-tools">
            <Icon name="tint" inverted style={{ marginRight:10 ,fontSize: 30}}></Icon>
            <input type="text1" disabled="disabled" value={this.props.sensorsStateHum+'°'}  name="name" />
             <div style={{ fontSize: 25,color: "white" ,marginLeft:90,marginRight:90,paddingTop: 0.5,position:'absolute'}}>|
</div>
      </div>
    );}
}
export default Humidity;