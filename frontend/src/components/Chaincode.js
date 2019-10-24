import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InstallandInstantiate from './Instal&InstantiateChaincode';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Certifcate(props){
    return (
        (props.data.length > 1) ?   
        <div>
            {props.data.map(function(item){
                return <div key={item.id}><pre>{JSON.stringify(item,null, 4)}</pre></div>
            })}
        </div>
            : 
        <div><pre>{JSON.stringify(props.data,null, 4)}</pre></div>
    )
}
export default class Chaincode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            function : '',
            setOpen: false,
            data : []
        };
          
        this.handleChangeFunc = this.handleChangeFunc.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleClickOpen = () => { 
        this.setState({
            setOpen : true
        })
      }
      handleClose = () => {
        this.setState({
            setOpen : false
        })
      }

      handleChangeFunc(event) {
        this.setState({function: event.target.value});
      }
      async handleSubmit(event) {
       
        const check = this.state.function;
        let arg = null;
        let endpoint = "channels/mychannel/chaincodes/cert";

        if (check == 'initLedger'){
            arg = [];
            endpoint = "channels/mychannel/chaincodes/cert";
            let data = JSON.stringify({
                peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                fcn: 'initLedger',
                args: arg  
            });
            await axios.post(endpoint , data, {
                headers: {
                    'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
              })
              .then(function (response) {
                  alert(response.data.message)
                  console.log(response)
                          
              })
              .catch(function (error) {
                  console.log(error);
              });
        }
        else if (check == 'createCert') {
            arg = ["CERT15","1123","3211","4433","1201"];
            endpoint = "channels/mychannel/chaincodes/cert";
            let data  = JSON.stringify({
                peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                fcn: 'createCert',
                args: arg  
            })
            await axios.post(endpoint , data , {
                headers: {
                    'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
              })
              .then(function (response) {
                  alert(response.data.message)
                  console.log(response)
                          
              })
              .catch(function (error) {
                  console.log(error);
              });
        }
        else if (check == 'queryAllCerts') {
            this.setState({
                setOpen : true
            })
            arg = [];
            endpoint = "channels/mychannel/chaincodes/cert?peer=peer0.org1.example.com&fcn=queryAllCerts&args=CERTALL"
            const response = await axios.get(endpoint ,{
                headers: {
                    'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
                },
              })
            const arr = []
                for (let i in response.data){
                    arr.push(response.data[i].Record);                
                }
            this.setState({data : arr});
            console.log(arr);
        }
        else if (check == "queryCert"){
            this.setState({
                setOpen : true
            })
            arg = "CERT1";
            endpoint = "channels/mychannel/chaincodes/cert?peer=peer0.org1.example.com&fcn=queryCert&args="+ arg;
            const response = await axios.get(endpoint ,{
                headers: {
                    'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
                },
              })
            console.log(response.data);
            this.setState({
                data: response.data
            })
        }    
      }

    render(){
        return (
            <div>
                <InstallandInstantiate></InstallandInstantiate>
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
                    {localStorage.getItem("channel")}
                </Grid>
                <Grid item xs={3}>
                </Grid>


                <Grid item xs={6}>
                <label>Chaincode: </label>
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
                    value={this.state.function}
                    onChange={this.handleChangeFunc}
                    variant="filled"
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        color: 'black'
                      }}
                    >   
                    <MenuItem selected={true} value={"initLedger"}>Initialize ledger</MenuItem>
                    <MenuItem selected={true} value={"createCert"}>Create Certificate</MenuItem>
                    <MenuItem selected={true} value={"queryCert"}>Query one certificate</MenuItem>
                    <MenuItem selected={true} value={"queryAllCerts"}>Query all certificates</MenuItem>
                    <MenuItem selected={true} value={"queryBlockByBlocknumber"}>Query Block By Blocknumber</MenuItem>
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

            <Dialog
                open={this.state.setOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Result"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Certifcate data={this.state.data}></Certifcate>
                </DialogContentText>
                </DialogContent>
            
            </Dialog>
          </div>
        );
    }
}