import React from 'react';
import {Icon} from 'semantic-ui-react';

import Download from './Download';
class TelechargementRonde extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {data:[] ,name:this.props.filename};
	}

        
        componentDidMount() {

            fetch('http://127.0.0.1:5050/files')
                
                .then(response => response.json())
                .then(success => {console.log(success)
       
                    this.setState({
                        data: success});
                       
        })

    }
  

                render()
                { 
                    return (
                        <div id='configure-container'>	
                        <Icon name='download' id='map2'
  inverted style={{ fontSize: 32,fill: "white" }}>	</Icon>
			<h1 id='config'>Téléchargement fichiers Rondes</h1>
                        <style>
          {`
              .TableRow:hover {
                background-color: #5D67FF !important;
			  }
			 

              .menuItem {
                background-color: transparent !important;
              }      
          `}

</style>		
                    <table id='tablestyleConfig'>
                    <tbody id='tablestyleronde' >
                          {this.state.data.map(filename => {
                            return (
                              
                               <tr  className="TableRow">
<tr id="tr">
                                <td    style={{width: 500, height:50}}>{filename}</td>
                          <td  ><Download  filename={filename}  > </Download></td>
                                
                          </tr>
                                </tr>

                     
                            );
                          })}
                          </tbody>
                       </table>
                       </div>
                       
                   ); }
                }
        
                  
 

export default TelechargementRonde;