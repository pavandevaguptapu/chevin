import React from 'react';

import './App.css';
import { Navbar, NavbarBrand, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import 'bootstrap/css/bootstrap.min.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {myConstClass} from './constants.js';
// import Popover from 'react-popover-wrapper';
// Modal.prototype.componentWillMount = function componentWillMount() {
// 	this.focus = function focus() { };
// }
// const popoverLeft = (
// 	<Popover id="popover-positioned-left" title="Popover left">
// 		<strong>Holy guacamole!</strong> Check this info.
// 	</Popover>
// );

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
	
	top:"-2px",
	marginLeft:"-12px"
}
const innerDiv = {
		padding: "0px"
}

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			isModalOpen: false,
			projectName: '',
			teamName: '',
			items: [],
			issuesArray: [],
			subtitle: '',
			isDeleteModal: false,
			selectedAccountId: '',
			selectedDashboardItem: false,
			currentSelectedDashboardItem: 'customerTeams',
			value: 2,
		}
		this.openModal = this.openModal.bind(this);
		// this.addAccountModal = this.addAccountModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selectedProjectDetails = this.selectedProjectDetails.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.deleteAccountModal = this.deleteAccountModal.bind(this);
		this.openSideMenu = this.openSideMenu.bind(this);
		this.closeSideMenu = this.closeSideMenu.bind(this);
		this.selectedDashboardItem = this.selectedDashboardItem.bind(this);
	}


	selectedDashBoard(event, index, value) {
		this.setState({ value: value });
		if (value == 1) {
			//this.props.history.push('/manageCustomerTeams');
			this.props.history.push({ pathname: '/manageCustomerTeams', state: { selectedDashboard: this.state.value } })
		}

	}

	openSideMenu() {
		document.getElementById("mySidenav").style.width = "250px";
	}

	closeSideMenu() {
		document.getElementById("mySidenav").style.width = "0px";

	}
	selectedDashboardItem(item) {
		console.log(this.state.currentSelectedDashboardItem)
		if (this.state.currentSelectedDashboardItem !== undefined) {
			console.log(this.state.currentSelectedDashboardItem)
			document.getElementById(this.state.currentSelectedDashboardItem).classList.remove("selectedDashboardItem");
		}
		this.state.currentSelectedDashboardItem = item.target.parentNode.id
		document.getElementById(item.target.parentNode.id).classList.add("selectedDashboardItem");
	}
	openModal() {
		this.setState({ isModalOpen: true })
	}
	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });

	}
	// addAccountModal(accountName) {
	// 	console.log(accountName)
	// 	axios.post(`http://192.168.29.93:3030/accounts`,
	// 		{
	// 			"name": accountName,
	// 			"status": "progress",
	// 			"projects": [],
	// 			"people": []
	// 		})
	// 		.then(response => {
	// 			console.log(response.data._id)
	// 			console.log(response.data.name)
	// 			const newItem = {
	// 				name: response.data.name,
	// 				_id: response.data._id,
	// 				// teamName: this.state.teamName
	// 			};

	// 			this.state.items = this.state.items.concat(newItem)
	// 			this.setState({
	// 				isModalOpen: false,
	// 				projectName: ' ',
	// 				teamName: ' '
	// 			});
	// 			//  window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
	// 		})

	// }

	selectedProjectDetails(event, selectedAccount) {

		if (event.target.id !== 'trashIconID') {
			this.props.history.push({ pathname: '/account', state: { account: selectedAccount } })
		}

		else {

			this.setState({ isDeleteModal: true, selectedAccountId: selectedAccount._id })

		}

	}

	deleteAccountModal(item, deleteModal) {
		axios.delete(myConstClass.nodeAppUrl+'/accounts/' + item)
			.then(response => {
				if (response.statusText == 'OK') {
					axios.get(myConstClass.nodeAppUrl+'/accounts')
						.then(response => {
							this.setState({ items: response.data })
						})
				}
				this.setState({ isDeleteModal: false })
			})

	}
	cancelModal() {
		this.setState({ isModalOpen: false, projectName: ' ', teamName: ' ', isDeleteModal: false })
	}

	componentWillMount() {
		Modal.setAppElement('body');
		axios.get(myConstClass.nodeAppUrl+'/accounts')
			.then(response => {
				console.log(response)
				this.setState({ items: this.state.items.concat(response.data) })

			})

	}



	componentDidMount() {
		document.getElementById('customerTeams').classList.add("selectedDashboardItem");

	}



	render() {


		return (

			<div className="container-fluid padding0">
				<nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
					<div className="col-md-12 flex">
						<div className="col-md-2 col-lg-2 marginT16">
							<h4 className="margin0 pointer paddingL04" onClick={() => this.openSideMenu()} ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
						</div>
						<div className="col-md-8 col-lg-8 textAlignCenter marginT16">
							<h4 className="margin0">Customer Teams & Projects</h4>
						</div>
						<div className="col-md-2 col-lg-2  displayInline padding0">
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

				<div id="mySidenav" className="sidenav">
					<div href="javascript:void(0)" className="closebtn pointer" onClick={() => this.closeSideMenu()}>&times;</div>

					<div id="customerTeams" className="navbarFontColor pointer  dashboardMenuHeight marginT22 paddingT1"
						onClick={(e) => this.selectedDashboardItem(e)}>
						<h5><i className="glyphicon glyphicon-group "></i>Customer Teams & Projects</h5>
					</div>

					<div id="humanResource" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
						onClick={(e) => this.selectedDashboardItem(e)}>
						<h5><i className="glyphicon glyphicon-user "></i>Human Resources</h5>

					</div>
					<div id="knowledgeRep0" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
						onClick={(e) => this.selectedDashboardItem(e)}>
						<h5><i className="glyphicon glyphicon-book-open"></i>Knowledge Repo</h5>


					</div>

					<div id="settings" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
						onClick={(e) => this.selectedDashboardItem(e)}>
						<h5><i className="glyphicon glyphicon-cogwheel "></i>Settings</h5>

					</div>
					<div id="logOut" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
						onClick={(e) => this.selectedDashboardItem(e)}>
						<h5><i className="glyphicon glyphicon-log-off "></i>Log Out</h5>

					</div>

				</div>
				{/* <Modal show={this.state.isModalOpen} */}
				<Modal isOpen={this.state.isModalOpen} style={customStyles}

					className={["col-sm-8 col-md-7 col-lg-3  modalMargins overlay "].join(' ')}>

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
								<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.addAccountModal(this.state.projectName)} >Submit</Button>
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>

				<Modal isOpen={this.state.isDeleteModal} style={customStyles}

					className={["col-sm-8 col-md-7 col-lg-3  modalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h4>Are you sure to delete the account permanently</h4>
						</div>


						<div className="loginBtns">

							<div>
								<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.deleteAccountModal(this.state.selectedAccountId, this.state.isDeleteModal)} >Submit</Button>
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>




				<div className="row marginT50">
					<div className="col-md-12 col-lg-12">
						{this.state.items.map(item => (

							<div id="accountTitle" className="col-md-3 col-lg-2 DashboardAccountList pointer" key={item._id} onClick={(event) => this.selectedProjectDetails(event, item)}>

								 {/* <span id="trashIconID" className="glyphicon glyphicon-trash floatRight marginT10"></span>  */}

								<div id="projectTitle">{item.customerName}</div>

							</div>

						))}




					</div>


					{/* <BarChart  width={400} height={400} data={barData}>
				<Bar dataKey='uv' fill='#8884d8'/>
			</BarChart > */}
				</div>


			</div>

		)

	}

}





export default Dashboard