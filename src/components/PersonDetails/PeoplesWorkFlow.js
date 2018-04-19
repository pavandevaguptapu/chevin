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
    newSam: {
      name: "",
      designation:"",
      email:""
    },
    peoples: this.props.peoples,
  };

  updatePeople = e => {
    const updatedPeopleDetails = this.state.newSam;
    updatedPeopleDetails[e.target.name] = e.target.value        
    this.setState({newSam:updatedPeopleDetails})
    console.log(updatedPeopleDetails);
    // this.setState({ [e.target.name]: e.target.value });
  };

  addNewMember = newCustomerDetailsObject => {
    let peoples = this.state.peoples;
    axios.post(myConstClass.peoples + `/save`, {
        name: this.state.newSam.name,
        designation: this.state.newSam.designation,
        email: this.state.newSam.email,
        account: "newCustomerDetailsObject.account",
        projects: "newCustomerDetailsObject.projects",
        role: "newCustomerDetailsObject.role"
      })
      .then(response => {
        this.props.addedObj(response.data)
        // this.state.peoples = response.data;
        // this.setState({ 
        //     sample: response.data,
        // });
      });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
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
            updatePeople={this.updatePeople}
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
                  onClick={this.addNewMember}
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
