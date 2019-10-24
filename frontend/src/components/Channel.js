import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Redirect } from 'react-router-dom';
export default class Chaincode extends Component {
    constructor(props) {
        super(props);
        this.state = {channel : '',redirect : false};
          
      }
      
      handleChange = (event) =>{
        this.setState({
            channel: event.target.value
        })
      }
      handleSubmit = (event) => {
        let data = JSON.stringify({
            channelName: this.state.channel,
            channelConfigPath: "../artifacts/channel/mychannel.tx"
        });
        axios.post('channels',data ,{
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        .then( (response) => {
                alert(response.data.message);
                localStorage.setItem('channel', this.state.channel);
                this.setState({redirect:true}); 
                

        })
        .catch(function (error) {
            console.log(error);
        });

    }
    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/chaincode'/>;
        }
        return (
            <div>
            <Grid container spacing={3}>  
                <Grid item xs={6}>
                <label>Username: </label>
                </Grid>
                <Grid item xs={3}>
                    {localStorage.getItem("username")}
                </Grid>
                <Grid item xs={3}>
                </Grid>

                <Grid item xs={6}>
                <label>Organization: </label>
                </Grid>
                <Grid item xs={3}>
                    {localStorage.getItem("org")}
                </Grid>
                <Grid item xs={3}>
                </Grid>

                <Grid item xs={6}>
                <label>Channel: </label>
                </Grid>
                <Grid item xs={3}>  
                 <input
                 style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    color: 'black'
                  }}
                 type="text" value={this.state.channel} onChange={this.handleChange}
                 />
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={9}>
                    <Button onClick={this.handleSubmit} variant="contained" size="large" color="white">
                    Create Channel
                    </Button>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
          </div>
        );
    }
}