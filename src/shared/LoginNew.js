import React, { Component } from "react";

import image from "./spring_board_logo.png";
import Background from "./bg-login.jpg";

import { Card, CardHeader } from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const navBarContainer = {
  navBarbg: {
    backgroundColor: "#ffd91d"
  },
  loginCardContainer: {
      backgroundColor: 'rgb(0,0,0,0.8)',
      loginCard: {
            borderRadius: '5px',
            height: '20rem',
            width: '35rem',
            backgroundColor: 'rgb(0,0,0,0.2)'
      },
    loginCardTitle: {
        color: "#ffd91d",
        fontSize:'24px'
    },
    loginCardSubTitle: {
        fontSize:'11px',
        color: '#fff'
    }
  }
};

class BaseLayout extends Component {
  render() {
    return (
      <div style={{height:'100vh', overflow:'hidden' , backgroundImage: `url(${Background})`}}>
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
        <div className="d-flex h-100" style={navBarContainer.loginCardContainer}>
          <Card
            className="m-auto px-5 py-3"
            style={navBarContainer.loginCardContainer.loginCard}
          >
            <div>
                <span style={navBarContainer.loginCardContainer.loginCardTitle}>Login</span><br/>
                <span style={navBarContainer.loginCardContainer.loginCardSubTitle}>With your email ID</span>
            </div>
            <form>
              <div className="col-lg-12">
                <TextField
                  hintText="Username"
                  name="userName"
                  fullWidth={true}
                  floatingLabelText="E-mail"
                />
                <TextField hintText="password" floatingLabelText="Password" fullWidth={true} />
              </div>

              <div className="text-center">
                <RaisedButton
                  label="Login"
                  primary={true}
                  style={{marginRight:'5px'}}
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

export default BaseLayout;
