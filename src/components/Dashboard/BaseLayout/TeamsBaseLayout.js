import React, { Component } from "react";

import { connect } from 'react-redux';
import { setSelectedTeam } from '../../../actions/index';

import GridLayout from "react-grid-layout";
import { WidthProvider, Responsive } from "react-grid-layout";


import css from "../../../../node_modules/react-grid-layout/css/styles.css";
import css1 from "../../../../node_modules/react-resizable/css/styles.css";

import SelectedProjectDetails from "./SelectedProjectDetails";
import SelectedProjectBoardDetails from "./SelectedProjectBoardDetails";
import PeoplesList from "./PeoplesList";
import SonarQubeData from "./SonarQubeData";
import Jenkins from "./Jenkins";
import RefreshIndicatorExampleLoading from "./RefreshIndicatorExampleLoading";
import Hourschart from "./HoursChart";
import Piechart from "./PieChart";
import SprintDetails from "./SprintDetails";
import IssuesList from "./IssueList";
import EpicBurdownChart from "./EpicBurnDownChart";
import Logout from '../../../logout.js';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router-dom';
import axios from "axios";
import { myConstClass } from "../../../constants";
import image from "../../../shared/spring_board_logo.png";

import Avatar from "material-ui/Avatar";
import Grid from "material-ui/svg-icons/image/grid-on";
import Search from "material-ui/svg-icons/action/search";
import Fullscreen from "material-ui/svg-icons/navigation/fullscreen";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Card, CardHeader} from "material-ui";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { grey600, faintBlack } from "material-ui/styles/colors";
const navBarContainer = {
    navBarbg: {
        backgroundColor: "#ffd91d"
    },
    widgetContainer: {
        backgroundColor: "#3d393a",
        minHeight: "100vh",
        widgetCard: {
            height: "20rem",
            margin: "5px",
            overflow: "none"
        }     
    }
  
};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const mapDispatchToProps = dispatch => {
    return {
        setSelectedTeam: teamId => dispatch(setSelectedTeam(teamId)),
    };
};

class TeamsBaseLayout extends Component {
    state = {
        newClass: "some",
        dropdownOpen: false,
        dropDownValue: "Select Team",
        Teams: [],
        accountName: "",
        projectName: "",
        teamName: "",
        projectDetails: { projects: [] },
        projects: "",
        listofepics: [],
        sprintDetails: "",
        workHours: [],
        selectedProjectBoardDetails: "",
        sonarQubeData: "",
        issuesListArray: [],
        peoplesArray: [],
        activeSprint: "",
        epicBurdownChart: "",
        loaderforpeople: "",
        loaderforsonar: "",
        loaderforsprintburndownchart: "",
        loaderforsprintoverviewpiechart: "",
        loaderforEpicDetails: "",
        loaderforEpicOverviewburndownchart: "",
        sprintPieChart: "",
        overlay: false,
        noTeam: false,
        emptyToolsandPeopleObj: false,
        jenkinsDataArray: [],
        jenkinsData: ''
    };

    componentWillMount() {
        axios.post(myConstClass.new + "/getTeams").then(response => {           
            if (
                JSON.stringify(response.data.content) !== undefined &&
                JSON.stringify(response.data.content) != JSON.stringify([])
            ) {
                this.setState({
                    Teams: this.state.Teams.concat(response.data.content)                
                });
            } else if (JSON.stringify(response.data.content) == JSON.stringify([])) {
                this.setState({ noTeam: true });
            }
        });
    }
    listofTeams = (teams, index) => {
        return teams.map((team, index) => (
            <DropdownItem
                value={team.teamName}
                className="pointer text-truncate"
                key={team.teamId}
                onClick={(e, ind) => {
                    this.selectedTeam(team.teamId,index);
                    this.displayDropDownValue(e);
                    this.props.setSelectedTeam(team.teamId);
                }}
            >
                {team.teamName}
            </DropdownItem>
        ));
    };
    selectedTeam = (e, i) => {      
        var teamId = e
        this.setState({
            peoplesArray: "",
            sonarQubedata: "",
            issuesListArray: "",
            epicBurndownChart: "",
            sprintDetails: "",
            selectedProjectBoardDetails: "",
            workHours: "",
            sprintPieChart: ""
        });
        axios.post(myConstClass.new + "/getTeamDetails", {
            teamId: teamId
        })
            .then(response => {                   
                    this.setState({
                        accountName: e.teamName,              
                        value: e.teamName,
                        projects: (
                            <SelectedProjectDetails
                                projectDetails={response.data.content}
                                onSelectProject={this.selectProject}
                                showLoader={this.ShowLoaderforTeamandQuality}
                                errorMessage={this.displayErrorMessage}
                                displayDropDownValue={this.displayDropDownValue}
                                teamId = {teamId}
                                getSonarDetails={this.getSonarDetails}
                            />
                      
                        )
               
                    });
                // });
            })


    };
    selectProject = (boardDetails,username,password,hostedurl, peopleArray,projectIndex) => {
       
          this.setState({username:username,password:password,hostedurl:hostedurl,
              selectedProjectBoardDetails:
                  <SelectedProjectBoardDetails
                      selectedProjectBoardDetails={boardDetails}
                      username={username}
                      pwd={password}
                      hostedurl={hostedurl}
                      onSelectBoard={this.selectedBoardforSprintData}
                      currentBoard={this.selectedBoardforIssues}
                      listOfEpics={this.epicBurdownChart}
                      showLoaderforEpicData={this.ShowLoaderforEpicData}
                      showLoaderforSprintData={this.ShowLoaderforSprintData}
  
                  />
              ,
              loaderforpeople: "",           
              jenkinsData: <Jenkins />,
              loaderforJenkins: ""
          });
          if (peopleArray != undefined) {
             this.setState({
              peoplesArray: <PeoplesList peoplesList={peopleArray} />,
             })
          }
          
      };
    selectedBoardforSprintData = (listOfSprints,boardId,username,password,hostedurl) => {
        if (listOfSprints !== undefined) {
            var sprintListArray = listOfSprints;
            for (var i = 0; i < sprintListArray.length; i++) {
                if (sprintListArray[i].state === "active") {
                    var activeSprint = sprintListArray[i].id;
                    var activeSprintName = sprintListArray[i].name;
                    break
                }
                else {
                    var activeSprint = sprintListArray[i].id;
                    var activeSprintName = sprintListArray[i].name;
                }
            }
            this.setState({
                sprintDetails: (
                    <SprintDetails
                        sprinttList={sprintListArray}
                        boardId={boardId}
                        username={username}
                        pwd={password}
                        hostedurl={hostedurl}
                        activeSprintName={activeSprintName}
                        activeSprint={activeSprint}
                        sprintBurnDownChart={this.sprintburndownchart}
                        sprintOverviewPiechart={this.sprintoverviewpiechart}
                        displayDropDownValue={this.displayDropDownValue}
                    />
                ),
                emptySprintArray: ""
            });
        } else {
            this.setState({
                // sprintDetails: <SprintDetails sprinttList={[]} boardId={boardId} />,
                workHours: "",
                sprintPieChart: "",
                sprintDetails: "",
                emptySprintArray: "No Sprints to display data",
                loaderforsprintoverviewpiechart: "",
                loaderforsprintburndownchart: ""
            });
        }
    };
    epicBurdownChart = (listOfEpics,boardId,username,password,hostedurl) => {
        if (JSON.stringify(listOfEpics) == JSON.stringify([])) {
            this.setState({
                epicBurndownChart: "",
                loaderforEpicOverviewburndownchart: "",
                emptyEpicsArray: "No epics to show data",
                issuesListArray: "",
                loaderforEpicDetails: ""
            });
        } else {
            this.setState({
                epicBurndownChart: (
                    <EpicBurdownChart
                        epicsArray={listOfEpics}
                        selectedUserName={username}
                        selectedUserPwd={password}
                        selectedUrl={hostedurl}
                        boardID={boardId}
                    />
                ),
                loaderforEpicOverviewburndownchart: "",
                emptyEpicsArray: ""
            });
        }
    };
    selectedBoardforIssues = (epicsArray,username,password,hostedurl) => {    
        axios
            .post(`sbtpgateway/tp/rest/esccors/generic/`, {
                resourceURL: hostedurl + "/rest/api/2/status",
                userName: username,
                password: password,
                actionMethod: "get"
            })
            .then(response => {             
                var statusArray = [];
                response.data.forEach(function (eachStatus) {
                    statusArray.push(eachStatus.name);
                });
                var issuesDataArray = [];
                epicsArray.forEach(function (eachEpicDetails) {
                    var issuesObj = {};
                    issuesObj.epicName = eachEpicDetails.name;
                    for (var i = 0; i < statusArray.length; i++) {
                        var currentStatusIssuesArray = [];
                        if (eachEpicDetails.issues.length == 0 ||eachEpicDetails.issues===undefined) {
                            issuesObj[statusArray[i]] = 0;
                        } else {
                            eachEpicDetails.issues.forEach(function (issue) {
                                if (statusArray[i] == issue.fields.status.name) {
                                    currentStatusIssuesArray.push(issue);
                                }
                            });
                            issuesObj[statusArray[i]] = currentStatusIssuesArray.length;
                        }
                    }
                    issuesDataArray.push(issuesObj);
                });

                this.setState({
                    issuesListArray: <IssuesList issuesArray={issuesDataArray} />,
                    loaderforEpicDetails: ""
                });
            });
    };
  
    getSonarDetails=(username,password,hostedurl)=>{        
          this.setState({
            sonarQubedata: <SonarQubeData 
            
            username={username}
            pwd={password}
            hostedurl={hostedurl}
                        
                        />,
                        loaderforsonar: ""
          })
      }   

    sonarQubeData = () => {
        this.setState({ sonarQubeData: <SonarQubeData /> });
    };
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };
    displayDropDownValue = e => {
        this.setState({ dropDownValue: e.currentTarget.textContent });
    };    
    displayErrorMessage = () => {

        this.setState({ emptyToolsandPeopleObj: true });
    };
    ShowLoaderforTeamandQuality = () => {
        this.setState({
            loaderforpeople: <RefreshIndicatorExampleLoading status={"loading"} />,
            loaderforsonar: <RefreshIndicatorExampleLoading status={"loading"} />,
            loaderforJenkins: <RefreshIndicatorExampleLoading status={"loading"} />
        });
    };
    ShowLoaderforSprintData = () => {
        this.setState({
            loaderforsprintburndownchart: (
                <RefreshIndicatorExampleLoading status={"loading"} />
            ),
            loaderforsprintoverviewpiechart: (
                <RefreshIndicatorExampleLoading status={"loading"} />
            ),
            sprintburndownoverlay: true,
            sprintoverviewoverlay: true,
            overlay: true
        });
    };
    ShowLoaderforEpicData = () => {
        this.setState({
            loaderforEpicDetails: (
                <RefreshIndicatorExampleLoading status={"loading"} />
            ),
            loaderforEpicOverviewburndownchart: (
                <RefreshIndicatorExampleLoading status={"loading"} />
            )
        });
    };
    sprintburndownchart = timespentArray => {
        this.setState({
            workHours: <Hourschart data={timespentArray} />,
            loaderforsprintburndownchart: "",
            sprintburndownoverlay: false
        });
    };
    sprintoverviewpiechart = workProgress => {
        this.setState({
            sprintPieChart: <Piechart sprinttList={workProgress} />,
            loaderforsprintoverviewpiechart: "",
            sprintoverviewoverlay: false,
            overlay: false
        });
    }; 
    projectsListArray = projects => {
        return projects.map(project => (
            <MenuItem
                key={project.projectName}
                insetChildren={true}
                value={project.projectName}
                primaryText={project.projectName}
            />
        ));
    };  
    fullscreen = () => {
        const currentState = this.state.newClass;
        this.setState({ newClass: !currentState });
    }; 
    render() {
        return (
            <div style={navBarContainer.widgetContainer}>
                <div className={["container-fluid", this.state.noTeam === false].join('')}>
                    <nav
                        className="navbar navbar-light navbar-expand-lg align-items-end p-3"
                        style={navBarContainer.navBarbg}
                            >
                            <a className="navbar-brand">
                                <img
                                    src={image}
                                    width="170"
                                    height="30"
                                    className="d-inline-block align-top ml-3"
                                    alt="SpringBoard"
                                />
                            </a>
                        <div className="navbar-collapse">
                            <div className="navbar-nav">
                                <div className="">
                                    <Dropdown
                                        isOpen={this.state.dropdownOpen}
                                        toggle={this.toggle}
                                        className="custom-dropdown clearfix"
                                    >
                                        <DropdownToggle
                                            caret
                                            className="text-truncate d-flex justify-content-between"
                                        >
                                            {this.state.dropDownValue}
                                        </DropdownToggle>
                                        <DropdownMenu className="custom-dropdown-menu">
                                            {this.listofTeams(this.state.Teams)}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="">{this.state.projects}</div>
                            </div>
                        </div>
                        <div className="col-md-1 col-lg-1 d-flex  justifyContentCenter">
                            <div className="mr-2">
                                {/* <Avatar
                                    src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
                                    size={40}                                    
                                /> */}
                                <Link to="/app" >
                                    <FloatingActionButton mini={true} backgroundColor={'grey'} style={{ boxShadow: "none" }}>
                                        <ActionSettings style={{ height: "25px", width: "25px",marginTop:"5px" }} />
                                    </FloatingActionButton>
                            </Link>
                            </div>
                            <div className="" >
                            <Link to="/app/logout" >
                                <Logout />
                            </Link>
                        </div>

                        </div>
                        {/* <div className="col-md-1 col-lg-1 d-flex mt-1 mb-1 justifyContentCenter">
                        <div className="mt-2" >
                            <Link to="/app/logout" >
                                <Logout />
                            </Link>
                        </div>
                    </div> */}
                    </nav>

                    <div
                        className="boards col-lg-12 clearfix d-flex align-items-center"
                        style={{ backgroundColor: "#494b4f", height: "3rem" }}
                    >
                        <div className="col-lg-2">
                            {this.state.selectedProjectBoardDetails}
                        </div>
                        <div className="col-lg-2"> {this.state.sprintDetails} </div>
                    </div>


                    <div className="col-lg-12 my-4">
                        <div className="col-lg-12 text-right">
                            <FloatingActionButton mini={true} className="add-custom_button">
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                        <div>

                        </div>
                        <div className="widgetCard clearfix">
                            <ResponsiveReactGridLayout
                                className="layout clearfix"
                                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                                rowHeight={30}
                                width={1200}
                            >
                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="5"
                                    data-grid={{ x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                    id="myDiv"
                                    className={this.state.newClass ? "minScreen" : "fullscreen"}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Sprint Burn Chart" className="p-0" />
                                        <div>
                                            <Fullscreen onClick={this.fullscreen} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforsprintburndownchart}
                                        {this.state.emptySprintArray}
                                        {this.state.workHours}
                                    </div>
                                </Card>
                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="6"
                                    data-grid={{ x: 4, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}

                                >
                                    <Link to=
                                        {{
                                            pathname: '/userDetails',
                                            state: { username: this.state.username, password: this.state.password, hostedurl: this.state.hostedurl }
                                        }}                                      
                                           >
                                        <div className="d-flex custom_dashboard-header justify-content-between" >
                                            <CardHeader title="Sprint Overview" className="p-0 pointer" />
                                        </div>
                                    </Link>
                                    <div className="col-lg-12 text-center p-0">
                                        {this.state.loaderforsprintoverviewpiechart}
                                        {this.state.emptySprintArray}
                                        {this.state.sprintPieChart}
                                    </div>
                                </Card>

                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="7"
                                    data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Quality Overview" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforsonar}
                                        {this.state.sonarQubedata}
                                    </div>
                                </Card>

                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="4"
                                    data-grid={{ x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Epic Burndown Chart" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforEpicOverviewburndownchart}
                                        {this.state.emptyEpicsArray}
                                        {this.state.epicBurndownChart}
                                    </div>
                                </Card>

                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="8"
                                    data-grid={{ x: 4, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Jenkins Build Status" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforJenkins}
                                        {this.state.jenkinsData}
                                    </div>
                                </Card>

                                {/* <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="1"
                                    data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between ">
                                        <CardHeader title="Team Details" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforpeople}
                                        {this.state.emptyPeoplesArray}
                                        {this.state.peoplesArray}
                                    </div>
                                </Card> */}
                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="2"
                                    data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Epic Overview" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforEpicDetails}
                                        {this.state.emptyEpicsArray}
                                        {this.state.issuesListArray}
                                    </div>
                                </Card>


                            </ResponsiveReactGridLayout>
                        </div>
                    </div>
                </div>
                <div className={["container-fluid", this.state.noTeam === true].join('')}>
                    <p><h3>Please contact your admin to Configure Teams</h3></p>
                </div>
            </div>
        );
    }
}

export default  connect(null, mapDispatchToProps)(TeamsBaseLayout)

