import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { PieChart, Pie, Cell,LineChart, Line, XAxis, YAxis, CartesianGrid,Legend } from 'recharts';
import { Draggable, Droppable } from 'react-drag-and-drop'
import Modal from 'react-modal';

// import { Modal } from 'react-overlays';
Modal.prototype.componentWillMount = function componentWillMount() {
	this.focus = function focus() { };
}

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	}
  };


class Account extends React.Component {
	constructor(props) {
		super(props)
console.log(props)

		this.state = {
			isModalOpen: false,
			projectName:'',
			teamName: '',
			projectDetails: '',
			selectedTab1: true,
			selectedTab2: false,
			selectedTab3: false,
			selectedTab4: false,
			selectedTab5: false,
			listofepics: [],
			selecteditem: '',
			issueTracking: '',
			developmentlist: [],
			development: '',
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
			isAddProjectModal:false,
			 projectTitle:''
			//  visibility:''


		}

		this.SelectedTab = this.SelectedTab.bind(this);
		this.getEachIssue = this.getEachIssue.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.addProjectModal = this.addProjectModal.bind(this);
		this.addProject = this.addProject.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {

	}
	addProjectModal(){
		this.setState({isAddProjectModal:true})
	}
	addProject(account,projectTitle){
		console.log(account)
		console.log(projectTitle)
		axios.put('http://192.168.29.62:3030/accounts/'+account._id,
		{
			"projects" : [{"name":projectTitle, "tools":[]}],
		})
		.then(response=>{
			console.log(response)
		})
		this.setState({isAddProjectModal:false})
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
	SelectedTab(e) {


		if (e === "Knowledge Management") {


			this.setState({
				selectedTab1: true,selectedTab2: false, selectedTab3: false, selectedTab4: false, selectedTab5: false,
				sourcelist: '', source: '', issueTracking: '', listofepics: '',
				selectedIssue: '', development: '',developmentlist: [], issuesList: [], checkbox: '', workHours: '', issuesPieChart: ''
			})

		}
		if (e === "Source") {
			this.setState({ selectedTab1: false,selectedTab2: true, selectedTab3: false, selectedTab4: false, selectedTab5: false})
			axios.get(`/JIRAREST/bitbucket/rest/get/repos`)
				.then(response => {
					this.setState({ sourcelist: response.data })
					this.setState({ source: <Source sourcelist={this.state.sourcelist} />, issueTracking: '', development: '', issuesList: [], checkbox: '', workHours: '', issuesPieChart: '' });
				})
		}
		if (e === "IssueTracking") {
			this.setState({selectedTab1: false,selectedTab2: false, selectedTab3: true, selectedTab4: false, selectedTab5: false})
			axios.get(`/JIRAREST/jira/rest/get/epics`)
				.then(response => {
					this.setState({ listofepics: response.data.values })
					this.setState({
						issueTracking: <Issueslist listofepics={this.state.listofepics} selectedIssue={this.getEachIssue} />,
						development: '', source: '', checkbox: '', workHours: '', issuesPieChart: ''
					});
				})

		}
		if (e === "Development") {
			this.setState({ selectedTab1: false,selectedTab2: false, selectedTab3: false, selectedTab4: true, selectedTab5: false})
			axios.get(`/JIRAREST/jira/rest/get/sprints`)
				.then(response => {
					this.setState({ developmentlist: response.data.values })
					this.setState({
						development: <Development developmentlist={this.state.developmentlist} />, issueTracking: '', source: '',
						issuesList: [], issuesPieChart: <Piechart />, checkbox: <Chekboxes />, workHours: <Hourschart />
					});
				})


		}
		if (e === "Quality") {
			this.setState({
				selectedTab1: false,selectedTab2: false, selectedTab3: false, selectedTab4: false, selectedTab5: true,
				 checkbox: '', workHours: '', issuesPieChart: ''
			})

		}

	}

	componentWillMount() {


		 if (window.sessionStorage.getItem("Account") !== "undefined" && window.sessionStorage.getItem("Account") !== null) {
		 
		if(this.props.location.state !== undefined){
			
			window.sessionStorage.setItem("Account", JSON.stringify(this.props.location.state));
			this.setState({projectDetails:JSON.parse(window.sessionStorage.getItem("Account"))})
		}
		else{
	
		window.sessionStorage.getItem("Account")
		this.setState({projectDetails:JSON.parse(window.sessionStorage.getItem("Account"))})
	}
	
		 }

		if (window.sessionStorage.getItem("Account") === "undefined" || window.sessionStorage.getItem("Account") === null) {
		
			window.sessionStorage.setItem("Account", JSON.stringify(this.props.location.state));
		
			this.setState({projectDetails:JSON.parse(window.sessionStorage.getItem("Account"))})
		
		}
	}
	
	render() {
		
			return (
				<div className="container-fluid padding0">

			{/* <div className="dashboardNavbarHeader"> */}
				<div className="row minheight">
				<Navbar className="dashboardHeaderBgColor dashboardNavbarHeader" style={{ marginBottom: "0px" }}>
					{/* <NavbarBrand className="col-sm-5 col-md-12">{this.state.projectDetails.account.name}</NavbarBrand> */}
					<h2 className="accountNameBgcolor marginT5 marginB0">{this.state.projectDetails.account.name}</h2>
				</Navbar>
				</div>
				<div className="row">
					<div className="col-sm-3 col-md-2 " style={{ borderRight: "1px solid #76aad8", marginRight: "0px", padding: "0px", height: "100vh" }}>
						<h5 className="accountProjectProfileheading textAlignCenter">Project Profile
						{/* <div className="accountProjectProfileInfo">
							<h4 className="marginT3">Project Name </h4><span className="names">:{this.state.projectDetails.accountName}</span>
						</div>
						<div className="accountProjectProfileInfo">
							<h4 className="marginT3">Team Name </h4><span className="names">:{this.state.projectDetails.teamName}</span>
						</div> */}
						<Button	  
						style={{backgroundColor:"white",borderRadius:"15px",fontSize:"xx-small",borderColor: "#76aad8",marginBottom:"4px",float:"right"}} 
						bsSize="small" onClick={() => this.addProjectModal()} title="Add project">

						<span className="glyphicon glyphicon-plus"></span>
					
					</Button>
					</h5>
					</div>

					<div className={[this.state.selectedTab1 === true ? "selectedItem" : '', "col-sm-3 col-md-2  accountTabs pointer textAlignCenter"].join(' ')} onClick={() => this.SelectedTab("Knowledge Management")}>
						<h5> Knowledge Management </h5>
					</div>
					<div className={[this.state.selectedTab2 === true ? "selectedItem" : '', " col-sm-1 col-md-1  accountTabs pointer textAlignCenter"].join(' ')} onClick={() => this.SelectedTab("Source")}>
						<h5>Source</h5>
					</div>
					<div className={[this.state.selectedTab3 === true ? "selectedItem" : '', "col-sm-1 col-md-2  accountTabs pointer textAlignCenter"].join(' ')} onClick={() => this.SelectedTab("IssueTracking")}>
						<h5>IssueTracking</h5>
					</div>
					<div className={[this.state.selectedTab4 === true ? "selectedItem" : '', "col-sm-1 col-md-2  accountTabs pointer textAlignCenter"].join(' ')} onClick={() => this.SelectedTab("Development")}>
						<h5>Development</h5>
					</div>
					<div className={[this.state.selectedTab5 === true ? "selectedItem" : '', "col-sm-1 col-md-2  accountTabs pointer textAlignCenter"].join(' ')} onClick={() => this.SelectedTab("Quality")}>
						<h5>Quality</h5>
					</div>
				 <Droppable types={['metal']} onDrop={this.onDrop.bind(this)} className="col-md-9" style={{minHeight:"100vh"}} >
						
						<div className="col-md-3">

							{this.state.issueTracking}
							{this.state.development}
							{this.state.source}
							{this.state.accountModal}
						</div>
						<div className="col-md-9">
							
							<div>

								{this.state.issuesList.map(item => (

									<li style={{ textAlign: "left" }} key={item.key} >{item.key}{item.fields.description}{item.fields.status.name}</li>
								))}

								

							</div>
							<div>
								{this.state.issuesPieChart}
								{this.state.checkbox}
								
							</div>

							<div>
								{this.state.workHours}
							</div>
						</div>
						</Droppable> 
				
						<div className="col-sm-2 col-md-1 accountTabs margin35px" style={{ borderLeft: "1px solid #76aad8", padding: "0px", height: "100vh" }}>

					<div className="pointer col-md-12 marginB20">
							<Draggable className="draggablediv textAlignCenter backgroundcolor1" type="metal" data="github">Github</Draggable>
							</div>
							<div className="pointer col-md-12 marginB20">
							<Draggable className="draggablediv textAlignCenter backgroundcolor2" type="metal" data="attlasian">Attlasian</Draggable>
							</div>
							<div className="pointer col-md-12 marginB20">
							<Draggable className="draggablediv textAlignCenter backgroundcolor3" type="metal" data="sonarQube">SonarQube</Draggable>
							</div>
							<div className="pointer col-md-12 marginB20">
							<Draggable className="draggablediv textAlignCenter backgroundcolor4" type="metal" data="jenkins">Jenkins</Draggable>
							</div>
							<div className="pointer col-md-12 marginB20">
							<Draggable className="draggablediv textAlignCenter backgroundcolor5" type="metal" data="tfs">TFS</Draggable>
							</div>
							<div className="pointer col-md-12 marginB20">
							<Draggable className="draggablediv textAlignCenter backgroundcolor6" type="metal" data="sharePoint">SharePoint</Draggable>
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
							<label>Project Title:<input value={this.state.projectTitle} name='projectTitle' onChange={this.handleChange}/></label>
						</div>
						{/* <div className="loginPwd">
							<label >Password:<input value='' name='pswd' /></label>
						</div> */}
						<div className="loginBtns">

							<div>
								<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.addProject(this.state.projectDetails.account,this.state.projectTitle)} >Submit</Button> 
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>
			{/* </div> */}
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

class Development extends React.Component {
	render() {
		return (
			<div>
				<h4 className="bold textAlignLeft">Sprints</h4>
				<ul className="paddingL16">
					{this.props.developmentlist.map(item => (
						<li style={{ textAlign: "left" }} key={item.id}>{item.name}</li>
					))}
				</ul>
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

class Chekboxes extends React.Component {

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

class Hourschart extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sprintStartTime: '',
			sprintEndTime: '',
			sprintCompleteTime: '',
			eachTimeSpentArray: [],
			totalTimeSpentArray: [],
			currentDate: '',
			currentSpentTime: 0,
		}
	}
	componentWillMount() {
		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": "https://fullyincontrol.atlassian.net/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=1&sprintId=38&_=1508830449128", "userName": "jeyaganesh.n@comakeit.com", "password": "Abc@12345"

		}).then(response => {
			this.setState({ sprintStartTime: response.data.startTime, sprintEndTime: response.data.endTime, sprintCompleteTime: response.data.CompleteTime })
			var getDateString=function(epochTime){
				var date=new Date(epochTime)
				var month = '' + (date.getMonth() + 1)
				var day = '' + date.getDate()
				 var year = date.getFullYear()
				 var dateString = (month + "/" + day + "/" + year)	
				   return dateString
			}

			var currentDateObj = getDateString(response.data.startTime)
			this.setState({currentDate:currentDateObj})
			// this.state.currentDate = currentDateObj;

			var currentDateEpochTime = response.data.startTime
			var changesArray = Object.keys(response.data.changes)

			Object.keys(response.data.changes).forEach(function (key, index) {

				var eachDate = Number(key)
				if (eachDate > response.data.startTime) {
					var changeObjArray = response.data.changes[eachDate]
					changeObjArray.forEach(function (item) {
						if (item.timeC) {

							if (item.timeC.timeSpent) {
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

											var missedDateString =getDateString(missedDate)
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

		})
	}

	render() {

		// const workHours = [
		// 	{ name: '0', hr: 32 },
		// 	{ name: '1', hr: 24 },
		// 	{ name: '2', hr: 16 },
		// 	{ name: '3', hr: 8 },
		// 	{ name: '4', hr: 0 }

		// ]
		return (
			<div>
				<LineChart width={600} height={300} data={this.state.totalTimeSpentArray}
				>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="1 1" />
					<Legend />
					<Line type="stepAfter" dataKey="hr" stroke="#82ca9d" />
					<Line type="monotone" dataKey="y" stroke="#82ca9d" />
				</LineChart>
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
		axios.get(`/JIRAREST/jira/rest/get/activeSprintIssues`)
			.then(response => {

				this.state.doneArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name === "Done") {
						return issue;
					}
				})
				this.state.inprogressArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name === "In Progress") {
						return issue;
					}
				})
				this.state.todoArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name === "To Do") {
						return issue;
					}
				})

				this.state.inqaArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name === "In QA") {
						return issue;
					}
				})

				this.setState({
					doneArrayListlength: this.state.doneArrayList.length, inprogressArrayListlength: this.state.inprogressArrayList.length,
					todoArrayListlength: this.state.todoArrayList.length, inqaArrayListlength: this.state.inqaArrayList.length,
				})

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


export default Account;