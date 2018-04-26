import React, { Component } from "react";

import axios from "axios";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class SprintDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.state.sprintListSorted = this.props.sprinttList.sort(function(a, b) {
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
    this.handleChange("1", "2", this.state.values);
  }

  componentWillReceiveProps(nextProps) {
    this.state.sprintListSorted = nextProps.sprinttList.sort(function(a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });
    this.setState({
      boardId: nextProps.boardId,
      url: nextProps.selectedUrl,
      userName: nextProps.selectedUserName,
      pwd: nextProps.selectedUserPwd,
      values: nextProps.activeSprint
    });
    //this.state.boardID = nextProps.boardId
  }
  handleChange = (event, index, val) => {
    this.setState({
      values: val
    });

    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
          this.state.url +
          "/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=" +
          this.state.boardId +
          "&sprintId=" +
          val,
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        this.setState({
          sprintStartTime: "",
          sprintEndTime: "",
          sprintCompleteTime: "",
          eachTimeSpentArray: [],
          totalTimeSpentArray: [],
          currentDate: "",
          currentSpentTime: 0,
          workHours: "",
          date1: "",
          date2: "",
          timeSpent: ""
        });

        var getDateString = function(epochTime) {
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
        //var currentDateObj = getDateString(response.data.startTime)

        //this.setState({ currentDate: this.state.date1 })
        // this.state.currentDate = currentDateObj;

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

        Object.keys(response.data.changes).forEach(
          function(key, index) {
            var eachDate = Number(key);

            if (
              eachDate >= response.data.startTime &&
              eachDate <= response.data.completeTime
            ) {
              var changeObjArray = response.data.changes[eachDate];
              changeObjArray.forEach(
                function(item) {
                  if (item.timeC) {
                    if (item.timeC.timeSpent) {
                      var d = new Date(eachDate);
                      var dateString = getDateString(eachDate);
                      if (this.state.date1 !== dateString) {
                        this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat(
                          {
                            name: this.state.date1,
                            hr: this.state.timeSpent / 3600
                          }
                        );

                        this.setState({
                          date1: dateString,
                          totalTimeSpentArray: this.state.eachTimeSpentArray
                        });
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var diffDays = Math.round(
                          Math.abs(
                            (d.getTime() -
                              new Date(currentDateEpochTime).getTime()) /
                              oneDay
                          )
                        );
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
                                hr: this.state.timeSpent / 3600
                              }
                            );

                            this.setState({
                              totalTimeSpentArray: this.state.eachTimeSpentArray
                            });
                          }
                        }
                      }
                      this.setState({
                        timeSpent:
                          item.timeC.timeSpent + this.state.currentSpentTime
                      });
                      this.setState({ currentSpentTime: this.state.timeSpent });
                      currentDateEpochTime = eachDate;
                    }
                  }
                }.bind(this)
              );
            }
            if (index == changesArray.length - 1) {
              this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat(
                { name: this.state.date1, hr: this.state.timeSpent / 3600 }
              );

              this.setState({
                totalTimeSpentArray: this.state.eachTimeSpentArray
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

        //this.setState({ workHours: <Hourschart data={this.state.totalTimeSpentArray} /> })

        this.props.sprintBurnDownChart(this.state.totalTimeSpentArray);
      });

    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
          this.state.url +
          "/rest/agile/1.0/board/" +
          this.state.boardId +
          "/sprint/" +
          val +
          "/issue?maxResults=100",
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        // this.setState({
        // 	sprintPieChart: <Piechart sprinttList={response.data} />
        // });

        this.props.sprintOverviewPiechart(response.data);
      });
    //this.setState({sonarQubeData:<SonarQubeData />})
    //this.props.sonarQubeDetails();
  };
  sprintItems = (sprintList) => {
    return sprintList.map(sprintList => (
      <MenuItem
        key={sprintList.id}
        //insetChildren={true}

        value={sprintList.id}
        primaryText={sprintList.name}
      />
    ));
  }

  render() {
    return (
      <div className="padding0">
        {/* <div className="col-md-12 col-lg-12 textAlignCenter ">
  
                      <h5>Select Sprint</h5>
                  </div> */}
        <div className="col-md-12 col-lg-12 textAlignLeft marginTop4">
          <SelectField
            underlineStyle={{ display: "none" }}
            hintText="Select Sprint"
            value={this.state.values}
            onChange={(e, i, v) => this.handleChange(e, i, v)}
            labelStyle={{ height: "40px" }}
          >
            {this.sprintItems(this.state.sprintListSorted)}
          </SelectField>
        </div>

        <div className="col-md-12 col-lg-12">{this.state.workHours}</div>
        <div className="col-md-12 col-lg-12 padding0">
          {this.state.sprintPieChart}
        </div>
      </div>
    );
  }
}

export default SprintDetails;
