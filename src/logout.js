import React, { Component } from "react";
import "./App.css";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettingsPower from 'material-ui/svg-icons/action/settings-power';
import Subheader from 'material-ui/Subheader';

import axios from 'axios';

const style = {
  marginRight: 12
};

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
}

logout=()=>{
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('userName'))

    localStorage.removeItem('token')
    window.location.href = '/'
//     axios.post("http://192.168.29.83:8090/springhibernate/newspringboardapi/login",
//     {
//       userName:userDetails.userName,
//       password:userDetails.password


//     }
//   ).then(response=>{
//     if(response.data.status==="success"){

//       this.props.history.push({
//       pathname: "/app/logout",
      
//     });
//     }
//     else{

//     }
//     console.log(response.data.status)
//   },(error)=>{
//         console.log("error")
//   })

}

  render() {
    return (
        <div className="displayInline textAlignRight">
            <div className="mr-2">
            <FloatingActionButton mini={true} backgroundColor={'grey'} style={{boxShadow: "none"}} onClick={this.logout}>
                 <ActionSettingsPower onClick={this.logout} style={{height:"25px",width:"25px"}}/> 
                </FloatingActionButton>
            </div>
            <div>
                {/* <Subheader className="p-0" style={{fontSize:'18px',lineHeight:"42px",fontWeight:"bold",color:"#00000"}}>Logout</Subheader> */}
            </div>
        </div>
    );
  }
}
export default Logout;
