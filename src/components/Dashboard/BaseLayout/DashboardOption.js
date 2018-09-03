import React, { Component } from "react";

import { connect } from 'react-redux';
import { setSelectedTeam } from '../../../actions/index';
import Logout from '../../../logout.js';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router-dom';
import image from "../../../shared/spring_board_logo.png";
import FloatingActionButton from "material-ui/FloatingActionButton";

const navBarContainer = {
    navBarbg: {
        backgroundColor: "#ffd91d"
    },
    widgetContainer: {
        backgroundColor: "#3d393a",
        minHeight: "100vh",
        widgetCard: {
            height: "20rem",
            margin: "5px",
            overflow: "none"
        }     
    }
  
};


const mapDispatchToProps = dispatch => {
    return {
        setSelectedTeam: teamId => dispatch(setSelectedTeam(teamId)),
    };
};

class DashboardOption extends Component {
    state = {
        Teams: [],
        noTeam: false,
    };

    
    fullscreen = () => {
        const currentState = this.state.newClass;
        this.setState({ newClass: !currentState });
    }; 
    render() {
        return (
            <div style={navBarContainer.widgetContainer}>
                <div className={["container-fluid", this.state.noTeam === false].join('')}>
                    <nav
                        className="navbar navbar-light navbar-expand-lg align-items-end p-3"
                        style={navBarContainer.navBarbg}
                            >
                            <a className="navbar-brand">
                                <img
                                    src={image}
                                    width="170"
                                    height="30"
                                    className="d-inline-block align-top ml-3"
                                    alt="SpringBoard"
                                />
                            </a>
                        <div className="navbar-collapse">
                        </div>
                        <div className="col-md-1 col-lg-1 d-flex  justifyContentCenter">
                            <div className="mr-2">
                                <Link to="/app" >
                                    <FloatingActionButton mini={true} backgroundColor={'grey'} style={{ boxShadow: "none" }}>
                                        <ActionSettings style={{ height: "25px", width: "25px",marginTop:"5px" }} />
                                    </FloatingActionButton>
                            </Link>
                            </div>
                            <div className="" >
                            <Link to="/app/logout" >
                                <Logout />
                            </Link>
                        </div>
                        </div>
                    </nav>

                    {/* <div className="boards col-lg-12 clearfix d-flex align-items-center" style={{ backgroundColor: "#494b4f", height: "3rem" }}>
                        <div className="col-lg-2">
                        </div>
                        <div className="col-lg-2"></div>
                    </div> */}

                    <div className="boards col-lg-12" style={{color:'red'}}>sdsadasdasdasd</div>

                </div>
                
            </div>
        );
    }
}

export default  connect(null, mapDispatchToProps)(DashboardOption)

