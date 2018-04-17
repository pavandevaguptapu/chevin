import React, { Component } from "react";

import IndividualCardDetails from "../PersonDetails/IndividualCardDetails";
import { Myconsumer } from '../../shared/AdminDatabase'

import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import PeoplesWorkFlow from "./PeoplesWorkFlow";
import IndividualDetails from "./IndividualDetails";

class People extends Component {
  state = {
    dataSource: [],
    individualModal: false,
    changeView: "d-flex flex-row",
    addBorder: "",
    moreDetails: false
  };

  openIndividualModal = () => {
    this.setState({ individualModal: true });
  };

  closeIndividualModal = () => {
    this.setState({ individualModal: false });
  };

  addClassName = () => {
    const changeView = { ...this.state.changeView };
    this.setState({ 
        changeView: "d-flex flex-column clearfix col-lg-3 p-0 custom_flex border-right", 
        moreDetails: true,
        addBorder: "border p-3"
    });
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
        <div className={`d-flex clearfix ${this.state.addBorder}`}>
        <Myconsumer>
            {(context) => (
                <IndividualCardDetails
                peoples={context.state.peoples}
                changeView={this.state.changeView}
                addClassName={this.addClassName}
                />
            )}
          </Myconsumer>
          {this.state.moreDetails === true ? <IndividualDetails /> : " "}
        </div>
        <Dialog
          title="Add Individual"
          className="text-center"
          modal={true}
          open={this.state.individualModal}
        >
          <PeoplesWorkFlow closeIndividualModal={this.closeIndividualModal} />
        </Dialog>
      </div>
    );
  }
}

export default People;
