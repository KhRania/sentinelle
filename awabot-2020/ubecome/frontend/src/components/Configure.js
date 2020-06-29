import React from 'react';
import ajax from '../common/ajax.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../css/modal.css';
import "../css/main.css";

import {Icon} from 'semantic-ui-react';

import EditConfigurationModal from './EditConfigurationModal'

	  
class Configure extends React.Component
{
	constructor(props)
	{
		super(props);
	
		this.onEdit = this.onEdit.bind(this);
		this.onEditModalClose = this.onEditModalClose.bind(this);
		
	
		this.state =  { toDoNotes:[],h:[],users:[],  requiredItem: 0,
			 open: false,

		};
		
	}
	  openModal = () => {
		this.setState({ open: true });
	}
	componentDidMount() {

		// Where we're fetching data from
	  ajax('GET', 'robot/configure', null, ( configure ) =>{
		  let obj = configure.config
		  // console.log(obj.callback)
		  //let x   = Object.keys(obj);
		  //this.state.data.push(x)
		  //console.log(x)
		  let arr
		  for (let i in obj){
			  let test = obj[i]
			  
			  if(test instanceof Object){
				 arr = Object.keys(test).map(key => ({ key, value: test[key] }));
			  //console.log(arr)
			   



				   this.setState({ toDoNotes: [...this.state.toDoNotes, arr]},)
				   //console.log("retertzrtegrtrygz",this.state.toDoNotes)
			}}

		  
		   })

  

	  }
edit(toDoNotes)
{
  this.setState({dataconfigToEdit: toDoNotes});
}


		onEdit(config)
		{
			this.setState({userToEdit: config});
		}
	
		onEditModalClose(data)
		{
			if(data)
			{
				for(let config of this.state.toDoNotes)
				{
					if(config.name === this.state.userToEdit.name)
					{
						for(let prop in data)
						{
							config[prop] = data[prop];
						}
	
						break;
					}
				}
			}
	
			delete this.state.userToEdit;
			this.setState(this.state);
		}
		onDismiss = () =>
		{
			let newState = this.state;
		
			delete newState.userToEdit;
			
	
			this.setState(this.state);
		};
	
	
render()
 {
	
	  const a = Object.keys(this.state.toDoNotes).map((key)=> {	
	
	     return (<table  id='tablestyleConfig' >
		
	 <br></br>
	  
		  <tbody    id='tablestyle'>
	  {  this.state.toDoNotes[key].map((row) => (
	
			  <tr  > 
		
				<tr id="tr" className="TableRow">
				 <tr  >
		<tr >
				   <td  style={{width: 300, height:50}}>{row.key}</td>
				   <td  style={{ verticalAlign: 'middle',width: 250}} >{row.value}</td></tr>
					<td style={{width: '%'}}><EditConfigurationModal  onClose={this.onEditModalClose} key='0' row={row} onDismiss={this.onDismiss} open={this.state.open} > </EditConfigurationModal></td>
		  
			 </tr>
			   </tr>
				 </tr>
	
		 ))
		 } 
		
		  </tbody>
		</table>
	 )}
	
	  );



	  return (																																																																																																																																																																		
<div id='configure-container' >	
<Icon name='cogs' id='map2'
  inverted style={{ fontSize: 32,fill: "white" }}>	</Icon>
			<h1 id='config'>Configuration Robot</h1><style>
          {`
              .TableRow:hover {
                background-color: #5D67FF !important;
			  }
			 

              .menuItem {
                background-color: transparent !important;
              }      
          `}

</style>
					
	<MuiThemeProvider>
	
 {a}

</MuiThemeProvider>	

</div>
			
		);
	



}
}



export default Configure;

