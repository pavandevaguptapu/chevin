import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Button } from 'react-bootstrap';
import axios from 'axios';

import { PieChart, Pie, Sector, Cell, RadarChart, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Draggable, Droppable } from 'react-drag-and-drop'
import { Modal } from 'react-overlays';
Modal.prototype.componentWillMount = function componentWillMount() {
	this.focus = function focus() { };
}




class Account extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			isModalOpen: false,
			projectName: '',
			teamName: '',
			projectDetails: '',
			selectedTab: true,
			selectedTab1: false,
			selectedTab2: false,
			selectedTab3: false,
			selectedTab4: false,
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
			datesArrayList: []

			//  visibility:''


		}

		this.SelectedTab = this.SelectedTab.bind(this);
		this.getEachIssue = this.getEachIssue.bind(this);
		this.onDrop = this.onDrop.bind(this);
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
		this.setState({ isModalOpen: false });
	}

	onDrop(data) {
		this.setState({ isModalOpen: true })
	}
	SelectedTab(e) {


		if (e == "Knowledge Management") {


			this.setState({
				selectedTab1: false, selectedTab2: false, selectedTab3: false, selectedTab4: false,
				sourcelist: '', source: '', issueTracking: '', listofepics: '',
				selectedIssue: '', development: '', source: '', developmentlist: [], issuesList: [], checkbox: '', workHours: '', issuesPieChart: ''
			})

		}
		if (e == "Source") {
			this.setState({ selectedTab: false, selectedTab1: false, selectedTab: false, selectedTab2: false, selectedTab4: true })
			axios.get(`/JIRAREST/bitbucket/rest/get/repos`)
				.then(response => {
					this.setState({ sourcelist: response.data })
					this.setState({ source: <Source sourcelist={this.state.sourcelist} />, issueTracking: '', development: '', issuesList: [], checkbox: '', workHours: '', issuesPieChart: '' });
				})
		}
		if (e == "IssueTracking") {
			this.setState({ selectedTab1: true, selectedTab: false, selectedTab2: false, selectedTab3: false, selectedTab4: false })
			axios.get(`/JIRAREST/jira/rest/get/epics`)
				.then(response => {
					this.setState({ listofepics: response.data.values })
					this.setState({
						issueTracking: <Issueslist listofepics={this.state.listofepics} selectedIssue={this.getEachIssue} />,
						development: '', source: '', checkbox: '', workHours: '', issuesPieChart: ''
					});
				})

		}
		if (e == "Development") {
			this.setState({ selectedTab2: true, selectedTab1: false, selectedTab: false, selectedTab3: false, selectedTab4: false })
			axios.get(`/JIRAREST/jira/rest/get/sprints`)
				.then(response => {
					console.log(response)
					this.setState({ developmentlist: response.data.values })
					this.setState({
						development: <Development developmentlist={this.state.developmentlist} />, issueTracking: '', source: '',
						issuesList: [], issuesPieChart: <Piechart />, checkbox: <Chekboxes />, workHours: <Hourschart />
					});
				})


		}
		if (e == "Quality") {
			this.setState({
				selectedTab3: true, selectedTab1: false, selectedTab: false, selectedTab2: false,
				selectedTab4: false, checkbox: '', workHours: '', issuesPieChart: ''
			})





		}

	}


	componentWillMount() {
		if (window.sessionStorage.getItem("Account") != "undefined" && window.sessionStorage.getItem("Account") != null) {
			this.state.projectDetails = JSON.parse(window.sessionStorage.getItem("Account"))
			this.state.projectName = this.state.projectDetails.projectName
			this.state.teamName = this.state.projectDetails.teamName
		}
	}

	render() {
		if (window.sessionStorage.getItem("Account") == "undefined" || window.sessionStorage.getItem("Account") == null) {
			window.sessionStorage.setItem("Account", JSON.stringify(this.props.location.state));
			this.state.projectDetails = JSON.parse(window.sessionStorage.getItem("Account"))
			this.state.projectName = this.state.projectDetails.projectName
			this.state.teamName = this.state.projectDetails.teamName
		}



		return (

			<div className="dashboardNavbarHeader">
				<Navbar className="dashboardHeaderBgColor" style={{ marginBottom: "0px" }}>
					<NavbarBrand className="col-sm-5 col-md-12">Account</NavbarBrand>
				</Navbar>
				<div className="row">
					<div className="col-md-2" style={{ borderRight: "1px solid #76aad8", marginRight: "0px", padding: "0px", height: "94vh" }}>
						<h3 className="accountProjectProfileheading">Project Profile</h3>
						<div className="accountProjectProfileInfo">
							<h4 className="marginT3">Project Name </h4><span className="names">:{this.state.projectName}</span>
						</div>
						<div className="accountProjectProfileInfo">
							<h4 className="marginT3">Team Name </h4><span className="names">:{this.state.teamName}</span>
						</div>
					</div>

					<div className={[this.state.selectedTab == true ? "selectedItem" : '', "col-md-2 accountTabs"].join(' ')} onClick={() => this.SelectedTab("Knowledge Management")}>
						<h5> Knowledge Management </h5>
					</div>
					<div className={[this.state.selectedTab4 == true ? "selectedItem" : '', "col-md-1 accountTabs"].join(' ')} onClick={() => this.SelectedTab("Source")}>
						<h5> Source</h5>
					</div>
					<div className={[this.state.selectedTab1 == true ? "selectedItem" : '', "col-md-2 accountTabs"].join(' ')} onClick={() => this.SelectedTab("IssueTracking")}>
						<h5> Issue Tracking</h5>
					</div>
					<div className={[this.state.selectedTab2 == true ? "selectedItem" : '', "col-md-2 accountTabs"].join(' ')} onClick={() => this.SelectedTab("Development")}>
						<h5> Development</h5>
					</div>
					<div className={[this.state.selectedTab3 == true ? "selectedItem" : '', "col-md-1 accountTabs"].join(' ')} onClick={() => this.SelectedTab("Quality")}>
						<h5> Quality</h5>
					</div>
					<div className="col-md-2 accountTabs" style={{ borderLeft: "1px solid #76aad8", padding: "0px", height: "94vh" }}>

						<ul>
							<Draggable type="metal" data="github"><li>Github</li></Draggable>
							<Draggable type="metal" data="attlasian"><li>Attlasian</li></Draggable>
							<Draggable type="metal" data="sonarQube"><li>SonarQube</li></Draggable>
							<Draggable type="metal" data="jenkins"><li>Jenkins</li></Draggable>
							<Draggable type="metal" data="tfs"><li>TFS</li></Draggable>
							<Draggable type="metal" data="sharePoint"><li>SharePoint</li></Draggable>
						</ul>
					</div>
					<Droppable
						types={['metal']}
						onDrop={this.onDrop.bind(this)}>
						<div className="col-lg-2" style={{ marginTop: "-810px", marginLeft: "317px" }} >

							{this.state.issueTracking}
							{this.state.development}
							{this.state.source}
							{this.state.accountModal}
						</div>
						<div className="col-lg-7 marginT35"
							style={{ marginTop: "-800px", marginLeft: "617px" }} >
							<div>

								{this.state.issuesList.map(item => (

									<li style={{ textAlign: "left" }} key={item.key} >{item.key}{item.fields.description}{item.fields.status.name}</li>
								))}



							</div>
							<div>
								{this.state.issuesPieChart}
								{this.state.checkbox}
								{this.state.burndownChart}
							</div>

							<div>
								{this.state.workHours}
							</div>
						</div>
					</Droppable>
				</div>
				<Modal show={this.state.isModalOpen}
					className={["col-sm-offset-2 col-md-offset-4 col-lg-offset-5 accountmodalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h1>Account Details</h1>
						</div>
						<div className="loginUserName">
							<label>UserName:<input value='' name='userName' /></label>
						</div>
						<div className="loginPwd">
							<label >Password:<input value='' name='pswd' /></label>
						</div>
						<div className="loginBtns">

							<div>
								{/* <Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.closeModal()} >Submit</Button> */}
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
			<div className="displayInline  col-lg-offset-1 col-lg-4 col-md-4">
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
			timeSpentArray: [],
			SpentArray: [],
			currentDate: '',
			currentSpentTime: 0,
			sprintDuration: [],
			x: [],
			workHours: [],
			hours: '',
			eachKey: '',
			doNotMatch: [],
			w: []


		}
	}
	componentWillMount() {
		axios.post(`/JIRAREST/jira/rest/get/generic`, {
			"resourceURL": "https://fullyincontrol.atlassian.net/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=1&sprintId=38&_=1508830449128", "userName": "jeyaganesh.n@comakeit.com", "password": "Abc@12345"

		}).then(response => {
			this.setState({ sprintStartTime: response.data.startTime, sprintEndTime: response.data.endTime, sprintCompleteTime: response.data.CompleteTime })

			var getDates = function (startDate, endDate) {
				var dates = [],
					currentDate = startDate,
					addDays = function (days) {
						var date = new Date(this.valueOf());
						date.setDate(date.getDate() + days);
						return date;
					};
				while (currentDate <= endDate) {
					dates.push(currentDate);
					currentDate = addDays.call(currentDate, 1);
				}
				return dates;
			};

			// Usage
			var dates = getDates(new Date(this.state.sprintStartTime), new Date(this.state.sprintEndTime));
			dates.forEach(function (date) {
				var d = new Date(date),
					month = '' + (d.getMonth() + 1),
					day = '' + d.getDate(),
					year = d.getFullYear();
				var dateString = (month + "/" + day + "/" + year)
				// this.state.sprintDuration=
				this.setState({
					sprintDuration: this.state.sprintDuration.concat({ name: dateString })

				})

			}.bind(this));



			Object.keys(response.data.changes).forEach(function (key) {
				var eachDate = Number(key)
				if (eachDate > response.data.startTime) {

					var changeObjArray = response.data.changes[eachDate]

					changeObjArray.forEach(function (item) {

						if (item.timeC) {

							if (item.timeC.timeSpent) {
								var d = new Date(eachDate),
									month = '' + (d.getMonth() + 1),
									day = '' + d.getDate(),
									year = d.getFullYear();
								var dateString = (month + "/" + day + "/" + year)
								this.setState({ timeSpent: item.timeC.timeSpent + this.state.currentSpentTime })
								if (this.state.currentDate !== dateString) {
									var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
									// var firstDate = new Date(2008,01,12);
									// var secondDate = new Date(2008,01,22);
									var diffDays =2// Math.round(Math.abs((eachDate.getTime() - this.state.currentDate.getTime())/(oneDay)));
									if(diffDays>1){
									
									 for (var i = 0; i <= diffDays; i++) {
									  var missedDate =this.state.currentDate;
									  missedDate.setHours(d.getHours()+(i*24))
									 var month1 = '' + (missedDate.getMonth() + 1)
									 var day1 = '' + missedDate.getDate()
									 var year1 = missedDate.getFullYear()
									 var dateString1 = (month1 + "/" + day1 + "/" + year1)
									  this.state.SpentArray = this.state.SpentArray.concat({ name: dateString1, hr: (this.state.timeSpent / 3600) })
									  this.state.currentDate=missedDate
									 }
									}
									this.state.SpentArray = this.state.SpentArray.concat({ name: dateString, hr: (this.state.timeSpent / 3600) })
									this.setState({ timeSpentArray: this.state.SpentArray })
								}
								this.setState({ currentDate: dateString, currentSpentTime: this.state.timeSpent })
							}

						}
					}.bind(this))
				}
			}.bind(this))

			this.state.sprintDuration.forEach(function (key) {
				this.state.timeSpentArray.forEach(function (item) {
					if (key.name === item.name) {
						this.setState({ hours: item.hr })
						this.state.x = this.state.x.concat({ name: item.name, hr: this.state.hours })
						this.setState({ workHours: this.state.x })
					}

				}.bind(this))

			}.bind(this))

			console.log(this.state.sprintDuration)
			console.log(this.state.workHours)

			for (var i = 0; i < this.state.sprintDuration.length; i++) {
				if (this.state.workHours[i].name.indexOf(this.state.sprintDuration[i]) == -1) {

				}




				this.state.w = this.state.workHours.concat(this.state.doNotMatch)
				this.state.w.sort(function (a, b) {

					return parseFloat(a.name) - parseFloat(b.name);
				});

				this.setState({ totalHours: this.state.w })



			}




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
				<LineChart width={600} height={300} data={this.state.totalHours}
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

					if (issue.fields.status.name == "Done") {
						return issue;
					}
				})
				this.state.inprogressArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name == "In Progress") {
						return issue;
					}
				})
				this.state.todoArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name == "To Do") {
						return issue;
					}
				})

				this.state.inqaArrayList = response.data.issues.filter(function (issue) {

					if (issue.fields.status.name == "In QA") {
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