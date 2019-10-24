import React,{Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default class InstallandInstantiate extends Component {
    installOrg1 = () => {
        let data = JSON.stringify({
            peers: ["peer0.org1.example.com","peer1.org1.example.com"],
            chaincodeName: "cert",
            chaincodePath: "github.com/certificate/go",
            chaincodeType: "golang",
            chaincodeVersion: "v0"
        });
        axios.post('chaincodes', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        })
        .then( (res) => {
            alert(res.data.message);
        })
        .catch( (err) => {
            console.log(err);
        })
    }
    instantiateOrg1 = () => {
        let data = JSON.stringify({
            chaincodeName: "cert",
            chaincodeVersion: "v0",
            chaincodeType: "golang",
            args: ["a","100","b","200"]
        });
        axios.post('channels/mychannel/chaincodes', data ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        })
        .then( (res) => {
            alert(res.data.message);
        })
        .catch( (err) => {
            console.log(err);
        })
    }
    updateAnchorPeer = () => {
        let data = JSON.stringify({
            configUpdatePath: "../artifacts/channel/Org1MSPanchors.tx"
        });
        axios.post('channels/mychannel/anchorpeers', data , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
            },
        })
        .then( (res) => {
            alert(res.data.message);
        })
        .catch( (err) => {
            console.log(err);
        })
    }
    joinPeer = () => {
        let data  =  JSON.stringify({
            peers: ["peer0.org1.example.com","peer1.org1.example.com"]
        })
        axios.post('channels/mychannel/peers',data ,{
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        .then( (response) => {
                alert(response.data.message);

        })
        .catch(function (error) {
            console.log(error);
        });

      }
//     echo "POST request Update anchor peers on Org1"
// echo
// curl -s -X POST \
//   http://localhost:4000/channels/mychannel/anchorpeers \
//   -H "authorization: Bearer $ORG1_TOKEN" \
//   -H "content-type: application/json" \
//   -d '{
// 	"configUpdatePath":"../artifacts/channel/Org1MSPanchors.tx"
// }'
// echo
echo
    render(){
        return (
            <div>
                <Button onClick={this.joinPeer} variant="contained" size="large" color="white">
                    Join channel on org1
                </Button>
                <Button onClick={this.installOrg1} variant="contained" size="large" color="white">
                    Install chaincode on org1
                </Button>
                
                <Button onClick={this.instantiateOrg1} variant="contained" size="large" color="white">
                    Instantitate chaincode on org1
                </Button>
                <Button onClick={this.updateAnchorPeer} variant="contained" size="large" color="white">
                    Update anchor peers on Org1
                </Button>
            </div>
        );
    }
}