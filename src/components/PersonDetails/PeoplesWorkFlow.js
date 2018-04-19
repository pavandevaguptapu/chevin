import React, { Component } from "react";

import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import PeoplesForm from "./PeoplesForm";

import axios from "axios";
import { myConstClass } from "../../constants";

const styles = {
  customWidth: {
    width: "50%"
  }
};
class PeoplesWorkFlow extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    sample: {},
    newCustomerDetailsObject: {
        name: "",
        email:"",
        designation:"",
        accounts: "",
        projects: "",
        role:"",        
    }
  };

  updateIndividual = e => {
    // let newCustomerDetailsObject = this.state.newCustomerDetailsObject;
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewMember = newCustomerDetailsObject => {
    axios.post(myConstClass.peoples + `/save`, {
        name: "pavan",
        designation: "asdasd",
        email: "pavan@gmail.com",
        account: "newCustomerDetailsObject.account",
        projects: "newCustomerDetailsObject.projects",
        role: "newCustomerDetailsObject.role"
      })
      .then(response => {
        this.setState({ 
            sample: response.data,
            // createAccountModal: false,
            newCustomerDetails: {}
        });
      });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
    console.log(this.state, "tata");
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleChange = (event, index, value) => this.setState({ value });

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <PeoplesForm
            addIndividual={this.handleNext}
            updateIndividual={this.updateIndividual}
          />
        );
      case 1:
        return (
          <div className="col-lg-12">
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              autoWidth={false}
              style={styles.customWidth}
            >
              <MenuItem primaryText="Select" disabled={true} />
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </DropDownMenu>
          </div>
        );
      case 2:
        return (
          <div className="col-lg-12">
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              autoWidth={false}
              style={styles.customWidth}
            >
              <MenuItem primaryText="Select" disabled={true} />
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </DropDownMenu>
          </div>
        );
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: "0 16px" };

    return (
      <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>User Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Accounts</StepLabel>
          </Step>
          <Step>
            <StepLabel>Projects</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <RaisedButton
              label="Close"
              primary={true}
              onClick={this.props.closeIndividualModal}
            />
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label="Cancel"
                  onClick={this.props.closeIndividualModal}
                />
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 2 ? "Finish" : "Save & Submit"}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PeoplesWorkFlow;
