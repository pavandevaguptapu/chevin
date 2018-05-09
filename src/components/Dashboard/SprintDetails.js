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

class SprintDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      dropDownValue: "Sprints",
      values: "",
      sprintStartTime: "",
      sprintEndTime: "",
      sprintCompleteTime: "",
      eachTimeSpentArray: [],
      totalTimeSpentArray: [],
      currentDate: "",
      currentSpentTime: 0,
      sprintId: this.props.value,
      workHours: "",
      date1: "",
      date2: "",
      timeSpent: "",
      sprintListSorted: "",
      numbers: [1, 2, 4, 3],
      numbersSorted: "",
      remainingTimeEstimate: "",
      eachRemainingTimeChangeArray: [],
      totalRemainingTimeChangeArray: [],
      boardId: "",
      sonarQubeData: "",
      userNme: "",
      pwd: "",
      url: "",
      activeSprint: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.state.sprintListSorted = this.props.sprinttList.sort(function (a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });
    this.setState({
      boardId: this.props.boardId,

      url: this.props.selectedUrl,
      userName: this.props.selectedUserName,
      pwd: this.props.selectedUserPwd,
      values: this.props.activeSprint
    });
  }

  componentDidMount() {
    this.handleChange("1", this.state.values);
  }

  componentWillReceiveProps(nextProps) {
    this.state.sprintListSorted = nextProps.sprinttList.sort(function (a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });
    this.setState({
      boardId: nextProps.boardId,
      url: nextProps.selectedUrl,
      userName: nextProps.selectedUserName,
      pwd: nextProps.selectedUserPwd,
      values: nextProps.activeSprint
    });
  }
  handleChange = (e, index) => {
    if(index!==undefined){
        let val = index
        this.displayDropDownValue(this.props.activeSprintName)
        this.setState({
            values: index
          });
    }
    else{
        let indexOfSelectedAccount = this.state.sprintListSorted
      .map(function(k) {
        return k.name;
      })
      .indexOf(e);
    let val = this.state.sprintListSorted[indexOfSelectedAccount].id;
    this.setState({
      values: val
    });
    }

    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
        this.state.url +
        "/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=" +
        this.state.boardId +
        "&sprintId=" +
        this.state.values,
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        console.log(response)
        this.setState({
          sprintStartTime: "",
          sprintEndTime: "",
          sprintCompleteTime: "",


          currentDate: "",


          workHours: "",
          date1: "",
          date2: "",

          timeSpent: "",
          eachTimeSpentArray: [],
          totalTimeSpentArray: [],
          currentSpentTime: 0,

          remainingTimeEstimate: "",
          currentRemainingTime: 0,
          eachRemainingTimeChangeArray: [],
          totalRemainingTimeChangeArray: []
        });

        var getDateString = function (epochTime) {
          var date = new Date(epochTime);
          var month = "" + (date.getMonth() + 1);
          var day = "" + date.getDate();
          var year = date.getFullYear();
          var dateString = month + "/" + day + "/" + year;
          return dateString;
        };

        var d1 = getDateString(response.data.startTime);
        var d2 = getDateString(response.data.endTime);

        this.setState({
          sprintStartTime: response.data.startTime,
          sprintEndTime: response.data.endTime,
          sprintCompleteTime: response.data.completeTime,
          date1: d1,
          date2: d2
        });
        var currentDateObj = getDateString(response.data.startTime);

        this.setState({ currentDate: this.state.date1 });
        this.state.currentDate = currentDateObj;

        var currentDateEpochTime = response.data.startTime;
        var changesArray = Object.keys(response.data.changes);

        if (response.data.completeTime == undefined) {
          var date = new Date();
          var month = "" + (date.getMonth() + 1);
          var day = "" + date.getDate();
          var year = date.getFullYear();
          var dateString = month + "/" + day + "/" + year;

          response.data.completeTime = new Date(dateString).getTime();
        }

        // Object.keys(response.data.changes).forEach(
        //   function(key, index) {
        //     var eachDate = Number(key);

        //     if(eachDate<=response.data.startTime){
        //       var changeObjArray = response.data.changes[eachDate];
        //       changeObjArray.forEach(
        //       function(item) {
        //         if (item.timeC) {
        //           console.log(item.timeC.newEstimate)
        //         }
        //       }
        //     )
        //     }
        //   })
        var tempObj = {}
        var totalRemainingTimeEstimate = 0;
        Object.keys(response.data.changes).forEach(function (key, index) {
          var eachDate = Number(key);
          if (eachDate < response.data.startTime) {
            var changeObjArray = response.data.changes[eachDate];
            changeObjArray.forEach(function (item, index) {
              if (item.timeC) {
                if (tempObj[item.key] != null) {
                  if (eachDate > tempObj[item.key].date) {

                    totalRemainingTimeEstimate -= tempObj[item.key].newEstimate
                    tempObj[item.key] = { date: eachDate, newEstimate: item.timeC.newEstimate }
                    totalRemainingTimeEstimate += tempObj[item.key].newEstimate
                  }
                } else {
                  tempObj[item.key] = { date: eachDate, newEstimate: item.timeC.newEstimate }
                  totalRemainingTimeEstimate += tempObj[item.key].newEstimate
                }
              }
            })
            var dateString = getDateString(eachDate);
            console.log('foo bnar', dateString, totalRemainingTimeEstimate / 3600)
          }
        })

        this.setState({
          remainingTimeEstimate: totalRemainingTimeEstimate,
          currentRemainingTime: totalRemainingTimeEstimate
        })

        Object.keys(response.data.changes).forEach(function (key, index) {
          var eachDate = Number(key);

          if (eachDate >= response.data.startTime && eachDate <= response.data.completeTime) {
            var changeObjArray = response.data.changes[eachDate];
            changeObjArray.forEach(
              function (item) {
                if (item.timeC) {
                  var d = new Date(eachDate);
                  var dateString = getDateString(eachDate);
                  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                  var diffDays = Math.round(
                    Math.abs(
                      (d.getTime() -
                        new Date(currentDateEpochTime).getTime()) /
                      oneDay
                    )
                  );
                  var estimationDiff = item.timeC.newEstimate > item.timeC.oldEstimate ? (item.timeC.newEstimate - item.timeC.oldEstimate) : (item.timeC.oldEstimate - item.timeC.newEstimate)

                  if (this.state.date1 !== dateString) {
                    this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat(
                      {
                        name: this.state.date1,
                        hr: this.state.timeSpent / 3600,
                        hr1: this.state.remainingTimeEstimate / 3600
                      }
                    );
                    this.setState({
                      date1: dateString,
                      totalTimeSpentArray: this.state.eachTimeSpentArray,
                    });

                    if (diffDays > 1) {
                      for (var i = 1; i < diffDays; i++) {
                        var diffStartDate = new Date(currentDateEpochTime);
                        var missedDate = new Date(currentDateEpochTime);
                        missedDate.setHours(
                          diffStartDate.getHours() + i * 24
                        );

                        var missedDateString = getDateString(missedDate);
                        this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat(
                          {
                            name: missedDateString,
                            hr: this.state.timeSpent / 3600,
                            hr1: this.state.remainingTimeEstimate / 3600
                          }
                        );


                        this.setState({
                          totalTimeSpentArray: this.state.eachTimeSpentArray
                        });
                      }
                    }
                  }
                  if (item.timeC.timeSpent) {

                    if (estimationDiff != 0) {
                      var test = this.state.remainingTimeEstimate
                      this.setState({
                        timeSpent: item.timeC.timeSpent + this.state.currentSpentTime,
                        remainingTimeEstimate: this.state.currentRemainingTime - item.timeC.timeSpent
                      });
                      this.setState({
                        currentSpentTime: this.state.timeSpent,
                        currentRemainingTime: this.state.remainingTimeEstimate
                      });
                      currentDateEpochTime = eachDate;
                    } else {
                      var test = this.state.remainingTimeEstimate
                      this.setState({
                        timeSpent: item.timeC.timeSpent + this.state.currentSpentTime,
                      });
                      this.setState({
                        currentSpentTime: this.state.timeSpent,
                      });
                      currentDateEpochTime = eachDate;
                    }

                    console.log('timeSpent', dateString, estimationDiff / 3600, Number(item.timeC.timeSpent / 3600), this.state.currentRemainingTime / 3600)

                  }

                  if (estimationDiff != 0) {

                    item.timeC.newEstimate > item.timeC.oldEstimate ?
                      this.setState({
                        remainingTimeEstimate: this.state.remainingTimeEstimate + estimationDiff,
                        currentRemainingTime: this.state.remainingTimeEstimate + estimationDiff
                      })
                      :
                      this.setState({
                        remainingTimeEstimate: this.state.remainingTimeEstimate - estimationDiff,
                        currentRemainingTime: this.state.remainingTimeEstimate - estimationDiff
                      })

                    currentDateEpochTime = eachDate;
                    console.log('Rte', dateString, estimationDiff / 3600, 'null', this.state.currentRemainingTime / 3600)

                  }
                }
              }.bind(this)
            );
          }
          if (index == changesArray.length - 1) {
            this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat(
              { name: this.state.date1, hr: this.state.timeSpent / 3600, hr1: this.state.remainingTimeEstimate / 3600 }
            );



            this.setState({
              totalTimeSpentArray: this.state.eachTimeSpentArray,
            });
            var endDateObj = new Date(response.data.endTime);
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var diffDays = Math.round(
              Math.abs(
                (endDateObj.getTime() -
                  new Date(currentDateEpochTime).getTime()) /
                oneDay
              )
            );
            if (diffDays > 1) {
              for (var i = 1; i < diffDays; i++) {
                var diffStartDate = new Date(currentDateEpochTime);
                var missedDate = new Date(currentDateEpochTime);
                missedDate.setHours(diffStartDate.getHours() + i * 24);
                var missedDateString = getDateString(missedDate);
                this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat(
                  { name: missedDateString }
                );

                this.setState({
                  totalTimeSpentArray: this.state.eachTimeSpentArray
                });
              }
            }
          }
        }.bind(this)
        );
        console.log(this.state.totalTimeSpentArray)
        this.props.sprintBurnDownChart(this.state.totalTimeSpentArray);
      });

    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
        this.state.url +
        "/rest/agile/1.0/board/" +
        this.state.boardId +
        "/sprint/" +
        this.state.values +
        "/issue?maxResults=100",
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        this.props.sprintOverviewPiechart(response.data);
      });
  };
  sprintItems = sprintList => {
    // console.log(sprintList);
    return sprintList.map(sprintList => (
      <DropdownItem
        value={sprintList.name}
        className="pointer text-truncate"
        key={sprintList.id}
        onClick={(e, i) => {this.handleChange(e.target.value);  this.displayDropDownValue(e)}}
      >
        {sprintList.name}
      </DropdownItem>
    ));
  };
  displayDropDownValue = e => {
    if (typeof e === "string") {
      this.setState({ dropDownValue: e });
    }
    else {
      this.setState({ dropDownValue: e.currentTarget.textContent });
    }

  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <div className="">
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            className="custom-secondary_dropdown clearfix"
          >
            <DropdownToggle caret className="text-truncate d-flex justify-content-between">
            {this.state.dropDownValue}
            </DropdownToggle>
            <DropdownMenu className="custom-dropdown-menu">
            <div className="custom-dropdown-menu-items clearfix">
              {this.sprintItems(this.state.sprintListSorted)}
            </div>              
            </DropdownMenu>
          </Dropdown>
        <div className="col-md-12 col-lg-12">{this.state.workHours}</div>
        <div className="col-md-12 col-lg-12 padding0">
          {this.state.sprintPieChart}
        </div>
      </div>
    );
  }
}

export default SprintDetails;
