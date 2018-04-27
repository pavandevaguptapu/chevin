import React, { Component } from "react";
import "./App.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

const style = {
  marginRight: 12
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getCheckedValue = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
      console.log(e.target.value)
  }

  handleClick(username) {
    this.props.history.push({
      pathname: "/app",
      state: { userName: username }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="loginboxBackgroundColor">
          <div className="row">
            <div className="col-md-12 loginHeader">
              <h1>Login</h1>
              <div onChange={this.getCheckedValue}> 
              <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                <RadioButton
                  value="0"
                  label="Admin"
                />
                <RadioButton
                  value="1"
                  label="DashBoard"
                />                
              </RadioButtonGroup>
              </div>
            </div>
          </div>
          <div className="row">
            <form>
              <div className="loginUserName textAlignCenter marginT11">
                <TextField
                  hintText="Username"
                  value={this.state.userName}
                  name="userName"
                  onChange={this.handleChange}
                />
                <TextField hintText="password" value={this.state.password} />
              </div>

              <div className="textAlignCenter marginB08">
                <RaisedButton
                  label="Login"
                  primary={true}
                  style={style}
                  onClick={() => this.handleClick(this.state.userName)}
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
