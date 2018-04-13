import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Components
import ManageCustomerTeams from '../manageCustomerTeams';


import {myConstClass} from '../constants.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';




class SideBar extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            accountsArray:[]
        }
    
    }
    // componentWillMount() {
    //     axios.get(myConstClass.nodeAppUrl+'/accounts')
    //         .then(response => {               
    //             this.setState({ accountsArray: this.state.accountsArray.concat(response.data) })
    //             // this.currentAccountProfile(this.state.accountsArray[0], 0);
    //         })    
    // }

    getAllAccounts=() => {
        axios.get(myConstClass.nodeAppUrl+'/accounts')
        .then(response => {                                   
            this.setState({ 
                accountsArray: this.state.accountsArray.concat(response.data)
            })
            // this.props.AccountsData
            // this.currentAccountProfile(this.state.accountsArray[0], 0);
        }) 
    }

    render() {
        // console.log(this.state.accountsArray)
        return(
            <div className="col-md-12 col-lg-12 p-0 m10">
                <div className="p-1">
                    <Link to="/People">
                        <FloatingActionButton mini={true} secondary={true}>
                            <SocialGroup />
                        </FloatingActionButton>
                        <Subheader className="p-1" style={{fontSize:'10px',lineHeight:"26px"}}>People</Subheader>
                    </Link>
                </div>
                <div className="p-1">
                    <Link to="/ManageCustomerTeams">
                        <FloatingActionButton mini={true} secondary={true} onClick={this.getAllAccounts}>
                            <ActionViewModule />                        
                        </FloatingActionButton>
                        <Subheader className="p-1" style={{fontSize:'10px',lineHeight:"26px"}}>Teams</Subheader>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SideBar;