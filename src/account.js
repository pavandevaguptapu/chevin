import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Draggable, Droppable } from 'react-drag-and-drop'
import Modal from 'react-modal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {myConstClass} from './constants.js';
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
const imageStyle = {

	top: "-2px",
	marginLeft: "-12px"
}
const innerDiv = {
	padding: "0px"
}

const placeholderColor={
	color:"white"
}

class Account extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			accounts: [],
			isModalOpen: false,
			projectName: '',
			teamName: '',
			projectDetails: { projects: [] },
			selectedTab1: true,
			selectedTab2: false,
			selectedTab3: false,
			selectedTab4: false,
			selectedTab5: false,
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
			selectedProjectDetails:'',
			selectedProjectBoardDetails:''





			//  visibility:''


		}

		
		this.getEachIssue = this.getEachIssue.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.addProjectModal = this.addProjectModal.bind(this);
		this.addProject = this.addProject.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.accountsListArray = this.accountsListArray.bind(this);
		this.selectedAccount = this.selectedAccount.bind(this);
		this.selectProject= this.selectProject.bind(this);
		 this.selectedBoard = this.selectedBoard.bind(this);

	}
	handleChange(e) {

	}

	selectedDashBoard(event, index, value) {

		this.setState({ value: value });
		if (value == 2) {
			//this.props.history.push('/manageCustomerTeams');
			this.props.history.push({ pathname: '/dashboard', state: { selectedDashboard: this.state.value } })
		}
		if (value == 1) {
			//this.props.history.push('/manageCustomerTeams');
			this.props.history.push({ pathname: '/manageCustomerTeams', state: { selectedDashboard: this.state.value } })
		}

	}
	addProjectModal() {
		this.setState({ isAddProjectModal: true })
	}
	addProject(account, projectTitle) {

		axios.put(myConstClass.nodeAppUrl+'/accounts/' + account._id,
			{
				"projects": [{ "name": projectTitle, "tools": [] }],
			})
			.then(response => {

			})
		this.setState({ isAddProjectModal: false })
	}

	getEachIssue(item) {
		axios.get(`/JIRAREST/jira/rest/get/sprintBacklog`)
			.then(response => {

				this.setState({ issuesList: response.data.issues })
				// this.setState({source:<Source sourcelist={this.state.sourcelist}/>,issueTracking:'',development:''});
			})
	}

	openModal() {
		this.setState({ isModalOpen: true })
	}
	cancelModal() {
		this.setState({ isModalOpen: false, isModalOpen: false });
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
		this.state.accounts.customerName = value;
		this.setState({ projectDetails: selecteAccount[ind], value: value })
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
	selectProject(event, ind, value) {
	
		
		this.setState({selectedProjectIndex:value})
		
		// axios.post(`/JIRAREST/jira/rest/get/generic`, {
		// 	"resourceURL": this.state.projectDetails.projects[ind].tools[1].hostedURL + "/rest/agile/1.0/board/1/sprint", "userName": this.state.projectDetails.projects[ind].tools[1].userName, "password": this.state.projectDetails.projects[ind].tools[1].password
		// })
		// 	.then(response => {


		// 		this.setState({
		// 			sprintDetails: <SprintDetails sprinttList={response.data.values} />,

		// 		});


		// 	})

		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": this.state.projectDetails.projects[ind].tools[1].hostedURL + "/rest/api/2/project", "userName": this.state.projectDetails.projects[ind].tools[1].userName, "password": this.state.projectDetails.projects[ind].tools[1].password
		})
			.then(response => {

				
				this.setState({
					selectedProjectDetails: <SelectedProjectDetails selectedProjectDetails={response.data} selectedUserName={this.state.projectDetails.projects[ind].tools[1].userName}
						selectedUserPwd={this.state.projectDetails.projects[ind].tools[1].password} />

				})



			})

		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": this.state.projectDetails.projects[ind].tools[1].hostedURL + "/rest/agile/1.0/board", "userName": this.state.projectDetails.projects[ind].tools[1].userName, "password": this.state.projectDetails.projects[ind].tools[1].password
		})
			.then(response => {

				
				this.setState({
					selectedProjectBoardDetails: <SelectedProjectBoardDetails selectedProjectBoardDetails={response.data.values} selectedUserName={this.state.projectDetails.projects[ind].tools[1].userName}
						selectedUserPwd={this.state.projectDetails.projects[ind].tools[1].password} onSelectBoard={this.selectedBoard} />
				})

			})


	}

	selectedBoard(sprintList,boardId){


		
		if(sprintList!== undefined){
			var sprintListArray=sprintList
			var boardId=boardId
			this.setState({
							sprintDetails: <SprintDetails sprinttList={sprintListArray} boardId={boardId} />,
		
						 });
		}

		else{
			this.setState({
				sprintDetails: <SprintDetails sprinttList={[]} boardId={boardId}/>,

			 });
		}
		
	}
	componentWillMount() {


		axios.get(myConstClass.nodeAppUrl+'/accounts')
			.then(response => {
				
				this.setState({ accounts: this.state.accounts.concat(response.data) })

			})
	}
		
	render() {
	
		return (
			<div className="container-fluid padding0">

				<nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
					<div className="col-md-12 flex">
						<div className="col-md-3 col-lg-2 marginT16">
							{/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
							<h4 className="margin0 pointer paddingL04" onClick={() => this.openSideMenu()} ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
						</div>
						<div className="col-md-7 col-lg-8 textAlignCenter">
							{/* <h4 className="margin0">{this.state.projectDetails.account.customerName}</h4> */}
							<SelectField hintText="Select Account" value={this.state.accounts.customerName} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }} 
							hintStyle={placeholderColor} labelStyle={{ color: "#fff" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedAccount(e, i, v, this.state.accounts)} >
								{this.accountsListArray(this.state.accounts)}
							</SelectField>
						</div>
						<div className="col-md-2 col-lg-2  displayInline padding0">
							{/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
							<div className="marginT07">
								<h5 className="font fontSize17">Administrator: </h5>
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


				<div className="row">
					<div className="col-md-12 col-lg-12 marginT50 padding0">
						<div className="col-md-3 col-lg-2 borderRight marginR0 padding0 verticalHeight">
							<div className="col-md-12 col-lg-12">

								<SelectField hintText="Select Project" value={this.state.selectedProjectIndex} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
									hintStyle={{ opacity: "1" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProject(e, i, v)}>
									{this.projectsListArray(this.state.projectDetails.projects)}
								</SelectField>



							</div>
							<div className="col-md-12 col-lg-12">
									{this.state.selectedProjectDetails}
								{/* <SelectField hintText="Select Project" value={this.state.selectedProjectIndex} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
									hintStyle={{ opacity: "1" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProject(e, i, v)}>
									{this.projectsListArray(this.state.projectDetails.projects)}
								</SelectField> */}



							</div>
							<div className="col-md-12 col-lg-12">
							{this.state.selectedProjectBoardDetails}



							</div>


						</div>
						<div className="col-md-9">
											{this.state.sprintDetails}
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

			</div>
		)

	}

}
class Issueslist extends React.Component {
	constructor(props) {
		super(props)

		this.getEach = this.getEach.bind(this);
	}

	getEach(item) {
		this.props.selectedIssue(item)
	}

	render() {
		return (
			<div>
				<h4 className="bold textAlignLeft">Epics</h4>
				<ul className="paddingL16">
					{this.props.listofepics.map(item => (
						<li style={{ textAlign: "left" }} key={item.id} onClick={() => this.getEach(item.name)}>{item.name}</li>
					))}
				</ul>
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
			timeSpent:'',
			sprintListSorted:'',
			numbers:[1,2,4,3],
			numbersSorted:'',
			sprintPieChart:'',
			pieChartIssueStatusIdentifier:'',
			boardId:''
		

		};
		this.handleChange = this.handleChange.bind(this);
	
	}

	componentWillMount(){
	
		this.state.sprintListSorted=this.props.sprinttList.sort(function(a, b) {
			
				return parseFloat(b.id)-parseFloat(a.id) ;
		})
		
	this.state.boardId=this.props.boardId
		  
	}

	componentWillReceiveProps(nextProps){

		this.state.sprintListSorted=nextProps.sprinttList.sort(function(a, b) {
			
				return parseFloat(b.id)-parseFloat(a.id) ;
		})
		this.state.boardID=nextProps.boardId

	}
	
	handleChange(event, index, value) {
		
console.log(this.state.boardId)
		this.setState({
			values:value
		});

		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": "https://fullyincontrol.atlassian.net/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=1&sprintId=" + value , "userName": "jeyaganesh.n@comakeit.com", "password": "Abc@12345"
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
				timeSpent:''
	
			});
			
			var getDateString = function (epochTime) {
				var date = new Date(epochTime)
				var month = '' + (date.getMonth() + 1)
				var day = '' + date.getDate()
				var year = date.getFullYear()
				var dateString = (month + "/" + day + "/" + year)
				return dateString
			}
			var d1= getDateString(response.data.startTime)
			var d2= getDateString(response.data.endTime)

			this.setState({ sprintStartTime: response.data.startTime, sprintEndTime: response.data.endTime, sprintCompleteTime: response.data.completeTime,date1:d1,date2:d2 })
			var currentDateObj = getDateString(response.data.startTime)
			this.setState({ currentDate: currentDateObj})
			// this.state.currentDate = currentDateObj;

			var currentDateEpochTime = response.data.startTime
			var changesArray = Object.keys(response.data.changes)
		                                                                                                                                               
			var z=0
			var c=0
			var n=0
			Object.keys(response.data.changes).forEach(function (key, index) {
				console.log(response.data)

				var eachDate = Number(key)
				//console.log(getDateString(eachDate))

			//	console.log(response.data.changes[eachDate][0])			
				//  if(response.data.changes[eachDate][0].timeC){
				// 	 if(response.data.changes[eachDate][0].timeC.timeSpent){
				// 						 	console.log(getDateString(eachDate)  + '-'+ response.data.changes[eachDate][0].key +'-'+ response.data.changes[eachDate][0].timeC.oldEstimate/3600 
				//  	+'-'+ response.data.changes[eachDate][0].timeC.newEstimate/3600+'-'+response.data.changes[eachDate][0].timeC.timeSpent/3600)
				// 	 }
					

					
				//  }
			
				
				
				//console.log(response.data.changes[eachDate][0].timeC)

				// if(response.data.changes[eachDate][0].timeC){
				// 					var x =response.data.changes[eachDate][0].timeC.oldEstimate		
				// 				var a = response.data.changes[eachDate][0].timeC.newEstimate
				// 				//var l = response.data.changes[eachDate][0].timeC.timeSpent
				// 	var  y=x
				// 	 z=z+y
				// 	var b=a
				// 	c=c+b
				// 	// var m=l
				// 	// n=n+m

				// 	//  console.log(z+"-"+"oldEstimate")
				// 	//  console.log(c+"-"+"newEstimate")
				// 	// console.log(n+"-"+"timeSpent")

				// 	if(response.data.changes[eachDate][0].timeC.timeSpent){
				// 		var l = response.data.changes[eachDate][0].timeC.timeSpent
				// 			var m=l
				// 	n=n+m
				// 	console.log(n+"-"+"timeSpent")
				// 	}

				// }
				if (eachDate >= response.data.startTime && eachDate<=response.data.completeTime) {
					var changeObjArray = response.data.changes[eachDate]	
								changeObjArray.forEach(function (item) {
								
						if (item.timeC) {
							
					// 		console.log(item.timeC)
					// 			var x =item.timeC.oldEstimate		
					// 			var a = item.timeC.newEstimate
					// var  y=x
					//  z=z+y
					// var b=a
					// c=c+b
					
					//  console.log(z+"-"+"oldEstimate")
					//  console.log(c+"-"+"newEstimate")
					
							if (item.timeC.timeSpent) {
								// var l = item.timeC.timeSpent
								// 			var m=l
								// 	n=n+m
								// 	console.log(n+"-"+"timeSpent")
								
								// console.log(getDateString(eachDate)  + '-'+ response.data.changes[eachDate][0].key +'-'+ response.data.changes[eachDate][0].timeC.oldEstimate/3600 
								// +'-'+ response.data.changes[eachDate][0].timeC.newEstimate/3600+'-'+response.data.changes[eachDate][0].timeC.timeSpent/3600)
							//	console.log(response.data.changes[eachDate][0].timeC.timeSpent)
								var d = new Date(eachDate)
								var dateString = getDateString(eachDate)
								if (this.state.currentDate !== dateString) {
									this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: this.state.currentDate, hr: (this.state.timeSpent / 3600) })
							
									this.setState({ currentDate: dateString, totalTimeSpentArray: this.state.eachTimeSpentArray })
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
					this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: this.state.currentDate, hr: (this.state.timeSpent / 3600) })
					
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
	
			this.setState({workHours: <Hourschart value={this.state.totalTimeSpentArray}/>})
		})


		axios.post(`/JIRAREST/jira/rest/get/generic`, {			
			"resourceURL": "https://fullyincontrol.atlassian.net/rest/agile/1.0/board/"+ this.state.boardId+"/sprint/"+value+"/issue?maxResults=100", "userName": "jeyaganesh.n@comakeit.com", "password": "Abc@12345"
			}).then(response=>{
				//var z=0
				//var c=0
				response.data.issues.forEach(function(issue){
					//console.log(issue)
					//var x =(issue.fields.aggregatetimeoriginalestimate/3600)-(issue.fields.aggregatetimespent/3600)
					// var x=issue.fields.aggregatetimeoriginalestimate
					// var a = issue.fields.aggregatetimespent
						
					// var  y=x
					//  z=z+y
					// var b=a
					// c=c+b
				
					//  console.log(z+"-"+"aggregatetimeoriginalestimate")
					//  console.log(c+"-"+"aggregatetimespent")
				
				})
				this.setState({
					sprintPieChart: <Piechart sprinttList={response.data} />, pieChartIssueStatusIdentifier:<StatusIdentifier/>
	
				});
			})

	}
	sprintItems(sprintList) {
		return sprintList.map((sprintList) => (
			<MenuItem
				key={sprintList.id}
				insetChildren={true}

				value={sprintList.id}
				primaryText={sprintList.name}
			/>
		));
	}

	render() {
		
		return (
			<div className="row textAlignCenter marginT3">
				<div className="col-md-11 col-lg-11">
				<SelectField
					hintText="Select Sprint"
					value={this.state.values}
					onChange={(e, i, v) => this.handleChange(e, i, v)}

				>
					{this.sprintItems(this.state.sprintListSorted)}
				</SelectField>
					{/* <h4 className="font fontSize17 textAlignCenter">Sprints</h4> */}

				</div>
				{/* <ul className="paddingL16">
					{this.props.developmentlist.map(item => (
						<li style={{ textAlign: "left" }} key={item.id}>{item.name}</li>
					))}
				</ul> */}
				{/* <SelectField
					hintText="Select a sprint"
					value={this.state.values}
					onChange={(e, i, v) => this.handleChange(e, i, v)}

				>
					{this.sprintItems(this.state.sprintListSorted)}
				</SelectField> */}
					
				<div>
					{this.state.workHours}
				</div>
				<div>
					{this.state.sprintPieChart}
				</div>
				<div>
					{this.state.pieChartIssueStatusIdentifier}
				</div>

			</div>
		)

	}


}
class Source extends React.Component {

	render() {
		return (
			<div>
				<h4 className="bold textAlignLeft">Repositories</h4>
				<ul className="paddingL16">
					{this.props.sourcelist.map(item => (
						<li style={{ textAlign: "left" }} key={item.last_updated} >{item.name}</li>
					))}
				</ul>
			</div>
		)

	}


}


class Hourschart extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
			<div>
				<div>
				</div>
				<div>
					<LineChart width={600} height={300} data={ this.props.value}>
						<XAxis dataKey="name" />
						<YAxis />
						<CartesianGrid strokeDasharray="1 1" />
						<Legend />
						<Line type="stepAfter" dataKey="hr" stroke="#82ca9d" />
						<Line type="monotone" dataKey="y" stroke="#82ca9d" />
					</LineChart>
				</div>
			</div>
		)

	}


}

class StatusIdentifier extends React.Component {

	render() {
		return (
			<div className="displayInline  col-md-10">
				<div className="borderRadius" style={{ backgroundColor: "#FF8042", width: "20px", height: "20px", border: "5px solid #FF8042" }}>

				</div><span><label className="marginR10">To Do</label></span>

				<div className="borderRadius" style={{ backgroundColor: "#00C49F", width: "20px", height: "20px", border: "5px solid #00C49F" }}>

				</div><span><label className="marginR10">In Progress</label></span>

				<div className="borderRadius" style={{ backgroundColor: "#FFBB28", width: "20px", height: "20px", border: "5px solid #FFBB28" }}>

				</div><span><label className="marginR10">In QA</label></span>

				<div className="borderRadius" style={{ backgroundColor: "#0088FE", width: "20px", height: "20px", border: "5px solid #0088FE" }}>

				</div><span><label className="marginR10">Done</label></span>
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
		}
	}

	componentWillMount() {
	
				this.state.doneArrayList = this.props.sprinttList.issues.filter(function (issue) {

					if (issue.fields.status.name === "Done") {
						return issue;
					}
				})
				this.state.inprogressArrayList = this.props.sprinttList.issues.filter(function (issue) {

					if (issue.fields.status.name === "In Progress") {
						return issue;
					}
				})
				this.state.todoArrayList = this.props.sprinttList.issues.filter(function (issue) {

					if (issue.fields.status.name === "To Do") {
						return issue;
					}
				})

				this.state.inqaArrayList = this.props.sprinttList.issues.filter(function (issue) {

					if (issue.fields.status.name === "In QA") {
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

			if (issue.fields.status.name === "Done") {
				return issue;
			}
		})
		this.state.inprogressArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.name === "In Progress") {
				return issue;
			}
		})
		this.state.todoArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.name === "To Do") {
				return issue;
			}
		})

		this.state.inqaArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.name === "In QA") {
				return issue;
			}
		})

		this.setState({
			doneArrayListlength: this.state.doneArrayList.length, inprogressArrayListlength: this.state.inprogressArrayList.length,
			todoArrayListlength: this.state.todoArrayList.length, inqaArrayListlength: this.state.inqaArrayList.length,
		})
	}

	render() {
		const data = [{ name: 'Group C', value: this.state.todoArrayListlength }, { name: 'Group B', value: this.state.inprogressArrayListlength },
		{ name: 'Group D', value: this.state.inqaArrayListlength }, { name: 'Group A', value: this.state.doneArrayListlength }];
		const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];


		const RADIAN = Math.PI / 180;
		const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
			const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
			const x = cx + radius * Math.cos(-midAngle * RADIAN);
			const y = cy + radius * Math.sin(-midAngle * RADIAN);

			return (
				<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
					{`${(percent * 100).toFixed(0)}%`}
				</text>
			);
		};
		return (

			<PieChart width={800} height={400}>
				<Pie
					dataKey="value"
					data={data}
					cx={300}
					cy={200}
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={180}

				>
					{
						data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)

					}
				</Pie>

			</PieChart>


		)
	}
}

class SelectedProjectDetails extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			projectDetailsListarray: [],
			selectedProject: '',
			selectedProjectVersion: '',
			userName:'',
			pwd:''
		}

		this.projectDetailsListarray = this.projectDetailsListarray.bind(this);
		this.selectProject = this.selectProject.bind(this);
	}

	componentWillMount() {

		this.setState({ projectDetailsListarray: this.props.selectedProjectDetails,userName:this.props.selectedUserName,pwd:this.props.selectedUserPwd })

	}

	componentWillReceiveProps(nextProps) {
		
		this.setState({ projectDetailsListarray: nextProps.selectedProjectDetails,userName:nextProps.selectedUserName,pwd:nextProps.selectedUserPwd  })

	}
	selectProject(event, ind, value) {
		this.setState({ selectedProject: value })
	
		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": "https://fullyincontrol.atlassian.net/rest/api/2/project/" + this.state.projectDetailsListarray[ind].id + "/versions", "username": this.state.userName, "password":this.state.pwd 
		})
			.then(response => {
				

				this.setState({
					selectedProjectVersion: <SelectedProjectVersion selectedProjectVersion={response.data} selectedUserName={this.state.userName} 
					selectedUserPwd={this.state.pwd} />,
				})



			})

	}


	projectDetailsListarray(projects) {
		return projects.map((project) => (
			<MenuItem
				key={project.id}
				insetChildren={true}
				value={project.name}
				primaryText={project.name}
			/>
		));
	}

	render() {

		return (

			<div>
				<div>
					<SelectField hintText="Select Project" value={this.state.selectedProject} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
						hintStyle={{ opacity: "1" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProject(e, i, v)}>
						{this.projectDetailsListarray(this.state.projectDetailsListarray)}
					</SelectField>
				</div>
				<div>
					{this.state.selectedProjectVersion}
				</div>
			</div>


		)
	}
}

class SelectedProjectVersion extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			projectVersionDetailsListarray: [],
			selectedProjectVersionDetails: '',
			userName:'',
			pwd:''
		}
		this.selectProjectVersionDetails = this.selectProjectVersionDetails.bind(this)
		this.projectVersionDetailsListarray = this.projectVersionDetailsListarray.bind(this)

	}

	componentWillMount() {

		this.setState({ projectVersionDetailsListarray: this.props.selectedProjectVersion,userName:this.props.selectedUserName,pwd:this.props.selectedUserPwd  })

	}

	componentWillReceiveProps(nextProps) {

		this.setState({ projectVersionDetailsListarray: nextProps.selectedProjectVersion,userName:nextProps.selectedUserName,pwd:nextProps.selectedUserPwd  })

	}

	selectProjectVersionDetails(event, ind, value) {
		this.setState({ selectedProjectVersionDetails: value })


	}

	projectVersionDetailsListarray(versions) {
		return versions.map((version) => (
			<MenuItem
				key={version.id}
				insetChildren={true}
				value={version.name}
				primaryText={version.name}
			/>
		));
	}


	render() {

		return (

			<div>
				<SelectField hintText="Release" value={this.state.selectedProjectVersionDetails} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
					hintStyle={{ opacity: "1" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProjectVersionDetails(e, i, v)}>
					{this.projectVersionDetailsListarray(this.state.projectVersionDetailsListarray)}
				</SelectField>




			</div>




		)
	}
}
class SelectedProjectBoardDetails extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			selectedProjectBoard:'',
			projectBoardDetailsListarray:[],
			userName:'',
			pwd:'',
			selectedBoardSprintsArray:[]
		
		}


	}

	componentWillMount() {

		this.setState({ projectBoardDetailsListarray: this.props.selectedProjectBoardDetails,userName:this.props.selectedUserName,pwd:this.props.selectedUserPwd  })

	}

	componentWillReceiveProps(nextProps) {

		this.setState({ projectBoardDetailsListarray: nextProps.selectedProjectBoardDetails,userName:nextProps.selectedUserName,pwd:nextProps.selectedUserPwd  })

	}

	selectedProjectBoard(event, index, value) {
		
		this.setState({ selectedProjectBoard: value })
		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": "https://fullyincontrol.atlassian.net/rest/agile/1.0/board/"+this.state.projectBoardDetailsListarray[index].id+"/sprint",
			 "userName": this.state.userName, "password": this.state.pwd
		})
			.then(response => {
				
				//	console.log(response)
					this.props.onSelectBoard(response.data.values,this.state.projectBoardDetailsListarray[index].id);
				this.setState({
					selectedBoardSprintsArray:response.data.values
					// selectedProjectBoardDetails: <SelectedProjectBoardDetails selectedProjectBoardDetails={response.data.values} selectedUserName={this.state.projectDetails.projects[ind].tools[1].userName} 
					// selectedUserPwd={this.state.projectDetails.projects[ind].tools[1].password} />
				 })


			})



	}

	// onSelectBoard(){

	// 	return this.state.selectedBoardSprintsArray
	// }

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
				<SelectField hintText="Boards" value={this.state.selectedProjectBoard} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
					hintStyle={{ opacity: "1" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectBoard(e, i, v)}>
					{this.projectBoardDetailsListarray(this.state.projectBoardDetailsListarray)}
				</SelectField>




			</div>




		)
	}
}
export default Account;