import React,{Component} from 'react';
import axios from 'axios';
import PsidToFbid from 'psid-to-fbid';


export default class PsidToFbid extends Component {

    getId = () => {
        axios.post("https://graph.facebook.com/v2.6/me/messages",{
          
        })
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token:token},
            method: 'POST',
            json: {
                recipient: {id:psid},
                message: messageData,
            }
        }, function(error, response, body) {
            if (!error && !response.body.error && response.body.message_id) {
                var mid = response.body.message_id;
                psidToFbid.getFromMid(mid, psid).then(fbid => {
                    console.log("Got psid = "+psid+", fbid = "+fbid);
                })
            }
        })
    }
    render(){
        return (
            <div>
                    <button onClick={this.getId}></button>
            </div>
        )
    }
}
