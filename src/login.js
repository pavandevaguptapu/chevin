import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  marginRight: 12,
};

class Login extends React.Component {

  handleClick() {
    console.log(this.props)
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div className="container-fluid loginboxBackgroundColor">
        <div className="row">
          <div className="loginHeader">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <form>
            <div className="loginUserName textAlignCenter marginT11" >
              <TextField hintText="Username" />
              <TextField hintText="password" />
            </div>
           
            <div className="textAlignCenter marginB08">
              <RaisedButton label="Login" primary={true} style={style} onClick={e => this.handleClick(e)} />
              <RaisedButton label="Cancel" secondary={true} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;