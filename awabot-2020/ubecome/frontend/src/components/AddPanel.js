import React from 'react';
import AbstractComponent from './AbstractComponent.js';
import "../css/main.css";
import { Calendar } from 'react-big-calendar'
import Tooltip from "@material-ui/core/Tooltip";
import {Button} from 'semantic-ui-react';

class AddPanel extends AbstractComponent
{
	constructor(props)
	{
		super(props);
		this.state = { startDate: new Date(),
			datePickerIsOpen: true,
		  };
		  this.handleChange = this.handleChange.bind(this);
		  this.openDatePicker = this.openDatePicker.bind(this)
		}
	  
		handleChange(date) {
		  this.setState({
			startDate: date
		  });
		}
	  
		openDatePicker() {
		  this.setState({
			datePickerIsOpen: !this.state.datePickerIsOpen,
		  });
		};


	render()
	{
	

const MyCalendar = props => (
  <div>
    <Calendar
      open={this.state.datePickerIsOpen}
      events={this.openDatePicker}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

	
			const CalendarIcon = (
			
				<Tooltip title="show/hide calendar time slot" placement='right' style={{ size: 30 }}>

				<Button icon='calendar' size="huge" style={{backgroundColor: "#EFEFEF"}} onClick={MyCalendar}/>
				</Tooltip>
			  );
			  const patrolIcon = (
				
<Tooltip title="Create patrol" placement='right' id="tooltip">
    
				<Button icon='product hunt' style={{backgroundColor: "#EFEFEF"}} size="huge"/>
				</Tooltip>
			  );
			  const zonelIcon = (
				<Tooltip title="Create areas" placement='right'>
    
				<Button icon='object ungroup' style={{backgroundColor: "#EFEFEF"}} size="huge"/>
				</Tooltip>
			  );
			  const sensorIcon = (
			
				<Tooltip title="Create sensors" placement='right'>
				<Button icon='wifi' style={{backgroundColor: "#EFEFEF"}} size="huge" />
				</Tooltip>
			  );
			  const editIcon = (
			
				<Tooltip title="Trigger distance" placement='right'>
				<Button icon='pencil' style={{backgroundColor: "#EFEFEF"}} size="huge"/>
			
		</Tooltip>
			  );
			  const mapIcon = (
			
				<Tooltip title="Trigger map edition mode" placement='right'>
				<Button icon='map' style={{backgroundColor: "#EFEFEF"}} size="huge"/>
				</Tooltip>
			  );

		return (
			<div id='panel-switch'>
				
						{CalendarIcon }
						
						{patrolIcon}
                        {zonelIcon}
						{sensorIcon}
						{editIcon}
						{mapIcon}

					</div>
		);
	}
}

export default AddPanel;
