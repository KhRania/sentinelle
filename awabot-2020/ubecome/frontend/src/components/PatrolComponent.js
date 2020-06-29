import React from 'react';
import {Icon,Button} from 'semantic-ui-react';
import SimpleChart from './PatrolChart.js'
//import {TableBody} from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import "../css/patrol.css";
import ajax from "../common/ajax";

class PatrolComponent extends React.Component
{ constructor(props) {
  super(props);
  this.toggleHidden = this.toggleHidden.bind(this);
  this.state = { data:[],modalOpen: false ,selected:'',editingId:"",patrols:[]
   }}
    close = () => this.setState({ open: false })
      componentDidMount() {
        /*fetch('http://localhost:40054/patrol')
        .then(response => response.json())
        .then(success => { //console.log('')
                  let obj = success.listpatrol.patrols
                  this.setState({
                    patrols: obj});
              })*/
             
               this.GetPatrols();
                }
                GetPatrols()
    {
      ajax('GET', 'robot/patrol', null, ( patrols ) =>
      {   
       
       
            let obj = patrols.patrols
      console.log(obj)
            this.setState({
                patrols: obj});
               

        })
    }

              toggleHidden = key1 => {
                this.setState({  selected: key1 }) ;
                console.log("key",key1);
                };
                toggleHidden1 = key => {
                  this.setState({editingId: key});
                  this.setState({  selected: key });
                  this.setState({ modalOpen: true });
                  console.log("ok")
                  };
                close = () => this.setState({ modalOpen: false })
    render(){
      const x2= this.state.patrols.map((patrol,key) => {

        return ( <div>
        {patrol.points.map((c, i) => {
          return(<div>
            {this.state.selected === c.id &&<SimpleChart c={c}></SimpleChart>
        }
          </div>
        )
      } )
          }
          </div>
          ) });
      const x1= this.state.patrols.map((patrol,t) => {
        return (
                 
        <div key={t}>
          <tr   id="tr">
          <td id="idtd1">{patrol.name}</td>
          
         <td><Button  icon   labelPosition='left' id='bottonedit1'  onClick={() => this.toggleHidden(t)}>
               Show details
              <Icon name='edit' color="gray" />
         </Button></td> </tr> 
          { this.state.selected === t &&     <table id="tableDetails">
            <tbody>
              <tr id="table-header"><td>Name Patrol</td>
               <td>Point de patrol </td></tr>
          <tr id="idtd">
            <td id="idtd">{patrol.name}</td>
        {patrol.points.map((val, i) => {
          return (
           <div id="idtd" >
           
           {!this.state.opened && this.state.selected === t &&
                      <tr >
                        <td >ID_Point:</td>
                        <td >{val.id}</td>
                       <td ><Button icon   basic color='purple' id='bottonedit2' labelPosition='left' onClick={() => {this.toggleHidden1(val.id)}}><Icon name='chart bar' />chart</Button></td>
                      </tr>}
                  
           </div>
        )}
        )
          }
          </tr></tbody>
          </table>}
          </div>
          ) });
        /*  const editIconduplicate = (
      <Button  icon labelPosition='left' id='bottondeplicate'>
                    Duplicate
      <Icon name='clone' color='grey' />
    </Button>
          );
          const editIconedit = (
      <Button  icon labelPosition='left' id='bottonedit'>
                 Show details
      <Icon name='edit' color="gray" />
    </Button>
          );
          const editIcondelate = (
      <Button  icon labelPosition='left' id='bottondelate'>
                  Delete
      <Icon name='delete' color="gray" />
    </Button>
          );
          const patrolIcon = (
            <img src="icon.png" id="img" alt="logo temperature" />
          );*/
        return(
            <div >
                <style>
          {`
              .TableRow:hover {
                background-color: #ddd !important;
        }
              .menuItem {
                background-color: transparent !important;
              }
          `}
</style>
            <div id='add-container'>
        </div>
<div id='table-container'>
<MuiThemeProvider>
    <center>
    <table>
                    <tbody id='table-style-patrol'  >
                     <tr >
                   
                        <td >{x1}</td>  
                    </tr>
                          </tbody>
                          <center>{x2}</center>

                       </table>
</center>

</MuiThemeProvider>
</div>

           
         
</div>
        );
    }
}
export default PatrolComponent;