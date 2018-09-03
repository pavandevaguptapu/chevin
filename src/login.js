import React, { Component } from "react";
import "./App.css";
import image from "../src/shared/spring_board_logo.png";
import Background from "../src/shared/bg-login.jpg";
import { Card, CardHeader } from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from 'axios';


const style = {
  marginRight: 12
};
const navBarContainer = {
  navBarbg: {
    backgroundColor: "#ffd91d"
  },

  loginCardContainer: {
    textStyle:{
      color:"#fff"
    },
    hintStyle:{
      color:"#ffd91d"
    },
    backgroundColor: "rgb(0,0,0,0.8)",
    loginCard: {
      borderRadius: "5px",
      height: "20rem",
      width: "35rem",
      backgroundColor: "rgb(0,0,0,0.2)"
    },
    loginCardTitle: {
      color: "#ffd91d",
      fontSize: "24px"
    },
    loginCardSubTitle: {
      fontSize: "11px",
      color: "#fff"
    }
  },
  floatingLabelStyle: {
    color: "#fff"
  },
  underlineStyle: {
    borderColor: "#fff"
  }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userCred:{}
    };
  }

  handleChange=(e)=> {
    var tempUserCred=this.state.userCred
    tempUserCred[e.target.name]=e.target.value
    this.setState({userCred:tempUserCred });
  }

  handleClick=(userDetails)=> {     
    var qs= require('qs')
    var auth_token="testjwtclientid:XY7kmzoNzl100"
    auth_token=window.btoa(auth_token)
        axios.post("http://172.16.25.50:8585/sbsecureapi/oauth/token",
          qs.stringify({
            'grant_type': 'password',         
            'username': userDetails.userName,
            'password': userDetails.password
          }),
          {
            headers: {
              'Authorization':'Basic ' + auth_token,
              'Content-Type': 'application/x-www-form-urlencoded',      
            }
          }
        ).then(response => {         
     
              if(response!==undefined){
                localStorage.setItem('token',response.data.access_token)
                
                         this.props.history.push({pathname: "/dashboard", state: { userName: userDetails.username}});   
                        this.setState({invalidCredetials:false})
              }
              else{
                this.setState({invalidCredetials:true})
              }
      
        }, (error) => {
          console.log("error")
          this.setState({invalidCredetials:true})
        })

    // axios.post("http://192.168.29.83:8090/springhibernate/newspringboardapi/login",
    //   {
    //     userName: userDetails.userName,
    //     password: userDetails.password


    //   },
    //   ).then(response => {
    //   if (response.data.status === "success") {
    //     localStorage.setItem('token', response.data.content.uuid)
    //     localStorage.setItem('userName', userDetails.userName)
    //     this.props.history.push({
    //       pathname: "/app",
    //       state: { userName: userDetails.userName }
    //     });
    //   }
    //   else {

    //   }
    //   console.log(response.data.status)
    //   }, (error) => {
    //   console.log("error")
    //   })
      //   this.props.history.push({
      //     pathname: "/app",
      //     state: { userName: userDetails.username }
      //   });
   }

  render() {
    return (
      <div
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${Background})`
      }}
    >
      <nav
        className="navbar navbar-light navbar-expand-lg align-items-end p-3"
        style={navBarContainer.navBarbg}
      >
        <a className="navbar-brand">
          <img
            src={image}
            width="170"
            height="30"
            className="d-inline-block align-top ml-3"
            alt="SpringBoard"
          />
        </a>
      </nav>
      <div
        className="d-flex h-100"
        style={navBarContainer.loginCardContainer}
      >
        <Card
          className="m-auto px-5 py-3"
          style={navBarContainer.loginCardContainer.loginCard}
        >
          <div>
            <span style={navBarContainer.loginCardContainer.loginCardTitle}>
              Login
            </span>
            <br />
            {/* <span
              style={navBarContainer.loginCardContainer.loginCardSubTitle}
            >
              With your email ID
            </span> */}
          </div>
          <form>
            <div className="col-lg-12">
              <TextField
         
                name="userName"
                fullWidth={true}
                floatingLabelText="Username"
                floatingLabelStyle={navBarContainer.floatingLabelStyle}
                underlineStyle={navBarContainer.underlineStyle}
                underlineFocusStyle={navBarContainer.underlineStyle}
                value={this.state.userCred.userName||''}
                onChange={this.handleChange}
                inputStyle={navBarContainer.loginCardContainer.textStyle}
                floatingLabelStyle={navBarContainer.loginCardContainer.hintStyle}
              />
              <TextField
        
                floatingLabelText="Password"
                name="password"
                fullWidth={true}
                floatingLabelStyle={navBarContainer.floatingLabelStyle}
                underlineStyle={navBarContainer.underlineStyle}
                underlineFocusStyle={navBarContainer.underlineStyle}
                value={this.state.userCred.password}
                onChange={this.handleChange}
                inputStyle={navBarContainer.loginCardContainer.textStyle}
                floatingLabelStyle={navBarContainer.loginCardContainer.hintStyle}
              />
            </div>
            <div className="textAlignCenter">
              <p className={this.state.invalidCredetials == true ? "show" : "visibility"} style={{ color: "red" }}>invalid credentials</p>
            </div>

            <div className="text-center">
              <RaisedButton
                label="Login"
                primary={true}
                style={{ marginRight: "5px" }}
                onClick={() => this.handleClick(this.state.userCred)}
              />
              <RaisedButton label="Cancel" secondary={true} />
            </div>
          </form>
        </Card>
      </div>
    </div>
    );
  }
}
export default Login;
