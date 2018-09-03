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
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";


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
      epicBurnDownDataArray: [],
      dropdownOpen: false,
      allIssuesEstimation:'',
      completedIssuesEstimation:'',
      inCompletedIssuesEstimation:''
    };
    this.handleSelectedEpic = this.handleSelectedEpic.bind(this);
    this.listoFEpics = this.listoFEpics.bind(this);
  }

  componentWillMount() {
    console.log(this.props.epicsArray)
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
    this.handleSelectedEpic(epicId);
  }
  handleSelectedEpic = (epicId,) => {
    console.log(epicId)  
    this.setState({ dropDownValue: epicId });
    axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
        //resourceURL:this.state.url + "rest/greenhopper/1.0/rapid/charts/epicburndownchart?rapidViewId="+this.state.boardId +"&epicKey=" + epicId,
        resourceURL:this.state.url + "rest/greenhopper/1.0/rapid/charts/epicreport?rapidViewId="+this.state.boardId +"&epicKey=" + epicId,
        userName: this.state.userName,
        password: this.state.pwd,
        actionMethod: "get"
      })
      .then(response => {
        console.log(response)
        var completedIssuesEstimateSum= response.data.contents.completedIssuesEstimateSum.value/3600
        var inCompletedIssuesEstimation= response.data.contents.incompletedIssuesEstimateSum.value/3600

        const completedcompletedIssuesEstimationPercentage=Math.round(completedIssuesEstimateSum / (completedIssuesEstimateSum+ inCompletedIssuesEstimation)*100);
    
        const inCompletedIssuesEstimationPercentage=Math.round(inCompletedIssuesEstimation / (completedIssuesEstimateSum+ inCompletedIssuesEstimation)*100);

        

        this.setState({
          allIssuesEstimation:response.data.contents.allIssuesEstimateSum.value/3600,
          completedIssuesEstimation:completedcompletedIssuesEstimationPercentage,
          inCompletedIssuesEstimation:inCompletedIssuesEstimationPercentage
        
        })
        // Object.keys(response.data.changes).forEach(function(key, index) {
        //   var eachChangesObj = response.data.changes[key][0];

        //   var eachDate = Number(key);

        //   response.data.sprints.forEach(function(eachSprint) {
        //     if (
        //       eachDate >= eachSprint.startTime &&
        //       eachDate <= eachSprint.endTime
        //     ) {
             
        //       if (
        //         eachChangesObj.statC !== undefined &&
        //         eachChangesObj.statC !== {}
        //       ) {
        //         // console.log(eachSprint.name ,"Change in ",eachChangesObj.key , eachChangesObj.statC.newValue?eachChangesObj.statC.newValue:"NA" , eachChangesObj.statC.oldValue?eachChangesObj.statC.oldValue:"NA")
        //       }
        //       //eachSprint.changes.push(response.data.changes[key][0]);
        //     }
        //   });
        // });
        //console.log(response.data.sprints)
        // response.data.sprints.forEach(function(eachSprint) {
        //   if (eachSprint.changes != undefined) {
        //     eachSprint.uv = 4000;
        //     eachSprint.pv = 3000;
        //     sprintsArray.push(eachSprint);
        //   }
        // });
        // this.setState({
        //   epicBurnDownDataArray: sprintsArray
          
        // });
      });
  };

  listoFEpics = epicsArray => {
      return epicsArray.map(epic => (
        <DropdownItem
          key={epic.id}
          value={epic.key}
          className="pointer text-truncate"
          onClick={(e, i) => {
            this.handleSelectedEpic(e.target.value);
            this.displayDropDownValue(e);
          }}
        >
          {epic.key}
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

 
    // const data = [
    //   { name: "Group A", value: this.state.completedIssuesEstimation},
    //   { name: "Group B", value: this.state.inCompletedIssuesEstimation},
 
    // ];

    // const COLORS = ["#FF8042", "#00C49F"];
    
    //     const RADIAN = Math.PI / 180;
    //     const renderCustomizedLabel = ({
    //       data,
    //       cx,
    //       cy,
    //       midAngle,
    //       innerRadius,
    //       outerRadius,
    //       percent,
    //       index
    //     }) => {
    //       const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //       const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //       const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    //       return `${(percent * 100).toFixed(0)}`;
    //     };
    const allIssuesArray=[
      {"issueType":this.state.completedIssuesEstimation,"color":"#FF8042"},
      {"issueType":this.state.inCompletedIssuesEstimation,"color":"#00C49F"}
    
    ]
    
    return (
      <div className="padding0">
        <div className="col-md-12 padding0" >
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            className="custom-secondary_dropdown clearfix"
            style={{ color: "grey" }}
          >
            <DropdownToggle
              caret
              className="text-truncate d-flex justify-content-between"
              style={{ color: "grey" }}
            >
              {this.state.dropDownValue}
            </DropdownToggle>
            <DropdownMenu className="custom-dropdown-menu">
              {this.listoFEpics(this.state.epicsArray)}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div
          className="col-lg-12 displayInline"
          style={{ height: '10rem' }}
        >
          {/* <div className="col-md-8 col-lg-9 justify padding0">
            <ResponsiveContainer width="103%" aspect={5.0 / 2.8}>
              <PieChart>
                <Pie         
                  dataKey="value"
                  data={data}            
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  animationEasing="ease-in-out"               
                >
                  {data.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} key={index} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-md-3  col-lg-3 justify padding0">
        
            <div className="displayInline sprintStatusMenuWidth">
              <div
                className="borderRadius"
                style={{
                  backgroundColor: "#FF8042",
                  width: "20px",
                  height: "20px",
                  border: "10px solid #FF8042"
                }}
              />

              <div className="col-md-12 padding0">
                <label>{this.state.completedIssuesEstimation}% Done</label>
              </div>
            </div>
            <div className="displayInline sprintStatusMenuWidth">
              <div
                className="borderRadius"
                style={{
                  backgroundColor: "#00C49F",
                  width: "20px",
                  height: "20px",
                  border: "10px solid #00C49F"
                }}
              />

              <div className="col-md-12 padding0">
                <label>{this.state.inCompletedIssuesEstimation}% Not Done</label>
              </div>
            </div>

          </div> */}
          <div className="col-md-12 col-lg-12 padding0 m-3">         

                <div class="progress" style={{height: "10px",width: "100%",border:"1px solid #d4d1d1",borderRadius:"10px"}}>
                      {allIssuesArray.map((eachIssue, i) => ( 
                         <div key={i} style={{
                            width: allIssuesArray[i] !== undefined ?
                            eachIssue.issueType*100 : 0,backgroundColor:eachIssue.color,borderRight:"1px solid grey"
                        }}>                               
                        </div>                
                     ))}  
                </div>
                <div className="row m-2">
                  <div className="col-md-6  col-lg-6 displayInline sprintStatusMenuWidth">
                    <div
                      className="borderRadius"
                      style={{
                        backgroundColor: "#FF8042",
                        width: "20px",
                        height: "20px",
                        border: "10px solid #FF8042"
                      }}
                    />               
                      <label>{this.state.completedIssuesEstimation}% Done</label>
                
                  </div>
                  <div className="col-md-6  col-lg-6 displayInline sprintStatusMenuWidth">
                    <div
                      className="borderRadius"
                      style={{
                        backgroundColor: "#00C49F",
                        width: "20px",
                        height: "20px",
                        border: "10px solid #00C49F"
                      }}
                    />

         
                      <label>{this.state.inCompletedIssuesEstimation}% Not Done</label>
                
                  </div>
                </div>
                {/* <div className="displayInline m-2" >
                    {this.state.individualIssuesProgressArray.map((eachStatus, i) => (
                        <div className="displayInline m-2">
                        <div className="mr-1" style={{marginTop:"2px",backgroundColor:eachStatus.color,width: "15px",height: "15px", border:"1px solid #d4d1d1",borderRadius: "10px"}}> </div> 
                        <div key={i} className={[eachStatus.color].join('')} style={{fontSize:"14px"}}>        
                        {eachStatus.name}-{eachStatus.weightage}                 
                       
                        </div>       
                        </div>        
                    ))}
                </div> */}

            </div>
        </div>
        {/* <ResponsiveContainer width="87%" aspect={5.0 / 2.8}>
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
        </ResponsiveContainer> */}
      </div>
    );
  }
}

export default EpicBurdownChart;
