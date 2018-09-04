import React, { Component } from "react";

import axios from "axios";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class SelectedProjectBoardDetails extends Component {
  state = {
    dropdownOpen: false,
    dropDownValue: "Boards",
    selectedProjectBoard: "",
    projectBoardDetailsListarray: [],
    username: "",
    pwd: "",
    hostedurl: "",

  };

  componentWillMount() {   
    this.setState({
      projectBoardDetailsListarray: this.props.selectedProjectBoardDetails,
      username: this.props.username,
      pwd: this.props.pwd,
      hostedurl: this.props.hostedurl
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      projectBoardDetailsListarray: nextProps.selectedProjectBoardDetails,
      username: nextProps.username,
      pwd: nextProps.pwd,
      hostedurl: nextProps.hostedurl
    });
  }

  selectedProjectBoard = (e, index) => {
    let indexOfSelectedAccount = this.state.projectBoardDetailsListarray
      .map(function (k) {
        return k.name;
      })
      .indexOf(e);
    let boardId = this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id;
    this.props.showLoaderforSprintData();
    this.props.showLoaderforEpicData();
    this.setState({ selectedProjectBoard:indexOfSelectedAccount});
    axios.post(`sbsecureapi/sbtpgateway/generic/`,{
        resourceURL:this.state.hostedurl+"/rest/agile/1.0/board/"+this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id+"/sprint",
        userName: this.state.username,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {   

        var listOfSprints = response.data.values;
        var boardId = this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id;
        var hostedurl = this.state.hostedurl;
        var username = this.state.username;
        var password = this.state.pwd;     
        this.props.onSelectBoard(listOfSprints,boardId,username,password,hostedurl)
      });
     //var hostedurl = this.state.hostedurl;
    axios.post(`sbsecureapi/sbtpgateway/generic/`,{
        resourceURL:this.state.hostedurl+"/rest/agile/1.0/board/"+this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id+"/epic",
        userName: this.state.username,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
       
        if (JSON.stringify(response.data.values) == JSON.stringify([])) {
          var listOfEpics = response.data.values;
          var boardId = this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id;
          var hostedurl = this.state.hostedurl;
          var username = this.state.username;
          var password = this.state.pwd;
          this.props.listOfEpics(listOfEpics,boardId,username,password,hostedurl);
        } else {
          var listOfEpics = response.data.values;
          var boardId = this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id;
          var hostedurl = this.state.hostedurl;
          var username = this.state.username;
          var password = this.state.pwd;
          this.props.listOfEpics(listOfEpics,boardId,username,password,hostedurl);
          var epicArray = [];
          var counter = 0;
          for (var i = 0; i < 6; i++) {
            var epicName = response.data.values[i].name;    
            axios
              .post(`sbsecureapi/sbtpgateway/generic/`, {  
                resourceURL:this.state.hostedurl+"rest/agile/1.0/board/"+this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id+"/epic/"+response.data.values[i].id+"/issue",
                userName: this.state.username,
                password: this.state.pwd,
                actionMethod: "get"
              },
              {
                epicName: response.data.values[i].name,
                index: i,
                length: 6,               
              })
              .then(response => {     
           
                var hostedurl = this.state.hostedurl;
                var username = this.state.username;
                var password = this.state.pwd;
                epicArray.push({name:response.config.epicName,issues: response.data.issues});
                if (response.config.index == response.config.length - 1) {
                  this.props.currentBoard(epicArray,username,password,hostedurl);
                }
              });
          }

        }
      });
  };

  projectBoardDetailsListarray = board => {  
    console.log(board)  
    if(board.length!==0 || board!==undefined){
      return board.map(board => (
        <DropdownItem
          key={board.id}
          value={board.name}
          className="pointer text-truncate"
          onClick={(e, i) => {
            this.selectedProjectBoard(e.target.value);
            this.displayDropDownValue(e);
          }}
        >
          {board.name}
        </DropdownItem>
      ));
    }
   
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  displayDropDownValue = e => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };

  render() {
    return (
      <div>
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="custom-secondary_dropdown clearfix"
        > 
          <DropdownToggle
            caret
            className="text-truncate d-flex justify-content-between"
          >
            {this.state.dropDownValue}
          </DropdownToggle>
          <DropdownMenu className="custom-dropdown-menu">
            {this.projectBoardDetailsListarray(
              this.state.projectBoardDetailsListarray
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default SelectedProjectBoardDetails;
