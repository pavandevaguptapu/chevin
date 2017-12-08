import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0px"
    }
};

const imageStyle = {
	
	top:"-2px",
	marginLeft:"-12px"
}
const innerDiv = {
		padding: "0px"
}

const buttonStyle={
    marginRight:'5px'
}
const donebuttonStyle={
    marginLeft:'10px'
}

class manageCustomerTeams extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedAccountId: '',
            selectedDashboardItem: false,
            currentSelectedDashboardItem: 'customerTeams',
            value: 1,
            newTeamMemberDetails: false,
            newCustomerDetails: {},
            showEmployeeDetails: '',
            accountsArray: []

            //  customerID:''



        }
        this.createAccount = this.createAccount.bind(this);
        this.openSideMenu = this.openSideMenu.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
        this.selectedDashboardItem = this.selectedDashboardItem.bind(this);
        this.addNewCustomer = this.addNewCustomer.bind(this);
        this.addTeamMembers = this.addTeamMembers.bind(this);
        this.handleNewCustomerChange = this.handleNewCustomerChange.bind(this);
        this.addNewCustomertoList = this.addNewCustomertoList.bind(this);
    }

    selectedDashBoard(event, index, value) {
        console.log(value)
        this.setState({ value: value });
        if (value == 2) {
            //this.props.history.push('/manageCustomerTeams');
            this.props.history.push({ pathname: '/dashboard', state: { selectedDashboard: this.state.value } })
        }

    }
    addTeamMembers() {

        if (this.state.value == 2) {
            this.setState({ newTeamMemberDetails: true, showEmployeeDetails: <Child /> })
        }
        if (this.state.value == 1) {
            this.setState({ showEmployeeDetails: '' })
        }
    }
    addNewCustomer(customerDetails) {
        console.log(customerDetails)
        this.setState({ createAccountModal: false, createAddTeamMembersModal: true })
        //this.setState({ createAddTeamMembersModal: true })
        // this.state.createAddTeamMembersModal=true
    }


    handleNewCustomerChange(e) {
        console.log(e.target.value)
        this.state.newCustomerDetails[e.target.name] = e.target.value
        //this.setState({ [e.target.name]: e.target.value });
    }
    addNewCustomertoList(newCustomerObject) {
        console.log(newCustomerObject)
        axios.post(`http://192.168.29.62:3030/accounts`,
            {
                customerName: newCustomerObject.customerName,
                startDate: '',
                endDate: '',
                engagementModel: newCustomerObject.engagementModel,
                pricingModel: newCustomerObject.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: [],
                people: [],
                customerLogo: newCustomerObject.customerLogo,
                status: 'Active'
            })
            .then(response => {
                console.log(response)



                this.state.accountsArray = this.state.accountsArray.concat(response.data)
                this.setState({
                    createAccountModal: false

                });
                //  window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
            })

    }


    createAccount() {
        this.setState({ createAccountModal: true })
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
        Modal.setAppElement('body');
        axios.get('http://192.168.29.62:3030/accounts')
            .then(response => {
                console.log(response)
                this.setState({ accountsArray: this.state.accountsArray.concat(response.data) })

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
                        <div className="col-md-1 col-lg-1 marginT09">
                            {/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
                            <h4 className="margin0 pointer paddingL04" onClick={() => this.openSideMenu()} ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
                        </div>
                        <div className="col-md-6 col-lg-6 textAlignRight marginT16">
                            <h4 className="margin0">Manage Customer Teams</h4>
                        </div>
                        <div className="col-md-2 col-lg-3 textAlignRight marginT07">
                            <SelectField  
                              labelStyle={{ color: 'white' }}  underlineStyle={{display: 'none'}} style={{width: '50'}} value={this.state.value} onChange={(e, i, v) => this.selectedDashBoard(e, i, v)}>
                                <MenuItem value={2} primaryText="View" />
                                <MenuItem value={1} primaryText="Manage" />


                            </SelectField>
                        </div>
                        <div className="col-md-3 col-lg-2  displayInline padding0 marginT05">
                            {/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
                            <div className="marginT17">
                            <h5 className="font fontSize17">Administrator: </h5>
                            </div>
                            <div className="marginT10">
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
                        <h5><i className="glyphicon glyphicon-group "></i>Manage Customer Teams</h5>
                    </div>

                    <div id="humanResource" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-user "></i>User Administration</h5>

                    </div>
                    <div id="knowledgeRep0" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-book-open"></i>Manage Knowledge Repo</h5>


                    </div>

                    <div id="settings" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-cogwheel "></i>Application Settings</h5>

                    </div>
                    <div id="logOut" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-log-off "></i>Log Out</h5>

                    </div>

                </div>
                <div className="row paddingT52">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHeaderColumn>CID</TableHeaderColumn> */}
                                <TableHeaderColumn>Customer Name</TableHeaderColumn>
                                <TableHeaderColumn>Start Date</TableHeaderColumn>
                                <TableHeaderColumn>End Date</TableHeaderColumn>
                                <TableHeaderColumn>Engaement Model</TableHeaderColumn>
                                <TableHeaderColumn>Pricing MOdel</TableHeaderColumn>
                                <TableHeaderColumn>Senior Supplier</TableHeaderColumn>
                                <TableHeaderColumn>Project manager</TableHeaderColumn>
                                <TableHeaderColumn>Projects</TableHeaderColumn>
                                <TableHeaderColumn>Team Members</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                                <TableHeaderColumn>Actions</TableHeaderColumn>

                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {this.state.accountsArray.map((row, index) => (
                                <TableRow key={index}>
                                    {/* <TableRowColumn>{index}</TableRowColumn> */}
                                    <TableRowColumn>{row.customerName}</TableRowColumn>
                                    <TableRowColumn>{row.startDate}</TableRowColumn>
                                    <TableRowColumn>{row.endDate}</TableRowColumn>
                                    <TableRowColumn>{row.engagementModel}</TableRowColumn>
                                    <TableRowColumn>{row.pricingModel}</TableRowColumn>
                                    <TableRowColumn>{row.seniorSupplier}</TableRowColumn>
                                    <TableRowColumn>{row.projectManager}</TableRowColumn>
                                    <TableRowColumn>{row.projects.length}</TableRowColumn>
                                    <TableRowColumn>{row.people.length}</TableRowColumn>
                                    <TableRowColumn>{row.status}</TableRowColumn>
                                    <TableRowColumn>
                                        <i className="glyphicon glyphicon-pencil actionsFontSize"></i>
                                        <i className="glyphicon glyphicon-remove actionsFontSize"></i>
                                    </TableRowColumn>



                                </TableRow>
                            ))}



                        </TableBody>
                    </Table>



                </div>
                <div className="row" id="footer">
                    <div className="col-md-11 textAlignRight">
                        <h4 className="margin0 pointer paddingL04" onClick={() => this.createAccount()} title="Add New Customer"><i className="glyphicon glyphicon-plus addButton"></i></h4>

                    </div>
                    {/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}

                </div>

                <Modal isOpen={this.state.createAccountModal} style={customStyles}

                    className={["col-md-3 modalMargins overlay "].join(' ')}>

                    <div className="row">
                        <div className="">
                            <h1 className="marginT0">Account Details</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row">

                            <div className="col-md-5 margin10"><label>CustomerID:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.newCustomerDetails.customerID} name='customerID' onChange={this.handleNewCustomerChange} />
                            </div>



                        </div>
                        <div className="row">
                            <div className="col-md-5 margin10"><label>Customer Name:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.customerName} name='customerName' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5 margin10"><label>Status:</label></div>
                            <div className="col-md-6">
                                <SelectField  value={this.state.value} name='status' onChange={this.handleNewCustomerChange}>
                                    <MenuItem value={1} primaryText="Active" />
                                    <MenuItem value={2} primaryText="Finished" />

                                </SelectField>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5 margin10"><label>Engagement Model:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.engagementModel} name='engagementModel' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5 margin10"><label>Pricing Model:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.pricingModel} name='pricingModel' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5 margin10"><label>Logo:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.customerLogo} name='customerLogo' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>


                        <div className="loginBtns">

                            <div>
                                <RaisedButton label="Next" primary={true} buttonStyle={buttonStyle} onClick={() => this.addNewCustomer(this.state.newCustomerDetails)} />
                                <RaisedButton label="Done" primary={true} buttonStyle={donebuttonStyle}  onClick={() => this.addNewCustomertoList(this.state.newCustomerDetails)} />
                            </div>



                        </div>

                    </div>

                </Modal>


                <Modal isOpen={this.state.createAddTeamMembersModal} style={customStyles}

                    className={["col-md-3 modalMargins overlay "].join(' ')}>

                    <div className="row">
                        <div className="">
                            <h1 className="marginT0">Add Team Members</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row">
                            <div className="col-md-3 margin10">
                                <SelectField 
                                 value={this.state.value} onChange={(e, i, v) => this.selectedDashBoard(e, i, v)}>
                                    <MenuItem value={1} primaryText="Existing" />
                                    <MenuItem value={2} primaryText="New" />
                                </SelectField>
                            </div>
                            <div className="col-md-6 ">
                                <RaisedButton label="ADD" primary={true} onClick={e => this.addTeamMembers(e)} />
                            </div>



                        </div>
                        <div className="">

                            {this.state.showEmployeeDetails}





                        </div>
                        <div className="row">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>E ID</TableHeaderColumn>
                                        <TableHeaderColumn>Employee Name</TableHeaderColumn>
                                        <TableHeaderColumn>Role</TableHeaderColumn>


                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableRowColumn>CmI-6041</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn>PMO</TableRowColumn>


                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn>2</TableRowColumn>
                                        <TableRowColumn>Randal White</TableRowColumn>
                                        <TableRowColumn>software </TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                    </div>

                </Modal>

            </div>

        )

    }

}

class Child extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-5 margin10"><label>Employee ID::</label></div>
                    <div className="col-md-6">
                        <input />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 margin10"><label>Employee Name:</label></div>
                    <div className="col-md-6">
                        <input />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 margin10"><label>Designation:</label></div>
                    <div className="col-md-6">
                        <input />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 margin10"><label>Role:</label></div>
                    <div className="col-md-6">
                        {/* <SelectField floatingLabelStyle={selectStyles} value={this.state.value} onChange={(e, i, v) => this.selectedRole(e, i, v)}>
                  <MenuItem value={1} primaryText="PMO" />
                  <MenuItem value={2} primaryText="Existing"/>

              </SelectField> */}
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 margin10"><label>Type:</label></div>
                    <div className="col-md-6">
                        {/* <SelectField floatingLabelStyle={selectStyles} value={this.state.value} onChange={(e, i, v) => this.selectedType(e, i, v)}>
                  <MenuItem value={1} primaryText="Internal" />
                  <MenuItem value={2} primaryText="Existing"/>

              </SelectField> */}
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 margin10"><label>Date of Joining:</label></div>
                    <div className="col-md-6">
                        <input />
                    </div>

                </div>

                <div className="loginBtns">

                    <div>
                        <RaisedButton label="Done" primary={true} onClick={e => this.AddTeamMembers(e)} />
                    </div>
                </div>
            </div>

        )
    }
}



export default manageCustomerTeams

