import React from 'react';

import './App.css';
import axios from 'axios';
import { Navbar, NavbarBrand, Button } from 'react-bootstrap';
import { Modal } from 'react-overlays';
import { BarChart, Bar } from 'recharts';

Modal.prototype.componentWillMount = function componentWillMount() {
	this.focus = function focus() { };
}

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			projectName: '',
			teamName: '',
			items: [],
			issuesArray:[]
			//  barData : [
			// 	{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}
			// ],
			 
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selectedProjectDetails = this.selectedProjectDetails.bind(this);

	}
	openModal() {
		this.setState({ isModalOpen: true })
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });

	}
	closeModal() {

		const newItem = {
			projectName: this.state.projectName,
			id: Date.now(),
			teamName: this.state.teamName
		};

		this.state.items = this.state.items.concat(newItem)
		this.setState({
			isModalOpen: false,
			projectName: ' ',
			teamName: ' '
		});
		window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
	}

	selectedProjectDetails(projectname, teamname) {
		this.props.history.push({ pathname: '/account', state: { projectName: projectname, teamName: teamname } })
	}

	cancelModal() {
		this.setState({ isModalOpen: false, projectName: ' ', teamName: ' ' })
	}

	componentWillMount() {

		window.sessionStorage.getItem("DashboardData")

		var x = JSON.parse(window.sessionStorage.getItem("DashboardData"))
		if (x != undefined) {
			this.setState((prev) => ({
				items: prev.items.concat(x)
			}))
		}

	
		


	}

	render() {
		
	
		return (
			
			<div className="dashboardNavbarHeader">
				<Navbar className="dashboardHeaderBgColor">
					<NavbarBrand className="col-sm-5 col-md-12">Dashboard</NavbarBrand >
				</Navbar>
			

				<Modal show={this.state.isModalOpen}
					className={["col-sm-offset-2 col-md-offset-4 col-lg-offset-5 modalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h1>Account Details</h1>
						</div>
						<div className="loginUserName">
							<label>ProjectName:<input value={this.state.projectName} name='projectName' onChange={this.handleChange} /></label>
						</div>
						<div className="loginPwd">
							<label >TeamName:<input value={this.state.teamName} name='teamName' onChange={this.handleChange} /></label>
						</div>
						<div className="loginBtns">

							<div>
								<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.closeModal()} >Submit</Button>
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>
 


						</div>

					</div>

				</Modal>

				<div>
					<Button bsStyle="primary" bsSize="small" onClick={() => this.openModal()}>Add Account</Button>
				</div>

		
				<div>

					{this.state.items.map(item => (
						<div className="textAlignLeft col-md-2 DashboardAccountList pointer" key={item.id} onClick={() => this.selectedProjectDetails(item.projectName, item.teamName)}>
							<div id="projectTitle">{item.projectName}</div>
							</div>
					))}


				</div>
				
				<div>
				{/* <BarChart  width={400} height={400} data={barData}>
				<Bar dataKey='uv' fill='#8884d8'/>
			</BarChart > */}
</div>
			

			</div>

		)

	}

}





export default Dashboard