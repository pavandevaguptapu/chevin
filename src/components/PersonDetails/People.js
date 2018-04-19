import React, { Component } from "react";

import axios from "axios";
import { myConstClass } from "../../constants";

import IndividualCardDetails from "../PersonDetails/IndividualCardDetails";
import { Myconsumer, MyContext } from "../../shared/AdminDatabase";
import AdminDatabase from "../../shared/AdminDatabase";

import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import PeoplesWorkFlow from "./PeoplesWorkFlow";
import IndividualDetails from "./IndividualDetails";

class People extends Component {
  state = {
    dataSource: [],
    individualModal: false,
    changeView: "d-block flex-row",
    addBorder: "",
    moreDetails: false,
    peoples: [],
    selectePeopleDetailsObj: {}
  };

  openIndividualModal = () => {
    this.setState({ individualModal: true });
  };

  closeIndividualModal = () => {
    this.setState({ individualModal: false });
  };

  changeCardLayout = index => {
    const changeView = { ...this.state.changeView };
    let tempSelectePeopleDetailsObj = this.state.peoples[index];
    this.setState({
      changeView:
        "d-flex flex-column clearfix p-0 custom_flex border-right overflow-y",
      moreDetails: true,
      addBorder: "border p-3",
      selectePeopleDetailsObj: tempSelectePeopleDetailsObj,
      load: (
        <IndividualDetails
          selectePeopleDetailsObj={tempSelectePeopleDetailsObj}
        />
      )
    });
  };

  getAllPeople = () => {
    let peoples = this.state.peoples;
    axios.get(myConstClass.peoples + "/user").then(response => {
      this.setState({
        peoples: response.data
      });
    });
  };

  componentDidMount() {
    this.getAllPeople();
  }

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
          {/* <AdminDatabase value={this.state.peoples}> */}
          <IndividualCardDetails
            peoples={this.state.peoples}
            changeView={this.state.changeView}
            changeCardLayout={this.changeCardLayout}
          />
          {this.state.moreDetails === true ? this.state.load : " "}
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
