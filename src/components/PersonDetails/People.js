import React, { Component } from "react";

import BasicForm from "../PersonDetails/BasicForm";
import IndividualCardDetails from "../PersonDetails/IndividualCardDetails";

import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import StepperNavigation from "./StepperNavigation";
import IndividualDetails from "./IndividualDetails";

const deatils = {
    moreDetails: {
        width:'90%',
    }
};

class People extends Component {
  state = {
    dataSource: [],
    individualModal: false,
    changeView: "d-flex flex-row",
    moreDetails: false,
    peoples: [
      {
        emailid: "v@comakeit.com",
        role: "tester",
        name: "tata"
      },
      {
        emailid: "b@comakeit.com",
        role: "developer",
        name: "srnay"
      }
    ]
  };

  openIndividualModal = () => {
    this.setState({ individualModal: true });
  };

  closeIndividualModal = () => {
    this.setState({ individualModal: false });
  };

  addClassName = () => {
    const changeView = { ...this.state.changeView };
    this.setState({ changeView: "d-flex flex-column clearfix col-lg-3 p-0", moreDetails: true });
  };

  addIndividual = e => {
    e.preventDefault();
    // e.currentTarget.reset();
    console.log(this.state);
  };

  updateIndividual = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="d-block clearfix col-lg-11 col-md-11 p-0 m-auto">
        <div className="mb-2 col-lg-12 d-flex align-items-baseline p-0">
          <div className="col-lg-6 p-0">
            <AutoComplete
              hintText="Search Here"
              dataSource={this.state.dataSource}
              floatingLabelText="Search Here"
            />
          </div>
          <div className="col-lg-6 d-inline-flex justify-content-end p-0">
            <RaisedButton
              label="Add Member"
              primary={true}
              onClick={this.openIndividualModal}
            />
          </div>
        </div>
        <div className="d-flex clearfix">
          <IndividualCardDetails
            peoples={this.state.peoples}
            changeView={this.state.changeView}
            addClassName={this.addClassName}
          />
          {this.state.moreDetails === true ? <IndividualDetails /> : " "}
        </div>
        <Dialog
          title="Add Individual"
          className="text-center"
          modal={true}
          open={this.state.individualModal}
        >
          <StepperNavigation closeIndividualModal={this.closeIndividualModal} />
        </Dialog>
      </div>
    );
  }
}

export default People;
