import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
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

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import {myConstClass} from './constants.js';


var dcopy = require('deep-copy')


let SelectableList = makeSelectable(List);

const customStyles = {
    content: {
        top: '50%',
        left: '61%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0px"
    }
};
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

    componentDidMount() {
        // document.getElementById('customerTeams').classList.add("selectedDashboardItem");

    }

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

             

                <Modal isOpen={this.state.createAccountModal} style={customStyles} className={["col-md-6 col-lg-5 modalMargins modalBgColor 1 "].join(' ')}>

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

                </Modal>

                {this.state.accountDetails}
            </div>


        )

    }
}

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
            console.log(this.props.AccountDataArray)
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
            selectedTeamName:''
   
        }

        this.createProject = this.createProject.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.newProjectDetails = this.newProjectDetails.bind(this);
        this.configJumpStart = this.configJumpStart.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.handleNewCustomerChange = this.handleNewCustomerChange.bind(this);
        this.closeEditAccountModal = this.closeEditAccountModal.bind(this);

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

    componentWillMount() {        
        var lastitem=this.props.AccountDataArray[this.props.AccountDataArray.length-1].customerName               
        this.setState({ 
            currentAccount: this.props.AccountDataArray,
            selectedTeamName:lastitem
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentAccount: nextProps.AccountDataArray
        })
    }

    handleNewCustomerChange(e) {
        var currentAccountObj = this.state.currentAccount;
        currentAccountObj[e.target.name] = e.target.value;
        this.setState(
            {
                currentAccount: currentAccountObj
            }

        )

    }

    editAccount() {
        this.setState({ editAccountModal: true })
    }

    closeEditAccountModal() {
        this.setState({ editAccountModal: false })
    }

    updateAccount(newCustomerDetailsObject) {
        axios.put(myConstClass.nodeAppUrl + `/accounts/` + newCustomerDetailsObject._id,
            {
                customerName: newCustomerDetailsObject.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: newCustomerDetailsObject.engagementModel,
                pricingModel: newCustomerDetailsObject.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: newCustomerDetailsObject.projects,
                people: [],
                customerLogo: newCustomerDetailsObject.customerLogo,
                status: 'Active'
            })
            .then(response => {

                this.props.onUpdateProject(response.data);
                this.setState({ currentAccount: response.data, createAccountModal: false });

            })

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

    currentItem(selectedItemName, selectedItemIndex) {
        this.setState({selectedItemName:selectedItemName,selectedItemIndex:selectedItemIndex})
        //this.selectedItemName = selectedItemName
        if (this.state.oldselectedItemIndex !== '' && this.state.oldselectedItemIndex !== undefined) {
            this.state.configureTools[this.state.oldselectedItemIndex].selectedJumpStartMenuItem = false
        }

        var i
        for (i = 0; i < this.state.configureTools.length; i++) {
            if (selectedItemName === this.state.configureTools[i].name) {
                this.state.configureTools[selectedItemIndex].selectedJumpStartMenuItem = true

            }
        }
        this.setState({ oldselectedItemIndex: selectedItemIndex })

        var tempArray = this.state.currentAccount

 
        if (tempArray.projects[this.state.selectedProjectIndex].tools === undefined) {
            tempArray.projects[this.state.selectedProjectIndex].tools = {}

        }


        if (tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemName] == undefined) {
        
            tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemName] = { name: '', userName: '', password: '', hostedURL: '' }
            this.setState({
                selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
                    selectedProjectIndex={this.state.selectedProjectIndex}
                    selectedJumpStartMenuName={selectedItemName}
                    onSubmitToolsData={this.toolsData}
                    
                />
            });

        }

        else {
      
            this.setState({
                selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
                    selectedProjectIndex={this.state.selectedProjectIndex}
                    selectedJumpStartMenuName={selectedItemName}
                    onSubmitToolsData={this.toolsData}


                />
            });
        }
        this.setState({ currentAccount: tempArray })
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
    selectAccount=(event, ind, value)=>{      
        this.setState({selectedTeamName:value})

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
                                    labelStyle={{height:"37px"}} style={{ width: '100%' }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectAccount(e, i, v)}>
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
                                            <div className="font" style={{ lineHeight: "38px",fontWeight: "lighter" }}>{10} </div>


                                        </div>
                                        <div className="col-md-2 col-lg-2 m-2 displayInline p-0">
                                        <div className="textAlignCenter pr-2">                                           
                                                <SocialPeopleOutline />
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Members</Subheader>                                         
                                         </div>
                                         <div className="font" style={{lineHeight: "38px",fontWeight: "lighter"  }}>{20} </div>     
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
                                                <Subheader className="p-1" style={{ fontSize: '14px', lineHeight: "4px" }}>Start Date</Subheader>                                         
                                         </div>
                                         <div className="" style={{lineHeight: "38px",fontWeight: "lighter", fontSize: '30px'}}>{this.props.AccountDataArray[this.props.AccountDataArray.length - 1].startDate} </div>  
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
                                         <div className="" style={{lineHeight: "38px",fontWeight: "lighter",fontSize: '30px'}}>{this.props.AccountDataArray[this.props.AccountDataArray.length - 1].startDate} </div>
                                        {/* <FloatingActionButton mini={true} secondary={true}>
                                                <ActionDateRange />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '10px', lineHeight: "26px" }}>End Date</Subheader> */}
                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>End Date</label>
                                            <div className="textAlignCenter">
                                                {this.props.AccountDataArray[this.props.AccountDataArray.length - 1].endDate}
                                            </div> */}
                                        </div>

                                        <div className="col-md-2 col-lg-2 textAlignCenter">
                                        {/* <FloatingActionButton mini={true} secondary={true}>
                                                <ActionDateRange />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '10px', lineHeight: "26px" }}>End Date</Subheader> */}
                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>Status</label>
                                            <div className="textAlignCenter">
                                                {this.props.AccountDataArray[this.props.AccountDataArray.length - 1].status}
                                            </div> */}
                                        </div>
                                        <div className="col-md-2 col-lg-2 textAlignCenter">
                                        {/* <FloatingActionButton mini={true} secondary={true}>
                                                <ActionSettingsApplications />
                                            </FloatingActionButton>
                                            <Subheader className="p-1" style={{ fontSize: '10px', lineHeight: "26px" }}>Settings</Subheader> */}

                                            {/* <label className="marginB0" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>Team Manager</label>
                                            <div className="textAlignCenter">
                                                {"abc"}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 col-lg-1" style={{display:"grid"}}>
                                <div>
                                <FloatingActionButton
                                    mini={true}
                                    onClick={() => this.editAccount()}
                                    className="float-right"
                                >
                                    <ContentEdit />
                                </FloatingActionButton>
                                </div>
                                <div>
                                <FloatingActionButton
                                secondary={true}
                                    mini={true}
                                    onClick={() => this.editAccount()}
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

                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Project Name</TableHeaderColumn>
                                <TableHeaderColumn>Jump Start</TableHeaderColumn>
                                <TableHeaderColumn>People</TableHeaderColumn>
                                <TableHeaderColumn>ACE5</TableHeaderColumn>
                                <TableHeaderColumn>Actions</TableHeaderColumn>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.currentAccount.projects.map((project, index) => (
                                <TableRow key={index}>
                                   
                                    <TableRowColumn>{project.projectName}</TableRowColumn>
                                    <TableRowColumn style={tableConfigBUtton}>
                                        <RaisedButton label="configure" primary={true} onClick={() => this.configJumpStart(index)} />

                                    </TableRowColumn>
                                    <TableRowColumn style={tableConfigBUtton}>
                                        <RaisedButton label="configure" secondary={true} onClick={() => this.autoCreate()} />
                                    
                                    </TableRowColumn>
                                    <TableRowColumn style={tableConfigBUtton}>
                                        <RaisedButton label="configure" default={true} onClick={() => this.autoCreate()}/>
                     
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <FloatingActionButton mini={true} iconStyle={editProjectButton} onClick={() => this.createProject()}>

                                            <ContentEdit />


                                        </FloatingActionButton>
                                        <FloatingActionButton mini={true} secondary={true} iconStyle={deleteProjectButton} onClick={() => this.createProject()}>

                                            <ContentClear />


                                        </FloatingActionButton>

                                    </TableRowColumn>



                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> */}
                </div> 


                <Modal isOpen={this.state.editAccountModal} style={customStyles} className={["col-md-6 col-lg-5 modalMargins modalBgColor 2 "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h2 className="marginT0">Account Details</h2>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>CustomerID:</label></div> */}
                            <div className="col-md-12 custId">
                                <TextField 
                                    hintText="Customer ID" 
                                    floatingLabelText="Customer ID" 
                                    value={this.state.currentAccount.customerID || ''}
                                    name='customerID' 
                                    onChange={this.handleNewCustomerChange}
                                    type="number"
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="row margin0">
                            {/* <div className="col-md-5 margin10"><label>Customer Name:</label></div> */}
                            <div className="col-md-12">
                                <TextField 
                                    value={this.state.currentAccount.customerName || ''} 
                                    name='customerName' 
                                    onChange={this.handleNewCustomerChange}      
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
                                <SelectField 
                                    value={this.state.value} 
                                    name='status' 
                                    onChange={this.handleNewCustomerChange}
                                    floatingLabelText="Status ?"
                                    fullWidth={true}
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
                                    value={this.state.currentAccount.engagementModel || ''}
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
                                    value={this.state.currentAccount.pricingModel || ''} 
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
                                    value={this.state.currentAccount.customerLogo || ''} 
                                    name='customerLogo' 
                                    onChange={this.handleNewCustomerChange}                                
                                />
                            </div>

                        </div>


                        <div className="loginBtns" style={{}}>
                            <div>
                                <RaisedButton 
                                    label="Close" 
                                    secondary={true} 
                                    style={modelbuttonsStyle} 
                                    onClick={() => this.closeEditAccountModal()} 
                                />
                                <RaisedButton 
                                    label="Done" 
                                    primary={true} 
                                    style={modelbuttonsStyle} 
                                    onClick={() => this.updateAccount(this.state.currentAccount)}
                                    disabled= {!this.state.currentAccount.customerID || !this.state.currentAccount.customerName}
                                />
                            </div>
                        </div>

                    </div>

                </Modal>

                <Modal isOpen={this.state.createProjectModel} style={customStyles} className={["col-md-6 col-lg-5 modalMargins modalBgColor "].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h1 className="marginT0">Project Details</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Project Name:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.newProjectDetails.projectName || ''} name='projectName' onChange={this.newProjectDetails} />
                            </div>
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

                </Modal>

                <Modal isOpen={this.state.jumpStartConfigModel} style={customStylesJumpStart} className={["col-md-6 modalMargins modalBgColor "].join(' ')}>

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
                </Modal>

                <Modal isOpen={this.state.configPeopleModel} style={customStylesJumpStart} className={["col-md-6 modalMargins modalBgColor "].join(' ')}>

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
                </Modal>

                <Modal isOpen={this.state.createGithubProjectModel} style={customStyles} className={["col-md-6 col-lg-5 modalMargins modalBgColor "].join(' ')}>
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

                </Modal>
                
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

