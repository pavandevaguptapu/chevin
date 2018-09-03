import React, { Component } from "react";

import axios from "axios";
import { myConstClass } from "../../../constants";

import PeoplesGridView from "../PersonDetails/PeoplesGridView";
import PeoplesForm from "./PeoplesForm";
import PeoplesDetails from "./PeoplesDetails";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import { Myconsumer, MyContext } from "../../shared/AdminDatabase";
// import AdminDatabase from "../../shared/AdminDatabase";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import { connect } from 'react-redux';
import store from '../../../store/store';
const filter={
  textStyle:{
    color:"#fff"
  },
  floatingLabelStyle: {
    color: "#fff"
  },
  hintStyle:{
    color:"#ffd91d"
  },
  underlineStyle: {
    borderColor: "#fff"
  }
}
class People extends Component {
  constructor(props){
    super(props)
   this. state = {
      individualModal: false,
      changeView: "flex-row flex-wrap",
      addBorder: "",
      moreDetails: false,
      peoples: [],
      selectePeopleDetailsObj: {},
      filterPeople: []
    };
  
  }
 
  openIndividualModal = (clickedEvent) => {  
     
    this.setState({ individualModal: true,clickedEvent:clickedEvent});
  };

  closeIndividualModal = () => {
    this.setState({ individualModal: false });
  };

  changeCardLayout = index => {
    let tempSelectePeopleDetailsObj = this.state.filterPeople[index];
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
    axios.get("http://172.16.25.50:8585/sbsecureapi/sbsecureapi/getPeople").
    then(response => {
       this.setState({
         peoples: response.data.content,
         filterPeople: response.data.content
       });
    });
  };

  filteredList = e => {
    var updatedList = this.state.peoples;
    updatedList = updatedList.filter(people => {
      return (
        people.name.toLowerCase().search(e.target.value.toLowerCase()) !==-1
      );
    });
    this.setState({ filterPeople: updatedList });
  };

  newPeopleObj = newPeopleObj => {
    const newPeoplesArray = this.state.peoples;
    newPeoplesArray.push(newPeopleObj);
    this.setState({ peoples: newPeoplesArray});
  };
  selectedMember=(selectedmember,index)=>{   
    this.setState({selectedMember:selectedmember,selectedIndex:index})
  }
  updatedPeopleList=updatedpeoplelist=>{
    this.setState({ peoples: updatedpeoplelist,
      filterPeople: updatedpeoplelist})
  }

  componentDidMount() {
    this.getAllPeople();
    console.log("store",store.getState())
    console.log("props",this.props.teamsArray)
   
  }

  render() {
    return (
      <div>
        <div className="padding0">
          {/* <nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
            <div className="col-md-12 flex">
              <div className="col-md-12 col-lg-12 textAlignCenter marginT07">
                <h5 className="">People</h5>
              </div>
              <div>
              </div>
            </div>
          </nav> */}
        </div>
        <div className="d-block clearfix col-lg-11 col-md-11 p-0 m-auto">
          <div className="mb-2 col-lg-12 d-flex align-items-baseline p-0">
            <div className="col-lg-6 p-0">
              <TextField
                type="text"               
                floatingLabelText="search people by name"
                onChange={this.filteredList}
                inputStyle={filter.textStyle}
                floatingLabelStyle={filter.floatingLabelStyle}
                underlineStyle={filter.underlineStyle}
                underlineFocusStyle={filter.underlineStyle}  
                floatingLabelStyle={filter.hintStyle}
              />
            </div>
            <div className="col-lg-6 d-inline-flex justify-content-end p-0">
              <FloatingActionButton
                label="Add Member"
                backgroundColor={'grey'}
                onClick={() => this.openIndividualModal("Add")}
                mini={true}
              >
              <ContentAdd />
              </FloatingActionButton>

            </div>
          </div>
          <div className={`clearfix ${this.state.addBorder}`}>
            <PeoplesGridView
              open={this.openIndividualModal}
              selectedMember={this.selectedMember}
              changeView={this.state.changeView}
              changeCardLayout={this.changeCardLayout}
              filterPeople={this.state.filterPeople}
            />
            {this.state.moreDetails === true ? this.state.load : " "}
          </div>
          <Dialog
            title="Add Individual"
            className="text-center"
            modal={true}
            open={this.state.individualModal}
          >
            <PeoplesForm
              closeIndividualModal={this.closeIndividualModal}
              //peoples={this.state.peoples}
              filterPeople={this.state.filterPeople}
              newPeopleObj={this.newPeopleObj}
              clickedEvent={this.state.clickedEvent}
              selectedMember={this.state.selectedMember}
              selectedIndex={this.state.selectedIndex}
              updatedPeopleList={this.updatedPeopleList}

            />
          </Dialog>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
      teamsArray:state.teamsArray
  };
}
export default connect(mapStateToProps)(People);
