///var dcopy = require('deep-copy')
import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

//import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar, Tooltip,ResponsiveContainer } from 'recharts';
import Modal from 'react-modal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { myConstClass } from './constants.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';


//import RefreshIndicatorExampleLoading from './loader'

// import { Modal } from 'react-overlays';
// Modal.prototype.componentWillMount = function componentWillMount() {
// 	this.focus = function focus() { };
// }

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
const emptyObjectModalStyles = {
	content: {
		top: '48%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor:"rgb(197, 197, 197)"
	}
};
const imageStyle = {

	top: "-2px",
	marginLeft: "-12px"
}
const innerDiv = {
	padding: "0px"
}

const placeholderColor = {
	color: "white"
}

const tableScroll = {
	height: 200,
	overflow: 'scroll'
}

const style = {
	container: {
		position: 'relative',
	},
	refresh: {
		display: 'inline-block',
		position: 'relative',
		boxShadow: 'none',
		backgroundColor: 'none',
		
		
	},

	show: {
		status: "loading"

	}


};
class Account extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			accounts: [],
			accountName:'',
			isModalOpen: false,
			projectName: '',
			teamName: '',
			projectDetails: { projects: [] },
			selectedTab1: true,
			selectedTab2: false,
			selectedTab3: false,
			selectedTab4: false,
			selectedTab5: false,
			projects: '',
			listofepics: [],
			selecteditem: '',
			issueTracking: '',
			developmentlist: [],
			sprintDetails: '',
			sourcelist: [],
			source: '',
			issuesList: [],
			doneArrayList: [],
			inprogressArrayList: [],
			todoArrayList: [],
			inqaArrayList: [],
			checkbox: '',
			doneArrayListlength: '',
			inprogressArrayListlength: '',
			todoArrayListlength: '',
			inqaArrayListlength: '',
			workHours: [],
			totalHours: [],
			issuesPieChart: '',
			datesArrayList: [],
			isAddProjectModal: false,
			projectTitle: '',
			selectedProjectIndex: 0,
			selectedProjectDetails: '',
			selectedProjectBoardDetails: '',
			sonarQubeData: '',
			issuesListArray: [],
			issuesArray: [],
			peoplesArray: [],
			hintStyle2: { opacity: 1 },
			renderChild: true,
			activeSprint: '',
			epicBurdownChart: '',
			loaderforpeople:'',
			loaderforsonar:'',			
			loaderforsprintburndownchart:'',
			loaderforsprintoverviewpiechart:'',
			loaderforEpicDetails:'',			
			loaderforEpicOverviewburndownchart:'',
			sprintPieChart: '',
			overlay:false,
			emptyAccountsObj:false,
			emptyProjectsObj:false,
			emptyToolsandPeopleObj:false
		}

		this.onDrop = this.onDrop.bind(this);
		this.addProjectModal = this.addProjectModal.bind(this);
		this.addProject = this.addProject.bind(this);

		this.accountsListArray = this.accountsListArray.bind(this);
		this.selectedAccount = this.selectedAccount.bind(this);
		this.selectProject = this.selectProject.bind(this);
		this.selectedBoardforSprintData = this.selectedBoardforSprintData.bind(this);
		this.sonarQubeData = this.sonarQubeData.bind(this);
		this.selectedBoardforIssues = this.selectedBoardforIssues.bind(this);
		this.sprintburndownchart = this.sprintburndownchart.bind(this);	
		this.sprintoverviewpiechart = this.sprintoverviewpiechart.bind(this);	
		this.epicBurdownChart = this.epicBurdownChart.bind(this);
		this.ShowLoaderforTeamandQuality = this.ShowLoaderforTeamandQuality.bind(this);
		this.ShowLoaderforEpicData = this.ShowLoaderforEpicData.bind(this);
		this.ShowLoaderforSprintData = this.ShowLoaderforSprintData.bind(this);
		this.displayErrorMessage = this.displayErrorMessage.bind(this);
		

		
	}

	addProjectModal() {
		this.setState({ isAddProjectModal: true })
	}
	addProject(account, projectTitle) {

		axios.put(myConstClass.nodeAppUrl + '/accounts/' + account._id,
			{
				"projects": [{ "name": projectTitle, "tools": [] }],
			})
			.then(response => {

			})
		this.setState({ isAddProjectModal: false })
	}
	openModal() {
		this.setState({ isModalOpen: true })
	}
	cancelModal() {
		this.setState({ isModalOpen: false,emptyAccountsObj:false });
	}

	onDrop(data) {

		this.setState({ isModalOpen: true })
	}

	accountsListArray(accounts) {

		return accounts.map((account) => (
			<MenuItem
				key={account._id}
				insetChildren={true}

				value={account.customerName}
				primaryText={account.customerName}
			/>
		));
	}

	selectedAccount(event, ind, value, selecteAccount) {

		this.setState({
			peoplesArray: '',
			sonarQubedata: '',
			issuesListArray: '',
			epicBurndownChart:'',
			sprintDetails: '',
			selectedProjectBoardDetails: '',
			workHours:'',
			sprintPieChart:''
			
		
			
		})


		//this.state.accounts.customerName = value;

		this.setState({
			accountName:value,
			projectDetails: selecteAccount[ind], value: value,
			projects: <SelectedProjectDetails projectDetails={selecteAccount[ind]} onSelectProject={this.selectProject}
					showLoader={this.ShowLoaderforTeamandQuality} errorMessage={this.displayErrorMessage}


			/>
		})
	}
	displayErrorMessage(){
	
		// if(projectDetails.projects.tools == undefined && projectDetails.projects.people==undefined)
		this.setState({ emptyToolsandPeopleObj: true })
	}

	ShowLoaderforTeamandQuality(){

		this.setState({  loaderforpeople:<RefreshIndicatorExampleLoading status={"loading"}/>,
						 loaderforsonar:<RefreshIndicatorExampleLoading status={"loading"}/>
	})
	}
	ShowLoaderforSprintData(){
		
				this.setState({  
			 					 loaderforsprintburndownchart:<RefreshIndicatorExampleLoading status={"loading"}/>,
								   loaderforsprintoverviewpiechart:<RefreshIndicatorExampleLoading status={"loading"}/>,
								   sprintburndownoverlay:true,
								   sprintoverviewoverlay:true,
								   overlay:true
								})
	}

	 ShowLoaderforEpicData(){
		
		 this.setState({
			 loaderforEpicDetails: <RefreshIndicatorExampleLoading status={"loading"} />,
			 loaderforEpicOverviewburndownchart: <RefreshIndicatorExampleLoading status={"loading"} />,
		 })
	 }
	
	selectProject(boardDetails, userName, password, hostedUrl, peopleList) {
		if(peopleList!=undefined){
			this.setState({
				selectedProjectBoardDetails: <SelectedProjectBoardDetails selectedProjectBoardDetails={boardDetails}
					selectedUserName={userName}
					selectedUserPwd={password}
					selectedUrl={hostedUrl}
					onSelectBoard={this.selectedBoardforSprintData}
					currentBoard={this.selectedBoardforIssues}
					listOfEpics={this.epicBurdownChart}
					showLoaderforEpicData={this.ShowLoaderforEpicData}
					showLoaderforSprintData={this.ShowLoaderforSprintData} />,
					peoplesArray: <PeoplesList peoplesList={peopleList} />,					
					loaderforpeople:'',
					sonarQubedata: <SonarQubeData sonarQubeDetails={this.sonarQubeData} />,
					loaderforsonar: ''
			})

		}

		else if(peopleList==undefined || JSON.stringify(peopleList)===JSON.stringify([])){			
			this.setState({
				selectedProjectBoardDetails: <SelectedProjectBoardDetails selectedProjectBoardDetails={boardDetails}
					selectedUserName={userName}
					selectedUserPwd={password}
					selectedUrl={hostedUrl}
					onSelectBoard={this.selectedBoardforSprintData}
					currentBoard={this.selectedBoardforIssues}
					listOfEpics={this.epicBurdownChart}
					showLoaderforEpicData={this.ShowLoaderforEpicData}
					showLoaderforSprintData={this.ShowLoaderforSprintData} />,
					//peoplesArray: <PeoplesList peoplesList={peopleList} />,					
					loaderforpeople:'',
					sonarQubedata: <SonarQubeData sonarQubeDetails={this.sonarQubeData} />,
					loaderforsonar: '',
					//peoplesArray:"",
					emptyPeoplesArray:"No members to dispaly"
			})
		}	
	}

	sonarQubeData() {
		this.setState({ sonarQubeData: <SonarQubeData /> })
	}
	sprintburndownchart(timespentArray){
		this.setState({ workHours: <Hourschart data={timespentArray} />,loaderforsprintburndownchart:'',sprintburndownoverlay:false })
	}
	sprintoverviewpiechart(workProgress){
		this.setState({ sprintPieChart: <Piechart sprinttList={workProgress} />,loaderforsprintoverviewpiechart:'',sprintoverviewoverlay:false,overlay:false})
	}
	selectedBoardforSprintData(sprintList, boardId, url, username, pwd) {

		if (sprintList !== undefined) {
			var sprintListArray = sprintList
			for (var i = 0; i < sprintListArray.length; i++) {
				if (sprintListArray[i].state === "active") {
					var activeSprint = sprintListArray[i].id
				}
			}
			this.setState({
				sprintDetails: <SprintDetails sprinttList={sprintListArray}
					boardId={boardId}
					selectedUrl={url}
					selectedUserName={username}
					selectedUserPwd={pwd}
					//sonarQubeDetails={this.sonarQubeData}
					activeSprint={activeSprint}
					sprintBurnDownChart={this.sprintburndownchart}
					sprintOverviewPiechart={this.sprintoverviewpiechart}
				/>,
				emptySprintArray:''
			});
		}
		else {
			this.setState({
				// sprintDetails: <SprintDetails sprinttList={[]} boardId={boardId} />,
				workHours:'',
				sprintPieChart:'',
				sprintDetails:'',
				emptySprintArray:'No Sprints to display data',
				loaderforsprintoverviewpiechart:'',
				loaderforsprintburndownchart:''
			});
		}
	}
	selectedBoardforIssues(epicsArray, resourceURL, userName, password) {

		


		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": resourceURL + "/rest/api/2/status",
			"userName": userName,
			"password": password,
			"actionMethod": "get"
		}).then(response => {

			var statusArray = []
			response.data.forEach(function (eachStatus) {
				statusArray.push(eachStatus.name)
			})
			var issuesDataArray = []
			epicsArray.forEach(function (eachEpicDetails) {
				var issuesObj = {}
				issuesObj.epicName = eachEpicDetails.name;
				for (var i = 0; i < statusArray.length; i++) {
					var currentStatusIssuesArray = []
					if (eachEpicDetails.issues.length == 0) {
						issuesObj[statusArray[i]]=0	
						
					}else{
						eachEpicDetails.issues.forEach(function (issue) {
							if (statusArray[i] == issue.fields.status.name) {
								currentStatusIssuesArray.push(issue)
							}
						})
						issuesObj[statusArray[i]]=currentStatusIssuesArray.length
					}
				}
				issuesDataArray.push(issuesObj);
			})
			
			this.setState({
				issuesListArray: <IssuesList issuesArray={issuesDataArray} 
				
				/>,
				loaderforEpicDetails:''

			})
		})
	}
	epicBurdownChart(listOfEpics, boardId, hostedUrl, userName, password) {

		

		if(JSON.stringify(listOfEpics)==JSON.stringify([])){
		
			this.setState({
				epicBurndownChart: '',
				loaderforEpicOverviewburndownchart:'',
				emptyEpicsArray:"No epics to show data",
				issuesListArray:'',
				loaderforEpicDetails:''
	
			})

		}

		else{

			this.setState({
				epicBurndownChart: <EpicBurdownChart
					epicsArray={listOfEpics}
					selectedUserName={userName}
					selectedUserPwd={password}
					selectedUrl={hostedUrl}
					boardID={boardId} 
					
					/>,
					loaderforEpicOverviewburndownchart:'',
					emptyEpicsArray:''

	
			})
		}
				
		
		
	}
	projectsListArray(projects) {
		return projects.map((project) => (
			<MenuItem
				key={project.projectName}
				insetChildren={true}
				value={project.projectName}
				primaryText={project.projectName}
			/>
		));
	}
	componentWillMount() {
		axios.get(myConstClass.nodeAppUrl + '/accounts')
			.then(response => {
			

				if (JSON.stringify(response.data)!== undefined && JSON.stringify(response.data) != JSON.stringify([])) {
	
					this.setState({
						accounts: this.state.accounts.concat(response.data),
					})
				}
				
				else if(JSON.stringify(response.data) == JSON.stringify([])){
	
					this.setState({emptyAccountsObj:true})
				}
			
				

				
			})
	}	
	render() {	
		return (
			<div className="container-fluid padding0">
				<nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
					<div className="col-md-12 flex">
						<div className="col-md-3 col-lg-2 marginT16">
							{/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
							<h4 className="margin0 pointer paddingL04"  ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
						</div>
						<div className="col-md-7 col-lg-8 textAlignCenter">
							{/* <h4 className="margin0">{this.state.projectDetails.account.customerName}</h4> */}
							<SelectField hintText="Select Account" value={this.state.accountName} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
								hintStyle={placeholderColor} labelStyle={{ color: "#fff",height:"40px"}} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedAccount(e, i, v, this.state.accounts)} >
								{this.accountsListArray(this.state.accounts)}
							</SelectField>
						</div>
						<div className="col-md-2 col-lg-2  displayInline padding0">
							{/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
							<div className="marginT07">
								<h5 className="font fontSize17 margintT06">Administrator: </h5>
							</div>
							<div className="marginT07">
								<List style={innerDiv}>
									<ListItem
										disabled={true}
										innerDivStyle={innerDiv}
										leftAvatar={
											<Avatar
												style={imageStyle}
												src="https://www.gstatic.com/webp/gallery/4.sm.jpg" />
										}

									/>
								</List>
							</div>


						</div>
						<div>

						</div>

					</div>
				</nav>
				<div className="row projectselectiondivbgcolor">
					<div className="col-lg-12 displayInline">
						<div className="col-lg-2 textAlignCenter">
						 {this.state.projects} 
						
							</div>
							<div className="col-lg-2 textAlignCenter marginL1">
							 {this.state.selectedProjectBoardDetails} 						
								</div>
						</div>
					</div>
				<div className="row">			
					<div className="col-md-4 col-lg-4   padding0 verticalHeight">
						{/* <div className="col-md-12 col-lg-12 textAlignCenter selectionbox">
							{this.state.projects}
						</div>

						<div className="col-md-12 col-lg-12 textAlignCenter selectionbox">
							{this.state.selectedProjectBoardDetails}
						</div> */}

						<div className="col-md-12 col-lg-11  teamdetailsheight boxshadowfordata boxmargin borderRadius justify">

							<div className="textAlignCenter">
								{this.state.loaderforpeople}
							</div>
							<div>
								{this.state.emptyPeoplesArray}
								</div>
							<div className="col-md-12 col-lg-12 textAlignCenter">
								<h5>Team Details</h5>
								{this.state.peoplesArray}
							</div>								
						</div>

						<div className="col-md-12 col-lg-11  sonarqubedataheight boxshadowfordata boxmargin borderRadius">
							<div className="textAlignCenter">
								{this.state.loaderforsonar}
							</div>
							<div className="col-md-12 col-lg-12 marginB08 textAlignCenter ">
								<h5>Quality Overview</h5>
								{this.state.sonarQubedata}
							</div>							
						</div>
					</div>
					<div className="col-md-4 col-lg-4   padding0 verticalHeight">
						<div className="col-md-12 col-lg-11  teamdetailsheight boxshadowfordata boxmarginTop borderRadius">
						<div className="textAlignCenter">
								{this.state.loaderforEpicDetails}
							</div>
							
						<div className="col-md-12 col-lg-12 textAlignCenter  padding0">
							<h5>Epic Overview</h5>
							
						</div>
						<div className="epicTablediv">
							{this.state.issuesListArray}
							<div className="textAlignCenter justify">
								{this.state.emptyEpicsArray}
							</div>
							</div>
						</div>
						<div className="col-md-12 col-lg-11  sonarqubedataheight boxshadowfordata boxmarginTop borderRadius">
						<div className="textAlignCenter">
								{this.state.loaderforEpicOverviewburndownchart}
							</div>
						<div className="col-md-12 col-lg-12 textAlignCenter">
							<h5>Epic BurndownChart</h5>
							
						</div>
							{this.state.epicBurndownChart}
							<div className="textAlignCenter verticalAlign">
								{this.state.emptyEpicsArray}
							</div>
						</div>
					</div>					

					<div className={["col-md-4 col-lg-4   padding0 verticalHeight"].join(' ')} >
						
						<div className={["col-md-12 col-lg-11 textAlignCenter  sprintselectboxheight boxshadowfordata boxmarginTopforsprintdata borderRadius", this.state.overlay == true ? "backgroundoverlay" : ''].join(' ')}>
							<div className="col-md-12 col-lg-12 textAlignCenter ">

							<h5>Select Sprint</h5>
						</div>
							{this.state.sprintDetails}
						</div>
						<div className={["col-md-12 col-lg-11 textAlignCenter  sprintburndownheight boxshadowfordata boxmarginTopforsprintdata borderRadius", this.state.sprintburndownoverlay == true ? "backgroundoverlay" : ''].join(' ')}>
							<div className="col-lg-12 textAlignCenter">
								{this.state.loaderforsprintburndownchart}
							</div>
							<div className="col-md-12 col-lg-12 textAlignCenter ">
								<h5>Sprint Burndown</h5>
								<div className="textAlignCenter">
								{this.state.emptySprintArray}
							</div>
							</div>
							{this.state.workHours}
						</div>

						<div className={["col-md-12 col-lg-11 textAlignCenter sprintoverviewheight boxshadowfordata boxmarginTopforsprintdata borderRadius", this.state.sprintoverviewoverlay == true ? "backgroundoverlay" : ''].join(' ')}>
							<div className="textAlignCenter">
								{this.state.loaderforsprintoverviewpiechart}
							</div>
							<div className="col-md-12 col-lg-12 textAlignCenter ">
								<h5>Sprint Overview</h5>
								<div className="textAlignCenter">
								{this.state.emptySprintArray}
							</div>
							</div>
							{this.state.sprintPieChart}
						</div>
					</div>
				</div>

				<Modal isOpen={this.state.isModalOpen} style={customStyles}
					className={["col-sm-8 col-md-6 modalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h1>Project Details</h1>
						</div>
						<div className="loginUserName">
							<label>UserName:<input value='' name='userName' /></label>
						</div>
						<div className="loginPwd">
							<label >Password:<input value='' name='pswd' /></label>
						</div>

						<div className="loginBtns">

							<div>
								{/* <Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.addProject()} >Submit</Button>  */}
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>

				<Modal isOpen={this.state.isAddProjectModal} style={customStyles}
					className={["col-sm-8 col-md-6  modalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h1>Account Details</h1>
						</div>
						<div className="loginUserName">
							<label>Project Title:<input value={this.state.projectTitle} name='projectTitle' onChange={this.handleChange} /></label>
						</div>
						{/* <div className="loginPwd">
								<label >Password:<input value='' name='pswd' /></label>
							</div> */}
						<div className="loginBtns">

							<div>
								<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.addProject(this.state.projectDetails.account, this.state.projectTitle)} >Submit</Button>
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>
				<Modal isOpen={this.state.emptyAccountsObj} style={emptyObjectModalStyles}
					className={["col-md-3 col-lg-3  modalMargins overlay "].join(' ')}>

					<div>
			
							<h5 className="font">No Account to select</h5>
					
					


							 {/* <div>
								
								 <Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button> 
							</div>   */}



				

					</div>

				</Modal>
				<Modal isOpen={this.state.emptyProjectsObj} style={emptyObjectModalStyles}
					className={["col-md-3 col-lg-3  modalMargins overlay "].join(' ')}>

					<div>
			
							<h5 className="font">No projects for this Account to select</h5>
					
					


							 {/* <div>
								
								 <Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button> 
							</div>   */}



				

					</div>

				</Modal>
				<Modal isOpen={this.state.emptyToolsandPeopleObj} style={emptyObjectModalStyles}
					className={["col-md-3 col-lg-3  modalMargins overlay "].join(' ')}>
					<div>
							<h5 className="font">No tools & people for the selected project</h5>
	
					</div>

				</Modal>
				{/* <div className="footer ">
					<div className="col-md-12 displayInline"> */}
						{/* <div className="col-md-4">
							<h6><a href="https://www.atlassian.com/software/jira" target="/">jira</a></h6>
							<h6><a href="https://www.sonarqube.org/" target="/">Quality</a></h6>
						</div>
						<div className="col-md-4">
							<h6><a href="https://www.atlassian.com/software/confluence" target="/">confluence</a></h6>
							<h6><a href="https://bitbucket.org/" target="/">Version Control</a></h6>
						</div>
						<div className="col-md-4">
							<h6><a href="https://www.comakeit.com" target="/">AES</a></h6>
							<h6><a href="https://www.comakeit.com" target="/">comakeIT</a></h6>
						</div> */}


					{/* </div>

				</div> */}
			</div>
		)

	}

}

class SelectedProjectDetails extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			projectDetails: '',
			selectedProject: '',
			// loader:'',
			userName: '',
			pwd: '',
			url: ''
		}

		this.projectDetailsListarray = this.projectDetailsListarray.bind(this);
		this.selectProject = this.selectProject.bind(this);
		this.getBoard = this.getBoard.bind(this);
	}

	componentWillMount() {


			this.setState({
				projectDetails: this.props.projectDetails,
				// userName: this.props.selectedUserName,
				// pwd: this.props.selectedUserPwd,
				// url: this.props.selectedUrl
				//loader:<RefreshIndicatorExampleLoading status={""}/> 
			})
		

	

	}

	componentDidMount(){
		if (JSON.stringify(this.props.projectDetails.projects) == JSON.stringify([])) {
			return this.props.errorMessage()
 		}
	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			projectDetails: nextProps.projectDetails,
			// userName: nextProps.selectedUserName,
			// pwd: nextProps.selectedUserPwd,
			// url: nextProps.selectedUrl
		})

	}
	getBoard(url,username,password,people){
		
		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": url + "/rest/agile/1.0/board",
			"userName": username,
			"password": password,
			"actionMethod": "get"
		})
			.then(response => {
				var boardDetails = response.data.values
				var userName = username
				var Password = password
				var hostedUrl = url
				var peopleList = people
				this.props.onSelectProject(boardDetails, userName, Password, hostedUrl, peopleList)
			})	
	}
	
	selectProject(event, ind, value) {
		//this.setState({ selectedProject: value })

		this.setState({ selectedProjectIndex: value })

		this.state.hintStyle2 = {
			opacity: 0
		}


		if(this.state.projectDetails.projects[ind].tools ==undefined &&this.state.projectDetails.projects[ind].people==undefined){

			return this.props.errorMessage()
		}

		if(this.state.projectDetails.projects[ind].tools !=undefined && 
			(this.state.projectDetails.projects[ind].people==undefined || JSON.stringify(this.state.projectDetails.projects[ind].people)==JSON.stringify([]) ))
		
						{
					
							this.props.showLoader()
							var jumpStartMenuNameArray = []
							const IM = "Issue Management"
							this.getBoard(
								this.state.projectDetails.projects[ind].tools[IM].hostedURL,
								this.state.projectDetails.projects[ind].tools[IM].userName,
								this.state.projectDetails.projects[ind].tools[IM].password,
								this.state.projectDetails.projects[ind].tools[IM].people
							)
							
						}	

		if(this.state.projectDetails.projects[ind].tools !=undefined && this.state.projectDetails.projects[ind].people!=undefined && JSON.stringify(this.state.projectDetails.projects[ind].people)!=JSON.stringify([])){
		
			
			this.props.showLoader()
			var jumpStartMenuNameArray = []
			const IM = "Issue Management"
		
			this.getBoard(
				
				this.state.projectDetails.projects[ind].tools[IM].hostedURL,
				this.state.projectDetails.projects[ind].tools[IM].userName,
				this.state.projectDetails.projects[ind].tools[IM].password,
				this.state.projectDetails.projects[ind].people
			)

		}				
			// this.setState({ loader:<RefreshIndicatorExampleLoading status={""}/> })
	}

	projectDetailsListarray(projects) {
		return projects.map((project) => (
			<MenuItem
				key={project.projectName}
				insetChildren={true}
				value={project.projectName}
				primaryText={project.projectName}
			/>
		));
	}

	render() {

		return (

		
				<div>
					<SelectField hintText="Select Project" value={this.state.selectedProjectIndex} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
						hintStyle={this.state.hintStyle2} labelStyle={{ color: "#fff",height:"40px"}} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProject(e, i, v)}>
						{this.projectDetailsListarray(this.state.projectDetails.projects)}
					</SelectField>

				</div>




		)
	}
}
class SelectedProjectBoardDetails extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			selectedProjectBoard: '',
			projectBoardDetailsListarray: [],
			userName: '',
			pwd: '',
			url: '',
			selectedBoardSprintsArray: [],
			epicArray: [],
			issuesList: '',
			hintStyle2: {
				opacity: 1
			}

		}

		//this.epicsArray=this.epicsArray.bind(this)
	}

	componentWillMount() {

		this.setState({
			projectBoardDetailsListarray: this.props.selectedProjectBoardDetails,
			userName: this.props.selectedUserName,
			pwd: this.props.selectedUserPwd,
			url: this.props.selectedUrl
		})

	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			projectBoardDetailsListarray: nextProps.selectedProjectBoardDetails,
			userName: nextProps.selectedUserName,
			pwd: nextProps.selectedUserPwd,
			url: this.props.selectedUrl
		})

	}

	selectedProjectBoard(event, index, value) {

	
		var boardId = this.state.projectBoardDetailsListarray[index].id

		this.state.hintStyle2 = {
			opacity: 0
		}
		this.props.showLoaderforSprintData()
		this.props.showLoaderforEpicData()
		this.setState({ selectedProjectBoard: value })

		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.projectBoardDetailsListarray[index].id + "/sprint",
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"
		})
			.then(response => {

				this.props.onSelectBoard(response.data.values, this.state.projectBoardDetailsListarray[index].id, this.state.url, this.state.userName, this.state.pwd, boardId);
				// this.props.sonarQubeDetails()
				// this.setState({
				// 	selectedBoardSprintsArray: response.data.values

				// })


			})


		var hostedURL = this.state.url

		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.projectBoardDetailsListarray[index].id + "/epic",
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"

		}, {
				boardId: this.state.projectBoardDetailsListarray[index].id,
				hostedUrl: hostedURL
			})
			.then(response => {

			
			if(JSON.stringify(response.data.values)==JSON.stringify([])){

				var listOfEpics = response.data.values
				var boardId = response.config.boardId
				var resourceURL = response.config.hostedUrl
				var userName = JSON.parse(response.config.data).userName
				var password = JSON.parse(response.config.data).password
	
	
				 this.props.listOfEpics(listOfEpics, boardId, resourceURL, userName, password)


			}

			else{
				
				setTimeout (function(){
					
								var listOfEpics = response.data.values
								var boardId = response.config.boardId
								var resourceURL = response.config.hostedUrl
								var userName = JSON.parse(response.config.data).userName
								var password = JSON.parse(response.config.data).password
					
					
								this.props.listOfEpics(listOfEpics, boardId, resourceURL, userName, password)
					
								var epicArray = []
								var counter = 0
								for (var i = 0; i < response.data.values.length; i++) {
									var epicName = response.data.values[i].name
									var hostedURL = this.state.url
									axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
										"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.projectBoardDetailsListarray[index].id + "/epic/" + response.data.values[i].id + "/issue",
										"userName": this.state.userName,
										"password": this.state.pwd,
										"actionMethod": "get"
									}, {
					
											epicName: response.data.values[i].name,
											index: i,
											length: response.data.values.length,
											hostedUrl: hostedURL
					
										})
										.then(response => {
										
											var resourceURL = response.config.hostedUrl
											var userName = JSON.parse(response.config.data).userName
											var password = JSON.parse(response.config.data).password
					
											epicArray.push({ name: response.config.epicName, issues: response.data.issues })
					
											if (response.config.index == (response.config.length - 1)) {
												this.props.currentBoard(epicArray, resourceURL, userName, password)
											}
					
										})
					
								}
							}.bind(this),1000)

			}

					


			})



	}

	projectBoardDetailsListarray(board) {

		return board.map((board) => (
			<MenuItem
				key={board.id}
				insetChildren={true}
				value={board.name}
				primaryText={board.name}
			/>
		));
	}


	render() {

		return (

			<div>


				<SelectField hintText="Select Board" value={this.state.selectedProjectBoard} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
					hintStyle={this.state.hintStyle2} labelStyle={{ color: "#fff",height:"40px"}} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectBoard(e, i, v)}>
					{this.projectBoardDetailsListarray(this.state.projectBoardDetailsListarray)}
				</SelectField>




			</div>




		)
	}
}
class PeoplesList extends React.Component {
	_
	constructor(props) {
		super(props)

		this.state = {

			peoplesArray: [],
			showCheckboxes: false,
			height: '194px'

		}


	}
	componentWillMount() {


		this.setState({ peoplesArray: this.props.peoplesList })


	}
	render() {
		return (
			<div className="padding0">	
				<div className="col-md-12 col-lg-12 padding0">
					<Table height={this.state.height}>
						<TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Role</TableHeaderColumn>
								<TableHeaderColumn>Email ID</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={this.state.showCheckboxes}>
							{this.state.peoplesArray.map((people, index) => (
								<TableRow key={index}>
									<TableRowColumn>{people.name}</TableRowColumn>
									<TableRowColumn>{people.role}</TableRowColumn>
									<TableRowColumn>{people.emailid}</TableRowColumn>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		)
	}
}
class SonarQubeData extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			sonarQubeData: {
				"bugs": "",
				"vulnerabilities": "",
				"codesmells": "",
				"duplicatedBlocks": "",
				"duplications": "",
				"script": "", "linesofcode": "",
			}

		}


	}

	componentWillMount() {
		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": "http://172.16.27.27:4950/sonar/api/measures/component?additionalFields=metrics,periods&componentKey=_Fic1&metricKeys=alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,code_smells,new_code_smells,sqale_rating,sqale_index,new_technical_debt,overall_coverage,new_overall_coverage,coverage,new_coverage,it_coverage,new_it_coverage,new_lines_to_cover,new_it_lines_to_cover,new_overall_lines_to_cover,tests,duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution",
			"userName": "admin", "password": "admin", "actionMethod": "get"
		})
			.then(response => {

				var i
				// 	this.state.closedIssues=[]
				// 	this.state.openIssues=[]
				for (i = 0; i < response.data.component.measures.length; i++) {
					if (response.data.component.measures[i].metric == "bugs") {
						this.state.bugs = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "vulnerabilities") {
						this.state.vulnerabilities = response.data.component.measures[i].value
					}
					if (response.data.component.measures[i].metric == "code_smells") {
						this.state.codesmells = response.data.component.measures[i].value

					}

					if (response.data.component.measures[i].metric == "duplicated_blocks") {
						this.state.duplicatedBlocks = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "duplicated_lines_density") {
						this.state.duplications = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "ncloc_language_distribution") {
						this.state.script = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "ncloc") {
						this.state.linesofcode = response.data.component.measures[i].value

					}

				}
				this.setState({
					sonarQubeData: {
						"bugs": this.state.bugs,
						"vulnerabilities": this.state.vulnerabilities,
						"codesmells": this.state.codesmells,
						"duplicatedBlocks": this.state.duplicatedBlocks,
						"duplications": this.state.duplications,
						"script": this.state.script,
						"linesofcode": this.state.linesofcode,
					}
				})

				//  this.props.sonarQubeDetails(this.state.sonarQubeData);


			})


	}

	render() {
		return (
			
			<div className="col-md-12 padding0">
				{/* <div className="col-md-12 col-lg-12 marginB08 textAlignCenter ">
					<h5>Quality Overview</h5>
				</div> */}


				<div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">
					<div className="col-md-3 col-lg-4 textAlignCenter">Bugs
													<div className="textAlignCenter">
							{this.state.sonarQubeData.bugs}
						</div>
					</div>
					<div className="col-md-4 col-lg-4 textAlignCenter"> Vulnerabilities
													<div className="textAlignCenter">
							{this.state.sonarQubeData.vulnerabilities}
						</div>
					</div>
					<div className="col-md-5 col-lg-4 textAlignCenter">Code Smells
													<div className="textAlignCenter">
							{this.state.sonarQubeData.codesmells}
						</div>
					</div>
					
				</div>

			
				<div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">

				<div className="col-md-3 col-lg-4 textAlignCenter"> Debt
													<div className="textAlignCenter">
							{}
						</div>
					</div>
					<div className="col-md-4 col-lg-4 textAlignCenter">Duplications
													<div className="textAlignCenter">
							{this.state.sonarQubeData.duplications}
						</div>
					</div>
					<div className="col-md-5 col-lg-4 textAlignCenter"> Duplicated Blocks
													<div className="textAlignCenter">
							{this.state.sonarQubeData.duplicatedBlocks}
						</div>
					</div>
					
				</div>

				<div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">

				<div className="col-md-3 col-lg-4 textAlignCenter"> Lines of Code
													<div className="textAlignCenter">
							{this.state.sonarQubeData.linesofcode}
						</div>
					</div>
					
				<div className="col-md-4 col-lg-4 textAlignCenter wordwrap">Script Lines
													<div className="textAlignCenter">
							{this.state.sonarQubeData.script}
						</div>
					</div>
					
				</div>




			</div>









		)
	}
}
class IssuesList extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			epicsArray: [],
			issuesArray: [],
			height: '300px',
			showCheckboxes: false,
			issuesHeaderItems:[]
		}
	}	
	componentDidMount() {	
		for (var i = 0; i < 1; i++) {
			var headerItems = Object.keys(this.props.issuesArray[1])
		}
		this.setState({ issuesArray: this.props.issuesArray, issuesHeaderItems: headerItems })
	}
	render() {
		return (
	
				<div className="col-md-12 col-lg-12 padding0">		
					<table className="table table-fixed">
						<thead className="">
							<tr className="epicdetailstableheadrowStyle">
							{this.state.issuesHeaderItems.map((row,i)  => (								
										<th className="epictableheadverticalalign" key={i}>{row}</th>				
							))}
							</tr>
						</thead>
						<tbody>
						{this.state.issuesArray.map((row,i) => (
							<tr key={i}>
								{Object.values(row).map(rowValue =>
									<td className="epicTableDataStyle">{rowValue}</td>
								)}
							</tr>
						))}
							</tbody>
					</table>
					{/* <Table height={this.state.height}>
						<TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false}>
						{this.state.issuesHeaderItems.map((row,i)  => (									
										<TableHeaderColumn key={i}>{row}</TableHeaderColumn>					
							))}				
						</TableHeader>
						<TableBody displayRowCheckbox={this.state.showCheckboxes}>
							{this.state.issuesArray.map((row,i) => (
								<TableRow key={i}>
									{Object.values(row).map(rowValue =>
										<TableRowColumn>{rowValue}</TableRowColumn>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table> */}
				</div>
		

		)
	}
}
class EpicBurdownChart extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			boardId: '',
			url: '',
			userName: '',
			pwd: '',
			epicsArray: '',
			selectedEpicId: '',
			epicBurnDownDataArray:[]
		}
		this.handleSelectedEpic = this.handleSelectedEpic.bind(this)
		this.listoFEpics = this.listoFEpics.bind(this)
	}

	componentWillMount() {
		this.state.epicListSorted = this.props.epicsArray.sort(function (a, b) {
			return parseFloat(b.id) - parseFloat(a.id);
		})
		this.setState({
			boardId: this.props.boardID,
			url: this.props.selectedUrl,
			userName: this.props.selectedUserName,
			pwd: this.props.selectedUserPwd,
			epicsArray: this.state.epicListSorted
		})
	}

	componentWillReceiveProps(nextProps) {

		this.state.sprintListSorted = nextProps.epicsArray.sort(function (a, b) {


			return parseFloat(b.id) - parseFloat(a.id);
		})
		this.setState({
			boardId: nextProps.boardID,

			url: nextProps.selectedUrl,
			userName: nextProps.selectedUserName,
			pwd: nextProps.selectedUserPwd,
			epicsArray: this.state.sprintListSorted
		})
	}
	componentDidMount(){
		var epicId=this.state.epicsArray[0].key
	
		this.handleSelectedEpic("1","2",epicId)
		
	}
	handleSelectedEpic(event, index, val) {
		
		this.setState({ selectedEpicId: val })
		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/greenhopper/1.0/rapid/charts/epicburndownchart?rapidViewId=" + this.state.boardId + "&epicKey=" + val,
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"
		}).then(response => {

			var sprintsArray = []
			Object.keys(response.data.changes).forEach(function (key, index) {
				var eachChangesObj = response.data.changes[key][0]

				var eachDate = Number(key)
				
				
				response.data.sprints.forEach(function (eachSprint) {
					if (eachDate >= eachSprint.startTime && eachDate <= eachSprint.endTime) {
						if (eachSprint.changes == undefined) {
							eachSprint.changes = [];
						}
						if(eachChangesObj.statC !== undefined && eachChangesObj.statC !== {}){
							// console.log(eachSprint.name ,"Change in ",eachChangesObj.key , eachChangesObj.statC.newValue?eachChangesObj.statC.newValue:"NA" , eachChangesObj.statC.oldValue?eachChangesObj.statC.oldValue:"NA")
						}
						eachSprint.changes.push(response.data.changes[key][0])
					}
				})
				
			})
			//console.log(response.data.sprints)
			response.data.sprints.forEach(function(eachSprint){
				if(eachSprint.changes!=undefined){
					eachSprint.uv=4000
					eachSprint.pv=3000
					sprintsArray.push(eachSprint)	
				}
			})
			this.setState({
				epicBurnDownDataArray:sprintsArray
			})
		})
		
	}

	listoFEpics(epicsArray) {
		return epicsArray.map((epic) => (
			<MenuItem
				key={epic.id}
				value={epic.key}
				primaryText={epic.key}
			/>
		));
	}

	render() {
	
		const data = [
			{ name: 'Page A', uv: 4000, pv: 2400, },
			{ name: 'Page B', uv: 3000, pv: 1398, },
			{ name: 'Page C', uv: 2000, pv: 9800, },
			{ name: 'Page D', uv: 2780, pv: 3908, },
			{ name: 'Page E', uv: 1890, pv: 4800, },
			{ name: 'Page F', uv: 2390, pv: 3800, },
			{ name: 'Page G', uv: 3490, pv: 4300,  },
		];
		return (
			<div className="padding0">
				{/* <div className="col-md-12 col-lg-12 textAlignCenter ">
					<h5>Epic Overview</h5>
				</div> */}

				<div className="col-md-12 padding0">

					<SelectField hintText="Select Epic" value={this.state.selectedEpicId} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#000000" }}
						hintStyle={this.state.hintStyle2} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.handleSelectedEpic(e, i, v)}>
						{this.listoFEpics(this.state.epicsArray)}
					</SelectField>

				</div>
				<ResponsiveContainer width='100%' aspect={5.0/2.8}>
				<BarChart width={600} height={300} data={this.state.epicBurnDownDataArray}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<XAxis dataKey="name"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3  3" />
				
				
					<Bar dataKey="uv" stackId="a" fill="#8884d8" />
					<Bar dataKey="pv" stackId="a" fill="#82ca9d" />
				</BarChart>
				</ResponsiveContainer>
			</div>



		)
	}
}
class SprintDetails extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			values: '',
			sprintStartTime: '',
			sprintEndTime: '',
			sprintCompleteTime: '',
			eachTimeSpentArray: [],
			totalTimeSpentArray: [],
			currentDate: '',
			currentSpentTime: 0,
			sprintId: this.props.value,
			workHours: '',
			date1: '',
			date2: '',
			timeSpent: '',
			sprintListSorted: '',
			numbers: [1, 2, 4, 3],
			numbersSorted: '',
			

			boardId: '',
			sonarQubeData: '',
			userNme: '',
			pwd: '',
			url: '',
			activeSprint: ''
		};
		this.handleChange = this.handleChange.bind(this);

	}

	componentWillMount() {


		this.state.sprintListSorted = this.props.sprinttList.sort(function (a, b) {


			return parseFloat(b.id) - parseFloat(a.id);
		})



		this.setState({
			boardId: this.props.boardId,

			url: this.props.selectedUrl,
			userName: this.props.selectedUserName,
			pwd: this.props.selectedUserPwd,
			values: this.props.activeSprint

		})




	}

	componentDidMount() {
		this.handleChange("1", "2", this.state.values)

	}

	componentWillReceiveProps(nextProps) {

		this.state.sprintListSorted = nextProps.sprinttList.sort(function (a, b) {

			return parseFloat(b.id) - parseFloat(a.id);
		})
		this.setState({
			boardId: nextProps.boardId,
			url: nextProps.selectedUrl,
			userName: nextProps.selectedUserName,
			pwd: nextProps.selectedUserPwd,
			values: nextProps.activeSprint
		})
		//this.state.boardID = nextProps.boardId

	}
	handleChange(event, index, val) {


		this.setState({
			values: val
		});

		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=" + this.state.boardId + "&sprintId=" + val,
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"

		}).then(response => {


			this.setState({
				sprintStartTime: '',
				sprintEndTime: '',
				sprintCompleteTime: '',
				eachTimeSpentArray: [],
				totalTimeSpentArray: [],
				currentDate: '',
				currentSpentTime: 0,
				workHours: '',
				date1: '',
				date2: '',
				timeSpent: '',


			});
		
			var getDateString = function (epochTime) {
				var date = new Date(epochTime)
				var month = '' + (date.getMonth() + 1)
				var day = '' + date.getDate()
				var year = date.getFullYear()
				var dateString = (month + "/" + day + "/" + year)
				return dateString
			}

			var d1 = getDateString(response.data.startTime)
			var d2 = getDateString(response.data.endTime)

			this.setState({ sprintStartTime: response.data.startTime, sprintEndTime: response.data.endTime, sprintCompleteTime: response.data.completeTime, date1: d1, date2: d2 })
			//var currentDateObj = getDateString(response.data.startTime)

			//this.setState({ currentDate: this.state.date1 })
			// this.state.currentDate = currentDateObj;

			var currentDateEpochTime = response.data.startTime
			var changesArray = Object.keys(response.data.changes)

			if (response.data.completeTime == undefined) {

				var date = new Date()
				var month = '' + (date.getMonth() + 1)
				var day = '' + date.getDate()
				var year = date.getFullYear()
				var dateString = (month + "/" + day + "/" + year)


				response.data.completeTime = new Date(dateString).getTime()


			}


			Object.keys(response.data.changes).forEach(function (key, index) {

				var eachDate = Number(key)

				if (eachDate >= response.data.startTime && eachDate <= response.data.completeTime) {

					var changeObjArray = response.data.changes[eachDate]
					changeObjArray.forEach(function (item) {

						if (item.timeC) {

							if (item.timeC.timeSpent) {

								var d = new Date(eachDate)
								var dateString = getDateString(eachDate)
								if (this.state.date1 !== dateString) {

									this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: this.state.date1, hr: (this.state.timeSpent / 3600) })

									this.setState({ date1: dateString, totalTimeSpentArray: this.state.eachTimeSpentArray })
									var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
									var diffDays = Math.round(Math.abs((d.getTime() - new Date(currentDateEpochTime).getTime()) / (oneDay)));
									if (diffDays > 1) {
										for (var i = 1; i < diffDays; i++) {
											var diffStartDate = new Date(currentDateEpochTime)
											var missedDate = new Date(currentDateEpochTime);
											missedDate.setHours(diffStartDate.getHours() + (i * 24))

											var missedDateString = getDateString(missedDate)
											this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: missedDateString, hr: (this.state.timeSpent / 3600) })

											this.setState({ totalTimeSpentArray: this.state.eachTimeSpentArray })
										}
									}
								}
								this.setState({ timeSpent: item.timeC.timeSpent + this.state.currentSpentTime })
								this.setState({ currentSpentTime: this.state.timeSpent })
								currentDateEpochTime = eachDate
							}

						}
					}.bind(this))
				}
				if (index == changesArray.length - 1) {
					this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: this.state.date1, hr: (this.state.timeSpent / 3600) })

					this.setState({ totalTimeSpentArray: this.state.eachTimeSpentArray })
					var endDateObj = new Date(response.data.endTime)
					var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
					var diffDays = Math.round(Math.abs((endDateObj.getTime() - new Date(currentDateEpochTime).getTime()) / (oneDay)));
					if (diffDays > 1) {
						for (var i = 1; i < diffDays; i++) {
							var diffStartDate = new Date(currentDateEpochTime)
							var missedDate = new Date(currentDateEpochTime);
							missedDate.setHours(diffStartDate.getHours() + (i * 24))
							var missedDateString = getDateString(missedDate)
							this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: missedDateString })
							this.setState({ totalTimeSpentArray: this.state.eachTimeSpentArray })
						}
					}

				}
			}.bind(this))

			//this.setState({ workHours: <Hourschart data={this.state.totalTimeSpentArray} /> })

			this.props.sprintBurnDownChart(this.state.totalTimeSpentArray)
		})


		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.boardId + "/sprint/" + val + "/issue?maxResults=100",
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"
		}).then(response => {

			// this.setState({
			// 	sprintPieChart: <Piechart sprinttList={response.data} />
			// });

			this.props.sprintOverviewPiechart(response.data)
		})
		//this.setState({sonarQubeData:<SonarQubeData />})
		//this.props.sonarQubeDetails();
	}
	sprintItems(sprintList) {


		return sprintList.map((sprintList) => (
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
					underlineStyle={{ display: 'none' }}
						hintText="Select Sprint"
						value={this.state.values}
						onChange={(e, i, v) => this.handleChange(e, i, v)}
						labelStyle={{height:"40px"}}

					>
						{this.sprintItems(this.state.sprintListSorted)}
					</SelectField>

				</div>

				<div className="col-md-12 col-lg-12">
					{this.state.workHours}
				</div>
				<div className="col-md-12 col-lg-12 padding0" >
					{this.state.sprintPieChart}
				</div>
	


			</div>
		)

	}


}

class Hourschart extends React.Component {
	render() {

		return (
			<div>
				{/* <div className="col-md-12 col-lg-12 textAlignCenter ">
					<h5>Sprint Burndown</h5>
				</div> */}
				<div className="col-md-12 col-lg-11 justify padding0 marginTop6">
					<ResponsiveContainer width='100%' aspect={5.0 / 2.8}>
						<LineChart data={this.props.data}>
							<XAxis dataKey="name" />
							<YAxis />
							<CartesianGrid strokeDasharray="1 1" />
							<Legend />
							<Line type="stepAfter" dataKey="hr" stroke="#82ca9d" />
							<Line type="monotone" dataKey="y" stroke="#82ca9d" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		)

	}


}

class Piechart extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			issuesList: [],
			doneArrayList: [],
			inprogressArrayList: [],
			todoArrayList: [],
			inqaArrayList: [],
			doneArrayListlength: '',
			inprogressArrayListlength: '',
			todoArrayListlength: '',
			inqaArrayListlength: '',
			sonarQubeData: '',
			piechartPercentagesArray: [], piechart: []
		}
		// this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {

		this.state.doneArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "Done") {
				return issue;
			}
		})
		this.state.inprogressArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In Progress") {
				return issue;
			}
		})
		this.state.todoArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "To Do") {
				return issue;
			}
		})

		this.state.inqaArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In QA") {
				return issue;
			}
		})

		this.setState({
			doneArrayListlength: this.state.doneArrayList.length, inprogressArrayListlength: this.state.inprogressArrayList.length,
			todoArrayListlength: this.state.todoArrayList.length, inqaArrayListlength: this.state.inqaArrayList.length,


		})


	}

	componentWillReceiveProps(nextProps) {

		this.state.doneArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "Done") {
				return issue;
			}
		})
		this.state.inprogressArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In Progress") {
				return issue;
			}
		})
		this.state.todoArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "To Do") {
				return issue;
			}
		})

		this.state.inqaArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In QA") {
				return issue;
			}
		})

		this.setState({
			doneArrayListlength: this.state.doneArrayList.length, inprogressArrayListlength: this.state.inprogressArrayList.length,
			todoArrayListlength: this.state.todoArrayList.length, inqaArrayListlength: this.state.inqaArrayList.length,

		})
	}


	render() {

		//this.state.piechartPercentagesArray=[]
		const todoArrayPercentage = Math.round(((this.state.todoArrayListlength / (this.state.todoArrayListlength + this.state.inprogressArrayListlength + this.state.inqaArrayListlength + this.state.doneArrayListlength)) * 100))
		const inprogressArrayPercentage = Math.round(((this.state.inprogressArrayListlength / (this.state.todoArrayListlength + this.state.inprogressArrayListlength + this.state.inqaArrayListlength + this.state.doneArrayListlength)) * 100))
		const inqaArrayPercentage = Math.round(((this.state.inqaArrayListlength / (this.state.todoArrayListlength + this.state.inprogressArrayListlength + this.state.inqaArrayListlength + this.state.doneArrayListlength)) * 100))
		const doneArrayPercentage = Math.round(((this.state.doneArrayListlength / (this.state.todoArrayListlength + this.state.inprogressArrayListlength + this.state.inqaArrayListlength + this.state.doneArrayListlength)) * 100))



		const data = [
			{ name: 'Group C', value: this.state.todoArrayListlength },
			{ name: 'Group B', value: this.state.inprogressArrayListlength },
			{ name: 'Group D', value: this.state.inqaArrayListlength },
			{ name: 'Group A', value: this.state.doneArrayListlength }];
		const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];


		const RADIAN = Math.PI / 180;
		const renderCustomizedLabel = ({ data, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
			const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
			const x = cx + radius * Math.cos(-midAngle * RADIAN);
			const y = cy + radius * Math.sin(-midAngle * RADIAN);

			return (
				`${(percent * 100).toFixed(0)}%`


			);
		};
		return (
			<div>

				{/* <div className="col-md-12 col-lg-12 textAlignCenter ">
					<h5>Sprint Overview</h5>
				</div> */}
				<div className="col-lg-12 padding0  displayInline" style={{height:"35vh"}}>



					<div className="col-md-8 col-lg-9 justify padding0">
					<ResponsiveContainer>
						<PieChart>
							<Pie
								//nameKey='name'
								dataKey="value"
								data={data}
						//cx={100}
							//cy={50}  
								//labelLine={true}
								label={renderCustomizedLabel}
								outerRadius={100}
								animationEasing='ease-in-out'
							//PieLabelStyle ='outside'
							>

								{
									data.map((entry, index) => < Cell fill={COLORS[index % COLORS.length]} key={index} />)

								}



							</Pie>


						</PieChart>
						</ResponsiveContainer>

					</div>





					<div className="col-md-3  col-lg-3 justify padding0">

						<div className="displayInline sprintStatusMenuWidth">
							<div className="borderRadius" style={{ backgroundColor: "#FF8042", width: "20px", height: "20px", border: "10px solid #FF8042" }}>

							</div>

							<div className="col-md-12 padding0">
								<label>{todoArrayPercentage}% To Do </label>
							</div>
						</div>
						<div className="displayInline sprintStatusMenuWidth">
							<div className="borderRadius" style={{ backgroundColor: "#00C49F", width: "20px", height: "20px", border: "10px solid #00C49F" }}>

							</div>

							<div className="col-md-12 padding0">
								<label>{inprogressArrayPercentage}% Progress</label>
							</div>
						</div>
						<div className="displayInline sprintStatusMenuWidth">
							<div className="borderRadius" style={{ backgroundColor: "#FFBB28", width: "20px", height: "20px", border: "10px solid #FFBB28" }}>

							</div>

							<div className="col-md-12 padding0">
								<label>{inqaArrayPercentage}% In QA</label>
							</div>
						</div>
						<div className="displayInline sprintStatusMenuWidth">
							<div className="borderRadius" style={{ backgroundColor: "#0088FE", width: "20px", height: "20px", border: "10px solid #0088FE" }}>

							</div>

							<div className="col-md-12 padding0">
								<label>{doneArrayPercentage}% Done</label>
							</div>
						</div>

					</div>
				</div>
			</div>
		)





	}
}

class RefreshIndicatorExampleLoading extends React.Component {
	constructor(props) {
		super(props)
			this.state = {
		laoderStatus:this.props.status
		}
	
	}



	
	render() {

		return (
			<div>
				<RefreshIndicator
					size={40}
					left={10}
					top={170}
					status={this.state.laoderStatus}
					style={style.refresh}
					loadingColor={'grey'}
				/>
			
			</div>
		)

	}
}



export default Account;