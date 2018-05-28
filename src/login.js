import React, { Component } from "react";
import "./App.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from 'axios';

const style = {
  marginRight: 12
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userCred:{}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    var tempUserCred=this.state.userCred
    tempUserCred[e.target.name]=e.target.value
    this.setState({userCred:tempUserCred });
  }

  handleClick(userDetails) {
    
  //   axios.post("http://192.168.29.83:8090/springhibernate/newspringboardapi/login",
  //   {
  //     userName:userDetails.userName,
  //     password:userDetails.password


  //   }
  // ).then(response=>{
  //   if(response.data.status==="success"){
  //   localStorage.setItem('token',response.data.content.uuid)
  //   localStorage.setItem('userName',userDetails.userName)
  //     this.props.history.push({
  //     pathname: "/app",
  //     state: { userName: userDetails.userName }
  //   });
  //   }
  //   else{

  //   }
  //   console.log(response.data.status)
  // },(error)=>{
  //       console.log("error")
  // })
    this.props.history.push({
      pathname: "/app",
      state: { userName: userDetails.username }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="loginboxBackgroundColor">
          <div className="row">
            <div className="col-md-12 loginHeader">
              <h1>Login</h1>
            </div>
          </div>
          <div className="row">
            <form>
              <div className="loginUserName textAlignCenter marginT11">
                <TextField
                  hintText="Username"
                  value={this.state.userCred.userName||''}
                  name="userName"
                  onChange={this.handleChange}
                />
                <TextField hintText="password" value={this.state.userCred.password} 
                hintText="password"
                  value={this.state.userCred.password||''}
                  name="password"
                  onChange={this.handleChange}
                />       
                
              </div>

              <div className="textAlignCenter marginB08">
                <RaisedButton
                  label="Login"
                  primary={true}
                  style={style}
                  onClick={() => this.handleClick(this.state.userCred)}
                />
                <RaisedButton label="Cancel" secondary={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
