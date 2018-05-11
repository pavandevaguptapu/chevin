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


class ManageCustomerTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountDetails: ''
        }
    }
    componentWillMount() {
        axios.get(myConstClass.nodeAppUrl + '/accounts')
            .then(response => {
                this.setState({
                    accountDetails: <AccountDetails AccountDataArray={response.data} />
                })
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
            newProjectDetails: {},
            projectList: [],
            currentAccount: this.props.AccountDataArray,
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
            processArray: [
                { "name": "Project Management", "processID": 4, "tools": [{ "name": "jira" }] },
                { "name": "Quality Management", "processID": 5, "tools": [{ "name": "SonarQube" }, { "name": "jira" }] },
                { "name": "Build Tool", "processID": 6, "tools": [{ "name": "Gradle" }, { "name": "SonarQube" }] }

            ],
            editableProcessArray: [
                { "name": "Project Management", "processID": 4, "tools": [{ "name": "jira" }] },
                { "name": "Quality Management", "processID": 5, "tools": [{ "name": "SonarQube" }, { "name": "jira" }] },
                { "name": "Build Tool", "processID": 6, "tools": [{ "name": "Gradle" }, { "name": "SonarQube" }] },

            ],
            stepIndex: 0,
            jumpStartObj: [{ "processName": "", "tools": [{ "toolName": "", "username": "", "password": "", "url": "" }] }],
            headersToolsArray: [{ "name": "Project Management", "processID": 4 }, { "name": "Quality Management", "processID": 5 }, { "name": "Build Tool", "processID": 6 }, { "name": "Source Control", "processID": 7 }],
            toolsArray: [
                { "name": "Jira", "processID": [3, 5, 4] }, { "name": "SonarQube", "processID": [0, 5] }, { "name": "Jenkins", "processID": [3] },
                { "name": "Git", "processID": [7] }
            ]

        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentAccount: nextProps.AccountDataArray
        })
    }
    getDateString = (date) => {


        var date = new Date(date)
        // var date = new Date(epochTime)
        var month = '' + (date.getMonth() + 1)
        var day = '' + date.getDate()
        var year = date.getFullYear()
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var dateString = (day + "/" + month + "/" + year)
        return dateString


    }
    componentWillMount() {
        var currentAccountArray = dcopy(this.props.AccountDataArray)
        var latestTeam = currentAccountArray[currentAccountArray.length - 1].customerName
        var lastitemIndex = currentAccountArray.length - 1
        if (currentAccountArray[currentAccountArray.length - 1].people.length === 0) {
            this.setState({ existingMemberRadioButton: false })

        }

        var noMember = 0
        var eachProjectMembers = 0
        var x;
        var allMembersinProject = 0
        // for empty projects
        if (currentAccountArray[lastitemIndex].projects.length === 0) {
            this.setState({ noProject: true, noPeople: true, noTool: true, totalMembers: 0 })
        }
        else {
            var ProjectsArray = currentAccountArray[lastitemIndex].projects
            var selectedProjectName = currentAccountArray[lastitemIndex].projects[0].projectName

            this.setState({ projectsArray: ProjectsArray, noProject: false, noPeople: false, noTool: false, selectedProjectName: selectedProjectName })
        }
        // for displaying(in card) total members in a team            
        for (var i = 0; i < currentAccountArray[lastitemIndex].projects.length; i++) {
            x = eachProjectMembers
            if (currentAccountArray[lastitemIndex].projects[i].people == undefined) {
                noMember = 0
                allMembersinProject = noMember + x
                this.setState({ totalMembers: allMembersinProject })
            }
            else {
                eachProjectMembers = currentAccountArray[lastitemIndex].projects[i].people.length
                allMembersinProject = x + eachProjectMembers
                this.setState({ totalMembers: allMembersinProject })
            }
        }
        var emptyPeopleArray
        // if projects are available
        if (currentAccountArray[lastitemIndex].projects.length !== 0) {            // if projects array not equal to undefined and people array is udefined
            if (currentAccountArray[currentAccountArray.length - 1].projects[0].people === undefined) {
                // emptyPeopleArray = currentAccountArray[currentAccountArray.length - 1].projects[0].people = [{ "name": "no member is assigned to this project" }]
                this.setState({ noPeople: true })
            }
            else {
                var peopleArrayOfselectedProject = currentAccountArray[currentAccountArray.length - 1].projects[0].people
                this.setState({ peopleArray: peopleArrayOfselectedProject, noPeople: false })
            }

            // if projects array not equal to undefined and tools object is udefined
            if (currentAccountArray[currentAccountArray.length - 1].projects[0].tools === undefined) {
                // var jumpstartListofTools = ["no tools are configured to this project"]
                this.setState({ isTooldata: false, noTool: true })

            }
            else {
                // var jumpstartListofTools = Object.keys(currentAccountArray[currentAccountArray.length - 1].projects[0].tools)
                // //parameters passing to selectedTool function(selectedToolName, selectedITeamIndex,selectedProjectIndex,selectedToolIndex) to get tool details
                // this.selectedTool(jumpstartListofTools[0], lastitemIndex, 0, 0)
                // this.setState({ isTooldata: true, listofToolsarray: jumpstartListofTools, noTool: false })

            }
        }

        var TeamDetailsArrayForEditing = dcopy(currentAccountArray)

        this.setState({
            currentAccount: currentAccountArray,
            TeamDetailsArrayForEditing: TeamDetailsArrayForEditing,
            selectedTeamName: latestTeam,
            selectedTeamIndex: lastitemIndex,
            selectedProjectIndex: 0,
            selectedToolIndex: 0,
        })

    }
    selectTeam = (event, selectedTeamIndex, value) => {

        // for empty projects
        var currentAccount = this.state.currentAccount
        var noMember = 0
        var eachProjectMembers = 0
        var x;
        var allMembersinProject = 0
        if (currentAccount[selectedTeamIndex].projects.length === 0) {
            this.setState({ noProject: true, noPeople: true, noTool: true })
        }
        else {
            var ProjectsArray = currentAccount[selectedTeamIndex].projects
            var selectedProjectName = currentAccount[selectedTeamIndex].projects[0].projectName
            this.setState({ projectsArray: ProjectsArray, noProject: false, noPeople: false, noTool: false, selectedProjectName: selectedProjectName })
        }

        // for displaying(in card) total members in a team
        for (var i = 0; i < currentAccount[selectedTeamIndex].projects.length; i++) {
            x = eachProjectMembers
            if (currentAccount[selectedTeamIndex].projects[i].people == undefined) {
                noMember = 0
                allMembersinProject = noMember + x
                this.setState({ totalMembers: allMembersinProject })
            }
            else {
                eachProjectMembers = currentAccount[selectedTeamIndex].projects[i].people.length
                allMembersinProject = x + eachProjectMembers
                this.setState({ totalMembers: allMembersinProject })
            }
        }

        var emptyPeopleArray
        if (currentAccount[selectedTeamIndex].projects.length !== 0) {
            // if projects array not equal to undefined and people array is udefined
            if (currentAccount[selectedTeamIndex].projects[0].people === undefined) {
                this.setState({ noPeople: true })
            }
            else {
                var peopleArrayOfselectedProject = currentAccount[selectedTeamIndex].projects[0].people
                this.setState({ peopleArray: peopleArrayOfselectedProject, noPeople: false })
            }

            if (currentAccount[selectedTeamIndex].projects[0].tools === undefined) {
                // var jumpstartListofTools = ["no tools are configured to this project"]
                this.setState({ isTooldata: false, noTool: true })
            }
            else {
                // var jumpstartListofTools = Object.keys(currentAccount[selectedTeamIndex].projects[0].tools)
                // this.selectedTool(jumpstartListofTools[0], selectedTeamIndex, 0, 0)
                // this.setState({ isTooldata: true, selectedProjectIndex: 0, listofToolsarray: jumpstartListofTools, noTool: false })
            }
        }
        var currentAccountArray1 = dcopy(currentAccount)

        this.setState({
            currentAccount: currentAccount,
            selectedTeamName: value,
            selectedTeamIndex: selectedTeamIndex,
            selectedProjectIndex: 0,
            TeamDetailsArrayForEditing: currentAccountArray1
        })
        this.selectingMember("event", "existingMember")

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
    formatDate = (date) => {

        // var date =(date.getMonth() + 1)+"/"+date.getFullYear() + "/" + date.getDate();

    }
    addTeam = (newTeamObj) => {

        if (newTeamObj.startDate === undefined) {
            var startDate = new Date().toString()
            var endDate = new Date().toString()
        }
        else {
            var startDate = newTeamObj.startDate.toString()
            var endDate = newTeamObj.endDate.toString()

        }

        axios.post(myConstClass.nodeAppUrl + `/accounts`,
            {
                customerName: newTeamObj.customerName,
                startDate: startDate,
                endDate: endDate,
                engagementModel: newTeamObj.engagementModel,
                pricingModel: 0,
                seniorSupplier: 'siva',
                projectManager: 'siva',
                projects: [],
                people: [],
                customerLogo: '',
                status: 'Active'
            })
            .then(response => {
                console.log(response.data)
                var addedObj = this.state.currentAccount.concat(response.data)
                this.setState({ currentAccount: addedObj, addTeamModal: false });
                this.selectTeam("event", this.state.currentAccount.length - 1, this.state.currentAccount[this.state.currentAccount.length - 1].customerName)
                if (this.state.currentAccount[this.state.currentAccount.length - 1].people.length === 0) {
                    this.setState({ existingMemberRadioButton: false, existingMemberArray: false })

                }
            })
    }
    closeAddTeamModal = () => {
        this.setState({ addTeamModal: false })
    }
    editTeam = () => {
        console.log(this.state.currentAccount)
        var tempArray = dcopy(this.state.currentAccount)

        var startDate = new Date(tempArray[this.state.selectedTeamIndex].startDate)
        var endDate = new Date(tempArray[this.state.selectedTeamIndex].endDate)
        tempArray[this.state.selectedTeamIndex].startDate = startDate
        tempArray[this.state.selectedTeamIndex].endDate = endDate

        this.setState({ editTeamModal: true, TeamDetailsArrayForEditing: tempArray })
    }
    handleTeamEditDetails = (e, selectedDate, string) => {
        console.log(this.state.TeamDetailsArrayForEditing)
        var EditedAccountObj = this.state.TeamDetailsArrayForEditing;
        if (e !== null) {

            EditedAccountObj[this.state.selectedTeamIndex][e.target.name] = e.target.value;

        }

        else if (e === null && string === 'startDate') {
            // var EditedAccountObj= this.state.TeamDetailsArrayForEditing;
            EditedAccountObj[this.state.selectedTeamIndex][string] = selectedDate
        }
        else if (e === null && string === 'endDate') {
            // var EditedAccountObj = this.state.TeamDetailsArrayForEditing
            EditedAccountObj[this.state.selectedTeamIndex][string] = selectedDate
        }


        this.setState(
            {
                TeamDetailsArrayForEditing: EditedAccountObj
            }

        )

    }
    updateTeam(modifiedTeamObj) {

        if (modifiedTeamObj.startDate === undefined) {
            var startDate = new Date().toString()
            var endDate = new Date().toString()
        }
        else {
            var startDate = modifiedTeamObj.startDate.toString()
            var endDate = modifiedTeamObj.endDate.toString()

        }
        axios.put(myConstClass.nodeAppUrl + `/accounts/` + modifiedTeamObj._id,
            {
                customerName: modifiedTeamObj.customerName,
                startDate: startDate,
                endDate: endDate,
                engagementModel: modifiedTeamObj.engagementModel,
                pricingModel: modifiedTeamObj.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: modifiedTeamObj.projects,
                people: [],
                customerLogo: modifiedTeamObj.customerLogo,
                status: 'Active'
            })
            .then(response => {
                console.log(response.data)
                var updatedObj = this.state.currentAccount
                updatedObj.splice(this.state.selectedTeamIndex, 1)
                updatedObj.splice(this.state.selectedTeamIndex, 0, response.data)
                var updatedTeamName = updatedObj[this.state.selectedTeamIndex].customerName
                this.setState({ currentAccount: updatedObj, selectedTeamName: updatedTeamName, editTeamModal: false });

            })

    }
    handleChange = (even, date) => {
        var selectedDate = new Date(date)
        var newDate = this.getDateString(date)
        this.state.currentAccount[this.state.selectedTeamIndex].startDate = newDate
        this.setState({})
    }
    selectingTeamName = (Teams) => {
        return Teams.map((team) => (
            <MenuItem
                key={team.customerName}
                value={team.customerName}
                primaryText={team.customerName}
            />
        ));
    }
    selectedProject = (selectedProjectIndex) => {

        // var currentAccount = dcopy(this.props.AccountDataArray)
        var currentAccount = this.state.currentAccount


        var selectedProjectName = currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
        this.selectedProjectfromDropDown("event", selectedProjectIndex, selectedProjectName)

        if (currentAccount[this.state.selectedTeamIndex].projects.length === 0) {
            this.setState({ noProject: true, noPeople: true, noTool: true })
        }
        else {
            var ProjectsArray = currentAccount[this.state.selectedTeamIndex].projects
            var selectedProjectName = currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName
            this.setState({ projectsArray: ProjectsArray, noProject: false, noPeople: false, noTool: false, selectedProjectName: selectedProjectName })
        }

        if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].people === undefined) {
            this.setState({ noPeople: true })
        }
        else {
            var peopleArrayOfselectedProject = currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].people
            this.setState({ peopleArray: peopleArrayOfselectedProject, noPeople: false })
        }

        if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].tools === undefined) {
            // var jumpstartListofTools = ["no tools are configured to this project"]
            this.setState({ isTooldata: false, noTool: true })
        }
        else {
            // var jumpstartListofTools = Object.keys(currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].tools)
            // this.setState({ isTooldata: true, noTool: false, listofToolsarray: jumpstartListofTools, })
        }

        this.setState({
            currentAccount: currentAccount,
            selectedProjectIndex: selectedProjectIndex,
        })

    }
    selectedProjectfromDropDown = (event, selectedProjectIndexfromDropDown, value) => {

        var currentAccount = this.state.currentAccount
        if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndexfromDropDown].people === undefined) {
            this.setState({ noPeople: true })
        }
        else {
            var peopleArrayOfselectedProject = currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndexfromDropDown].people
            this.setState({ peopleArray: peopleArrayOfselectedProject, noPeople: false })
        }

        if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndexfromDropDown].tools === undefined) {
            // var jumpstartListofTools = ["no tools are configured to this project"]
            this.setState({ isTooldata: false, noTool: true })
        }
        else {
            // var jumpstartListofTools = Object.keys(currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndexfromDropDown].tools)
            // this.setState({ isTooldata: true, noTool: false, listofToolsarray: jumpstartListofTools, })
        }
        this.setState({
            currentAccount: currentAccount,
            selectedProjectIndex: selectedProjectIndexfromDropDown,
            selectedProjectName: value
        })




    }
    createProject = () => {
        this.setState({ createProjectModal: true, newProjectDetails: {} })
    }
    closeAddProjectModal = () => {
        this.setState({ createProjectModal: false })
    }
    addNewProject = (newProjectObject) => {
        var tempAccountsArray = this.state.currentAccount;
        tempAccountsArray[this.state.selectedTeamIndex].projects.push(newProjectObject)

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
                var oldObj = this.state.currentAccount[this.state.selectedTeamIndex]
                updatedObj.splice(oldObj, 1)
                updatedObj.splice(oldObj, 0, response.data)
                var updatedTeamName = updatedObj[this.state.selectedTeamIndex].customerName
                this.setState({ currentAccount: updatedObj, selectedTeamName: updatedTeamName, createProjectModal: false, newProjectDetails: {} });
                this.selectedProject(updatedObj[this.state.selectedTeamIndex].projects.length - 1)
            })
    }
    newProjectDetails = (e) => {
        const updatedProjectDetails = { ...this.state.newProjectDetails }
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
                console.log(response.data)
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

        //  console.log(currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].projectName)
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
            console.log("1")
            this.setState({ existingMemberArray: false })
        }
    }
    selectedTool = (toolsArray, selectedITeamIndex, selectedProjectIndex, selectedprocessIndex) => {
        console.log(toolsArray, selectedITeamIndex, selectedProjectIndex, selectedprocessIndex)

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
        console.log(obj)


        this.selectedTool(obj, this.state.selectedTeamIndex, this.state.selectedProjectIndex, 0)
        this.setState({ listofToolsarray: obj, jumpstartModal: false, noTool: false })
    }
    selectProcessforTool = (e, checked, index, headerToolsId) => {
        var tempToolArray = this.state.toolsArray
        if (checked === false) {
            var ind = tempToolArray[index].processID.indexOf(headerToolsId)
            tempToolArray[index].processID.splice(ind, 1)
            this.setState({ toolsArray: tempToolArray })
        }
        if (checked === true) {
            tempToolArray[index].processID.push(headerToolsId)
            this.setState({ toolsArray: tempToolArray })

        }

    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 mt-1">
                <div className="col-lg-12 col-md-12 d-inline p-0">
                    <Card>
                        <div className="displayInline col-lg-12 col-md-12 p-1">
                            <div className="col-md-2 col-lg-2 p-0">
                                <div className="d-flex col-md-12 col-lg-12 pl-0 pb-2 pt-1">
                                    <div className={"project_details pt-0 pl-2 pr-0 d-inline-flex"}>
                                        <img src="https://www.gstatic.com/webp/gallery/4.sm.jpg" />
                                    </div>
                                    <div>
                                        <SelectField hintText="Select Project" value={this.state.selectedTeamName}
                                            labelStyle={{ height: "37px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectTeam(e, i, v)}>
                                            {this.selectingTeamName(this.state.currentAccount)}
                                        </SelectField>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Active</Subheader>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 col-lg-9 p-0">
                                {/* <p style={{ color: 'rgba(0, 0, 0, 0.54)', font: '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis hendrerit metus, id laoreet nulla iaculis sit amet. Duis ac purus sit
                                        amet arcu mattis hendrerit.
                             </p> */}
                                <div className="col-md-12 padding0 m-3">
                                    <div className="col-md-12 col-lg-12 displayInline p-0">
                                        {/* <div className="col-md-2 col-lg-3 p-0 m-2 displayInline"> */}
                                        {/* <div className="textAlignCenter pr-2">
                                                <ActionList />
                                                <Subheader className="p-1" style={{ fontSize: '13px', lineHeight: "4px" }}>List of Projects</Subheader>
                                            </div> */}
                                        {/* <div className="font" style={{ lineHeight: "38px",fontWeight: "lighter" }}>{this.state.currentAccount[this.state.selectedTeamIndex].projects.length} </div> */}
                                        {/* <div className={["font",this.state.noProject===false?"show":"visibility"]} style={{ lineHeight: "38px",fontWeight: "lighter" }}>
                                            <SelectField hintText="Select Project" value={this.state.selectedProjectName}
                                              labelStyle={{ height: "37px" }} style={{ width: '100%' }} underlineStyle={{ display: 'none' }} onChange={this.selectedProject}>
                                              {this.displayingProjects(this.state.projectsArray)}
                                          </SelectField>                                      
                                                 </div> */}
                                        {/* <div className={[this.state.noProject===true?"show":"visibility"]}>
                                              0 projects to display
                                              </div> */}


                                        {/* </div> */}
                                        <div className="col-md-2 col-lg-2 p-0 m-2 displayInline">
                                            <div className="textAlignCenter pr-2">
                                                <ActionGroupWork />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Projects</Subheader>
                                            </div>
                                            <div className="font" style={{ lineHeight: "38px", fontWeight: "lighter" }}>{this.state.currentAccount[this.state.selectedTeamIndex].projects.length} </div>


                                        </div>
                                        <div className="col-md-2 col-lg-2 m-2 displayInline p-0">
                                            <div className="textAlignCenter pr-2">
                                                <SocialPeopleOutline />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Members</Subheader>
                                            </div>

                                            <div className="font" style={{ lineHeight: "38px", fontWeight: "lighter" }}>{this.state.totalMembers}</div>
                                            {/* <FloatingActionButton mini={true} secondary={true}>
                                                <SocialPeopleOutline />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '1px', lineHeight: "26px" }}>No.of Members</Subheader> */}
                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>No.of Members</label> */}

                                            {/* <div className="textAlignCenter">
                                                {10}
                                            </div> */}

                                        </div>
                                        <div className="col-md-3 col-lg-3 displayInline m-2 p-0">
                                            <div className="textAlignCenter pr-2">
                                                <ActionDateRange />
                                                <Subheader className="p-1" style={{ fontSize: '12px', lineHeight: "4px" }}>Start Date</Subheader>
                                            </div>

                                            <div className="" style={{ fontSize: '25px', lineHeight: "32px", fontWeight: "lighter" }}>
                                                {this.getDateString(this.state.currentAccount[this.state.selectedTeamIndex].startDate)}
                                                {/* <DatePicker
                                                textFieldStyle={{width: '60%'}} 
                                                hintText="Start Date"
                                                value={this.state.newDate}
                                                onChange={this.handleChange}
                                            /> */}
                                            </div>
                                            {/* <FloatingActionButton mini={true} secondary={true}>
                                                <ActionDateRange />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '10px', lineHeight: "26px" }}>Start Date</Subheader> */}
                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>Start Date</label>
                                            <div className="textAlignCenter">
                                                {this.props.AccountDataArray[this.props.AccountDataArray.length - 1].startDate}
                                            </div> */}
                                        </div>
                                        <div className="col-md-3 col-lg-3 displayInline m-2 p-0">
                                            <div className="textAlignCenter pr-2">
                                                <ActionDateRange />
                                                <Subheader className="p-1" style={{ fontSize: '12px', lineHeight: "4px" }}>End Date</Subheader>
                                            </div>
                                            <div className="" style={{ fontSize: '25px', lineHeight: "32px", fontWeight: "lighter" }}>
                                                {/* <DatePicker
                                                textFieldStyle={{width: '60%'}} 
                                                hintText="Start Date"
                                                value={this.state.newDate}
                                                onChange={this.handleChange}
                                            /> */}
                                                {this.getDateString(this.state.currentAccount[this.state.selectedTeamIndex].endDate)}
                                            </div>
                                            {/* <FloatingActionButton mini={true} secondary={true}>
                                                <ActionDateRange />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '10px', lineHeight: "26px" }}>End Date</Subheader> */}
                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>End Date</label>
                                            <div className="textAlignCenter">
                                                {this.props.AccountDataArray[this.props.AccountDataArray.length - 1].endDate}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 col-lg-1" style={{ display: "grid" }}>
                                <div>
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
                <div className="col-md-12 col-lg-12 padding0">
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
                                                        onClick={this.createProject}
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
                                                    <TableRowColumn style={{ paddingLeft: "0px" }}>
                                                        <IconButton touch={true} onClick={(e) => this.editProjectModal(e, "edit", index)}>
                                                            <ContentEdit />
                                                        </IconButton>
                                                        {/* <IconButton  touch={true}  onClick={(e) => this.deleteProcess(e, "disable", index)}>
                                                            <ContentClear />
                                                        </IconButton> */}
                                                    </TableRowColumn>
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
                            <Tab label="People" style={tabsBackgroundColor}>
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
                                                        {/* <Button  
                                                            mini={true} 
                                                            iconStyle={editProjectButton} 
                                                            onClick={() => this.createProject()}
                                                        >
                                                            <ContentEdit />
                                                        </Button > */}
                                                        {/* <Button  
                                                            mini={true} 
                                                            secondary={true} 
                                                            iconStyle={deleteProjectButton} 
                                                            onClick={() => this.createProject()}
                                                        >
                                                            <DeleteIcon />
                                                        </Button > */}
                                                        {/* <IconButton>
                                                            <ContentEdit />
                                                        </IconButton>
                                                        <IconButton>
                                                            <ContentClear />
                                                        </IconButton>                                                         */}
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
                            </Tab>
                            <Tab label="Jump Start" style={tabsBackgroundColor} disabled={this.state.noProject === true}>
                                {/* <div className="col-md-10 col-lg-10">
                                        <SelectField hintText="Select Project" value={this.state.selectedProjectName}
                                            labelStyle={{ height: "37px", fontSize: "14px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectfromDropDown(e, i, v)}>
                                            {this.displayingProjects(this.state.projectsArray)}
                                        </SelectField>
                                    </div> */}
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
                                    {/* <div className="col-md-1 col-lg-1 textAlignLeft">
                                        <FloatingActionButton
                                            secondary={true}
                                            mini={true}
                                            onClick={this.jumpstartConfiguration}
                                        >
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    </div> */}
                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} >
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={{ "paddingLeft": "10px" }}>Tool Name</TableHeaderColumn>
                                                {this.state.headersToolsArray.map(row => (
                                                    <TableHeaderColumn style={{ "paddingLeft": "0px" }}>{row.name}</TableHeaderColumn>
                                                ))}
                                                {/* <TableHeaderColumn>Settings</TableHeaderColumn> */}
                                                {/* <TableHeaderColumn>
                                                    <FloatingActionButton
                                                        secondary={true}
                                                        mini={true}
                                                        onClick={this.addToolModal}
                                                    >
                                                        <ContentAdd />
                                                    </FloatingActionButton>
                                                </TableHeaderColumn> */}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false} className={[this.state.toolsArray.length !== 0 ? "show" : "visibility"]}>
                                            {this.state.toolsArray.map((tool, index) => (
                                                <TableRow key={index} selectable={false}>
                                                    <TableRowColumn>{tool.name}</TableRowColumn>
                                                    {this.state.headersToolsArray.map((processID, i) => (
                                                        <TableRowColumn key={i}>
                                                            <Checkbox
                                                                checked={this.state.toolsArray[index].processID.includes(this.state.headersToolsArray[i].processID) ? true : false}
                                                                onCheck={(e, checked) => this.selectProcessforTool(e, checked, index, this.state.headersToolsArray[i].processID)}
                                                            />
                                                        </TableRowColumn>
                                                    ))}

                                                    {/* <TableRowColumn style={{ paddingLeft: "0px" }}>
                                                        <IconButton tooltip="edit" touch={true} tooltipPosition="top-left" onClick={(e) => this.editTool(e, "edit", index)}>
                                                            <ContentEdit />
                                                        </IconButton>
                                                        <IconButton tooltip="delete" touch={true} tooltipPosition="bottom-right" onClick={(e) => this.deleteTool(e, "disable", index)}>
                                                            <ContentClear />
                                                        </IconButton>
                                                    </TableRowColumn> */}
                                                    {/* <TableRowColumn></TableRowColumn> */}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>


                                    <div className={[this.state.toolsArray.length === 0 ? "show" : "visibility"]}>
                                        <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                            No tool is assigned
                                      </Subheader>
                                    </div>
                                </div>
                                {/* <div className={["col-md-12 col-lg-12 displayInline", this.state.noProject === true ? 'visibility' : 'show'].join(" ")}>
                                    <div className="col-md-10 col-lg-9 textAlignRight">
                                        <Subheader className="p-0" style={{ fontSize: '14px' }}>Select Project</Subheader>
                                    </div>
                                    <div className="col-md-10 col-lg-2">
                                        <SelectField hintText="Select Project" value={this.state.selectedProjectName}
                                            labelStyle={{ height: "37px", fontSize: "14px" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectfromDropDown(e, i, v)}>
                                            {this.displayingProjects(this.state.projectsArray)}
                                        </SelectField>
                                    </div>
                                    <div className="col-md-1 col-lg-1 textAlignLeft">
                                        <FloatingActionButton
                                            secondary={true}
                                            mini={true}
                                            onClick={this.jumpstartConfiguration}
                                        >
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    </div>
                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} className={["col-lg-12 d-flex", this.state.noTool === false ? 'show' : 'visibility'].join(' ')}>
                                    <div className={["col-lg-3 col-md-3 py-2", this.state.noTool === false ? 'show' : 'visibility'].join(' ')}>
                                        <SelectableList style={{ border: '1px solid #eee' }} >
                                            {this.state.listofToolsarray.map((item, index) => (
                                                <ListItem
                                                    primaryText={item.processName}
                                                    value={index}
                                                    key={item.processName}
                                                    onClick={() => this.selectedTool(this.state.listofToolsarray, this.state.selectedTeamIndex, this.state.selectedProjectIndex, index)}
                                                    className={[index === this.state.selectedprocessIndex ? 'selectedItem' : ''].join(' ')}
                                                />
                                            ))}
                                        </SelectableList>
                                    </div>
                                    <div className={["col-lg-9 col-md-9 displayInline p-4", this.state.noTool === false ? 'show' : 'visibility'].join(' ')}>
                                        <div className="col-md-6 col-lg-6">
                                       
                                            <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Selected Tool:</Subheader>
                                                <TextField
                                                    hintText="tool name"
                                                    value={this.state.selectedToolDetails.toolName}
                                                    name='tool name'
                                                    onChange={this.handleNewCustomerChange}
                                                />
                                            </div>
                                            <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>UserName:</Subheader>
                                                <TextField
                                                    hintText="user name"
                                                    value={this.state.selectedToolDetails.username}
                                                    name='user name'
                                                    onChange={this.handleNewCustomerChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Password:</Subheader>
                                                <TextField
                                                    hintText="password"
                                                    value={this.state.selectedToolDetails.password}
                                                    name='password'
                                                    onChange={this.handleNewCustomerChange}
                                                />
                                            </div>

                                            <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>URL:</Subheader>
                                                <TextField
                                                    hintText="url"
                                                    value={this.state.selectedToolDetails.url}
                                                    name='url'
                                                    onChange={this.handleNewCustomerChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} className={[this.state.noTool === true ? 'show' : 'visibility'].join(' ')}>
                                    <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                        No tools is configured to this project
                                      </Subheader>
                                </div> */}
                            </Tab>

                            {/* <Tab label="ACE5" style={tabsBackgroundColor}>
                                <div style={{border:"1px solid rgb(238, 238, 238)"}}>
                                    <h2 >Tab fOUR</h2>
                                    <p>
                                    This is a third example tab.
                                    </p>
                                </div>
                            </Tab>                         */}
                        </Tabs>
                    </div>
                </div>

                <Dialog open={this.state.editTeamModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Team Details</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
                            <div className="col-md-12 custId">
                                <TextField
                                    hintText="Customer ID"
                                    floatingLabelText="Customer ID"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex]._id}
                                    name='_id'
                                    onChange={this.handleTeamEditDetails}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Customer Name:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].customerName || ''}
                                    name='customerName'
                                    onChange={this.handleTeamEditDetails}
                                    hintText="Customer Name"
                                    floatingLabelText="Customer Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Status:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Status"
                                    hintText="Status"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].status || ''}
                                    name='status'
                                    onChange={this.handleTeamEditDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Engagement Model:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Engagement Model"
                                    hintText="Engagement Model"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].engagementModel || ''}
                                    name='engagementModel'
                                    onChange={this.handleTeamEditDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Pricing Model:</label></div> */}
                            <div className="col-md-12">
                                {/* <TextField
                                    fullWidth={true}
                                    floatingLabelText="Start Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].startDate || ''}
                                    name='startDate'
                                    onChange={this.handleTeamEditDetails}
                                /> */}
                                <DatePicker
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="Start Date"
                                    name='startDate'
                                    floatingLabelText="Start Date"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].startDate || ''}
                                    onChange={(e, x) => this.handleTeamEditDetails(e, x, 'startDate')}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                                {/* <TextField
                                    fullWidth={true}
                                    floatingLabelText="End Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].endDate || ''}
                                    name='endDate'
                                    onChange={this.handleTeamEditDetails}
                                /> */}
                                <DatePicker
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="End Date"
                                    name='endDate'
                                    floatingLabelText="End Date"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].endDate || ''}
                                    onChange={(e, x) => this.handleTeamEditDetails(e, x, 'endDate')}
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
                                    disabled={!this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].customerName}
                                />
                            </div>
                        </div>

                    </div>

                </Dialog>
                <Dialog open={this.state.addTeamModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Add Team</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
                            <div className="col-md-12 custId">
                                <TextField
                                    hintText="Customer ID"
                                    floatingLabelText="Customer ID"
                                    value={this.state.newTeamObj._id || ''}
                                    name='_id'
                                    onChange={this.handleAddTeamDetails}
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Customer Name:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.newTeamObj.customerName || ''}
                                    name='customerName'
                                    onChange={this.handleAddTeamDetails}
                                    hintText="Customer Name"
                                    floatingLabelText="Customer Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Status:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Status"
                                    hintText="Status"
                                    value={this.state.newTeamObj.status || ''}
                                    name='status'
                                    onChange={this.handleAddTeamDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Engagement Model:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Engagement Model"
                                    hintText="Engagement Model"
                                    value={this.state.newTeamObj.engagementModel || ''}
                                    name='engagementModel'
                                    onChange={this.handleAddTeamDetails}
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Pricing Model:</label></div> */}
                            <div className="col-md-12">
                                {/* <TextField
                                    fullWidth={true}
                                    floatingLabelText="Start Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.newTeamObj.startDate || ''}
                                    name='startDate'
                                    onChange={this.handleAddTeamDetails}
                                /> */}
                                <DatePicker
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="Start Date"
                                    value={this.state.newTeamObj.startDate || ''}
                                    onChange={(e, x) => this.handleAddTeamDetails(e, x, 'startDate')}
                                    minDate={new Date()}

                                    floatingLabelText="Start Date"

                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                                {/* <TextField
                                    fullWidth={true}
                                    floatingLabelText="End Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.newTeamObj.endDate || ''}
                                    name='endDate'
                                    onChange={this.handleAddTeamDetails}
                                /> */}
                                <DatePicker
                                    textFieldStyle={{ width: '100%' }}
                                    hintText="End Date"
                                    value={this.state.newTeamObj.endDate || ''}
                                    onChange={(e, x) => this.handleAddTeamDetails(e, x, 'endDate')}
                                    minDate={this.state.newTeamObj.startDate}
                                    floatingLabelText="End Date"
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
                                    disabled={!this.state.newTeamObj.customerName}
                                />
                            </div>
                        </div>

                    </div>

                </Dialog>
                <Dialog open={this.state.createProjectModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Project Name</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.newProjectDetails.projectName || ''}
                                    name='projectName'
                                    onChange={this.newProjectDetails}
                                    hintText="Project Name"
                                    floatingLabelText="Project Name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>
                            {/* <div className="col-md-5 margin10"><label>Project Name:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.newProjectDetails.projectName || ''} name='projectName' onChange={this.newProjectDetails} />
                            </div> */}
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
                <Dialog open={this.state.editProjectModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
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
                            {/* <div className="col-md-5 margin10"><label>Project Name:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.newProjectDetails.projectName || ''} name='projectName' onChange={this.newProjectDetails} />
                            </div> */}
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
                                //disabled={!this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].projects[this.state.selectedProjectIndex].projectName}
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
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
                            <div className={["col-md-12 custId", this.state.existingMemberArray === true ? 'show' : 'visibility'].join(' ')}>
                                <SelectField hintText="existing members list"
                                    labelStyle={{ height: "37px" }} style={{ width: '100%' }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectTeam(e, i, v)}>
                                    {this.selectingTeamName(this.state.currentAccount)}
                                </SelectField>

                            </div>
                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
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
                            {/* <div className="col-md-5 margin10"><label>Customer Name:</label></div> */}
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
                            {/* <div className="col-md-5 margin10"><label>Status:</label></div> */}
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
                            {/* <div className="col-md-5 margin10"><label>Engagement Model:</label></div> */}
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
                            {/* <div className="col-md-5 margin10"><label>Pricing Model:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="role"
                                    hintText="role"
                                    value={this.state.newPeopleObj.role || ''}
                                    name='role'
                                    onChange={this.handleAddPeopleDetails}
                                />
                                {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="Start Date"
                            value={this.state.newDate}
                            onChange={this.handleTeamEditDetails}
                        /> */}
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="account id"
                                    hintText="account id"
                                    value={this.state.newPeopleObj.accountId || ''}
                                    name='accountId'
                                    onChange={this.handleAddPeopleDetails}
                                />
                                {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="End Date"
                            value={this.state.newDate}
                            onChange={this.handleTeamEditDetails}
                        /> */}
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="project id"
                                    hintText="project id"
                                    value={this.state.newPeopleObj.projectId || ''}
                                    name='projectId'
                                    onChange={this.handleAddPeopleDetails}
                                />
                                {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="End Date"
                            value={this.state.newDate}
                            onChange={this.handleTeamEditDetails}
                        /> */}
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
                            {/* <div className="col-md-3 col-lg-3">
                                <RaisedButton
                                    label="back"
                                    secondary={true}
                                    onClick={this.handleBack}
                                    disabled={this.state.stepIndex === 0}
                                />
                            </div> */}
                            {/* <div className="col-md-3 col-lg-3">
                                <RaisedButton
                                    label={this.state.stepIndex === this.state.processArray.length - 1 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onClick={this.handleNext}
                                    disabled={this.state.lastItem === true}
                                />

                            </div> */}
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

                </Dialog>


            </div>

        )

    }

}



export default ManageCustomerTeams;

