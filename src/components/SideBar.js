import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { myConstClass } from '../constants.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import ActionSettingsInputComponent from 'material-ui/svg-icons/action/settings-input-component';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import Logout from '../logout.js';
import image from "../../src/shared/spring_board_logo.png";
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

class SideBar extends Component {
    state = {
        accountsArray: []
    }

    // getAllAccounts = () => {
    //     axios.get(myConstClass.nodeAppUrl + '/accounts')
    //         .then(response => {
    //             this.setState({
    //                 accountsArray: response.data
    //             })
    //         })
    // }

    render() {
        return (
            <div className="row d-flex align-items-center navbarBgColor">
                <div className="col-md-12 d-flex m-2">
                    <div className="col-md-2 lg-2 mt-1 mb-1 ml-2 pl-0">
                        <a className="navbar-brand">
                            <img
                                src={image}
                                width="170"
                                height="40"
                                className="d-inline-block align-top ml-3"
                                alt="SpringBoard"
                            />
                        </a>
                    </div>
                    <div className="col-md-9 col-lg-9 d-flex mt-1 mb-1 ml-3">
                        <div className="mt-1 mr-3 pr-2 textAlignCenter displayInline borderRight" >
                            <div className="mr-2">
                                <Link to="/app/people">
                                    <SocialGroup color={"white"} style={{height:"40px",width:"40px"}}/>
                                </Link>
                            </div>
                            <div>
                                <Subheader className="p-0" style={{fontSize:'18px', lineHeight:"42px",fontWeight:"",color:"#00000"}}>People</Subheader>
                            </div>
                        </div>
                        <div className="mt-1 mr-3 pr-2 textAlignCenter displayInline borderRight">
                            <div className="mr-2">
                                <Link to="/app/manageCustomerTeams">
                                    <ActionViewModule  color={"white"} style={{height:"40px",width:"40px"}}/>
                                </Link>
                            </div>
                            <div>
                                <Subheader className="p-0" style={{fontSize:'18px', lineHeight:"42px",fontWeight:"",color:"#00000"}}>Teams</Subheader>
                            </div>
                        </div>
                        <div className="mt-1 mr-3 pr-2 textAlignCenter displayInline borderRight">
                            <div className="mr-2">
                                <Link to="/app/jumpstart">
                                    <ActionSettingsInputComponent color={"white"} style={{height:"40px",width:"40px"}}/>
                                </Link>
                            </div>
                            <div>
                                <Subheader className="p-0" style={{fontSize:'18px',lineHeight:"42px",fontWeight:"",color:"#00000"}} >Jump Start</Subheader>
                            </div>
                        </div>
                        <div className="mt-1 mr-3  pr-2 textAlignCenter displayInline">
                            <div className="mr-2">
                                <Link to="/app/automation">
                                    <ActionSettingsInputComponent color={"white"} style={{height:"40px",width:"40px"}}/>
                                </Link>
                            </div>
                            <div>
                                <Subheader className="p-0" style={{fontSize:'18px', lineHeight:"42px",fontWeight:"",color:"#00000"}}>CI/CD</Subheader>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 col-lg-1 d-flex  justifyContentCenter">
                    <div className="mr-2 mt-2" >
                            <Link to="/dashboard" >
                            <FloatingActionButton mini={true} backgroundColor={'grey'} style={{ boxShadow: "none" }}>
                                        <ActionDashboard style={{ height: "25px", width: "25px",marginTop:"5px" }} />
                                    </FloatingActionButton>
                            </Link>
                        </div>
                        <div className="mt-2" >
                            <Link to="/app/logout" >
                                <Logout />
                            </Link>
                        </div>
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;