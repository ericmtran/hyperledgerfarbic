import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Redirect } from 'react-router-dom';
export default class home extends Component {
    
    constructor(props) {
      super(props);
      this.state = {username: '', orgName: '', redirect: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({username: event.target.value});
    }
    handleChange2(event) {
        this.setState({orgName: event.target.value});
    }
    handleSubmit(event) {
        axios.post('users', {
            username: this.state.username,
            orgName: this.state.orgName
        })
        .then( (response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('org', this.state.orgName);
            console.log(this.state.redirect);
            alert(response.data.message);
            console.log(response.data);
            this.setState({redirect:true});   
            console.log(this.state.redirect);    
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  
    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to='/channel'/>;
      }
      return (
          <div>
            <Grid container spacing={3}>    
                <Grid item xs={6}>
                <label>Username:</label>
                </Grid>
                <Grid item xs={3}>
                <input
                 style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    color: 'black'
                  }}
                 type="text" value={this.state.username} onChange={this.handleChange}
                 />
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                <label>Organization:</label>
                </Grid>
                <Grid item xs={3}>
                <FormControl 
                 variant="outlined"
                 style={{
                     backgroundColor: 'white',
                     textAlign: 'center'
                 }}
                >
                    <Select
                    value={this.state.orgName}
                    onChange={this.handleChange2}
                    variant="filled"
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        color: 'black'
                      }}
                    >
                    <MenuItem selected={true} value={"Org1"}>Org1</MenuItem>
                    <MenuItem selected={true} value={"Org2"}>Org2</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={9}>
                    <Button onClick={this.handleSubmit} variant="contained" size="large" color="white">
                    Submit
                    </Button>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
          </div>
      );
    }
  }