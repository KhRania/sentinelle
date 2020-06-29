import React from "react";
import "../css/main.css";
import {Icon} from 'semantic-ui-react';
import Alert from '@material-ui/lab/Alert';
class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {setOpenB:true, setOpenA:true,open:true, setOpen:false, secondaryColor:'white',date: new Date()};
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
 /* HandleClick1() {
    Swal.fire({
      title: "Alert Temperature",
      html:
        "<b>La temperature atteinte la valeur MIN</b>: " +
        this.props.sensorsStateTemp,
      imageUrl: "temGif4.gif"
    });
  }*/
;
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
       if(this.props.sensorsStateTemp > 30 || this.props.sensorsStateTemp <15 ){
      return (
        <div id="temperature-tools" >
        <Icon name="thermometer"   inverted style={{ marginRight:10 ,fontSize: 30}} ></Icon>
        <input
           disabled="disabled"
           type="texte"
           value={this.props.sensorsStateTemp+'%'}
           name="name"
         />
             <div style={{ fontSize: 25,color: "white" ,marginLeft:94,marginRight:90,position:'absolute'}}>|  <div id='alert-temp'>
             <Alert  onClose={() => this.hideAlert()}
             icon={<Icon name='thermometer empty
' inverted style={{ color :"white" ,fontSize:35,paddingTop:7}}/>} variant="filled" open={this.state.open}  severity="error"
   >
<div id='time'>     {this.state.date.toLocaleTimeString()}<br></br>
   La temperature est maximal</div>
   </Alert></div>
 </div></div>
      );
      }
        else {
        return (
          <div id="temperature-tools" >
          <Icon name="thermometer"   inverted style={{ marginRight:10 ,fontSize: 30}} ></Icon>
          <input
             disabled="disabled"
             type="texte"
             value={this.props.sensorsStateTemp+'%'}
             name="name"
           />
               <div style={{ fontSize: 25,color: "white" ,marginLeft:94,marginRight:90,position:'absolute'}}>|  <div id='alert-temp'>
               <Alert  onClose={() => this.hideAlertB()}
               icon={<Icon name='thermometer empty
  ' inverted style={{ color :"white" ,fontSize:35,paddingTop:7}}/>} variant="filled" open={this.state.open}  severity="info"
     >
  <div id='time'>     {this.state.date.toLocaleTimeString()}<br></br>
     La temperature est normal</div>
     </Alert></div>
   </div></div>
        );
        }
    }
        return (
      <div id="temperature-tools" >
       <Icon name="thermometer"   inverted style={{ marginRight:10 ,fontSize: 30}} ></Icon>
       <input
          disabled="disabled"
          type="texte"
          value={this.props.sensorsStateTemp+'%'}
          name="name"
        />
            <div style={{ fontSize: 25,color: "white" ,marginLeft:94,marginRight:90,position:'absolute'}}>|</div>
       </div>
    );
  }
}
export default Temperature;