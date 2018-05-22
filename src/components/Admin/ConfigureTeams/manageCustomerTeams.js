import React from 'react';
import '../../../App.css';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import SocialPeopleOutline from 'material-ui/svg-icons/social/people-outline';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionSettingsApplications from 'material-ui/svg-icons/action/settings-applications';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import { myConstClass } from '../../../constants.js';
import { Step, Stepper, StepLabel, StepButton } from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

var dcopy = require('deep-copy')


let SelectableList = makeSelectable(List);

const modelbuttonsStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.87)',
    paddingRight: '10px',
    boxShadow: 'none'
}
const editProjectButton = {
    height: "20px",
    width: "20px"

}
const deleteProjectButton = {
    height: "20px",
    width: "20px"
}
const tabsBackgroundColor = {
    backgroundColor: "rgb(156, 156, 156)"
}

const styles = {

    largeIcon: {
        width: 10,
        height: 10,
        padding: 0
    },

};

class ManageCustomerTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTeamsDataArray: ''
        }
    }
    componentWillMount() {
        axios.get("http://172.16.25.50:8585/springhibernate/newspringboardapi/getTeams")
            .then(response => {

                if (response.data.content.length === 0) {
                    this.setState({
                        accountDetails: <AccountDetails addTeamString={true} />
                    })
                } else {
                    this.setState({
                        accountDetails: <AccountDetails allTeamsDataArray={response.data.content} addTeamString={false} />
                    })
                }
            }, (error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <div className="container-fluid padding0">
                <nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
                    <div className="col-md-12 flex">
                        <div className="col-md-12 col-lg-12 textAlignCenter marginT07">
                            <h5 className="">Manage Customer Teams</h5>
                        </div>
                        <div>
                        </div>
                    </div>
                </nav>
                {this.state.accountDetails}
            </div>
        )
    }
}

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTeams: [],
            showTeamLevelDetails: false,
            TeamDetailsArrayForEditing: [],



            newProjectDetails: {},
            projectList: [],
            selectedTeamName: '',
            selectedTeamIndex: '',
            selectedProjectIndex: '',
            selectedToolIndex: 0,
            peopleArray: [],
            selectedToolDetails: {},
            newDate: new Date(),
            newTeamObj: {},
            noProject: false,
            noPeople: false,
            noTool: false,
            listofToolsarray: [],
            projectsArray: [],
            selectedProjectName: '',
            newPeopleObj: {},
            editProjectDetails: {},
            toolsConfig: {},
            toolName: {},
            processName: {}
            // processArray: [
            //     { "name": "Project Management", "processID": 4, "tools": [{ "name": "jira" }] },
            //     { "name": "Quality Management", "processID": 5, "tools": [{ "name": "SonarQube" }, { "name": "jira" }] },
            //     { "name": "Build Tool", "processID": 6, "tools": [{ "name": "Gradle" }, { "name": "SonarQube" }] }

            // ],
            // editableProcessArray: [
            //     { "name": "Project Management", "processID": 4, "tools": [{ "name": "jira" }] },
            //     { "name": "Quality Management", "processID": 5, "tools": [{ "name": "SonarQube" }, { "name": "jira" }] },
            //     { "name": "Build Tool", "processID": 6, "tools": [{ "name": "Gradle" }, { "name": "SonarQube" }] },

            // ],
            //stepIndex: 0,
            // jumpStartObj: [{ "processName": "", "tools": [{ "toolName": "", "username": "", "password": "", "url": "" }] }],
            // headersToolsArray: [{ "name": "Project Management", "processID": 4 }, { "name": "Quality Management", "processID": 5 }, { "name": "Build Tool", "processID": 6 }, { "name": "Source Control", "processID": 7 }],
            // toolsArray: [
            //     { "name": "Jira", "processID": [3, 5, 4] }, { "name": "SonarQube", "processID": [0, 5] }, { "name": "Jenkins", "processID": [3] },
            //     { "name": "Git", "processID": [7] }
            // ]

        }
    }

    getDateString = (date) => {


        var date = new Date(date)
        // var date = new Date(epochTime)
        var month = '' + (date.getMonth() + 1)
        var day = '' + date.getDate()
        var year = date.getFullYear()
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var dateString = (year + "-" + month + "-" + day)
        return dateString


    }
    componentWillMount() {
        axios.get("http://172.16.25.50:8585/springhibernate/newspringboardapi/getMasterToolsAndProcesses")
            .then(response => {

                var toolsArray = []
                var processArray = []
                toolsArray = response.data.content.tools
                processArray = response.data.content.processes
                this.setState({ toolsArray: toolsArray, processArray: processArray })
            }, (error) => {
                console.log(error)
            })

        if (this.props.addTeamString === true) {
            this.setState({ addTeamString: true })
        }
        else {
            var listOfTeams = this.props.allTeamsDataArray
            var lastTeamIndex = listOfTeams.length - 1
            if (listOfTeams[lastTeamIndex].projects === undefined && listOfTeams[lastTeamIndex].people === undefined) {
                listOfTeams[lastTeamIndex].projects = []
                listOfTeams[lastTeamIndex].people = []
            }
            this.setState({ listOfTeams: listOfTeams, selectedTeamIndex: lastTeamIndex })
        }
    }
    componentDidMount() {
        if (this.props.addTeamString === false) {
            this.selectedTeam("e", this.state.selectedTeamIndex)
        }
    }
    selectedTeam = (event, selectedTeamIndex) => {
        var tempListOfTeams = this.state.listOfTeams
        var selectedTeam = tempListOfTeams[selectedTeamIndex].teamName
        var selectedTeamId = tempListOfTeams[selectedTeamIndex].teamId
        this.setState({ selectedTeamName: selectedTeam })
        axios.post("http://172.16.25.50:8585/springhibernate/newspringboardapi/getTeamDetails",
            {
                teamId: selectedTeamId
            }
        ).then(response => {
            var tempListOfTeamsArray = this.state.listOfTeams
            var selectedObj = this.state.listOfTeams[selectedTeamIndex]
            response.data.content["teamName"] = this.state.listOfTeams[selectedTeamIndex].teamName
            response.data.content["status"] = this.state.listOfTeams[selectedTeamIndex].status
            response.data.content["teamId"] = this.state.listOfTeams[selectedTeamIndex].teamId
            tempListOfTeamsArray.splice(selectedTeamIndex, 1)
            tempListOfTeamsArray.splice(selectedTeamIndex, 0, response.data.content)
            if (tempListOfTeamsArray[selectedTeamIndex].projects.length === 0 && tempListOfTeamsArray[selectedTeamIndex].people.length === 0) {
                this.setState({ listOfTeams: tempListOfTeamsArray, noProject: true, noPeople: true, noTool: true, selectedTeamIndex: selectedTeamIndex })
            }
            else {
                var ProjectsArray = tempListOfTeamsArray[selectedTeamIndex].projects
                var selectedProjectName = tempListOfTeamsArray[selectedTeamIndex].projects[0].projectName
                this.setState({ listOfTeams: tempListOfTeamsArray, projectsArray: ProjectsArray, noProject: false, noPeople: false, noTool: false, selectedTeamIndex: selectedTeamIndex })
                this.getProjects(selectedTeamId, this.state.selectedTeamName)
            }

        }, (error) => {
            console.log(error)
        })

    }
    addTeamModal = () => {
        this.setState({ addTeamModal: true, newTeamObj: {} })
    }
    closeTeamModal = () => {
        this.setState({ editTeamModal: false })
    }
    handleAddTeamDetails = (e, selectedDate, string) => {

        var newAccountInputs = this.state.newTeamObj
        if (e !== null) {

            newAccountInputs[e.target.name] = e.target.value;
        }

        if (e === null && string === 'startDate') {
            // var newAccountInputs = this.state.newTeamObj
            //  newAccountInputs = this.state.newTeamObj.startDate;
            newAccountInputs[string] = selectedDate
        }
        if (e === null && string === 'endDate') {
            // var newAccountInputs = this.state.newTeamObj             
            // var newAccountInputs = this.state.newTeamObj.endDate;
            newAccountInputs[string] = selectedDate
        }

        this.setState(
            {
                newTeamObj: newAccountInputs
            }

        )

    }
    addTeam = (newTeamObj) => {
        if (newTeamObj.startDate === undefined) {
            var startDate = this.getDateString(new Date())
            var endDate = this.getDateString(new Date())
        }
        else {
            var startDate = this.getDateString(newTeamObj.startDate)
            var endDate = this.getDateString(newTeamObj.endDate)
        }
        axios.post("http://172.16.25.50:8585/springhibernate/newspringboardapi/addTeam",
            {
                teamName: newTeamObj.teamName,
                startDate: startDate,
                endDate: endDate,
                status: "1"
            })
            .then(response => {
                var addedObj
                if (this.state.listOfTeams !== undefined) {
                    addedObj = this.state.listOfTeams
                    addedObj.push(response.data.content)
                    this.setState({ listOfTeams: addedObj, addTeamModal: false, addTeamString: false, noTool: true });
                    this.selectedTeam("event", this.state.listOfTeams.length - 1)
                }
                else if (this.state.listOfTeams === undefined) {
                    var addedObj = []
                    addedObj.push(response.data.content)
                    this.setState({ listOfTeams: addedObj, addTeamModal: false, addTeamString: false, noTool: true });
                    this.selectedTeam("event", this.state.listOfTeams.length - 1)
                }
            })
    }
    closeAddTeamModal = () => {
        this.setState({ addTeamModal: false })
    }
    editTeam = () => {
        var tempArray = dcopy(this.state.listOfTeams)

        var startDate = new Date(tempArray[this.state.selectedTeamIndex].startDate)
        var endDate = new Date(tempArray[this.state.selectedTeamIndex].endDate)
        tempArray[this.state.selectedTeamIndex].startDate = startDate
        tempArray[this.state.selectedTeamIndex].endDate = endDate
        var selectedTeamName = tempArray[this.state.selectedTeamIndex].teamName

        this.setState({ editTeamModal: true, TeamDetailsArrayForEditing: tempArray, selectedTeamName: selectedTeamName })
    }
    handleTeamEditDetails = (e, selectedDate, string) => {
        var EditedAccountObj = this.state.TeamDetailsArrayForEditing;
        if (e !== null) {
            EditedAccountObj[this.state.selectedTeamIndex][e.target.name] = e.target.value;
        }
        else if (e === null && string === 'startDate') {
            EditedAccountObj[this.state.selectedTeamIndex][string] = selectedDate
        }
        else if (e === null && string === 'endDate') {
            EditedAccountObj[this.state.selectedTeamIndex][string] = selectedDate
        }
        this.setState(
            {
                TeamDetailsArrayForEditing: EditedAccountObj
            }
        )
    }
    updateTeam(modifiedTeamObj) {
        var startDate = this.getDateString(modifiedTeamObj.startDate)
        var endDate = this.getDateString(modifiedTeamObj.endDate)
        var selectedTeamId = this.state.listOfTeams[this.state.selectedTeamIndex].teamId
        var selectedTeamName = this.state.listOfTeams[this.state.selectedTeamIndex].teamName
        var teamInfo = {}
        teamInfo["teamName"] = modifiedTeamObj.teamName
        teamInfo["status"] = modifiedTeamObj.status
        teamInfo["startDate"] = modifiedTeamObj.startDate
        teamInfo["endDate"] = modifiedTeamObj.endDate
        axios.put("http://172.16.25.50:8585/springhibernate/newspringboardapi/editTeam",
            {
                teamId: selectedTeamId,
                teamInfo: teamInfo
            }
        ).then(response => {
            var tempListOfTeamsArray = this.state.listOfTeams
            var editedObj = this.state.listOfTeams[this.state.selectedTeamIndex]
            editedObj["teamName"] = response.data.content.teamInfo.teamName
            editedObj["status"] = response.data.content.teamInfo.status
            editedObj["teamId"] = response.data.content.teamId
            editedObj["startDate"] = response.data.content.teamInfo.startDate
            editedObj["endDate"] = response.data.content.teamInfo.endDate
            tempListOfTeamsArray.splice(this.state.selectedTeamIndex, 1)
            tempListOfTeamsArray.splice(this.state.selectedTeamIndex, 0, editedObj)
            this.setState({ listOfTeams: tempListOfTeamsArray, editTeamModal: false, selectedTeamName: editedObj.teamName, selectedTeamIndex: this.state.selectedTeamIndex });
        }, (error) => {
            console.log(error)
        })
    }
    selectingTeamName = (Teams) => {
        if (this.props.addTeamString === false || Teams !== undefined) {
            return Teams.map((team) => (
                <MenuItem
                    key={team.teamId}
                    value={team.teamName}
                    primaryText={team.teamName}
                />
            ));
        }

    }
    selectedProject = (selectedProjectIndex) => {
        var selectedTeamId = this.state.listOfTeams[this.state.selectedTeamIndex].teamId
        var selectedProjectId = this.state.listOfTeams[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectId
        var selectedProjectName = this.state.listOfTeams[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
        axios.post("http://172.16.25.50:8585/springhibernate/newspringboardapi/getProjectDetails",
            {
                teamId: selectedTeamId,
                projectId: selectedProjectId
            }
        ).then(response => {
            var toolsConfig = {}
            for (var k = 0; k < response.data.content.tools.length; k++) {
                toolsConfig[response.data.content.tools[k].toolName + '-' + response.data.content.tools[k].processName] = {
                    "userName": response.data.content.tools[k].userName,
                    "password": response.data.content.tools[k].password,
                    "hostedURL": response.data.content.tools[k].hostedURL,
                    "toolName": response.data.content.tools[k].toolName,
                    "toolId": response.data.content.tools[k].toolId,
                    "processName": response.data.content.tools[k].processName
                }
            }
            this.setState({ toolsConfig: toolsConfig })
            var tempListOfTeamsArray = dcopy(this.state.listOfTeams)
            var projectId = tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectId
            var ProjectName = tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
            tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex] = response.data.content
            tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectId = projectId
            tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName = ProjectName

            this.setState({
                listOfTeams: tempListOfTeamsArray,
                selectedTeamIndex: this.state.selectedTeamIndex,
                selectedProjectIndex: selectedProjectIndex,
                selectedProjectName: selectedProjectName
            });
            this.selectedProjectfromDropDown("e", this.state.selectedProjectIndex, this.state.selectedProjectName)
        }, (error) => {
            console.log(error)
        })
    }
    selectedProjectfromDropDown = (event, selectedProjectIndex, value) => {
        this.setState({ selectedProjectName: value, selectedProjectIndex: selectedProjectIndex })
        var selectedTeamId = this.state.listOfTeams[this.state.selectedTeamIndex].teamId
        var selectedProjectId = this.state.listOfTeams[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectId
        var selectedProjectName = this.state.listOfTeams[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
        axios.post("http://172.16.25.50:8585/springhibernate/newspringboardapi/getProjectDetails",
            {
                teamId: selectedTeamId,
                projectId: selectedProjectId
            }
        ).then(response => {
            var toolsConfig = {}
            for (var k = 0; k < response.data.content.tools.length; k++) {
                toolsConfig[response.data.content.tools[k].toolName + '-' + response.data.content.tools[k].processName] = {
                    "userName": response.data.content.tools[k].userName,
                    "password": response.data.content.tools[k].password,
                    "hostedURL": response.data.content.tools[k].hostedURL,
                    "toolName": response.data.content.tools[k].toolName,
                    "toolId": response.data.content.tools[k].toolId,
                    "processName": response.data.content.tools[k].processName
                }
            }
            this.setState({ toolsConfig: toolsConfig })
            var tempListOfTeamsArray = dcopy(this.state.listOfTeams)
            var projectId = tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectId
            var ProjectName = tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
            tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex] = response.data.content
            tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectId = projectId
            tempListOfTeamsArray[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName = ProjectName

            this.setState({
                listOfTeams: tempListOfTeamsArray,
                selectedTeamIndex: this.state.selectedTeamIndex,
                selectedProjectIndex: selectedProjectIndex,
                selectedProjectName: selectedProjectName
            });
        })
    }
    addProjectModal = () => {
        this.setState({ addProjectModal: true, newProjectDetails: {} })
    }
    closeAddProjectModal = () => {
        this.setState({ addProjectModal: false })
    }
    addNewProject = (newProjectObject) => {

        var projectName = newProjectObject.projectName
        var TeamId = this.state.listOfTeams[this.state.selectedTeamIndex].teamId

        axios.post("http://172.16.25.50:8585/springhibernate/newspringboardapi/addProject",
            {
                projectName: projectName,
                teamId: TeamId
            })
            .then(response => {
                var newProjectObj = this.state.listOfTeams
                newProjectObj[this.state.selectedTeamIndex].projects.push(response.data.content)
                this.setState({
                    listOfTeams: newProjectObj,
                    addProjectModal: false,
                    newProjectDetails: {},
                    selectedTeamIndex: this.state.selectedTeamIndex,
                    selectedProjectIndex: this.state.listOfTeams[this.state.selectedTeamIndex].projects.length - 1,
                    projectsArray: this.state.listOfTeams[this.state.selectedTeamIndex].projects,
                    noProject: false
                });
                this.selectedProject(this.state.listOfTeams[this.state.selectedTeamIndex].projects.length - 1)
            })
    }
    getProjects = (TeamId, selectedTeamName) => {

        this.setState({
            selectedTeamName: selectedTeamName
        });
        axios.post("http://172.16.25.50:8585/springhibernate/newspringboardapi/getTeamDetails",
            {
                teamId: TeamId
            })
            .then(response => {
                var newProjectObj = this.state.listOfTeams
                var slectedTeam = this.state.listOfTeams[this.state.selectedTeamIndex]
                response.data.content["teamName"] = this.state.listOfTeams[this.state.selectedTeamIndex].teamName
                response.data.content["status"] = this.state.listOfTeams[this.state.selectedTeamIndex].status
                response.data.content["teamId"] = this.state.listOfTeams[this.state.selectedTeamIndex].teamId

                newProjectObj.splice(this.state.selectedTeamIndex, 1)
                newProjectObj.splice(this.state.selectedTeamIndex, 0, response.data.content)

                this.setState({
                    listOfTeams: newProjectObj,
                    selectedTeamIndex: this.state.selectedTeamIndex,
                    selectedProjectIndex: 0,
                    projectsArray: this.state.listOfTeams[this.state.selectedTeamIndex].projects,
                    noProject: false,
                    selectedTeamName: selectedTeamName
                });
                this.selectedProject(0)
            })

    }
    newProjectDetails = (e) => {
        const updatedProjectDetails = {}
        updatedProjectDetails[e.target.name] = e.target.value
        this.setState({ newProjectDetails: updatedProjectDetails })
    }
    addPeopleModal = () => {
        this.setState({ addPeopleModal: true })
    }
    closeAddPeopleModal = () => {
        this.setState({ addPeopleModal: false })
    }
    handleAddPeopleDetails = (e) => {
        var newPeopleObj = this.state.newPeopleObj
        newPeopleObj[e.target.name] = e.target.value;

        this.setState(
            {
                newPeopleObj: newPeopleObj
            }

        )
    }
    editProjectModal = (e, actionType, projectIndex) => {
        var tempArray = dcopy(this.state.editProjectDetails)
        tempArray.projectName = this.state.currentAccount[this.state.selectedTeamIndex].projects[projectIndex].projectName

        this.setState({ editProjectModal: true, editProjectDetails: tempArray, selectedProjectIndex: projectIndex })
    }
    closeEditProjectModal = () => {
        this.setState({ editProjectModal: false })
    }
    editProjectDetails = (e) => {
        var tempArray = this.state.editProjectDetails
        tempArray[e.target.name] = e.target.value
        this.setState({ editProjectDetails: tempArray })
    }
    updateProjectDetails = (updatedProjectObj) => {
        var updatedProjectName = updatedProjectObj.projectName
        var updatedProjectObj = this.state.currentAccount
        updatedProjectObj[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].projectName = updatedProjectName

        var updatedObj = updatedProjectObj[this.state.selectedTeamIndex]

        axios.put(myConstClass.nodeAppUrl + `/accounts/` + updatedObj._id,
            {
                customerName: updatedObj.customerName,
                startDate: updatedObj.startDate,
                endDate: updatedObj.endDate,
                engagementModel: updatedObj.engagementModel,
                pricingModel: updatedObj.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: updatedObj.projects,
                people: [],
                customerLogo: updatedObj.customerLogo,
                status: 'Active'
            })
            .then(response => {
                var updatedObj = this.state.currentAccount
                var oldObj = this.state.currentAccount[this.state.selectedTeamIndex]
                updatedObj.splice(oldObj, 1)
                updatedObj.splice(oldObj, 0, response.data)
                var updatedTeamName = updatedObj[this.state.selectedTeamIndex].customerName
                this.setState({ selectedTeamName: updatedTeamName, editProjectModal: false });
                this.selectedProject(this.state.selectedProjectIndex)
            })

    }
    selectedPeople = () => {

        // var currentAccount = dcopy(this.props.AccountDataArray)
        var currentAccount = this.state.currentAccount


        //  var selectedProjectName=currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
        //  this. selectedProjectfromDropDown("event", selectedProjectIndex,selectedProjectName)

        //  if (currentAccount[this.state.selectedTeamIndex].projects.length === 0) {
        //      this.setState({ noProject: true, noPeople: true, noTool: true })
        //  }
        //  else {
        //      var ProjectsArray = currentAccount[this.state.selectedTeamIndex].projects
        //      var selectedProjectName = currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
        //      this.setState({ projectsArray: ProjectsArray, noProject: false, noPeople: false, noTool: false, selectedProjectName: selectedProjectName })
        //  }

        if (currentAccount[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].people === undefined) {
            this.setState({ noPeople: true })
        }
        else {
            var peopleArrayOfselectedProject = currentAccount[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].people
            this.setState({ peopleArray: peopleArrayOfselectedProject, noPeople: false })
        }

        //  if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].tools === undefined) {
        //      // var jumpstartListofTools = ["no tools are configured to this project"]
        //      this.setState({ isTooldata: false, noTool: true })
        //  }
        //  else {
        //      // var jumpstartListofTools = Object.keys(currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].tools)
        //      // this.setState({ isTooldata: true, noTool: false, listofToolsarray: jumpstartListofTools, })
        //  }

        this.setState({
            currentAccount: currentAccount,

        })

    }
    addPeople = (newPeopleObj) => {
        var tempAccountsArray = dcopy(this.state.currentAccount)
        if (tempAccountsArray[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].people === undefined) {
            tempAccountsArray[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].people = []
            tempAccountsArray[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].people.push(newPeopleObj)
        }
        else {
            tempAccountsArray[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].people.push(newPeopleObj)
        }
        axios.put(myConstClass.nodeAppUrl + `/accounts/` + tempAccountsArray[this.state.selectedTeamIndex]._id,
            {
                customerName: tempAccountsArray[this.state.selectedTeamIndex].customerName,
                startDate: tempAccountsArray[this.state.selectedTeamIndex].startDate,
                endDate: tempAccountsArray[this.state.selectedTeamIndex].endDate,
                engagementModel: tempAccountsArray[this.state.selectedTeamIndex].engagementModel,
                pricingModel: tempAccountsArray[this.state.selectedTeamIndex].pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: tempAccountsArray[this.state.selectedTeamIndex].projects,
                people: [],
                customerLogo: "",
                status: 'Active'
            })
            .then(response => {
                var updatedObj = this.state.currentAccount
                var oldObj = this.state.currentAccount.indexOf(this.state.currentAccount[this.state.selectedTeamIndex])
                updatedObj.splice(oldObj, 1)
                updatedObj.splice(oldObj, 0, response.data)
                var updatedTeamName = updatedObj[this.state.selectedTeamIndex].customerName
                this.setState({ currentAccount: updatedObj, selectedTeamName: updatedTeamName, addPeopleModal: false, newPeopleObj: {} });
                this.selectedPeople()
            })

    }
    selectingMember = (event, value) => {
        if (value === "existingMember") {
            this.setState({ existingMemberArray: true })
        }
        else if (value = "newMember") {

            this.setState({ existingMemberArray: false })
        }
    }
    selectedTool = (toolsArray, selectedITeamIndex, selectedProjectIndex, selectedprocessIndex) => {


        var selectedToolDetails = toolsArray[selectedprocessIndex].tools[0]

        this.setState({ selectedToolDetails: selectedToolDetails, selectedprocessIndex: selectedprocessIndex, noTool: false, isTooldata: true })


        //  var currentAccount = this.state.currentAccount

        //  if (currentAccount[selectedITeamIndex].projects[selectedProjectIndex].tools === undefined) {
        //      currentAccount[selectedITeamIndex].projects[selectedProjectIndex].tools = []
        //      var selectedToolDetailsObj = currentAccount[selectedITeamIndex].projects[selectedProjectIndex].tools[selectedprocessIndex] = selectedToolName

        //  this.setState({ selectedToolDetails: selectedToolDetailsObj, selectedprocessIndex: selectedprocessIndex, noTool: false, isTooldata: true })
        //  }
        //  else{
        //     console.log(currentAccount)   
        //  this.setState({ selectedToolDetails: selectedToolDetailsObj, selectedprocessIndex: selectedprocessIndex,noTool:false,isTooldata:true })
        // }

    }
    selectedProcess = (e, selectedProcessIndex) => {


        var selectedToolName = [{ "processName": "", "tools": [{ "toolName": "", "username": "", "password": "", "url": "" }] }]
        selectedToolName[0].processName = this.state.editableProcessArray[selectedProcessIndex].name
        selectedToolName[0].tools[0].toolName = this.state.editableProcessArray[selectedProcessIndex].tools[0].name

        console.log(selectedToolName)
        this.setState({ stepIndex: selectedProcessIndex, toolsInfo: true, jumpStartObj: selectedToolName, selectedProcess: selectedProcessIndex })

    }
    handleNext = (e, ind) => {

        // var selectedToolName = dcopy(this.state.jumpStartObj)

        // if (selectedToolName[this.state.stepIndex + 1] === undefined) {

        //     selectedToolName.push({ "processName": "", "tools": [{ "toolName": "", "username": "", "password": "", "url": "" }] })
        //     selectedToolName[this.state.stepIndex + 1].processName = this.state.editableProcessArray[this.state.stepIndex + 1].name
        //     selectedToolName[this.state.stepIndex + 1].tools[this.state.selectedToolIndex].toolName = this.state.editableProcessArray[this.state.stepIndex + 1].tools[this.state.selectedToolIndex].name
        // }
        // else {
        //     selectedToolName[this.state.stepIndex + 1].processName = this.state.jumpStartObj[this.state.stepIndex + 1].name
        //     selectedToolName[this.state.stepIndex + 1].tools[this.state.selectedToolIndex].toolName = this.state.jumpStartObj[this.state.stepIndex + 1].tools[this.state.selectedToolIndex].toolName
        // }

        // this.setState((state) => ({ stepIndex: this.state.stepIndex + 1, jumpStartObj: selectedToolName }));

        // if (this.state.stepIndex + 1 === this.state.editableProcessArray.length - 1) {
        //     this.setState({ lastItem: true })
        // }

    }
    handleBack = () => {
        var selectedToolName = dcopy(this.state.jumpStartObj)

        selectedToolName[this.state.stepIndex - 1].processName = this.state.jumpStartObj[this.state.stepIndex - 1].name
        selectedToolName[this.state.stepIndex - 1].tools[this.state.selectedToolIndex].toolName = this.state.jumpStartObj[this.state.stepIndex - 1].tools[this.state.selectedToolIndex].toolName
        this.setState({ stepIndex: this.state.stepIndex - 1, jumpStartObj: selectedToolName })

        if (this.state.stepIndex !== this.state.processArray.length) {
            this.setState({ lastItem: false })
        }
    }
    displayingProjects = (projects) => {
        return projects.map((project) => (
            <MenuItem
                key={project.projectName}
                value={project.projectName}
                primaryText={project.projectName}
            />
        ));
    }
    toolsList = (tools) => {

        return tools.map((tool) => (
            <MenuItem
                key={tool.name}
                value={tool.name}
                primaryText={tool.name}
            />
        ));
    }
    handlingToolList = (e, i, value) => {

        var tempJumpstartObj = dcopy(this.state.jumpStartObj)
        tempJumpstartObj[0].tools[0].toolName = value

        this.setState({ jumpStartObj: tempJumpstartObj })
    }
    handleJumpstartChange = (e, obj) => {

        var tempJumpstartObj = this.state.jumpStartObj

        tempJumpstartObj[0].tools[0][e.target.name] = e.target.value
        this.setState({ jumpStartObj: tempJumpstartObj })
    }
    saveJumpstartData = (e, obj) => {



        this.selectedTool(obj, this.state.selectedTeamIndex, this.state.selectedProjectIndex, 0)
        this.setState({ listofToolsarray: obj, jumpstartModal: false, noTool: false })
    }
    selectProcessforTool = (e, checked, index, processName, toolName, toolId) => {
        var toolsConfig = this.state.toolsConfig
        var tempToolsConfigKeys = Object.keys(toolsConfig)
        if (checked === true) {
            for (var i = 0; i < tempToolsConfigKeys.length; i++) {
                if (tempToolsConfigKeys[i].includes(processName) == true) {
                    delete toolsConfig[tempToolsConfigKeys[i]]
                    break
                }
            }
            toolsConfig[toolName + '-' + processName] = { "userName": '', "password": '', "hostedURL": '', "toolName": toolName, "toolId": toolId, "processName": processName }

            this.setState({ toolsConfig: toolsConfig })
        }



    }
    saveTools = (toolsData) => {

        var toolsList = []
        for (var key in toolsData) {
            toolsList.push(toolsData[key])
        }



        var tataArray = this.state.listOfTeams
        var selectedTeamId = tataArray[this.state.selectedTeamIndex].teamId
        var selectedProjectId = tataArray[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].projectId
        console.log(toolsList)


        axios.put("http://172.16.25.50:8585/springhibernate/newspringboardapi/editToolsConfig",
            {
                teamId: selectedTeamId,
                projectId: selectedProjectId,
                tools: toolsList
            }
        ).then(response => {

            var toolsData = response.data.content.tools
            var tempListOfTeams = this.state.listOfTeams

            tempListOfTeams[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].tools = toolsData;
            this.setState({ listOfTeams: tempListOfTeams })
        }, (error) => {
            console.log(error)
        })
    }
    handleToolDetails = (e, selectedToolConfigKey, toolName, processName) => {
        var tempArray = this.state.toolsConfig
        tempArray[selectedToolConfigKey][e.target.name] = e.target.value
        this.setState({ toolsConfig: tempArray })
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 mt-1">
                <div className="col-lg-12 col-md-12 d-inline p-0">
                    <Card>
                        <div className="displayInline col-lg-12 col-md-12 p-1">
                            <div className={["col-md-2 col-lg-2 p-0", this.state.addTeamString === true ? "visibility" : "show"].join(' ')}>
                                <div className="d-flex col-md-12 col-lg-12 pl-0 pb-2 pt-1">
                                    <div className={"project_details pt-0 pl-2 pr-0 d-inline-flex"}>
                                        <img src="https://www.gstatic.com/webp/gallery/4.sm.jpg" />
                                    </div>
                                    <div>
                                        <SelectField hintText="Select Project" value={this.state.selectedTeamName}
                                            labelStyle={{ height: "37px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedTeam(e, i, v)}>
                                            {this.selectingTeamName(this.state.listOfTeams)}
                                        </SelectField>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Active</Subheader>
                                    </div>
                                </div>
                            </div>
                            <div className={["col-md-9 col-lg-9 p-0", this.state.addTeamString === true ? "visibility" : "show"].join(' ')}>
                                <div className="col-md-12 padding0 m-3">
                                    <div className="col-md-12 col-lg-12 displayInline p-0">
                                        <div className="col-md-2 col-lg-2 p-0 m-2 displayInline">
                                            <div className="textAlignCenter pr-2">
                                                <ActionGroupWork />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Projects</Subheader>
                                            </div>
                                            <div className="font" style={{ lineHeight: "38px", fontWeight: "lighter" }}>
                                                {this.state.listOfTeams[this.state.selectedTeamIndex] !== undefined ? this.state.listOfTeams[this.state.selectedTeamIndex].projects.length : ""}
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-lg-2 m-2 displayInline p-0">
                                            <div className="textAlignCenter pr-2">
                                                <SocialPeopleOutline />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Members</Subheader>
                                            </div>

                                            <div className="font" style={{ lineHeight: "38px", fontWeight: "lighter" }}></div>


                                        </div>

                                        <div className="col-md-3 col-lg-3 displayInline m-2 p-0">
                                            <div className="textAlignCenter pr-2">
                                                <ActionDateRange />
                                                <Subheader className="p-1" style={{ fontSize: '12px', lineHeight: "4px" }}>Start Date</Subheader>
                                            </div>

                                            <div className="" style={{ fontSize: '25px', lineHeight: "32px", fontWeight: "lighter" }}>
                                                {this.state.listOfTeams[this.state.selectedTeamIndex] !== undefined ? this.state.listOfTeams[this.state.selectedTeamIndex].startDate : ""}

                                            </div>

                                        </div>
                                        <div className="col-md-3 col-lg-3 displayInline m-2 p-0">
                                            <div className="textAlignCenter pr-2">
                                                <ActionDateRange />
                                                <Subheader className="p-1" style={{ fontSize: '12px', lineHeight: "4px" }}>End Date</Subheader>
                                            </div>
                                            <div className="" style={{ fontSize: '25px', lineHeight: "32px", fontWeight: "lighter" }}>

                                                {this.state.listOfTeams[this.state.selectedTeamIndex] !== undefined ? this.state.listOfTeams[this.state.selectedTeamIndex].endDate : ""}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={["col-md-10 col-lg-10 p-0", this.state.addTeamString === true ? "show" : "visibility"].join(' ')}>
                                <Subheader className="p-0" style={{ fontSize: '30px' }}>Add Team</Subheader>
                            </div>
                            <div className="col-md-1 col-lg-1" style={{ display: "grid" }}>
                                <div className={[this.state.addTeamString === true ? "visibility" : "show"].join(' ')}>
                                    <FloatingActionButton
                                        mini={true}
                                        onClick={() => this.editTeam()}
                                        className="float-right"
                                    >
                                        <ContentEdit />
                                    </FloatingActionButton>
                                </div>
                                <div>
                                    <FloatingActionButton
                                        secondary={true}
                                        mini={true}
                                        onClick={() => this.addTeamModal()}
                                        className="float-right"
                                    >
                                        <ContentAdd />
                                    </FloatingActionButton>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
                <div className={["col-md-12 col-lg-12 padding0", this.state.addTeamString === true ? "visibility" : "show"].join(' ')} >
                    <div className="my-4">
                        <Tabs inkBarStyle={{ background: '#FF3D00' }}>}
                            <Tab label="Projects" style={tabsBackgroundColor}>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} >
                                    <Table onCellClick={this.selectedProject}>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Project Name</TableHeaderColumn>
                                                <TableHeaderColumn>Settings</TableHeaderColumn>
                                                <TableHeaderColumn>
                                                    <FloatingActionButton
                                                        secondary={true}
                                                        mini={true}
                                                        onClick={this.addProjectModal}
                                                        className="float-right"
                                                    >
                                                        <ContentAdd />
                                                    </FloatingActionButton>
                                                </TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false} className={[this.state.noProject === false ? 'show' : 'visibility'].join(' ')}>
                                            {this.state.projectsArray.map((project, index) => (
                                                <TableRow className={[index === this.state.selectedProjectIndex ? 'selectedItem' : ''].join(' ')} key={index} style={{ border: '1px solid rgb(224, 224, 224)' }}>
                                                    <TableRowColumn>{project.projectName}</TableRowColumn>
                                                    {/* <TableRowColumn style={{ paddingLeft: "0px" }}>
                                                        <IconButton touch={true} onClick={(e) => this.editProjectModal(e, "edit", index)}>
                                                            <ContentEdit />
                                                        </IconButton>
                                                    </TableRowColumn> */}
                                                    <TableRowColumn></TableRowColumn>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} className={[this.state.noProject === true ? 'show' : 'visibility'].join(' ')}>
                                    <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                        No projects are assigned to this team
                                      </Subheader>
                                </div>
                            </Tab>
                            {/* <Tab label="People" style={tabsBackgroundColor}>
                                <div className={["col-md-12 col-lg-12 displayInline", this.state.noProject === true ? 'visibility' : 'show'].join(" ")}>
                                    <div className="col-md-3 col-lg-6 textAlignRight">
                                        <Subheader className="p-0" style={{ fontSize: '14px' }}>Select Project</Subheader>
                                    </div>
                                    <div className="col-md-3 col-lg-2">
                                        <SelectField hintText="Select Project" value={this.state.selectedProjectName}
                                            labelStyle={{ height: "37px", fontSize: "14px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectfromDropDown(e, i, v)}>
                                            {this.displayingProjects(this.state.projectsArray)}
                                        </SelectField>
                                    </div>
                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }}>
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow >
                                                <TableHeaderColumn>Members Name</TableHeaderColumn>
                                                <TableHeaderColumn>Settings</TableHeaderColumn>
                                                <TableHeaderColumn>
                                                    <FloatingActionButton
                                                        secondary={true}
                                                        mini={true}
                                                        onClick={() => this.addPeopleModal()}
                                                        className="float-right"
                                                    >
                                                        <ContentAdd />
                                                    </FloatingActionButton>

                                                </TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false} className={[this.state.noPeople === false ? 'show' : 'visibility'].join(' ')}>
                                            {this.state.peopleArray.map((person, index) => (
                                                <TableRow key={index} style={{ border: '1px solid rgb(224, 224, 224)' }}>
                                                    <TableRowColumn >{person.memberName}</TableRowColumn>
                                                    <TableRowColumn style={{ paddingLeft: "0px" }}>
                                                    </TableRowColumn>
                                                    <TableRowColumn ></TableRowColumn>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} className={[this.state.noPeople === true ? 'show' : 'visibility'].join(' ')}>
                                    <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                        No member is assigned to this project
                                    </Subheader>
                                </div>
                            </Tab> */}
                            <Tab label="Jump Start" style={tabsBackgroundColor} disabled={this.state.noProject === true}>
                                <div className={["col-md-12 col-lg-12 displayInline", this.state.noProject === true ? 'visibility' : 'show'].join(" ")}>
                                    <div className="col-md-10 col-lg-9 textAlignRight">
                                        <Subheader className="p-0" style={{ fontSize: '14px' }}>Select Project</Subheader>
                                    </div>
                                    <div className="col-md-10 col-lg-2">
                                        <SelectField hintText="Select Project" value={this.state.selectedProjectName}
                                            labelStyle={{ height: "37px", fontSize: "14px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectfromDropDown(e, i, v)}>
                                            {this.displayingProjects(this.state.projectsArray)}
                                        </SelectField>
                                    </div>

                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} >
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={{ "paddingLeft": "10px" }}>Tool Name</TableHeaderColumn>
                                                {this.state.processArray !== undefined ?
                                                    this.state.processArray.map(row => (
                                                        <TableHeaderColumn style={{ "paddingLeft": "0px" }}>{row.processName}</TableHeaderColumn>
                                                    )) : ''}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false} className={[this.state.toolsArray !== undefined ? this.state.toolsArray.length !== 0 ? "show" : "visibility" : '']}>
                                            {this.state.toolsArray !== undefined ?
                                                this.state.toolsArray.map((tool, toolIndex) => (
                                                    <TableRow key={toolIndex} selectable={false} >
                                                        <TableRowColumn>{tool.toolName}</TableRowColumn>
                                                        {(this.state.processArray !== undefined ?
                                                            this.state.processArray.map((process, i) => (
                                                                <TableRowColumn key={i}>
                                                                    <div className="displayInline">
                                                                        <Checkbox
                                                                            checked={tool.toolName + '-' + process.processName in this.state.toolsConfig ? true : false}
                                                                            onCheck={(e, checked) => this.selectProcessforTool(e, checked, toolIndex, process.processName, tool.toolName, tool.toolId)}
                                                                        />
                                                                        <div className={[tool.toolName + '-' + process.processName in this.state.toolsConfig ? "show" : "visibility"]}>
                                                                            <IconMenu
                                                                                iconButtonElement={<IconButton className="padding0" style={{ height: "28px", width: "28px" }}><MoreVertIcon /></IconButton>}
                                                                                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                                                                                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                                                                useLayerForClickAway={true}
                                                                            >
                                                                                <div className="col-md-12">
                                                                                    <TextField
                                                                                        value={tool.toolName + '-' + process.processName in this.state.toolsConfig ? this.state.toolsConfig[tool.toolName + '-' + process.processName].userName : '' || ''}
                                                                                        floatingLabelText="UserName"
                                                                                        hintText="userName"
                                                                                        name='userName'
                                                                                        onChange={(e) => this.handleToolDetails(e, tool.toolName + '-' + process.processName)}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <TextField
                                                                                        value={tool.toolName + '-' + process.processName in this.state.toolsConfig ? this.state.toolsConfig[tool.toolName + '-' + process.processName].password : '' || ''}
                                                                                        floatingLabelText="Password"
                                                                                        hintText="password"
                                                                                        name='password'
                                                                                        onChange={(e) => this.handleToolDetails(e, tool.toolName + '-' + process.processName)}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <TextField
                                                                                        value={tool.toolName + '-' + process.processName in this.state.toolsConfig ? this.state.toolsConfig[tool.toolName + '-' + process.processName].hostedURL : '' || ''}
                                                                                        floatingLabelText="URL"
                                                                                        hintText="url"
                                                                                        name='hostedURL'
                                                                                        onChange={(e) => this.handleToolDetails(e, tool.toolName + '-' + process.processName)}
                                                                                    />
                                                                                </div>
                                                                            </IconMenu>
                                                                        </div>
                                                                    </div>
                                                                </TableRowColumn>
                                                            )) : '') || ''}

                                                    </TableRow>
                                                )) : ''}
                                        </TableBody>
                                    </Table>
                                    <div>
                                        <RaisedButton
                                            primary={true}
                                            onClick={() => this.saveTools(this.state.toolsConfig)}
                                        >SAVE

                                                </RaisedButton>
                                    </div>


                                    {/* <div className={[this.state.toolsArray!==undefined?this.state.toolsArray.length === 0 ? "show" : "visibility":'']}>
                                        <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                            No tool is assigned
                                      </Subheader>
                                    </div> */}
                                </div>

                            </Tab>

                        </Tabs>
                    </div>
                </div>
                <Dialog open={this.state.addTeamModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5 "].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Add Team</Subheader>
                        </div>
                    </div>
                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.newTeamObj.teamName || ''}
                                    name='teamName'
                                    onChange={this.handleAddTeamDetails}
                                    hintText="Team Name"
                                    floatingLabelText="Team Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Status"
                                    hintText="Status"
                                    value={this.state.newTeamObj.status || ''}
                                    name='status'
                                    onChange={this.handleAddTeamDetails}
                                    autoOk={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                            <div className="col-md-12">
                                <DatePicker
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="Start Date"
                                    value={this.state.newTeamObj.startDate || ''}
                                    onChange={(e, x) => this.handleAddTeamDetails(e, x, 'startDate')}
                                    minDate={new Date()}
                                    floatingLabelText="Start Date"
                                    autoOk={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                            <div className="col-md-12">
                                <DatePicker
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="End Date"
                                    value={this.state.newTeamObj.endDate || ''}
                                    onChange={(e, x) => this.handleAddTeamDetails(e, x, 'endDate')}
                                    minDate={this.state.newTeamObj.startDate}
                                    disabled={!this.state.newTeamObj.startDate}
                                    floatingLabelText="End Date"
                                    autoOk={true}
                                />
                            </div>
                        </div>
                        <div className="loginBtns" style={{}}>
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeAddTeamModal()}
                                />
                                <RaisedButton
                                    label="Done"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.addTeam(this.state.newTeamObj)}
                                    disabled={!this.state.newTeamObj.teamName}
                                />
                            </div>
                        </div>

                    </div>

                </Dialog>
                <Dialog open={this.state.editTeamModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5 "].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Team Details</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">

                                <TextField
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex] !== undefined ? this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].teamName : ''}
                                    name='teamName'
                                    onChange={this.handleTeamEditDetails}
                                    hintText="Team Name"
                                    floatingLabelText="Team Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex] !== undefined ? this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].status : ''}
                                    fullWidth={true}
                                    floatingLabelText="Status"
                                    hintText="Status"
                                    name='status'
                                    onChange={this.handleTeamEditDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-12">
                                <DatePicker
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex] !== undefined ? this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].startDate : ''}
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="Start Date"
                                    name='startDate'
                                    floatingLabelText="Start Date"
                                    onChange={(e, x) => this.handleTeamEditDetails(e, x, 'startDate')}
                                    autoOk={true}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-12">
                                <DatePicker
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex] !== undefined ? this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].endDate : ''}
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="End Date"
                                    name='endDate'
                                    floatingLabelText="End Date"
                                    onChange={(e, x) => this.handleTeamEditDetails(e, x, 'endDate')}
                                    minDate={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex] !== undefined ? this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].startDate : ''}
                                    autoOk={true}
                                />
                            </div>

                        </div>
                        <div className="loginBtns" style={{}}>
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeTeamModal()}
                                />
                                <RaisedButton
                                    label="Done"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.updateTeam(this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex])}
                                />
                            </div>
                        </div>
                    </div>

                </Dialog>
                <Dialog open={this.state.addProjectModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Project Name</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={(this.state.newProjectDetails !== undefined ? this.state.newProjectDetails.projectName : '') || ''}
                                    name='projectName'
                                    onChange={this.newProjectDetails}
                                    hintText="Project Name"
                                    floatingLabelText="Project Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeAddProjectModal()}
                                />
                                <RaisedButton
                                    label="Done"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.addNewProject(this.state.newProjectDetails)}
                                    disabled={!this.state.newProjectDetails.projectName}
                                />
                            </div>

                        </div>

                    </div>

                </Dialog>
                {/* <Dialog open={this.state.editProjectModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Edit Project Details</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.editProjectDetails.projectName || ''}
                                    name='projectName'
                                    onChange={this.editProjectDetails}
                                    hintText="Project Name"
                                    floatingLabelText="Project Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>
                  
                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeEditProjectModal()}
                                />
                                <RaisedButton
                                    label="Done"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.updateProjectDetails(this.state.editProjectDetails)}
                               
                                />
                            </div>

                        </div>

                    </div>

                </Dialog> 
                <Dialog open={this.state.addPeopleModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px', fontWeight: "lighter" }}>Add Person</Subheader>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <RadioButtonGroup labelPosition="left" defaultSelected={this.state.existingMemberRadioButton === true ? "existingMember" : "newMember"} onChange={this.selectingMember}>
                                <RadioButton
                                    label="Select from existing members list"
                                    value="existingMember"
                                    name="existingMember"
                                    disabled={this.state.existingMemberRadioButton === false}
                                />
                                <RadioButton
                                    label="add new member"
                                    value="newMember"
                                    name="newMember"
                                />

                            </RadioButtonGroup>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                    
                            <div className={["col-md-12 custId", this.state.existingMemberArray === true ? 'show' : 'visibility'].join(' ')}>
                                <SelectField hintText="existing members list"
                                    labelStyle={{ height: "37px" }} style={{ width: '100%' }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectTeam(e, i, v)}>
                                    {this.selectingTeamName(this.state.currentAccount)}
                                </SelectField>

                            </div>
                        </div>
                        <div className="row margin0">
                          
                            <div className="col-md-12 custId">
                                <TextField
                                    hintText="member id"
                                    floatingLabelText="member id"
                                    value={this.state.newPeopleObj.memeberId || ''}
                                    name='memeberId'
                                    onChange={this.handleAddPeopleDetails}
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                         
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.newPeopleObj.memberName || ''}
                                    name='memberName'
                                    onChange={this.handleAddPeopleDetails}
                                    hintText="member Name"
                                    floatingLabelText="member Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
              
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="username"
                                    hintText="username"
                                    value={this.state.newPeopleObj.username || ''}
                                    name='username'
                                    onChange={this.handleAddPeopleDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                         
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="password"
                                    hintText="password"
                                    value={this.state.newPeopleObj.password || ''}
                                    name='password'
                                    onChange={this.handleAddPeopleDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                  
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="role"
                                    hintText="role"
                                    value={this.state.newPeopleObj.role || ''}
                                    name='role'
                                    onChange={this.handleAddPeopleDetails}
                                />
                    
                            </div>

                        </div>
                        <div className="row margin0">
                
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="account id"
                                    hintText="account id"
                                    value={this.state.newPeopleObj.accountId || ''}
                                    name='accountId'
                                    onChange={this.handleAddPeopleDetails}
                                />
                     
                            </div>

                        </div>
                        <div className="row margin0">
       
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="project id"
                                    hintText="project id"
                                    value={this.state.newPeopleObj.projectId || ''}
                                    name='projectId'
                                    onChange={this.handleAddPeopleDetails}
                                />
                         
                            </div>

                        </div>

                        <div className="loginBtns" style={{}}>
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeAddPeopleModal()}
                                />
                                <RaisedButton
                                    label="Done"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.addPeople(this.state.newPeopleObj)}
                                    disabled={!this.state.newPeopleObj.memberName}
                                />
                            </div>
                        </div>

                    </div>

                </Dialog> 
                <Dialog open={this.state.jumpstartModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px', fontWeight: "lighter" }}>click on the Process to Add Tool</Subheader>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 p-1">
                            <Stepper >
                                {this.state.processArray.map((process, index) => (
                                    <Step className={[index === this.state.selectedProcess ? 'selectedItem' : ''].join('')}>
                                        <StepButton icon={"1"}
                                            onClick={(e) => this.selectedProcess(e, index)}>{process.name}</StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </div>
                    <div className={["row", this.state.toolsInfo === true ? 'show' : 'visibility'].join(' ')}>
                        <div className={["col-lg-12 d-flex p-0"]}>
                            <div className={["col-lg-12 col-md-12 displayInline pt-2 pr-0 pl-0"]}>
                                <div className="col-md-6 col-lg-6 pl-0">
                                    <div className={["col-md-12 custId"]}>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>SelecteTool:</Subheader>
                                        <SelectField hintText="Select Project" value={this.state.jumpStartObj[0].tools[0].toolName}
                                            labelStyle={{ height: "37px", fontSize: "14px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.handlingToolList(e, i, v)}>
                                            {this.toolsList(this.state.editableProcessArray[this.state.stepIndex].tools)}
                                        </SelectField>

                                    </div>
                                    <div className={["col-md-12 custId"]}>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>UserName:</Subheader>
                                        <TextField
                                            hintText="user name"
                                            name='username'
                                            value={this.state.jumpStartObj[0].tools[0].username || ''}
                                            onChange={this.handleJumpstartChange}
                                        />

                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 pl-1">
                                    <div className={["col-md-12 custId"]}>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Password:</Subheader>
                                        <TextField
                                            hintText="password"
                                            value={this.state.jumpStartObj[0].tools[0].password || ''}
                                            name='password'
                                            onChange={this.handleJumpstartChange}
                                        />
                                    </div>

                                    <div className={["col-md-12 custId"]}>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>URL:</Subheader>
                                        <TextField
                                            hintText="url"
                                            value={this.state.jumpStartObj[0].tools[0].url || ''}
                                            name='url'
                                            onChange={this.handleJumpstartChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={["row m-4", this.state.toolsInfo === true ? 'show' : 'visibility'].join(' ')}>
                        <div className="col-md-12 col-lg-12 displayInline textAlignCenter">
                            <div className="col-md-6 col-lg-6">
                                <RaisedButton
                                    label="cancel"
                                    secondary={true}
                                    onClick={this.closejumpstartConfiguration}
                                />
                            </div>
              
                            <div className="col-md-6 col-lg-6">
                                <RaisedButton
                                    label="save"
                                    primary={true}
                                    onClick={(e) => this.saveJumpstartData(e, this.state.jumpStartObj)}
                                    disabled={this.state.jumpStartObj[0].tools[0].password === '' || this.state.jumpStartObj[0].tools[0].username === '' || this.state.jumpStartObj[0].tools[0].url === ''}
                                />
                            </div>
                        </div>
                    </div>

                </Dialog>  */}


            </div>

        )

    }

}



export default ManageCustomerTeams;

