import React from "react";
import "../css/map-component.css";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import AbstractComponent from "./AbstractComponent";
import { Loader } from "semantic-ui-react";
import { mapSettings } from "../common/config";
import ajax from "../common/ajax";
import "../css/main.css";
import Ripples from "react-ripples";
import GamepadManager from "../common/GamepadManager.js";
import {Button} from 'semantic-ui-react';
import SimpleChart from './PatrolChart.js'
import { withRouter } from 'react-router-dom';

import {Form, Modal} from 'semantic-ui-react';
//import {TableBody} from 'material-ui';
//import { MuiThemeProvider } from 'material-ui/styles';
import "../css/patrol.css";

import i18n from '../i18n/i18n.js';

class MapComponentPatrol extends AbstractComponent {
  static PATROLMAPCHART ='PatrolMapChart';
  static PATROLMODDAL = 'PatrolModal';

  constructor(props) {
    super(props);

    this.state = {
      shouldFollowTarget: mapSettings.defaults.shouldFollowTarget,
      miniatureOpen: true,
      theta: undefined,
      x: undefined,
      y: undefined,
      mapWidth: undefined,
      mapHeight: undefined,
      positionX: 0,
      positionY: 0,
      animate: true,
      patrol: [],
      goal_x: undefined,
      goal_y: undefined,
      goal_id: undefined,
      zones: [],
      data:[],
      data1:[],
      points: [],
      path: [],
      patrols:[],
      modalOpen: false,
      editingId:"",
      childVisible: false

      
    };

    this.map = undefined;
    this.minScaleFactor = mapSettings.defaults.minScaleFactor;
    this.maxScaleFactor = mapSettings.defaults.maxScaleFactor;
    this.scaleFactor = undefined;
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  init() {
    GamepadManager.init(gamepadState => {
      this.fireEvent("gamepad-state", gamepadState);
    });
  }

  onSocketIOConnected(socketIO,SocketIOClient) {
    ajax("GET", "robot/map/size", null, response => {
      if (response.ok) {
        this.setState({
          mapWidth: response.data.width,
          mapHeight: response.data.height
        });

        this.subscribeEvent("robot-position", newCoords => {
          const { x, y, theta } = this.processRobotCoord(newCoords);

          this.setState({ x, y, theta });

          if (this.map && this.state.shouldFollowTarget) {
            this.map.setPointOnViewerCenter(x, y, this.scaleFactor);
          }
        });

        

      this.subscribeEvent("robot-goal", Coords => {
          const { goal_x, goal_y, goal_id } = this.processRobotCoordGoal(Coords) ;

          this.setState({ goal_x, goal_y, goal_id});
         
          
        })

        socketIO.emit("robot-goal-request");

        this.subscribeEvent("robot-state", robotState => {
          this.setState({ robotState });
        })
        
       

       



      } else {
        console.log("Error trying to retrieve map info");
      }
    });
  }

  componentDidMount() {
    /*fetch('http://127.0.0.1:40054/patrol')
			
    .then(response => response.json())
    .then(success => { //console.log('')
         
              let obj = success.listpatrol.patrols
              this.setState({
                  patrols: obj});
                 

          })*/
          this.GetPatrols();
		
           this.GetArea()
         
            }



  processRobotCoordGoal(Coords) {
    if(Coords.goal_x !== 0 && Coords.goal_y !==0 && Coords.goal_theta !== 0)
   {
    return {
     // goal_theta: (-Coords.goal_theta * 180) / Math.PI,
      goal_x: Coords.goal_x,
      goal_y: this.state.mapHeight - Coords.goal_y,
     data1:this.state.data.map(dataitems=>{ 
      let d = [` M${dataitems[1].x},${(this.state.mapHeight)-(dataitems[1].y)}
      H${dataitems[2].x}
      V${(this.state.mapHeight)-dataitems[3].y}
      H${dataitems[1].x}
      L${dataitems[1].x},${(this.state.mapHeight)-(dataitems[1].y)}`];
      
      this.state.path.push(d)
      })
    };
  }
}

toggleHidden1 = key => {
  this.setState({editingId: key});
  this.setState({  selected: key });
  this.setState({ modalOpen: true });
  this.props.history.push('/PatrolMapChart');

  };
close = () => this.setState({ modalOpen: false })


  processRobotCoord(newCoords) {
    return {
      theta: (-newCoords.theta * 180) / Math.PI,
      x: newCoords.x,
      y: this.state.mapHeight - newCoords.y
    };
  }

  onChangeValue = value => {
    if (this.scaleFactor !== value.a) {
      this.scaleFactor = value.a;
    }

    this.setState({ miniatureOpen: value.miniatureOpen });
  };

  onToggleTargetLock = () => {
    if (!this.state.shouldFollowTarget) {
      this.map.setPointOnViewerCenter(
        this.state.x,
        this.state.y,
        this.scaleFactor
      );
    }

    this.setState({ shouldFollowTarget: !this.state.shouldFollowTarget });
  };

  onMouseMove(e) {
    const evt = e.target;
  
    const position = evt.getBoundingClientRect();
    const x = parseInt(e.nativeEvent.clientX - position.left, 10);
    const y = parseInt(
      this.state.mapHeight - (e.nativeEvent.clientY - position.top),
      10
    );

    this.setState({
      positionX: x,
      positionY: y
    });

    ajax("POST", "robot/goto", {
      x,
      y
    });
  }
 
  
 GetArea()
    {   
      ajax('GET', 'robot/area', null, ( zones ) =>
      {   
       
       let zonepoints=[];
      
     //console.log(zones.zones)


    var arr = [];
    let id
for (var key in zones.zones) {
  id = zones.zones[key].points;
  
arr.push(id);
//console.log(arr)
  
}




      for (let i in arr){
        
          let obj={
            type:zones.zones[i].type,
            points: zones.zones[i].points,
            
          }
          
          
        
              for(let j in obj.points)
              { 
                let obj2={
                x:obj.points[j].x,
                y:obj.points[j].y
              
              }
             
               zonepoints.push(obj2)
               
             }                 
             
      }
     
        
        this.setState({points:  zonepoints} );
     this.setState({data:  arr} );
    
  
    
     })
     //console.log(this.state.data)
     

    } 
     /*GetArea()
    {  
      fetch('http://localhost:4002/area')
			
			.then(response => response.json())
			.then(success => { console.log('')
     let zones= success.languages
       let zonepoints=[];
    


    var arr = [];
    let id
for (var key in zones.zones) {
  id = zones.zones[key].points;
  
arr.push(id);
//console.log(arr)
  
}

   

//let test=this.state.data[key];
//console.log(test)   

//path.push(d)
//console.log("gfhgfhdghgh",arr)
      for (let i in arr){
        
          let obj={
            type:zones.zones[i].type,
            points: zones.zones[i].points,
            
          }
          
          //console.log(obj)
          //let arr
         // arr = Object.keys(obj.points).map(key => ({ key, value: obj.points[key] }));
         // console.log(arr)
        
              for(let j in obj.points)
              { 
                let obj2={
                x:obj.points[j].x,
                y:obj.points[j].y
              
              }
             
               zonepoints.push(obj2)
               
             }                 
             
      }
     
        
        this.setState({points:  zonepoints} );
     this.setState({data:  arr} );
    
  
    
     })
     //console.log(this.state.data)
     

    }  */
   
    GetPatrols()
    {
      ajax('GET', 'robot/patrol', null, ( patrols ) =>
      {   
       
       
            let obj = patrols.patrols
            this.setState({
                patrols: obj});
               

        })
    }


  
  render() {
    const { x, y, theta, mapWidth,goal_x,goal_y,goal_id, mapHeight} = this.state;
    const shouldDisplayMap =  mapWidth && mapHeight;
    
    const x2=	this.state.patrols.map((patrol,key) => {

      return (
         <div>

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
   // let d = this.GetArea();
//console.log(this.state.data)
    //let d1 = this.prepareData2();
    
    //let d4 = this.prepareData4();
    if (shouldDisplayMap) {
     
      return (
        <div id="map-container">

          <Ripples  during={2000} color="red" style={{height: '35'}} >
        
            <ReactSVGPanZoom
              width="580"
              height="550"
              tool="pan"
              detectAutoPan={false}
              scaleFactorMax={this.maxScaleFactor}
              scaleFactorMin={this.minScaleFactor}
              miniaturePosition={"left"}
              toolbarPosition={"none"}
              ref={map => (this.map = map)}
              onChangeValue={this.onChangeValue}
            >
              <svg width={mapWidth} height={mapHeight}  onDoubleClick={this.onMouseMove}>
                <image
                  href="/api/robot/map"
                  x="0"
                  y="0"
                  width={mapWidth}
                  height={mapHeight}
                  onDoubleClick={this.onMouseMove}
                
                  
                />
              <svg xmlns="http://www.w3.org/2000/svg"
   xlink="http://www.w3.org/1999/xlink" >
           <g   >
             <circle cx={goal_x} cy={goal_y} r='10' fill='#FAA546' stroke="#FAA546" strokeWidth="1"
     />
   <circle cx={goal_x} cy={goal_y} r="50" fill-opacity="0" stroke="#fdbc75" stroke-width="20px" stroke-opacity="0.7">
                <animate attributeName="r" from="0" to="20" dur="6s" repeatCount="indefinite" begin="0.25s" />
            </circle>
            <text x={goal_x} y={goal_y} font-style= 'red'
  font-size="30">{goal_id}</text>
    </g>
    </svg>
     
     <svg width={mapWidth} height={mapHeight}>


<defs>
    <pattern id="pattern1" height="100%" width="100%" patternContentUnits="objectBoundingBox">
        <image height="1" width="1" preserveAspectRatio="none" href="interdite.png" />
    </pattern>
</defs>
  {
    
 this.state.path.map((item,i) => (

 <path key={i} d={item} 
 fill="url(#pattern1)" fillOpacity="0.5" stroke="#DCAFFB" 
                  /> ), 
) }
       
    
     </svg>

    
    

     { 
          this.state.patrols.map((item, index) => (
          
          
             item.points.map((c, i) => (
             
             <svg xmlns="http://www.w3.org/2000/svg"
   xlink="http://www.w3.org/1999/xlink" onClick={this.onMouseMove}>
           <g   onClick={
            () => {
              this.toggleHidden1(c.id)
            }
          }>
             <circle cx={c.position.x} cy={c.position.y} r='10' fill='#BC66F7' stroke="#BC66F7" strokeWidth="1"
                
     />
    <text x={c.position.x} y={c.position.y} font-style= 'gras'
  font-size="16" fill="white">{c.id}</text>

    </g>
    </svg>
   
   
              
             ))

           ) )}
          <Modal
          key='modal'
                 open={this.state.modalOpen}

                 basic
    
           closeOnRootNodeClick={true}
           size={'large'}
           closeOnEscape={true}
         
           >
              <Modal.Header  />
             <Modal.Content>
               <Form error loading={this.state.busy}>
                 
                         
     
        <center>{x2}</center>
     
               </Form>
             
             </Modal.Content>
                   
             <Modal.Actions>
               <Button  color='white' inverted  onClick={this.close}>{i18n.get('ok')}</Button>
               
             </Modal.Actions>
           </Modal>

      
     
               
    
                <g 
                  transform={
                    "translate(" + x + ", " + y + ") rotate(" + theta + ")"
                  }
                >

          
                  <path
                    stroke="rgb(234, 106, 18)"
                    strokeWidth="1.79"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    fill="none"
                    d="M 13.47,7.02 L 19.96,-0.09 20,-0.13 13.3,-7.2"
                  />
                  <path
                    stroke="none"
                    fill="rgb(0, 0, 0)"
                    d="M 9.55,-0.02 C 9.54,5.01 5.76,8.2 5.76,8.2 5.76,8.2 9.89,9.97 10.45,10.18 10.74,10.29 10.98,10.74 11.04,12.4 10.98,15.09 9.19,15 9.19,15 L -6.16,15 C -6.16,15 -7.3,14.98 -7.53,13.85 -7.76,12.72 -7.98,11.25 -7.98,11.25 L -20,3.63 -20,-3.67 -7.98,-11.29 C -7.98,-11.29 -7.76,-12.76 -7.53,-13.89 -7.3,-15.02 -6.16,-15 -6.16,-15 L 9.19,-15 C 9.19,-15 10.98,-15.13 11.04,-12.44 10.98,-10.78 10.74,-10.33 10.45,-10.22 9.89,-10.01 5.76,-8.24 5.76,-8.24 5.76,-8.24 9.54,-5.05 9.55,-0.02 Z M 9.55,-0.02"
                  />
                  <path
                    stroke="none"
                    fill="rgb(208, 208, 208)"
                    d="M 8.83,-0.01 C 8.82,-6.07 2.72,-9.28 -0.21,-10.24 -0.3,-10.27 -4.23,-10.1 -4.56,-10.07 -5.61,-10.44 -7.41,-11.09 -7.98,-11.28 -7.96,-11.3 -0.49,-11.67 -0.49,-11.67 L -0.49,-11.67 C -0.5,-11.63 0.52,-10.22 0.52,-10.22 0.52,-10.22 9.71,-10.24 10.53,-10.25 9.96,-10.01 5.78,-8.24 5.78,-8.24 5.78,-8.24 9.54,-5.05 9.54,-0.01 9.54,5.02 5.78,8.21 5.78,8.21 L 5.8,8.19 C 5.78,8.21 9.96,9.98 10.53,10.22 9.71,10.22 0.52,10.19 0.52,10.19 L -0.5,11.61 C -0.49,11.65 -7.96,11.27 -7.98,11.25 -7.41,11.06 -5.61,10.41 -4.56,10.05 -4.23,10.07 -0.3,10.25 -0.21,10.21 1.45,9.67 4.13,8.41 6.14,6.31 7.68,4.71 8.83,2.61 8.83,-0.01 Z M 8.14,-0.01 C 8.14,-0.82 7.89,-2.19 7.89,-2.19 7.89,-2.19 8.29,-1.06 8.29,-0.01 8.29,1.03 7.89,2.16 7.89,2.16 7.89,2.16 8.14,0.79 8.14,-0.01 Z M 6.33,-0.01 C 6.33,0.69 6.4,1.41 6.51,1.41 6.62,1.41 6.76,0.69 6.76,-0.01 6.76,-0.72 6.62,-1.44 6.51,-1.44 6.4,-1.44 6.33,-0.72 6.33,-0.01 Z M 0.3,-5.46 C 0.39,-5.54 3.54,-2.71 3.59,-0.02 3.54,2.67 0.39,5.51 0.28,5.43 0.17,5.35 3.28,2.71 3.33,-0.02 3.28,-2.74 0.3,-5.46 0.3,-5.46 Z M -2.31,-0.01 L -2.32,5.71 C -2.32,5.71 -2.33,5.86 -2.19,6.01 -2.05,6.16 -1.78,6.3 -1.23,6.3 -1.72,7.09 -2.38,7.61 -2.87,7.88 -3.15,8.04 -3.37,8.11 -3.46,8.11 -3.46,8.11 -7.38,6.43 -7.41,6.42 -7.41,6.42 -8.73,6.85 -8.91,6.91 -9.13,6.82 -10.84,6.14 -10.84,6.14 L -13.13,6.27 -11.17,7.87 C -11.14,7.86 -7.46,6.64 -7.46,6.64 -7.42,6.62 -3.43,8.33 -3.43,8.33 -3.43,8.33 -3.44,9.48 -3.44,9.47 -3.44,9.48 -7.36,7.78 -7.36,7.78 L -11.27,9.15 C -11.27,9.15 -19.96,3.67 -20,3.65 L -20,-0.02 -20,-3.67 C -19.96,-3.7 -11.27,-9.18 -11.27,-9.18 L -7.36,-7.81 -3.44,-9.5 -3.44,-9.5 C -3.44,-9.5 -3.43,-8.36 -3.43,-8.36 L -7.42,-6.65 C -7.46,-6.67 -11.14,-7.89 -11.14,-7.89 -11.17,-7.9 -13.13,-6.3 -13.13,-6.3 L -10.84,-6.17 C -10.84,-6.17 -9.13,-6.85 -8.91,-6.94 -8.73,-6.88 -7.41,-6.45 -7.41,-6.45 -7.38,-6.46 -3.46,-8.14 -3.46,-8.14 -3.37,-8.14 -3.15,-8.07 -2.87,-7.91 -2.38,-7.63 -1.71,-7.12 -1.23,-6.33 -1.78,-6.33 -2.05,-6.18 -2.19,-6.04 -2.33,-5.89 -2.32,-5.74 -2.32,-5.74 L -2.31,-0.01 Z M 7.85,-0.01 C 7.84,1.07 7.45,1.83 7.45,1.83 7.42,1.85 6.24,1.85 6.24,1.85 6.14,1.85 6,0.91 6,-0.01 6,-0.95 6.14,-1.88 6.24,-1.88 L 7.42,-1.88 C 7.54,-1.77 7.84,-1.1 7.85,-0.01 Z M 7.06,-0.01 C 7.06,0.37 7.06,1.25 7.15,1.41 7.24,1.41 7.35,0.66 7.35,-0.01 7.35,-0.69 7.24,-1.44 7.16,-1.44 7.06,-1.28 7.06,-0.39 7.06,-0.01 Z M 7.06,-0.01"
                  />
                </g>
                
              </svg>
             
              
            </ReactSVGPanZoom>

           
          </Ripples>
        </div>
        
      );
    } else {
      return (
        <div id="map-container">
          <Loader active size="large" key="loader" />
        </div>
      );
    }
  }
}

export default withRouter(MapComponentPatrol);
