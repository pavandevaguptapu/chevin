import React from 'react';

import    './App.css';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Login extends React.Component {
	 handleClick(){
		console.log(this.props)
		this.props.history.push('/dashboard');
	}
 render() {
    return (
	<div className="loginboxBackgroundColor">
	<div className="loginHeader">
	<h1>Login</h1>
	</div>
<form className="loginFormHeight">
<div className="loginUserName" >
  <label>UserName:<input type="text" name="name" /></label>
  </div>
  <div className="loginPwd">
  <label style ={{paddingLeft: "6px"}}>Password:<input type="text" name="pwd" /></label>
  </div>
  <div className="loginBtns">
<div>
	<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={e=>this.handleClick(e)}>Login</Button>
	<Button bsStyle="danger" bsSize="small">Cancel</Button>
   </div>
	 
  </div>
</form>
	  </div>
    );

  }
 
} 

export default Login;