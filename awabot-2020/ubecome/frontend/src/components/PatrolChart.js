import React from 'react';

import axios from 'axios';
import { Line} from 'react-chartjs-2';
class SimpleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData:{},
      data:[], opened: true,
      selected: '',valuesTempTime:this.props.c.values
    }
  }
  componentDidMount() {
    this.getChartData();
  }
  
  getChartData() {
    axios('http://127.0.0.1:40054/patrol')
     .then((response) => {
       const { patrols } = response.data.listpatrol;
       
       console.log(patrols)
    
           
    
          
           var chartjsData1 = [];
           var labels1 = [];
           
         
      
         this.state.valuesTempTime.map(item=> {
                   console.log(item)
            labels1.push(item.time);
            chartjsData1.push(item.temp);
            console.log(chartjsData1)
        
          })
          
       
      const chartData = {
         labels:labels1,
         datasets: [
           {
             label: 'Temperature Chart',
             
             data:chartjsData1,
           fill: true,
             backgroundColor: "transparent"
             ,
             borderColor: '#BC66F7',

            

           }
         ]
       }
       this.setState( {chartData} );
     });
   
     }

render() {
  console.log(this.state.valuesTempTime)
  return (
    <div>

    <div>
    <Line data={this.state.chartData} height={ 400 }  options={{ 	responsive: true,
	maintainAspectRatio: false,
	animation: {
		easing: 'easeInOutQuad',
		duration: 520
  },
  title: {
    text: 'Temperature Chart',
    fontSize: 18,
    fontStyle: '100',
    fontColor: 'white',
    padding: 10,
    display: true
  },
 

 
	scales: {
		xAxes: [{ticks: {
      beginAtZero: false,
      fontColor:'white',
      fontSize: 16,
    },
			gridLines: {
				color: 'rgba(200, 200, 200, 0.05)',
			
			}
		}],
		yAxes: [{
      ticks: {
        beginAtZero: false,
        fontColor:'white',
        fontSize: 16,
      },
			gridLines: {
        color: 'rgba(200, 200, 200, 0.08)',
        fontcolor:'white'
			
			}
		}]
	},
	elements: {
		line: {
			
		}
	},
	legend: {
    fontSize: 16,
    fontStyle: '100',
    fontColor: 'white',
    display:false

	},
	point: {
		backgroundColor: 'white'
	},

      }} />      
     </div>
</div>
  );

}
}
export  default SimpleChart;