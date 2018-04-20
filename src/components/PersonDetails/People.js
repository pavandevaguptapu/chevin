import React, { Component } from "react";

import axios from "axios";
import { myConstClass } from "../../constants";

import PeoplesGridView from "../PersonDetails/PeoplesGridView";
import PeoplesWorkFlow from "./PeoplesWorkFlow";
import PeoplesDetails from "./PeoplesDetails";
// import { Myconsumer, MyContext } from "../../shared/AdminDatabase";
// import AdminDatabase from "../../shared/AdminDatabase";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";

class People extends Component {
  state = {
    searchTerm: "",
    individualModal: false,
    changeView: "flex-row flex-wrap",
    addBorder: "",
    moreDetails: false,
    peoples: [],
    selectePeopleDetailsObj: {},
    filterArray:[],
  };

  openIndividualModal = () => {
    this.setState({ individualModal: true });
  };

  closeIndividualModal = () => {
    this.setState({ individualModal: false });
  };

  changeCardLayout = index => {
    let tempSelectePeopleDetailsObj = this.state.peoples[index];
    this.setState({
      changeView:
        "flex-column clearfix p-0 custom_flex border-right overflow-y",
      moreDetails: true,
      addBorder: "border p-3 d-flex",
      selectePeopleDetailsObj: tempSelectePeopleDetailsObj,
      load: (
        <PeoplesDetails selectePeopleDetailsObj={tempSelectePeopleDetailsObj} />
      )
    });
  };

  getAllPeople = () => {
    axios.get(myConstClass.peoples + "/user").then(response => {
      this.setState({
        peoples: response.data
      });
    });
  };

  peopleInputSearch = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  peopleSearchFilter = searchTerm => {
    return function(people) {
      return people.name.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };

  newPeopleObj = newPeopleObj => {
    const newPeoplesArray = this.state.peoples;
    newPeoplesArray.push(newPeopleObj);
    this.setState({ peoples: newPeoplesArray });
  };

  componentDidMount() {
    this.getAllPeople();
  }

  render() {
    return (
      <div className="d-block clearfix col-lg-11 col-md-11 p-0 m-auto">
        <div className="mb-2 col-lg-12 d-flex align-items-baseline p-0">
          <div className="col-lg-6 p-0">
            <TextField
              type="text"
              hintText="Search People by name"
              floatingLabelText="Search People"
              onChange={this.peopleInputSearch}
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
        <div className={`clearfix ${this.state.addBorder}`}>
          {/* <AdminDatabase value={this.state.peoples}> */}
          <PeoplesGridView
            peoples={this.state.peoples}
            changeView={this.state.changeView}
            changeCardLayout={this.changeCardLayout}
            searchTerm={this.state.searchTerm}
            peopleSearchFilter={this.peopleSearchFilter}
          />
          {this.state.moreDetails === true ? this.state.load : " "}
        </div>
        <Dialog
          title="Add Individual"
          className="text-center"
          modal={true}
          open={this.state.individualModal}
        >
          <PeoplesWorkFlow
            closeIndividualModal={this.closeIndividualModal}
            peoples={this.state.peoples}
            newPeopleObj={this.newPeopleObj}
          />
        </Dialog>
      </div>
    );
  }
}

export default People;
