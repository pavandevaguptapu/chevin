import React, { Component } from "react";

import axios from "axios";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer
} from "recharts";

//import RefreshIndicator from '../re-dashboard/RefreshIndicator';

class EpicBurdownChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId: "",
      url: "",
      userName: "",
      pwd: "",
      epicsArray: "",
      selectedEpicId: "",
      epicBurnDownDataArray: []
    };
    this.handleSelectedEpic = this.handleSelectedEpic.bind(this);
    this.listoFEpics = this.listoFEpics.bind(this);
  }

  componentWillMount() {
    this.state.epicListSorted = this.props.epicsArray.sort(function(a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });
    this.setState({
      boardId: this.props.boardID,
      url: this.props.selectedUrl,
      userName: this.props.selectedUserName,
      pwd: this.props.selectedUserPwd,
      epicsArray: this.state.epicListSorted
    });
  }

  componentWillReceiveProps(nextProps) {
    this.state.sprintListSorted = nextProps.epicsArray.sort(function(a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });
    this.setState({
      boardId: nextProps.boardID,

      url: nextProps.selectedUrl,
      userName: nextProps.selectedUserName,
      pwd: nextProps.selectedUserPwd,
      epicsArray: this.state.sprintListSorted
    });
  }
  componentDidMount() {
    var epicId = this.state.epicsArray[0].key;

    this.handleSelectedEpic("1", "2", epicId);
  }
  handleSelectedEpic = (event, index, val) => {
    this.setState({ selectedEpicId: val });
    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
          this.state.url +
          "/rest/greenhopper/1.0/rapid/charts/epicburndownchart?rapidViewId=" +
          this.state.boardId +
          "&epicKey=" +
          val,
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        var sprintsArray = [];
        Object.keys(response.data.changes).forEach(function(key, index) {
          var eachChangesObj = response.data.changes[key][0];

          var eachDate = Number(key);

          response.data.sprints.forEach(function(eachSprint) {
            if (
              eachDate >= eachSprint.startTime &&
              eachDate <= eachSprint.endTime
            ) {
              if (eachSprint.changes == undefined) {
                eachSprint.changes = [];
              }
              if (
                eachChangesObj.statC !== undefined &&
                eachChangesObj.statC !== {}
              ) {
                // console.log(eachSprint.name ,"Change in ",eachChangesObj.key , eachChangesObj.statC.newValue?eachChangesObj.statC.newValue:"NA" , eachChangesObj.statC.oldValue?eachChangesObj.statC.oldValue:"NA")
              }
              eachSprint.changes.push(response.data.changes[key][0]);
            }
          });
        });
        //console.log(response.data.sprints)
        response.data.sprints.forEach(function(eachSprint) {
          if (eachSprint.changes != undefined) {
            eachSprint.uv = 4000;
            eachSprint.pv = 3000;
            sprintsArray.push(eachSprint);
          }
        });
        this.setState({
          epicBurnDownDataArray: sprintsArray
        });
      });
  };

  listoFEpics = epicsArray => {
    return epicsArray.map(epic => (
      <MenuItem key={epic.id} value={epic.key} primaryText={epic.key} />
    ));
  };

  render() {
    const data = [
      { name: "Page A", uv: 4000, pv: 2400 },
      { name: "Page B", uv: 3000, pv: 1398 },
      { name: "Page C", uv: 2000, pv: 9800 },
      { name: "Page D", uv: 2780, pv: 3908 },
      { name: "Page E", uv: 1890, pv: 4800 },
      { name: "Page F", uv: 2390, pv: 3800 },
      { name: "Page G", uv: 3490, pv: 4300 }
    ];
    return (
      <div className="padding0">
        {/* <div className="col-md-12 col-lg-12 textAlignCenter ">
                      <h5>Epic Overview</h5>
                  </div> */}

        <div className="col-md-12 padding0">
          <SelectField
            hintText="Select Epic"
            value={this.state.selectedEpicId}
            listStyle={{ backgroundColor: "#b7b7b7" }}
            menuItemStyle={{ color: "#000000" }}
            hintStyle={this.state.hintStyle2}
            underlineStyle={{ display: "none" }}
            onChange={(e, i, v) => this.handleSelectedEpic(e, i, v)}
          >
            {this.listoFEpics(this.state.epicsArray)}
          </SelectField>
        </div>
        <ResponsiveContainer width="100%" aspect={5.0 / 2.8}>
          <BarChart
            width={600}
            height={300}
            data={this.state.epicBurnDownDataArray}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3  3" />

            <Bar dataKey="uv" stackId="a" fill="#8884d8" />
            <Bar dataKey="pv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default EpicBurdownChart;
