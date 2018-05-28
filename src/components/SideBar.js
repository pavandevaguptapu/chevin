import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import {myConstClass} from '../constants.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import ActionSettingsInputComponent from 'material-ui/svg-icons/action/settings-input-component';
import Logout from '../logout.js';

import Subheader from 'material-ui/Subheader';
import axios from 'axios';

class SideBar extends Component {
    state = {
        accountsArray:[]
    }

    getAllAccounts = () => {
        axios.get(myConstClass.nodeAppUrl+'/accounts')
        .then(response => {                               
            this.setState({ 
                accountsArray: response.data
            })
        }) 
    }

    render() {
        return(
            <div className="d-flex flex-column align-items-center" >
                <div className="py-2">
                    <Link to="/app/people">
                        <FloatingActionButton mini={true} primary={true}>
                            <SocialGroup />
                        </FloatingActionButton>
                        <Subheader className="p-1" style={{fontSize:'12px',lineHeight:"26px"}}>People</Subheader>
                    </Link>
                </div>
                <div className="py-2">
                    <Link to="/app/manageCustomerTeams" >
                        <FloatingActionButton mini={true} primary={true} onClick={this.getAllAccounts} >
                            <ActionViewModule />                        
                        </FloatingActionButton>
                        <Subheader className="p-1" style={{fontSize:'12px',lineHeight:"26px"}}>Teams</Subheader>
                    </Link>
                </div>
                <div className="pl-3 mt-2">
                    <Link to="/app/jumpstart" >
                        <FloatingActionButton mini={true} primary={true}>
                            <ActionSettingsInputComponent />                        
                        </FloatingActionButton>
                        <Subheader className="p-0" style={{fontSize:'12px',lineHeight:"26px"}}>Jump Start</Subheader>
                    </Link>
                </div>
                <div className="py-2 mt-3">
                    <Link to="/app/automation" >
                        <FloatingActionButton mini={true} primary={true}>
                            <ActionSettingsInputComponent />                        
                        </FloatingActionButton>
                        <Subheader className="p-1" style={{fontSize:'12px',lineHeight:"26px"}}>CI/CD</Subheader>
                    </Link>
                </div>
                <div className=" py-2 mt-3" style={{position:"absolute",bottom:"0"}}>
                    <Link to="/app/logout" >
                        <Logout />
                    </Link>
                </div>
            </div>
        );
    }
}

export default SideBar;