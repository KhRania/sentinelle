import React from 'react';
import {Icon,Button} from 'semantic-ui-react';
import '../css/modal.css';
import axios from 'axios'
import FileSaver from 'file-saver';


class Download extends React.Component
{
	constructor(props)
	{
		super(props);
		this.downloadData = this.downloadData.bind(this);
		
		this.state = { name:this.props.filename}
	}
 
    downloadData = () => {
       
      var myHeaders = new Headers();
      myHeaders.append('Access-Control-Allow-Origin', '*/*');
      myHeaders.append('Authorization', 'Basic cHJlc3RhdGFpcmVAYm5ic2l0dGVyLmNvbToxMjM0NTY=');
     
          axios({
            url: 'http://localhost:5050/file='+this.state.name,
            method: 'GET',
            responseType: 'blob', // important
            headers: { 
              'x-apikey': '59a7ad19f5a9fa0808f11931',
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          }).then((response) => {
            FileSaver.saveAs(new Blob([response.data]),this.state.name);
          });
}



	render()
	{
		
		
		
return (
<Button   icon labelPosition='left' id='botton' onClick={ this.downloadData}>
                 Download
                  <Icon name='download' color="gray" />
                </Button>
)
	  }}
export default Download;
