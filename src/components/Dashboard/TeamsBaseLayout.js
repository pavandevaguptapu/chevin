import React, { Component } from "react";

import GridLayout from "react-grid-layout";
import { WidthProvider, Responsive } from "react-grid-layout";
import css from "../../../node_modules/react-grid-layout/css/styles.css";
import css1 from "../../../node_modules/react-resizable/css/styles.css";

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

import axios from "axios";
import { myConstClass } from "../../constants";
import image from "../../shared/spring_board_logo.png";

import Avatar from "material-ui/Avatar";
import Grid from "material-ui/svg-icons/image/grid-on";
import Search from "material-ui/svg-icons/action/search";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Card, CardHeader } from "material-ui";
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
    height: "100%",
    widgetCard: {
      height: "20rem",
      margin: "5px",
      overflow: "auto"
    }
  }
};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class TeamsBaseLayout extends Component {
  state = {
    dropdownOpen: false,
    dropDownValue: "Select Team",
    accounts: [],
    accountName: "",
    isModalOpen: false,
    projectName: "",
    teamName: "",
    projectDetails: { projects: [] },
    selectedTab1: true,
    selectedTab2: false,
    selectedTab3: false,
    selectedTab4: false,
    selectedTab5: false,
    projects: "",
    listofepics: [],
    selecteditem: "",
    issueTracking: "",
    developmentlist: [],
    sprintDetails: "",
    sourcelist: [],
    source: "",
    issuesList: [],
    doneArrayList: [],
    inprogressArrayList: [],
    todoArrayList: [],
    inqaArrayList: [],
    checkbox: "",
    doneArrayListlength: "",
    inprogressArrayListlength: "",
    todoArrayListlength: "",
    inqaArrayListlength: "",
    workHours: [],
    totalHours: [],
    issuesPieChart: "",
    datesArrayList: [],
    isAddProjectModal: false,
    projectTitle: "",
    selectedProjectIndex: 0,
    selectedProjectDetails: "",
    selectedProjectBoardDetails: "",
    sonarQubeData: "",
    issuesListArray: [],
    issuesArray: [],
    peoplesArray: [],
    hintStyle2: { opacity: 1 },
    renderChild: true,
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
    emptyAccountsObj: false,
    emptyProjectsObj: false,
    emptyToolsandPeopleObj: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  addProjectModal = () => {
    this.setState({ isAddProjectModal: true });
  };

  addProject = (account, projectTitle) => {
    axios
      .put(myConstClass.nodeAppUrl + "/accounts/" + account._id, {
        projects: [{ name: projectTitle, tools: [] }]
      })
      .then(response => {});
    this.setState({ isAddProjectModal: false });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  cancelModal = () => {
    this.setState({ isModalOpen: false, emptyAccountsObj: false });
  };

  onDrop = data => {
    this.setState({ isModalOpen: true });
  };

  displayDropDownValue = e => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };

  accountsListArray = (accounts, index) => {
    return accounts.map((account, index) => (
      <DropdownItem
        value={account.customerName}
        className="pointer text-truncate"
        key={account._id}
        onClick={(e, index) => {
          this.selectedAccount(e.target.value);
          this.displayDropDownValue(e);
        }}
      >
        {account.customerName}
      </DropdownItem>
    ));
  };

  selectedAccount = (e, i) => {
    let indexOfSelectedAccount = this.state.accounts
      .map(function(e) {
        return e.customerName;
      })
      .indexOf(e);
    //   console.log(this.state.accounts[indexOfSelectedAccount])
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

    this.setState({
      accountName: e.customerName,
      projectDetails: indexOfSelectedAccount,
      value: e.customerName,
      projects: (
        <SelectedProjectDetails
          projectDetails={this.state.accounts[indexOfSelectedAccount]}
          onSelectProject={this.selectProject}
          showLoader={this.ShowLoaderforTeamandQuality}
          errorMessage={this.displayErrorMessage}
          displayDropDownValue={this.displayDropDownValue}
        />
      )
    });
  };

  displayErrorMessage = () => {
    // if(projectDetails.projects.tools == undefined && projectDetails.projects.people==undefined)
    this.setState({ emptyToolsandPeopleObj: true });
  };

  ShowLoaderforTeamandQuality = () => {
    this.setState({
      loaderforpeople: <RefreshIndicatorExampleLoading status={"loading"} />,
      loaderforsonar: <RefreshIndicatorExampleLoading status={"loading"} />
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

  selectProject = (boardDetails, userName, password, hostedUrl, peopleList) => {
    if (peopleList != undefined) {
      this.setState({
        selectedProjectBoardDetails: (
          <SelectedProjectBoardDetails
            selectedProjectBoardDetails={boardDetails}
            selectedUserName={userName}
            selectedUserPwd={password}
            selectedUrl={hostedUrl}
            onSelectBoard={this.selectedBoardforSprintData}
            currentBoard={this.selectedBoardforIssues}
            listOfEpics={this.epicBurdownChart}
            showLoaderforEpicData={this.ShowLoaderforEpicData}
            showLoaderforSprintData={this.ShowLoaderforSprintData}
          />
        ),
        peoplesArray: <PeoplesList peoplesList={peopleList} />,
        loaderforpeople: "",
        sonarQubedata: <SonarQubeData/>,
        loaderforsonar: "",
        jenkinsData:<Jenkins/>
      });
    } else if (
      peopleList == undefined ||
      JSON.stringify(peopleList) === JSON.stringify([])
    ) {
      this.setState({
        selectedProjectBoardDetails: (
          <SelectedProjectBoardDetails
            selectedProjectBoardDetails={boardDetails}
            selectedUserName={userName}
            selectedUserPwd={password}
            selectedUrl={hostedUrl}
            onSelectBoard={this.selectedBoardforSprintData}
            currentBoard={this.selectedBoardforIssues}
            listOfEpics={this.epicBurdownChart}
            showLoaderforEpicData={this.ShowLoaderforEpicData}
            showLoaderforSprintData={this.ShowLoaderforSprintData}
          />
        ),
        //peoplesArray: <PeoplesList peoplesList={peopleList} />,
        loaderforpeople: "",
        sonarQubedata: <SonarQubeData />,
        loaderforsonar: "",
        //peoplesArray:"",
        emptyPeoplesArray: "No members to dispaly",
        jenkinsData:<Jenkins/>
      });
    }
  };

  sonarQubeData = () => {
    this.setState({ sonarQubeData: <SonarQubeData /> });
  };

  sprintburndownchart = (timespentArray) => {
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

  selectedBoardforSprintData = (sprintList, boardId, url, username, pwd) => {
    console.log(sprintList);
    if (sprintList !== undefined) {
      var sprintListArray = sprintList;
      for (var i = 0; i < sprintListArray.length; i++) {
        if (sprintListArray[i].state === "active") {
          var activeSprint = sprintListArray[i].id;
          var activeSprintName = sprintListArray[i].name;
        }
      }
      this.setState({
        sprintDetails: (
          <SprintDetails
            sprinttList={sprintListArray}
            boardId={boardId}
            selectedUrl={url}
            selectedUserName={username}
            selectedUserPwd={pwd}
            //sonarQubeDetails={this.sonarQubeData}
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

  selectedBoardforIssues = (epicsArray, resourceURL, userName, password) => {
    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL: resourceURL + "/rest/api/2/status",
        userName: userName,
        password: password,
        actionMethod: "get"
      })
      .then(response => {
        var statusArray = [];
        response.data.forEach(function(eachStatus) {
          statusArray.push(eachStatus.name);
        });
        var issuesDataArray = [];
        epicsArray.forEach(function(eachEpicDetails) {
          var issuesObj = {};
          issuesObj.epicName = eachEpicDetails.name;
          for (var i = 0; i < statusArray.length; i++) {
            var currentStatusIssuesArray = [];
            if (eachEpicDetails.issues.length == 0) {
              issuesObj[statusArray[i]] = 0;
            } else {
              eachEpicDetails.issues.forEach(function(issue) {
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

  epicBurdownChart = (listOfEpics, boardId, hostedUrl, userName, password) => {
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
            selectedUserName={userName}
            selectedUserPwd={password}
            selectedUrl={hostedUrl}
            boardID={boardId}
          />
        ),
        loaderforEpicOverviewburndownchart: "",
        emptyEpicsArray: ""
      });
    }
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

  componentWillMount() {
    axios.get(myConstClass.nodeAppUrl + "/accounts").then(response => {
      if (
        JSON.stringify(response.data) !== undefined &&
        JSON.stringify(response.data) != JSON.stringify([])
      ) {
        this.setState({
          accounts: this.state.accounts.concat(response.data)
        });
      } else if (JSON.stringify(response.data) == JSON.stringify([])) {
        this.setState({ emptyAccountsObj: true });
      }
    });
  }

  fullscreen = () => {
    //   alert(1);
  };

  render() {
    return (
      <div style={navBarContainer.widgetContainer}>
        <div className="container-fluid">
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
                    className="custom-dropdown"
                  >
                    <DropdownToggle caret className="text-truncate">
                      {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu className="custom-dropdown-menu">
                      {this.accountsListArray(this.state.accounts)}
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="">{this.state.projects}</div>
              </div>
            </div>
            <div className="col-lg-2 text-right">
              <div>
                <Avatar
                  src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
                  size={40}
                />
              </div>
            </div>
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
            <div className="widgetCard clearfix">
              <ResponsiveReactGridLayout
                className="layout clearfix"
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                width={1200}
              >
                <Card
                  style={navBarContainer.widgetContainer.widgetCard}
                  key="1"
                  data-grid={{ x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                >
                  <CardHeader
                    title="Team Details"
                    className="custom_dashboard-header"
                  />
                  {/* <button onClick={this.fullscreen}>s</button> */}
                  <div className="col-lg-12 text-center">
                    {this.state.loaderforpeople}
                    {this.state.emptyPeoplesArray}
                    {this.state.peoplesArray}
                  </div>
                </Card>
                <Card
                  style={navBarContainer.widgetContainer.widgetCard}
                  key="2"
                  data-grid={{ x: 4, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                >
                  <CardHeader
                    title="Epic Overview"
                    className="custom_dashboard-header"
                  />
                  <div className="col-lg-12 text-center">
                    {this.state.loaderforEpicDetails}
                    {this.state.emptyEpicsArray}
                    {this.state.issuesListArray}
                  </div>
                </Card>
                <Card style={navBarContainer.widgetContainer.widgetCard}
                  key="4"
                  data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}                
                >
                  <CardHeader
                    title="Epic Burndown Chart"
                    className="custom_dashboard-header"
                  />
                  <div className="col-lg-12 text-center">
                    {this.state.loaderforEpicOverviewburndownchart}
                    {this.state.emptyEpicsArray}
                    {this.state.epicBurndownChart}
                  </div>
                </Card>
                <Card style={navBarContainer.widgetContainer.widgetCard}
                  key="5"
                  data-grid={{ x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}                
                >
                  <CardHeader
                    title="Sprint BurnUp Chart"
                    className="custom_dashboard-header"
                  />
                  <div className="col-lg-12 text-center">
                    {this.state.loaderforsprintburndownchart}
                    {this.state.emptySprintArray}
                    {this.state.workHours}
                  </div>
                </Card>
                <Card style={navBarContainer.widgetContainer.widgetCard}
                  key="6"
                  data-grid={{ x: 4, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}                
                >
                  <CardHeader
                    title="Sprint Overview"
                    className="custom_dashboard-header"
                  />
                  <div className="col-lg-12 text-center">
                    {this.state.loaderforsprintoverviewpiechart}
                    {this.state.emptySprintArray}
                    {this.state.sprintPieChart}
                  </div>
                </Card>
                <Card style={navBarContainer.widgetContainer.widgetCard}
                  key="7"
                  data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}                
                >
                  <CardHeader
                    title="Quality Overview"
                    className="custom_dashboard-header"
                  />
                  <div className="col-lg-12 text-center">
                    {this.state.loaderforsonar}
                    {this.state.sonarQubedata}
                  </div>
                </Card>
                <Card style={navBarContainer.widgetContainer.widgetCard}
                  key="8"
                  data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}                
                >
                  <CardHeader
                    title="Jenkins Build Status"
                    className="custom_dashboard-header"
                  />
                  <div className="col-lg-12 text-center">
                    {/* {this.state.loaderforsonar} */}
                    {this.state.jenkinsData}
                  </div>
                </Card>
              </ResponsiveReactGridLayout>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamsBaseLayout;
