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
    userName: "",
    pwd: "",
    url: "",

  };

  componentWillMount() {
    this.setState({
      projectBoardDetailsListarray: this.props.selectedProjectBoardDetails,
      userName: this.props.selectedUserName,
      pwd: this.props.selectedUserPwd,
      url: this.props.selectedUrl
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      projectBoardDetailsListarray: nextProps.selectedProjectBoardDetails,
      userName: nextProps.selectedUserName,
      pwd: nextProps.selectedUserPwd,
      url: this.props.selectedUrl
    });
  }

  selectedProjectBoard = (e, index) => {
    // var boardId = this.state.projectBoardDetailsListarray[index].id;

    let indexOfSelectedAccount = this.state.projectBoardDetailsListarray
      .map(function (k) {
        return k.name;
      })
      .indexOf(e);
    // console.log(indexOfSelectedAccount)
    let boardId = this.state.projectBoardDetailsListarray[
      indexOfSelectedAccount
    ].id;

    this.props.showLoaderforSprintData();
    this.props.showLoaderforEpicData();
    this.setState({ selectedProjectBoard: indexOfSelectedAccount });

    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
        this.state.url +
        "/rest/agile/1.0/board/" +
        this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id +
        "/sprint",
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        this.props.onSelectBoard(
          response.data.values,
          this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id,
          this.state.url,
          this.state.userName,
          this.state.pwd,
          boardId
        );
        // this.props.sonarQubeDetails()
        // this.setState({
        // 	selectedBoardSprintsArray: response.data.values

        // })
      });

    var hostedURL = this.state.url;

    axios
      .post(
      `sbtpgateway/tp/rest/esccors/generic/`,
      {
        resourceURL:
        this.state.url +
        "/rest/agile/1.0/board/" +
        this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id +
        "/epic",
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      },
      {
        boardId: this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id,
        hostedUrl: hostedURL
      }
      )
      .then(response => {
        if (JSON.stringify(response.data.values) == JSON.stringify([])) {
          var listOfEpics = response.data.values;
          var boardId = response.config.boardId;
          var resourceURL = response.config.hostedUrl;
          var userName = JSON.parse(response.config.data).userName;
          var password = JSON.parse(response.config.data).password;

          this.props.listOfEpics(
            listOfEpics,
            boardId,
            resourceURL,
            userName,
            password
          );
        } else {
          var listOfEpics = response.data.values;
          var boardId = response.config.boardId;
          var resourceURL = response.config.hostedUrl;
          var userName = JSON.parse(response.config.data).userName;
          var password = JSON.parse(response.config.data).password;

          this.props.listOfEpics(
            listOfEpics,
            boardId,
            resourceURL,
            userName,
            password
          );

          var epicArray = [];
          var counter = 0;
          for (var i = 0; i < 6; i++) {
            var epicName = response.data.values[i].name;
            var hostedURL = this.state.url;
            axios
              .post(
              `sbtpgateway/tp/rest/esccors/generic/`,
              {
                resourceURL:
                this.state.url +
                "/rest/agile/1.0/board/" +
                this.state.projectBoardDetailsListarray[indexOfSelectedAccount].id +
                "/epic/" +
                response.data.values[i].id +
                "/issue",
                userName: this.state.userName,
                password: this.state.pwd,
                actionMethod: "get"
              },
              {
                epicName: response.data.values[i].name,
                index: i,
                length: 6,
                hostedUrl: hostedURL
              }
              )
              .then(response => {
                var resourceURL = response.config.hostedUrl;
                var userName = JSON.parse(response.config.data).userName;
                var password = JSON.parse(response.config.data).password;

                epicArray.push({
                  name: response.config.epicName,
                  issues: response.data.issues
                });

                if (response.config.index == response.config.length - 1) {
                  this.props.currentBoard(
                    epicArray,
                    resourceURL,
                    userName,
                    password
                  );
                }
              });
          }

        }
      });
  };

  projectBoardDetailsListarray = board => {
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
