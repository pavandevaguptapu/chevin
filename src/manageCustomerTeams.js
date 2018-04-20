import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import TextField  from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import SocialPeopleOutline from 'material-ui/svg-icons/social/people-outline';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ActionSettingsApplications from 'material-ui/svg-icons/action/settings-applications';
import DatePicker from 'material-ui/DatePicker';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import {myConstClass} from './constants.js';


var dcopy = require('deep-copy')


let SelectableList = makeSelectable(List);


const customStylesJumpStart = {
    content: {
        top: '50%',
        left: '60%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0px",
        width: "615px",
        height: "42%"
    }
};

const imageStyle = {
    top: "-5px",
    marginLeft: "-12px"
}

const innerDiv = {
    padding: "0px"
}

const buttonStyle = {
    marginRight: '5px'
}
const modelbuttonsStyle = {
    backgroundColor:'rgba(255, 255, 255, 0.87)',
    paddingRight: '10px',
    boxShadow:'none'
}

const addAccountBUtton = {
    height: "20px",
    width: "20px"  
}
const boxShadow={
    zDepthShadows:"0px",
    
}
const editbuttonStyle={
    marginLeft: "50%",
    boxShadow: "none"
}
const addProjectButtonstyle={
    marginLeft: "2%",
    boxShadow: "none"
}
const addAcountstyle = {
    // marginLeft: "61%",
    boxShadow: "none"
}

const tableConfigBUtton = {
    paddingLeft: "0px"
}

const editProjectButton = {
    height: "20px",
    width: "20px"

}
const deleteProjectButton = {
    height: "20px",
    width: "20px"
}
const tabsBackgroundColor={
    backgroundColor:"rgb(156, 156, 156)"
}

const dateOptionsStyle = {
    maxWidth: 150,
    marginRight: 'auto',
  };
class ManageCustomerTeams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDashboardItem: false,
            currentSelectedDashboardItem: 'customerTeams',
            value: 1,
            newCustomerDetails: {},
            accountsArray: [],
            accountDetails: '',
            selectedAccountIndex:'',
            itemIndex:0,
            
        }
        this.createAccount = this.createAccount.bind(this);
        this.openSideMenu = this.openSideMenu.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
        this.selectedDashboardItem = this.selectedDashboardItem.bind(this);
        this.addNewAccount = this.addNewAccount.bind(this);
        this.currentAccountProfile = this.currentAccountProfile.bind(this);
        this.handleNewCustomerChange = this.handleNewCustomerChange.bind(this);
        this.handleProject = this.handleProject.bind(this);
        this.handleAccountName = this.handleAccountName.bind(this);
        this.reset = this.reset.bind(this);
        this.closeNewAccount = this.closeNewAccount.bind(this);
    }

    handleAccountName(accountName) {
        var tempAccountsArray = this.state.accountsArray.slice();
        tempAccountsArray[this.state.selectedAccountIndex].customerName= accountName.customerName;
        this.setState({
            accountsArray:tempAccountsArray
        })
     // this.state.accountsArray[this.state.selectedAccountIndex].customerName=accountName.customerName
        
        // this.setState({accountsArray:accountName.customerName})

    }

    handleProject(accountName) {

        var tempAccountsArray = this.state.accountsArray.slice();
        tempAccountsArray[this.state.selectedAccountIndex].customerName = accountName.customerName;
        this.setState({
            accountsArray: tempAccountsArray
        })
       // this.state.accountsArray[this.state.selectedAccountIndex].customerName = accountName.customerName
    }

    currentAccountProfile(currentAccountDetails, index) {   
        this.setState({
            selectedItem: currentAccountDetails._id
        });

        axios.get(myConstClass.nodeAppUrl+'/accounts/'+currentAccountDetails._id)
        .then(response => {
            this.setState(
                {
                    selectedAccountIndex: index,
                    // accountDetails: <AccountDetails selectedAccount={response.data} onSelectProject={this.handleProject} onUpdateProject={this.handleAccountName} />
                }
            )
        })

    }

    addNewAccount(newCustomerDetailsObject) {
        axios.post(myConstClass.nodeAppUrl+`/accounts`,
            {
                customerName: newCustomerDetailsObject.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: newCustomerDetailsObject.engagementModel,
                pricingModel: newCustomerDetailsObject.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: [],
                people: [],
                customerLogo: newCustomerDetailsObject.customerLogo,
                status: 'Active'
            })
            .then(response => {
                this.state.accountsArray = this.state.accountsArray.concat(response.data)
                this.setState({ createAccountModal: false, newCustomerDetails: {} });
                //  window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
            })

    }

    handleNewCustomerChange(e) {                               

        this.state.newCustomerDetails[e.target.name] = e.target.value

    }

    createAccount() {

        this.setState({ createAccountModal: true })
    }

    reset(){
        this.myFormRef.reset();
        // var tempObj={} 
        // this.setState({newCustomerDetails:tempObj})
    }

    closeNewAccount(){
        this.setState({createAccountModal:false})
        this.reset()
    }

    openSideMenu() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeSideMenu() {
        document.getElementById("mySidenav").style.width = "0px";

    }

    selectedDashboardItem(item) {

        if (this.state.currentSelectedDashboardItem !== undefined) {

            document.getElementById(this.state.currentSelectedDashboardItem).classList.remove("selectedDashboardItem");
        }
        this.state.currentSelectedDashboardItem = item.target.parentNode.id
        document.getElementById(item.target.parentNode.id).classList.add("selectedDashboardItem");
    }

    componentWillMount() {
        // Modal.setAppElement('body');
        axios.get(myConstClass.nodeAppUrl+'/accounts')
            .then(response => {
                
                this.setState({ 
                     accountsArray: this.state.accountsArray.concat(response.data), 
                    accountDetails: <AccountDetails AccountDataArray={response.data}/>
                })
                this.currentAccountProfile(this.state.accountsArray[0], 0);
            })
    }

    // componentDidMount() {
    //     // document.getElementById('customerTeams').classList.add("selectedDashboardItem");

    // }

    render() {
             return (
            <div className="container-fluid padding0">
                <nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
                    <div className="col-md-12 flex">
                        <div className="col-md-3 col-lg-2 marginT16">
                            {/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
                            <h4 className="margin0 pointer paddingL04" onClick={(e) => this.openSideMenu()} ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
                        </div>
                        <div className="col-md-7 col-lg-8 textAlignCenter marginT07">
                            <h5 className="">Manage Customer Teams</h5>
                        </div>                   
                        <div>
                            
                        </div>

                    </div>
                </nav>

             

                <Dialog open={this.state.createAccountModal}  className={["col-md-6 col-lg-5 modalMargins modalBgColor 1 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h2 className="marginT0">Account Details</h2>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                    <form ref={(el) => this.myFormRef = el} >
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
                            <div className="col-md-12 custId">
                                <TextField 
                                        fullWidth={true}
                                        floatingLabelText="CustomerID"
                                        hintText="CustomerID"
                                        value={this.state.newCustomerDetails.customerID} 
                                        name='customerID' 
                                        onChange={this.handleNewCustomerChange}
                                        type="number"
                                />                            
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Customer Name:</label></div> */}
                            <div className="col-md-12">
                                <TextField 
                                        fullWidth={true}
                                        floatingLabelText="Customer Name"
                                        hintText="Customer Name"
                                        value={this.state.newCustomerDetails.customerName} 
                                        name='customerName' 
                                        onChange={this.handleNewCustomerChange}
                                />                            
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Status:</label></div> */}
                            <div className="col-md-12">
                                <SelectField 
                                    value={this.state.value} 
                                    name='status' 
                                    onChange={this.handleNewCustomerChange}
                                    fullWidth={true}
                                    floatingLabelText="Status"
                                    hintText="Status"
                                >
                                    <MenuItem value={1} primaryText="Active" />
                                    <MenuItem value={2} primaryText="Finished" />

                                </SelectField>
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Engagement Model:</label></div> */}
                            <div className="col-md-12">
                                <TextField 
                                        fullWidth={true}
                                        floatingLabelText="Engagement Model"
                                        hintText="Engagement Model"
                                        value={this.state.newCustomerDetails.engagementModel} 
                                        name='engagementModel' 
                                        onChange={this.handleNewCustomerChange} 
                                />                            
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Pricing Model:</label></div> */}
                            <div className="col-md-12">
                                <TextField 
                                        fullWidth={true}
                                        floatingLabelText="Pricing Model"
                                        hintText="Pricing Model"
                                        value={this.state.newCustomerDetails.pricingModel} 
                                        name='pricingModel' 
                                        onChange={this.handleNewCustomerChange} 
                                />                            
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                                <TextField 
                                        fullWidth={true}
                                        floatingLabelText="Logo"
                                        hintText="Logo"
                                        value={this.state.newCustomerDetails.customerLogo} 
                                        name='customerLogo' 
                                        onChange={this.handleNewCustomerChange}
                                />                            
                            </div>

                        </div>


                        <div className="loginBtns backgroundcolor marginT10">

                            <div>
                                {/* <RaisedButton label="Next" primary={true} buttonStyle={buttonStyle} onClick={() => this.addNewCustomer(this.state.newCustomerDetails)} /> */}
                                <div className="d-inline">
                                    <RaisedButton 
                                        label="Close" 
                                        secondary={true} 
                                        style={modelbuttonsStyle} 
                                        onClick={() => this.closeNewAccount()} 
                                    />
                                </div>
                                <div className="d-inline">
                                    <RaisedButton 
                                        label="Reset" 
                                        default={true} 
                                        style={modelbuttonsStyle} 
                                        onClick={() => this.reset()} 
                                    />
                                </div>
                                <div className="d-inline">
                                    <RaisedButton 
                                        label="Submit" 
                                        primary={true} 
                                        style={modelbuttonsStyle} 
                                        onClick={() => this.addNewAccount(this.state.newCustomerDetails)} 
                                        // disabled={!this.state.newCustomerDetails.customerID}
                                        />
                                </div>
                            </div>



                        </div>
                    </form>
                    </div>

                </Dialog>

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
            //  projectNameList: this.props.selectedAccount.projects,
            configureTools: [
                { "id": 1, "name": "Wiki" },
                { "id": 2, "name": "Issue Management" },
                { "id": 3, "name": "Quality" },
            ],
            selectTool: '',
            currentAccount: this.props.AccountDataArray,
            selectedProjectIndex: '',
            selectedItemName: '',
            selectedItemIndex: '',
            selectedJumpStartMenuItem: '',
            oldselectedItemIndex: '',
            jumpStartConfigModel: false,
            configPeopleModel: false,
            peoplesArray: [],
            createGithubProjectModel:false,
            githubInstance:{"repoName":"","projectName":"","projectUrl":""},
            selectedTeamName:'',
            selectedTeamIndex:'',
            peopleArray:[],
            selectedToolDetails:{},
            newDate: new Date(),
            newTeamObj:{},
            noProject:false,
            noPeople:false,
            noTool:false,
            listofToolsarray:[]
         

   
        }

        this.createProject = this.createProject.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.newProjectDetails = this.newProjectDetails.bind(this);
        this.configJumpStart = this.configJumpStart.bind(this);
 



        this.closeJumpStartModel = this.closeJumpStartModel.bind(this);
        this.configPeople = this.configPeople.bind(this);
        this.handlingPeopleList = this.handlingPeopleList.bind(this);
        this.updatePeopleList = this.updatePeopleList.bind(this);
        this.deletePeopleList = this.deletePeopleList.bind(this);
        this.toolsData = this.toolsData.bind(this);
        this.autoCreate = this.autoCreate.bind(this);
        this.submitGithubDetails = this.submitGithubDetails.bind(this);
        this.handleGithubInstance = this.handleGithubInstance.bind(this);
        this.closeGithubDetails = this.closeGithubDetails.bind(this);
    }
  
    autoCreate(){
        this.setState({createGithubProjectModel:true})          
    }

    closeGithubDetails(){
        this.setState({createGithubProjectModel:false})           
    }

    submitGithubDetails(githubObj){

        console.log(githubObj)
        this.setState({githubInstance:githubObj})

        var repoName=githubObj.repoName
        var projectName=githubObj.projectName
        var projectUrl=githubObj.projecturl
        axios.post("https://api.github.com/user/repos",
        {            
            "name": repoName,
            "description": "This is your first repository" ,
            "projectName": projectName       
        },
        {
            headers:{
                "Accept":"application/json",
                "Authorization":"Basic cGF2YW5rdW1hci5kQGNvbWFrZWl0LmNvbTpBYmNAMTIzNA=="
            }

        }).then(response =>{           
            var repo=response.data.name
            var owner=response.data.owner.login
            var projectName=JSON.parse(response.config.data).projectName

            axios.post("https://api.github.com/repos/"+owner+"/"+repo+"/projects",
            {            
                 "name": projectName,
                 "repo":repo,  
                 "owner": owner           
            },
            {
                headers:{
                    "Accept":"application/vnd.github.inertia-preview+json",
                    "Authorization":"Basic cGF2YW5rdW1hci5kQGNvbWFrZWl0LmNvbTpBYmNAMTIzNA=="
                }
            })

          axios.put("https://api.github.com/repos/"+owner+"/"+repo+"/import",
            {            
                 "vcs_url":this.state.githubInstance.projectUrl              
            },
            {
                headers:{
                    "Accept":"application/vnd.github.barred-rock-preview",
                    "Authorization":"Basic cGF2YW5rdW1hci5kQGNvbWFrZWl0LmNvbTpBYmNAMTIzNA=="
                }
            })

        })

        // this.setState({createGithubProjectModel:false})     

    }
   

    handleGithubInstance(e){
        var currentGithubInstanceObj = this.state.githubInstance;
        currentGithubInstanceObj[e.target.name] = e.target.value
        this.setState(
            {
                githubInstance: currentGithubInstanceObj
            }

        )

    }

    
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentAccount: nextProps.AccountDataArray
        })
    } 

    closeTeamModal=()=> {
        this.setState({ editTeamModal: false })
    }

  
    newProjectDetails(e) {
        const updatedProjectDetails = {...this.state.newProjectDetails}
        updatedProjectDetails[e.target.name] = e.target.value        
        this.setState({newProjectDetails:updatedProjectDetails})
    }

    createProject() {
        this.setState({ createProjectModel: true })
    }

    addNewProject(newProjectObject) {
        // var newProjectObject

        //  newProjectObject.tools = [{name:'',type:'',userName:'',password:'',hostedURL:'',index:0}]


        var tempAccountsArray = this.state.currentAccount.projects.slice();

        this.state.projectList = tempAccountsArray.concat(newProjectObject)

        axios.put(myConstClass.nodeAppUrl + `/accounts/` + this.state.currentAccount._id,
            {
                customerName: this.state.currentAccount.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: this.state.currentAccount.engagementModel,
                pricingModel: this.state.currentAccount.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: this.state.projectList,
                people: [],
                customerLogo: this.state.currentAccount.customerLogo,
                status: 'Active'
            })
            .then(response => {

                this.props.onSelectProject(response.data);
                this.setState({ currentAccount: response.data, createProjectModel: false, newProjectDetails: {} })
                // this.state.accountsArray = this.state.accountsArray.concat(response.data)
                // this.setState({ createAccountModal: false, newCustomerDetails: {} });

                //  window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
            })


    }

    closeCreateProjectModel() {
        this.setState({ createProjectModel: false, newCustomerDetails: {} })
    }

    configJumpStart(projectIndex) {
        if (this.state.currentAccount.projects[projectIndex].tools === undefined) {
            this.setState({
                jumpStartConfigModel: true, selectedProjectIndex: projectIndex, selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
                    selectedProjectIndex={projectIndex}
                    selectedJumpStartMenuName={"wiki"}


                />
            })
        }

        if (this.state.currentAccount.projects[projectIndex].tools !== undefined) {
            var jumpStartMenuNameArray = []
            for (var JumpStartMenuName in this.state.currentAccount.projects[projectIndex].tools) {
                jumpStartMenuNameArray.push(JumpStartMenuName)
            }

            this.setState({
                jumpStartConfigModel: true, selectedProjectIndex: projectIndex, selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
                    selectedProjectIndex={projectIndex}
                    selectedJumpStartMenuName={jumpStartMenuNameArray[0]}


                />
            })
        }

    }
    
    toolsData(selectedObj){


       // this.setState({currentAccount:selectedObj})
        this.setState({currentAccount:selectedObj,
            selectTool: <ToolConfigurationDetails selectedAccount={selectedObj}
                selectedProjectIndex={this.state.selectedProjectIndex}
             selectedJumpStartMenuName={this.state.selectedItemName} 
                


            />
        });
    }

   

    closeJumpStartModel() {
        this.setState({ jumpStartConfigModel: false, configPeopleModel: false })
    }

    configPeople(currentProject, projectIndex) {
        var tempPeoplesArray = []
        var tempArray = this.state.currentAccount


        if (tempArray.projects[projectIndex].people === undefined) {
            tempArray.projects[projectIndex].people = []

            this.setState({
                configPeopleModel: true,
                selectedProjectIndex: projectIndex,
                currentAccount: tempArray,
                // peoplesArray: tempPeoplesArray,
                people: <PeopleConfigurationDetails selectedAccount={this.state.currentAccount}
                    selectedProjectIndex={projectIndex}
                // onSubmitPeopleData={this.handlingPeopleList}
                  //onUpdatePeopleData={this.updatePeopleList}  
                />
            })

        }

        if (tempArray.projects[projectIndex].people !== undefined) {
            for (var i = 0; i < tempArray.projects[projectIndex].people.length; i++) {
                tempPeoplesArray.push(tempArray.projects[projectIndex].people[i])
            }

            this.setState({
                configPeopleModel: true,
                selectedProjectIndex: projectIndex,
                currentAccount: tempArray,
                peoplesArray: tempPeoplesArray,
                people: <PeopleConfigurationDetails selectedAccount={this.state.currentAccount}
                    selectedProjectIndex={projectIndex}
                    onSubmitPeopleData={this.handlingPeopleList}
                    
                />
            })

        }
    }

    handlingPeopleList(latestPeopleDate) {
        var tempPeoplesArray = []
        for (var i = 0; i < latestPeopleDate.projects[this.state.selectedProjectIndex].people.length; i++) {
            tempPeoplesArray.push(latestPeopleDate.projects[this.state.selectedProjectIndex].people[i])
        }
        this.setState({ peoplesArray: tempPeoplesArray })
    
    
    }

    updatePeopleList(updatedPeopleData){
        var tempPeoplesArray = []
        for (var i = 0; i < updatedPeopleData.projects[this.state.selectedProjectIndex].people.length; i++) {
            tempPeoplesArray.push(updatedPeopleData.projects[this.state.selectedProjectIndex].people[i])
        }
        this.setState({ peoplesArray: tempPeoplesArray })
    }

    deletePeopleList(deletedPeopleList){
        var tempPeoplesArray = []
        for (var i = 0; i < deletedPeopleList.projects[this.state.selectedProjectIndex].people.length; i++) {
            tempPeoplesArray.push(deletedPeopleList.projects[this.state.selectedProjectIndex].people[i])
        }
        this.setState({ peoplesArray: tempPeoplesArray })
    }

    curentSelectedIteminPeople(selectedNameObj, index) {
        this.setState({
            people: <PeopleConfigurationDetails selectedMemberObj={selectedNameObj}
                isSubmitDisable='true' selectedMemberIndex={index}
                onSubmitPeopleData={this.handlingPeopleList}
                    onUpdatePeopleData={this.updatePeopleList}
                    onDeletePeopleData={this.deletePeopleList}
            />
        })
    }
    // getDateString = (date) => {
    //     console.log(date)
    //     // var date = new Date(epochTime)
    //     var month = '' + (date.getMonth() + 1)
    //     var day = '' + date.getDate()
    //     var year = date.getFullYear()
    //     var dateString = (day + "/" + month + "/" + year)
    //     return dateString
    // }
    componentWillMount() {     

        var currentAccountArray = dcopy(this.props.AccountDataArray)        
         var latestTeam = currentAccountArray[currentAccountArray.length - 1].customerName
        var lastitemIndex = currentAccountArray.length - 1

        // var startDate=this.getDateString(currentAccountArray[currentAccountArray.length - 1].startDate)
        // var endDate=this.getDateString(currentAccountArray[currentAccountArray.length - 1].endDate)
        console.log(currentAccountArray)
      

        var noMember = 0
        var eachProjectMembers = 0
        var x;
        var allMembersinProject = 0  
            // for empty projects
        if (currentAccountArray[lastitemIndex].projects.length === 0) {
            this.setState({ noProject: true, noPeople: true, noTool: true,totalMembers:0})
        }
        else {
            var ProjectsArray = currentAccountArray[lastitemIndex].projects
            this.setState({ projectsArray: ProjectsArray, noProject: false, noPeople: false, noTool: false })
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
        if (currentAccountArray[lastitemIndex].projects.length !== 0) {
            // if projects array not equal to undefined and people array is udefined
            if (currentAccountArray[currentAccountArray.length - 1].projects[0].people === undefined) {
                // emptyPeopleArray = currentAccountArray[currentAccountArray.length - 1].projects[0].people = [{ "name": "no member is assigned to this project" }]
                this.setState({ noPeople: true})
            }
            else {
                var peopleArrayOfselectedProject = currentAccountArray[currentAccountArray.length - 1].projects[0].people
                this.setState({ peopleArray: peopleArrayOfselectedProject, noPeople: false })
            }

            // if projects array not equal to undefined and tools object is udefined
            if (currentAccountArray[currentAccountArray.length - 1].projects[0].tools === undefined) {
                // var jumpstartListofTools = ["no tools are configured to this project"]
                this.setState({ isTooldata: false,noTool:true})

            }
            else {
                var jumpstartListofTools = Object.keys(currentAccountArray[currentAccountArray.length - 1].projects[0].tools)
                //parameters passing to selectedTool function(selectedToolName, selectedITeamIndex,selectedProjectIndex,selectedToolIndex) to get tool details
                this.selectedTool(jumpstartListofTools[0], lastitemIndex, 0, 0)
                this.setState({ isTooldata: true, listofToolsarray: jumpstartListofTools,noTool:false})

            }
        }
            var TeamDetailsArrayForEditing=dcopy(currentAccountArray)

            this.setState({
                currentAccount: currentAccountArray,                
                TeamDetailsArrayForEditing:TeamDetailsArrayForEditing,
                selectedTeamName:latestTeam,                
                selectedTeamIndex: lastitemIndex,               
                selectedProjectIndex: 0,
                selectedToolIndex:0,
            })

    }    
    selectTeam = (event, selectedTeamIndex, value) => {       

        var currentAccount = this.state.currentAccount
        var noMember = 0
        var eachProjectMembers = 0
        var x;
        var allMembersinProject = 0
        // for empty projects

        if (currentAccount[selectedTeamIndex].projects.length === 0) {   
            this.setState({noProject:true,noPeople:true,noTool:true})  
        }
        else {            
            var ProjectsArray = currentAccount[selectedTeamIndex].projects
            this.setState({projectsArray: ProjectsArray,noProject:false,noPeople:false,noTool:false})
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
                this.setState({noPeople:true}) 
            }
            else {
                var peopleArrayOfselectedProject = currentAccount[selectedTeamIndex].projects[0].people
                this.setState({ peopleArray: peopleArrayOfselectedProject,noPeople:false})
            }

            if (currentAccount[selectedTeamIndex].projects[0].tools === undefined) {
                // var jumpstartListofTools = ["no tools are configured to this project"]
                this.setState({ isTooldata: false, noTool:true })
            }
            else {
                var jumpstartListofTools = Object.keys(currentAccount[selectedTeamIndex].projects[0].tools)
                this.selectedTool(jumpstartListofTools[0], selectedTeamIndex, 0, 0)
                this.setState({ isTooldata: true, selectedProjectIndex: 0, listofToolsarray: jumpstartListofTools,noTool:false})
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

    }

    addTeamModal=()=>{
        this.setState({ addTeamModal: true })
    }
    handleAddTeamDetails=(e)=> {    
        var newAccountInputs= this.state.newTeamObj
        newAccountInputs[e.target.name] = e.target.value;

        this.setState(
            {
                newTeamObj:newAccountInputs
            }

        )

    }
    addTeam=(newTeamObj)=>{

        axios.post(myConstClass.nodeAppUrl+`/accounts`,
        {
            customerName: newTeamObj.customerName,
            startDate: newTeamObj.startDate,
            endDate: newTeamObj.endDate,
            engagementModel: newTeamObj.engagementModel,
            pricingModel: 0,
            seniorSupplier: 'siva',
            projectManager: 'siva',
            projects: [],
            people: [],
            customerLogo:'',
            status: 'Active'
        })
        .then(response => {
            var addedObj = this.state.currentAccount.concat(response.data)
            this.setState({ currentAccount:addedObj,addTeamModal:false});
            
        })
    }   
    closeAddTeamModal=()=>{
        this.setState({addTeamModal:false})
    }
    editTeam=()=> {
     var tempArray = dcopy(this.state.currentAccount)
        this.setState({ editTeamModal: true,TeamDetailsArrayForEditing:tempArray })
    }
    handleTeamDetails=(e)=> { 
  
        // if(e!==null){
            var EditedAccountObj = this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex];
            
                    EditedAccountObj[e.target.name] = e.target.value;
        // }     
        //         if(e===null && string==='startDate'){                  
        //             var EditedAccountObj = this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex];
        //             EditedAccountObj.startDate=x
        //         }
        //         if(e===null && string==='endDate'){                  
        //             var EditedAccountObj = this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex];
        //             EditedAccountObj.endDate=x
        //         }

        this.setState(
            {
           
            }

        )

    }
    updateTeam(modifiedTeamObj) {     
        axios.put(myConstClass.nodeAppUrl + `/accounts/` + modifiedTeamObj._id,
            {
                customerName: modifiedTeamObj.customerName,
                startDate: modifiedTeamObj.startDate,
                endDate: modifiedTeamObj.endDate,
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
            var updatedObj=this.state.currentAccount        
            updatedObj.splice(this.state.selectedTeamIndex,1)
            updatedObj.splice(this.state.selectedTeamIndex,0,response.data)
            var updatedTeamName=updatedObj[this.state.selectedTeamIndex].customerName
                console.log(updatedObj)
                this.setState({ currentAccount:updatedObj,selectedTeamName:updatedTeamName,editTeamModal:false});

            })

    }
 
    handleChange=(even,date)=>{
        var selectedDate=new Date(date)
        var newDate=this.getDateString(date)
         this.state.currentAccount[this.state.selectedTeamIndex].startDate=newDate
         this.setState({})
    }
    selectingTeamName=(Teams)=> {
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
        var currentAccount=this.state.currentAccount       
        if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].people === undefined) {           
            this.setState({noPeople:true})
        }
        else {
            var peopleArrayOfselectedProject =currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].people
            this.setState({ peopleArray: peopleArrayOfselectedProject,noPeople:false })
        }

        if (currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].tools === undefined) {
            console.log("1")
            // var jumpstartListofTools = ["no tools are configured to this project"]
            this.setState({ isTooldata: false,noTool:true })
        }
        else {
            var jumpstartListofTools = Object.keys(currentAccount[this.state.selectedTeamIndex].projects[selectedProjectIndex].tools)
            this.setState({ isTooldata: true,noTool:false,listofToolsarray: jumpstartListofTools, })
        }

        this.setState({
            currentAccount:currentAccount,
            selectedProjectIndex: selectedProjectIndex        
        })

    }
    createProject() {
        this.setState({ createProjectModel: true })
    }

    addNewProject(newProjectObject) {    
         var tempAccountsArray = this.state.currentAccount;
         tempAccountsArray[this.state.selectedTeamIndex].projects.push(newProjectObject)         

        axios.put(myConstClass.nodeAppUrl + `/accounts/` + tempAccountsArray[this.state.selectedTeamIndex]._id,
            {
                customerName: tempAccountsArray[this.state.selectedTeamIndex].customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
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
                var currentAccount=this.state.currentAccount 
                var noMember = 0
                var eachProjectMembers = 0
                var x;
                var allMembersinProject = 0
                // for empty projects
        
                if (currentAccount[this.state.selectedTeamIndex].projects.length === 0) {   
                    this.setState({noProject:true,noPeople:true,noTool:true})  
                }
                else {            
                    var ProjectsArray = currentAccount[this.state.selectedTeamIndex].projects
                    this.setState({projectsArray: ProjectsArray,noProject:false,noPeople:true,noTool:false})
                }
        
                // for displaying(in card) total members in a team
                for (var i = 0; i < currentAccount[this.state.selectedTeamIndex].projects.length; i++) {
                    x = eachProjectMembers
                    if (currentAccount[this.state.selectedTeamIndex].projects[i].people == undefined) {
                        noMember = 0
                        allMembersinProject = noMember + x
                        this.setState({ totalMembers: allMembersinProject })
                    }
                    else {
                        eachProjectMembers = currentAccount[this.state.selectedTeamIndex].projects[i].people.length
                        allMembersinProject = x + eachProjectMembers
                        this.setState({ totalMembers: allMembersinProject })
                    }
                }
                
                var emptyPeopleArray
                if (currentAccount[this.state.selectedTeamIndex].projects.length !== 0) {
                    // if projects array not equal to undefined and people array is udefined
                    if (currentAccount[this.state.selectedTeamIndex].projects[0].people === undefined) {
                        this.setState({noPeople:true}) 
                    }
                    else {
                        var peopleArrayOfselectedProject = currentAccount[this.state.selectedTeamIndex].projects[0].people
                        this.setState({ peopleArray: peopleArrayOfselectedProject,noPeople:false })
                    }
        
                    if (currentAccount[this.state.selectedTeamIndex].projects[0].tools === undefined) {
                        // var jumpstartListofTools = ["no tools are configured to this project"]
                        this.setState({ isTooldata: false,noTool:true })
                    }
                    else {
                        var jumpstartListofTools = Object.keys(currentAccount[this.state.selectedTeamIndex].projects[0].tools)
                        this.selectedTool(jumpstartListofTools[0], this.state.selectedTeamIndex, 0, 0)
                        this.setState({ isTooldata: true, selectedProjectIndex: 0, listofToolsarray: jumpstartListofTools,noTool:false })
                    }
                }
                var currentAccountArray1 = dcopy(currentAccount)
        
                this.setState({
                    currentAccount: currentAccount,
                    selectedTeamName: currentAccount[this.state.selectedTeamIndex].customerName,
                    selectedTeamIndex: this.state.selectedTeamIndex,
                    selectedProjectIndex: 0,
                    TeamDetailsArrayForEditing: currentAccountArray1,
                    createProjectModel:false
        
                })

            })
    }

    selectedTool = (selectedToolName, selectedITeamIndex,selectedProjectIndex,selectedToolIndex) => {
    
        // var currentAccount = dcopy(this.props.AccountDataArray)
        var currentAccount=this.state.currentAccount  
        var selectedToolDetailsObj = currentAccount[selectedITeamIndex].projects[selectedProjectIndex].tools[selectedToolName]
        this.setState({ selectedToolDetails: selectedToolDetailsObj,selectedToolIndex:selectedToolIndex})
        // this.setState({selectedItemName:selectedItemName,selectedItemIndex:selectedItemIndex})
        // //this.selectedItemName = selectedItemName
        // if (this.state.oldselectedItemIndex !== '' && this.state.oldselectedItemIndex !== undefined) {
        //     this.state.configureTools[this.state.oldselectedItemIndex].selectedJumpStartMenuItem = false
        // }

        // var i
        // for (i = 0; i < this.state.configureTools.length; i++) {
        //     if (selectedItemName === this.state.configureTools[i].name) {
        //         this.state.configureTools[selectedItemIndex].selectedJumpStartMenuItem = true

        //     }
        // }
        // this.setState({ oldselectedItemIndex: selectedItemIndex })

        // var tempArray = this.state.currentAccount


        // if (tempArray.projects[this.state.selectedProjectIndex].tools === undefined) {
        //     tempArray.projects[this.state.selectedProjectIndex].tools = {}

        // }


        // if (tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemName] == undefined) {

        //     tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemName] = { name: '', userName: '', password: '', hostedURL: '' }
        //     this.setState({
        //         selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
        //             selectedProjectIndex={this.state.selectedProjectIndex}
        //             selectedJumpStartMenuName={selectedItemName}
        //             onSubmitToolsData={this.toolsData}

        //         />
        //     });

        // }

        // else {

        //     this.setState({
        //         selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
        //             selectedProjectIndex={this.state.selectedProjectIndex}
        //             selectedJumpStartMenuName={selectedItemName}
        //             onSubmitToolsData={this.toolsData}


        //         />
        //     });
        // }
        // this.setState({ currentAccount: tempArray })
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
                                        <img src="https://www.gstatic.com/webp/gallery/4.sm.jpg"/>
                                    </div>
                                    <div>
                                    <SelectField hintText="Select Project" value={this.state.selectedTeamName}
                                    labelStyle={{height:"37px"}} style={{ width: '100%' }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectTeam(e, i, v)}>
                                        {this.selectingTeamName(this.state.currentAccount)}
                                    </SelectField>
                                        <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Active</Subheader>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 col-lg-9">
                                <p style={{ color: 'rgba(0, 0, 0, 0.54)', font: '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis hendrerit metus, id laoreet nulla iaculis sit amet. Duis ac purus sit
                                        amet arcu mattis hendrerit.
                             </p>
                                <div className="col-md-12 padding0">
                                    <div className="col-md-12 col-lg-12 displayInline p-0">
                                        <div className="col-md-2 col-lg-2 p-0 m-2 displayInline">
                                            <div className="textAlignCenter pr-2">
                                                <ActionGroupWork />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Projects</Subheader>
                                            </div>
                                            <div className="font" style={{ lineHeight: "38px",fontWeight: "lighter" }}>{this.state.currentAccount[this.state.selectedTeamIndex].projects.length} </div>


                                        </div>
                                        <div className="col-md-2 col-lg-2 m-2 displayInline p-0">
                                        <div className="textAlignCenter pr-2">                                           
                                                <SocialPeopleOutline />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Members</Subheader>                                         
                                         </div>
                        
                                         <div className="font" style={{lineHeight: "38px",fontWeight: "lighter"  }}>{this.state.totalMembers}</div>     
                                        {/* <FloatingActionButton mini={true} secondary={true}>
                                                <SocialPeopleOutline />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '1px', lineHeight: "26px" }}>No.of Members</Subheader> */}
                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>No.of Members</label> */}
                                            
                                            {/* <div className="textAlignCenter">
                                                {10}
                                            </div> */}
                                            
                                        </div>
                                        <div className="col-md-2 col-lg-3 displayInline m-2 p-0">
                                        <div className="textAlignCenter pr-2">                                           
                                                <ActionDateRange />
                                                <Subheader className="p-1" style={{ fontSize: '12px', lineHeight: "4px" }}>Start Date</Subheader>                                                                             
                                         </div>
                                       
                                        <div className="" style={{fontSize: '25px',lineHeight: "32px"}}>
                                            {this.state.currentAccount[this.state.selectedTeamIndex].startDate} 
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
                                        <div className="col-md-2 col-lg-3 displayInline m-2 p-0">
                                        <div className="textAlignCenter pr-2">                                           
                                                <ActionDateRange />
                                                <Subheader className="p-1" style={{ fontSize: '12px', lineHeight: "4px" }}>End Date</Subheader>                                         
                                         </div>
                                         <div className="" style={{fontSize: '25px', lineHeight: "32px"}}>
                                         {/* <DatePicker
                                                textFieldStyle={{width: '60%'}} 
                                                hintText="Start Date"
                                                value={this.state.newDate}
                                                onChange={this.handleChange}
                                            /> */}
                                           {this.state.currentAccount[this.state.selectedTeamIndex].endDate}  
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
                            <div className="col-md-1 col-lg-1" style={{display:"grid"}}>
                                <div>
                                <FloatingActionButton
                                    mini={true}
                                    onClick={() => this.editTeam()}
                                    className="float-right"
                                >
                                    <ContentEdit/>
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
                        <Tabs inkBarStyle={{background:'#FF3D00'}}>}
                            <Tab label="Projects" style={tabsBackgroundColor}>
                                  <div style={{ border: "1px solid rgb(238, 238, 238)" }} >
                                      <Table onCellClick={this.selectedProject}>
                                          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                              <TableRow >
                                                  <TableHeaderColumn>Project Name</TableHeaderColumn>
                                                  <TableHeaderColumn>Settings</TableHeaderColumn>
                                                  <TableHeaderColumn>
                                                      <FloatingActionButton
                                                          secondary={true}
                                                          mini={true}
                                                          onClick={() => this.createProject()}
                                                          className="float-right"
                                                      >
                                                          <ContentAdd />
                                                      </FloatingActionButton>

                                                  </TableHeaderColumn>
                                              </TableRow>
                                          </TableHeader>
                                          <TableBody displayRowCheckbox={false} className={[this.state.noProject === false ? 'show' : 'visibility'].join(' ')}>
                                              {this.state.currentAccount[this.state.selectedTeamIndex].projects.map((project, index) => (
                                                  <TableRow className={[index === this.state.selectedProjectIndex ? 'selectedItem' : ''].join(' ')} key={index} style={{ border: '1px solid rgb(224, 224, 224)' }}>
                                                      <TableRowColumn>{project.projectName}</TableRowColumn>
                                                      <TableRowColumn>
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
                                                      </TableRowColumn>
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
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} className={[this.state.noPeople === false ? 'show' : 'visibility'].join(' ')}>                                      <Table>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow >
                                            <TableHeaderColumn>Members Name</TableHeaderColumn>
                                            <TableHeaderColumn>Settings</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {this.state.peopleArray.map((person, index) => (
                                            <TableRow key={index} style={{ border: '1px solid rgb(224, 224, 224)' }}>
                                                <TableRowColumn>{person.name}</TableRowColumn>
                                                <TableRowColumn>
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
                                                </TableRowColumn>
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
                              <Tab label="Jump Start" style={tabsBackgroundColor} disabled={this.state.noProject===true}>
                                  <div style={{ border: "1px solid rgb(238, 238, 238)" }} className={["col-lg-12 d-flex", this.state.noTool === false ? 'show' : 'visibility'].join(' ')}>
                                      <div className={["col-lg-3 col-md-3 py-2", this.state.noTool === false ? 'show' : 'visibility'].join(' ')}>
                                          <SelectableList style={{ border: '1px solid #eee' }} >
                                              {this.state.listofToolsarray.map((item, index) => (
                                                  <ListItem
                                                      primaryText={item}
                                                      value={index}
                                                      key={item}
                                                      onClick={() => this.selectedTool(item, this.state.selectedTeamIndex, this.state.selectedProjectIndex, index)}
                                                      className={[index === this.state.selectedToolIndex ? 'selectedItem' : ''].join(' ')}
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
                                                      value={this.state.selectedToolDetails.name}
                                                      name='customerID'
                                                      onChange={this.handleNewCustomerChange}
                                                  />
                                              </div>
                                              <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                  <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>UserName:</Subheader>
                                                  <TextField
                                                      hintText="tool name"
                                                      value={this.state.selectedToolDetails.userName}
                                                      name='customerID'
                                                      onChange={this.handleNewCustomerChange}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6 col-lg-6">
                                              <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                  <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>Password:</Subheader>
                                                  <TextField
                                                      hintText="tool name"
                                                      value={this.state.selectedToolDetails.password}
                                                      name='customerID'
                                                      onChange={this.handleNewCustomerChange}
                                                  />
                                              </div>

                                              <div className={["col-md-12 custId", this.state.isTooldata === true ? 'show' : 'visibility'].join(' ')}>
                                                  <Subheader className="p-0" style={{ fontSize: '12px', lineHeight: "2px" }}>URL:</Subheader>
                                                  <TextField
                                                      hintText="tool name"
                                                      value={this.state.selectedToolDetails.hostedURL}
                                                      name='customerID'
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
                                  </div>
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


                <Dialog     open={this.state.editTeamModal} contentStyle={{"left":"70%"}} className={["col-md-6 col-lg-5 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                        <Subheader className="p-0" style={{ fontSize: '30px'}}>Team Details</Subheader>
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
                                    onChange={this.handleTeamDetails} 
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
                                    onChange={this.handleTeamDetails}      
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
                            floatingLabelText="status"
                            hintText="status"
                            value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].status || ''}
                            name='status'
                            onChange={this.handleChange} 
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
                                    onChange={this.handleTeamDetails} 
                                />
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Pricing Model:</label></div> */}
                            <div className="col-md-12">
                               <TextField 
                                    fullWidth={true}
                                    floatingLabelText="Start Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].startDate || ''}
                                    name='startDate'
                                    onChange={this.handleTeamDetails} 
                                />
                            {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="Start Date"
                            name='startDate'
                            value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].startDate || ''}                          
                            onChange={(e,x)=>this.handleTeamDetails(e,x,'startDate')} 
                        /> */}
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                            <TextField 
                                    fullWidth={true}
                                    floatingLabelText="End Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].endDate || ''}
                                    name='endDate'
                                    onChange={this.handleTeamDetails} 
                                />
                            {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="End Date"
                            name='endDate'
                            value={this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].endDate || ''}    
                            onChange={(e,x)=>this.handleTeamDetails(e,x,'endDate')} 
                        /> */}
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
                                    disabled= {!this.state.TeamDetailsArrayForEditing[this.state.selectedTeamIndex].customerName}
                                />
                            </div>
                        </div>

                    </div>

                </Dialog>
                <Dialog open={this.state.addTeamModal} contentStyle={{"left":"70%"}} className={["col-md-6 col-lg-5 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                        <Subheader className="p-0" style={{ fontSize: '30px'}}>Add Team</Subheader>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
                            <div className="col-md-12 custId">
                                <TextField 
                                    hintText="Customer ID" 
                                    floatingLabelText="Customer ID" 
                                    value={this.state.newTeamObj._id||''}
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
                            floatingLabelText="status"
                            hintText="status"
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
                            <TextField 
                                    fullWidth={true}
                                    floatingLabelText="Start Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.newTeamObj.startDate || ''}
                                    name='startDate'
                                    onChange={this.handleAddTeamDetails} 
                                />
                            {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="Start Date"
                            value={this.state.newDate}
                            onChange={this.handleTeamDetails}
                        /> */}
                            </div>

                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Logo:</label></div> */}
                            <div className="col-md-12">
                            <TextField 
                                    fullWidth={true}
                                    floatingLabelText="End Date"
                                    hintText="dd/mm/yyyy"
                                    value={this.state.newTeamObj.endDate || ''}
                                    name='endDate'
                                    onChange={this.handleAddTeamDetails} 
                                />
                            {/* <DatePicker
                            textFieldStyle={{width: '100%'}} 
                            hintText="End Date"
                            value={this.state.newDate}
                            onChange={this.handleTeamDetails}
                        /> */}
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
                                    disabled= {!this.state.newTeamObj.customerName}
                                />
                            </div>
                        </div>

                    </div>

                </Dialog>
                <Dialog open={this.state.createProjectModel} contentStyle={{"left":"70%"}}  className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                    <div className="col-md-12 col-lg-12 textAlignCenter">
                    <Subheader className="p-0" style={{ fontSize: '30px'}}>Project Name</Subheader>
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
                                    onClick={() => this.closeCreateProjectModel()} 
                                />
                                <RaisedButton 
                                    label="Done" 
                                    primary={true} 
                                    style={modelbuttonsStyle} 
                                    onClick={() => this.addNewProject(this.state.newProjectDetails)} 
                                    disabled = {!this.state.newProjectDetails.projectName}
                                />
                            </div>

                        </div>

                    </div>

                </Dialog>
                <Dialog open={this.state.jumpStartConfigModel} contentStyle={{"left":"70%"}}  className={["col-md-6"].join(' ')}>

                    <div className="row">
                      
                            <div className="col-md-12 col-lg-12">
                                <h5 className="marginT0 font fontSize17">
                                    Jump Start
                                <FloatingActionButton mini={true} secondary={true} iconStyle={deleteProjectButton} style={addProjectButtonstyle} onClick={() => this.closeJumpStartModel()}>

                                        <ContentClear />


                                    </FloatingActionButton>

                                </h5>
                            </div>
                            
                            <div className="col-lg-12 displayInline marginT25">

                                <div className="textAlignLeft col-md-3 col-lg-4  mctJumpstartmodalmargins boxshadowfordata borderRadius vh">
                                    {this.state.configureTools.map((item, index) => (
                                        <div className={["pointer",
                                            this.state.configureTools[index].selectedJumpStartMenuItem == true ? "dashboardHeaderBgColor" : ''].join(' ')} 
                                            key={item.id} onClick={() => this.currentItem(item.name, index)} >{item.name}</div>
                                    ))}

                                </div>

                                <div className="col-md-7 col-lg-7 boxshadowfordata  mctJumpstartmodalmargins borderRadius vh padding0">
                                    {this.state.selectTool}
                                </div>
                            </div>
                      
                    </div>
                </Dialog>
                <Dialog open={this.state.configPeopleModel} contentStyle={{"left":"70%"}} className={["col-md-6"].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="col-md-12 col-lg-12 borderBottom">
                                <h5 className="marginT0  font fontSize17">Jump Start
                                <FloatingActionButton mini={true} secondary={true} iconStyle={deleteProjectButton} style={addProjectButtonstyle} onClick={() => this.closeJumpStartModel()}>

                                        <ContentClear />


                                    </FloatingActionButton>

                                </h5>
                            </div>
                            <div className="col-lg-12 displayInline marginT25">
                                <div className="textAlignLeft col-md-3 col-lg-4  mctJumpstartmodalmargins boxshadowfordata borderRadius vh">
                                    {this.state.peoplesArray.map((people, index) => (
                                        <div className={["pointer",
                                        ].join(' ')} key={people.emailid} onClick={() => this.curentSelectedIteminPeople(people, index)} >{people.name}</div>
                                    ))}

                                </div>
                                <div className="col-md-7 col-lg-7 boxshadowfordata  mctJumpstartmodalmargins borderRadius vh padding0">
                                    {this.state.people}
                                </div>
                            </div>

                        </div>
                    </div>
                </Dialog>
                <Dialog open={this.state.createGithubProjectModel} contentStyle={{"left":"70%"}}  className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h1 className="marginT0">Github Project Details</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Repositpry Name:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.githubInstance.repoName} name='repoName' onChange={this.handleGithubInstance} />
                            </div>
                            <div className="col-md-5 margin10"><label>Project Name:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.githubInstance.projectName} name='projectName' onChange={this.handleGithubInstance} />
                            </div>
                            <div className="col-md-5 margin10"><label>Project Url(import):</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.githubInstance.projectUrl} name='projectUrl' onChange={this.handleGithubInstance} />
                            </div>
                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton label="Close" secondary={true} style={modelbuttonsStyle} onClick={() => this.closeGithubDetails()} />
                                <RaisedButton label="Done" primary={true} style={modelbuttonsStyle} onClick={() => this.submitGithubDetails(this.state.githubInstance)} />
                            </div>

                        </div>

                    </div>

                </Dialog>
                
            </div>

        )

    }

}

class ToolConfigurationDetails extends React.Component { 
    constructor(props) {
        super(props)
        var obj = dcopy(this.props.selectedAccount)
        this.state = {
            wikiList: [{ "id": 1, "name": "Confluence" },
            { "id": 2, "name": "Slack" }],
            userConfigDetails: '',
            currentAccount: obj,
            selectedProjectIndex: '',
            selectedItemName: '',

            selectedToolItemName: '',
            dupeCurrentAccountArray: []

        }
        this.handleChangeInJumpStart = this.handleChangeInJumpStart.bind(this);
        this.subMenuItems = this.subMenuItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitToolsData = this.submitToolsData.bind(this);
       
    }
  
    componentWillMount() {
     
 
        
              var dupeAccountArray=dcopy(this.props.selectedAccount);
                    //var tempArray=this.props.selectedAccount
              if(dupeAccountArray.projects[this.props.selectedProjectIndex].tools===undefined){
        

                dupeAccountArray.projects[this.props.selectedProjectIndex].tools={} 
              }
              if(dupeAccountArray.projects[this.props.selectedProjectIndex].tools[this.props.selectedJumpStartMenuName]==undefined){
                dupeAccountArray.projects[this.props.selectedProjectIndex].tools[this.props.selectedJumpStartMenuName]={name: '',userName: '', password: '', hostedURL: ''}

                     this.setState({dupeCurrentAccountArray:dupeAccountArray,selectedProjectIndex: this.props.selectedProjectIndex,
                        selectedItemName:this.props.selectedJumpStartMenuName})
              }

        if (this.props.selectedJumpStartMenuName == "Wiki") {
      
            this.setState({
                wikiList: [
                    {"id": 1, "name": "Confluence" },
                    {"id": 2, "name": "Slack"}
                  
                ], dupeCurrentAccountArray: dupeAccountArray, selectedProjectIndex: this.props.selectedProjectIndex,
                selectedItemName:this.props.selectedJumpStartMenuName
              
              
           
            })

        }
        if (this.props.selectedJumpStartMenuName == "Issue Management") {
      
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Jira" },
                     { "id": 2, "name": "Github" },
                    
                ], dupeCurrentAccountArray: dupeAccountArray, selectedProjectIndex: this.props.selectedProjectIndex,
                selectedItemName:this.props.selectedJumpStartMenuName
     
            })

        }
        if (this.props.selectedJumpStartMenuName == "Quality") {
            this.setState({
                wikiList: [
                    { "id": 1, "name": "SonarQube"}
                ], dupeCurrentAccountArray: dupeAccountArray, selectedProjectIndex: this.props.selectedProjectIndex,
                selectedItemName:this.props.selectedJumpStartMenuName
           
            })

        }
        
        
       
    }

    componentWillReceiveProps(nextProps) {
     
        this.setState({dupeCurrentAccountArray:[]})
           var dupeAccountArray=dcopy(nextProps.selectedAccount);
        
    
        if (nextProps.selectedJumpStartMenuName == "Wiki") {
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Confluence" },
                    { "id": 2, "name": "Slack" }
                ],dupeCurrentAccountArray:dupeAccountArray, selectedProjectIndex:nextProps.selectedProjectIndex,
                selectedItemName:nextProps.selectedJumpStartMenuName
                
                
            })

        }
 
        if (nextProps.selectedJumpStartMenuName == "Issue Management") {
           
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Jira" },
                    { "id": 2, "name": "Github" },
                    
                ],dupeCurrentAccountArray:dupeAccountArray, selectedProjectIndex:nextProps.selectedProjectIndex,
                selectedItemName:nextProps.selectedJumpStartMenuName
               
                
            })
            //document.getElementById("create-course-form").reset();

        }

        if (nextProps.selectedJumpStartMenuName == "Quality") {
            this.setState({
                wikiList: [
                  
                    { "id": 1, "name": "SonarQube"}
                ],dupeCurrentAccountArray:dupeAccountArray, selectedProjectIndex:nextProps.selectedProjectIndex,
                selectedItemName:nextProps.selectedJumpStartMenuName
               
                
                
            })

        }
     
    }

    handleChangeInJumpStart(e, index, value) {

         var tempArray = this.state.dupeCurrentAccountArray
         var tempArray2 =dcopy(tempArray);    
        
         tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].name = value


         this.setState({ dupeCurrentAccountArray: tempArray })

         var tempArray=this.state.currentAccount

         if(tempArray.projects[this.props.selectedProjectIndex].tools===undefined){
            
    
            tempArray.projects[this.props.selectedProjectIndex].tools={} 
                  }
                  if(tempArray.projects[this.props.selectedProjectIndex].tools[this.props.selectedJumpStartMenuName]==undefined){
                    tempArray.projects[this.props.selectedProjectIndex].tools[this.props.selectedJumpStartMenuName]={name: '',userName: '', password: '', hostedURL: ''}
    
                         this.setState({dupeCurrentAccountArray:tempArray})
                  }

     if(this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].name!==value){
    
            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName]={ name: value,userName: '', password: '', hostedURL: ''}
         
       
     }

     if(this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].name===value){

                       
       tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].hostedURL = this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].hostedURL
        tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].userName = this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].userName
        tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].password = this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].password
     }
           
     this.setState({ dupeCurrentAccountArray: tempArray})
                
        //  for(var i=0;i<  this.state.currentAccount.projects[this.state.selectedProjectIndex].tools.length;i++){
        //                if(value == this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[i].name){
             
                
        //         tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].hostedURL = this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[i].hostedURL
        //         tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].userName = this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[i].userName
        //         tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].password = this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[i].password
        //         this.setState({ dupeCurrentAccountArray: tempArray })
        //         return ;


        //       }
        //       else{
        //                    tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].hostedURL = ''
        //         tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].userName = ''
        //         tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].password = ''
        //       }

        //  }

    }

    handleChange(e) {

        var tempArray = this.state.dupeCurrentAccountArray

        if (e.target.name == 'hostedURL') {

            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].hostedURL = e.target.value

        }
        if (e.target.name == 'userName') {

            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].userName = e.target.value

        }
        if (e.target.name == 'password') {

            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].password = e.target.value

        }


        this.setState({ dupeCurrentAccountArray: tempArray })
    }

    submitToolsData(toolsList) {
        this.setState({ dupeCurrentAccountArray: toolsList })
       
        axios.put(myConstClass.nodeAppUrl + `/accounts/` + this.state.dupeCurrentAccountArray._id,
            {
                customerName: this.state.dupeCurrentAccountArray.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: this.state.dupeCurrentAccountArray.engagementModel,
                pricingModel: this.state.dupeCurrentAccountArray.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: this.state.dupeCurrentAccountArray.projects,
                people: [],
                customerLogo: this.state.dupeCurrentAccountArray.customerLogo,
                status: 'Active'
            })
            .then(response => {
                   this.props.onSubmitToolsData(response.data)
                  this.setState({ dupeCurrentAccountArray: response.data })

            })
    }
 
    subMenuItems(wikiList) {
        return wikiList.map((wikiList) => (
            <MenuItem
                key={wikiList.id}
                insetChildren={true}

                value={wikiList.name}
                primaryText={wikiList.name}
            />
        ));
    }
    render() {
    
            return (
            <div>                 
                    <SelectField hintText="Select a Tool" value={this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].name} 
                    listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#000000 " }}  labelStyle={{ color: "#000000 ",height:"35px"}} underlineStyle={{ display: 'none' }}
                    onChange={(e, i, v) => this.handleChangeInJumpStart(e, i, v)} >
                        {this.subMenuItems(this.state.wikiList)}
                    </SelectField>
                 
                    <div className="col-md-12 col-lg-12 padding0">

                        <div className="col-md-12 displayInline textAlignLeft padding0">
                            <div className="col-md-4 "><label>Hosted Url:</label></div>
                            <div className="col-md-6 padding0">
                                <input value={this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].hostedURL} name='hostedURL'
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-md-12 displayInline textAlignLeft padding0">
                            <div className="col-md-4 "><label>userName:</label></div>
                            <div className="col-md-6 padding0">
                                <input value={this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].userName} name='userName'
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-md-12 displayInline textAlignLeft padding0">
                            <div className="col-md-4 "><label>password:</label></div>
                            <div className="col-md-6 padding0">
                                <input value={this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].password} name='password'
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                    </div>
              
                <div>
                
                    <RaisedButton label="Submit" primary={true} buttonStyle={buttonStyle} onClick={() => this.submitToolsData(this.state.dupeCurrentAccountArray)} 
                        
                        disabled={
                            !this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].hostedURL||
                            !this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].userName ||
                            !this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].password ||
                            !this.state.dupeCurrentAccountArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedItemName].name
                            }
                    />

                </div> 

            </div>

        )
    }
}

class PeopleConfigurationDetails extends React.Component {
    constructor(props) {
        super(props)
        var obj = dcopy(this.props.selectedAccount)
      
        this.state = {
            currentAccount:obj,
            tempSelectedAccountobj:'',
            currentProjectIndex:'',
            currentPeopleArrayIndex:'',
            tempObj:{name:'',role:'',emailid:''},
            disableSubmit:false,
            selectedPeopleIndex:''
        }
        this.handleChangeInPeopleConfigInput = this.handleChangeInPeopleConfigInput.bind(this);
        this.submitPeopleData = this.submitPeopleData.bind(this);
        this.updatePeopleData = this.updatePeopleData.bind(this);
        this.addPeople = this.addPeople.bind(this);
        this.deletePeopleData = this.deletePeopleData.bind(this);
    }

    componentWillMount(){
        this.setState({
            tempSelectedAccountobj:this.props.selectedAccount,
            currentProjectIndex:this.props.selectedProjectIndex,
            currentPeopleArrayIndex:this.props.peopleArrayIndex,
            //tempObj:this.props.selectedMemberObj
        
        })

        if(this.props.isSubmitDisable){
            this.setState({disableSubmit:this.props.isSubmitDisable})
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.props = nextProps

        this.setState({ tempObj: nextProps.selectedMemberObj, selectedPeopleIndex: nextProps.selectedMemberIndex })
        //this.state.disableSubmit=nextProps.isSubmitDisable
        if (nextProps.isSubmitDisable) {

            this.setState({ disableSubmit: nextProps.isSubmitDisable })
        }

    }

    handleChangeInPeopleConfigInput(e) {

   
        var tempArray = this.state.tempObj
        
                if (e.target.name == 'name') {
        
                    tempArray.name = e.target.value
        
                }
                if (e.target.name == 'role') {
        
                    tempArray.role = e.target.value
        
                }
                if (e.target.name == 'emailid') {
        
                    tempArray.emailid = e.target.value
        
                }
        
        
                this.setState({ tempObj: tempArray })
    }
    submitPeopleData(currentobj){
         // this.setState({ currentAccount: currentobj })
    
        this.state.tempSelectedAccountobj.projects[this.state.currentProjectIndex].people=this.state.tempSelectedAccountobj.projects[this.state.currentProjectIndex].people.concat(currentobj)

       

        axios.put(myConstClass.nodeAppUrl + `/accounts/` + this.state.tempSelectedAccountobj._id,
        {
            customerName: this.state.tempSelectedAccountobj.customerName,
            startDate: '13/12/2017',
            endDate: '13/12/2017',
            engagementModel: this.state.tempSelectedAccountobj.engagementModel,
            pricingModel:this.state.tempSelectedAccountobj.pricingModel,
            seniorSupplier: 'asewr',
            projectManager: 'jg',
            projects: this.state.tempSelectedAccountobj.projects,
            people: [],
            customerLogo: this.state.tempSelectedAccountobj.customerLogo,
            status: 'Active'
        })
        .then(response => {
        
            this.props.onSubmitPeopleData(response.data)
            //var dummyObj=currentobj
            // dummyObj.projects[this.state.currentProjectIndex].people[this.state.currentPeopleArrayIndex].name=''
            // dummyObj.projects[this.state.currentProjectIndex].people[this.state.currentPeopleArrayIndex].role=''
            // dummyObj.projects[this.state.currentProjectIndex].people[this.state.currentPeopleArrayIndex].emailid=''
            currentobj={name:'',role:'',emailid:''}
        this.setState({ 
            currentAccount: response.data, tempObj:currentobj})
         })



    }
    updatePeopleData(updateObj){

        this.state.tempSelectedAccountobj.projects[this.state.currentProjectIndex].people[this.state.selectedPeopleIndex]=updateObj

        axios.put(myConstClass.nodeAppUrl + `/accounts/` + this.state.tempSelectedAccountobj._id,
        {
            customerName: this.state.tempSelectedAccountobj.customerName,
            startDate: '13/12/2017',
            endDate: '13/12/2017',
            engagementModel: this.state.tempSelectedAccountobj.engagementModel,
            pricingModel:this.state.tempSelectedAccountobj.pricingModel,
            seniorSupplier: 'asewr',
            projectManager: 'jg',
            projects: this.state.tempSelectedAccountobj.projects,
            people: [],
            customerLogo: this.state.tempSelectedAccountobj.customerLogo,
            status: 'Active'
        })
        .then(response => {
         
        
            this.props.onUpdatePeopleData(response.data)
            //var dummyObj=currentobj
            // dummyObj.projects[this.state.currentProjectIndex].people[this.state.currentPeopleArrayIndex].name=''
            // dummyObj.projects[this.state.currentProjectIndex].people[this.state.currentPeopleArrayIndex].role=''
            // dummyObj.projects[this.state.currentProjectIndex].people[this.state.currentPeopleArrayIndex].emailid=''
            //updateObj={name:'',role:'',emailid:''}
        this.setState({ 
            currentAccount: response.data, tempObj:updateObj})
         })
    }

    addPeople(){

        this.setState({ tempObj:{name:'',role:'',emailid:''},disableSubmit:false})
    }

    deletePeopleData(slectedObj){

         slectedObj.projects[this.state.currentProjectIndex].people.splice(this.state.selectedPeopleIndex,1)

        axios.put(myConstClass.nodeAppUrl + `/accounts/` + slectedObj._id,
        {
            customerName: slectedObj.customerName,
            startDate: '13/12/2017',
            endDate: '13/12/2017',
            engagementModel: slectedObj.engagementModel,
            pricingModel:slectedObj.pricingModel,
            seniorSupplier: 'asewr',
            projectManager: 'jg',
            projects: slectedObj.projects,
            people: [],
            customerLogo: slectedObj.customerLogo,
            status: 'Active'
        })
        .then(response => {
                 
            this.props.onDeletePeopleData(response.data)
       
        this.setState({ tempObj:{name:'',role:'',emailid:''},
            currentAccount: response.data})
         })
    }
    render() {
       
        return (
            // <div className="col-md-6">
            <div>
                <div className="col-md-12 col-lg-12 text textAlignRight marginB08 paddingR08">
                 <FloatingActionButton mini={true} primary={true} iconStyle={addAccountBUtton} style={editbuttonStyle} onClick={() => this.addPeople()} >
                                 <ContentAdd />
                             </FloatingActionButton>
                  </div>       
                <div className="col-md-12 col-lg-12 padding0">

                    <div className="col-md-12 displayInline textAlignLeft padding0">
                        <div className="col-md-4 "><label>Name:</label></div>
                        <div className="col-md-6 padding0">
                            <input value={this.state.tempObj.name} name='name'
                                onChange={this.handleChangeInPeopleConfigInput} />
                        </div>
                    </div>
                    <div className="col-md-12 displayInline textAlignLeft padding0">
                        <div className="col-md-4 "><label>Role:</label></div>
                        <div className="col-md-6 padding0">
                            <input value={this.state.tempObj.role} name='role'
                                onChange={this.handleChangeInPeopleConfigInput} />
                        </div>
                    </div>
                    <div className="col-md-12 displayInline textAlignLeft padding0">
                        <div className="col-md-4 "><label>emailid:</label></div>
                        <div className="col-md-6 padding0">
                            <input value={this.state.tempObj.emailid} name='emailid'
                                onChange={this.handleChangeInPeopleConfigInput} />
                        </div>
                    </div>

                </div>    
            
                                   
                    {/* <div className="col-md-12 col-lg-12">
          
                        <div className="col-md-5 displayInline marginB04"><label>Name:</label></div>
                        <div className="col-md-6 displayInline marginB04">
                             <input value={this.state.tempObj.name} name='name' 
                            onChange={this.handleChangeInPeopleConfigInput} />
                        </div>
                        <div className="col-md-5 displayInline marginB04"><label>Role:</label></div>
                        <div className="col-md-6 displayInline marginB04">
                             <input value={this.state.tempObj.role} name='role' 
                            onChange={this.handleChangeInPeopleConfigInput} /> 
                        </div>
                        <div className="col-md-5 displayInline marginB04"><label>emailid:</label></div>
                        <div className="col-md-6 displayInline marginB04">
                             <input value={this.state.tempObj.emailid} name='emailid' 
                            onChange={this.handleChangeInPeopleConfigInput} /> 
                        </div>

                    </div> */}

                    <div className="col-md-12 col-lg-12 displayInline">
                        <div className="col-md-4 col-lg-4">
                            <RaisedButton disabled={this.state.disableSubmit} label="Submit" primary={true} buttonStyle={buttonStyle} onClick={() => this.submitPeopleData(this.state.tempObj)} />
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <RaisedButton disabled={this.state.disableSubmit === false} label="Update" primary={true} buttonStyle={buttonStyle} onClick={() => this.updatePeopleData(this.state.tempObj)} />
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <RaisedButton disabled={this.state.disableSubmit === false} label="Delete" secondary={true} buttonStyle={buttonStyle} onClick={() => this.deletePeopleData(this.state.tempSelectedAccountobj)} />
                        </div>
                    </div> 

            </div>
        )
    }
}

export default ManageCustomerTeams;

