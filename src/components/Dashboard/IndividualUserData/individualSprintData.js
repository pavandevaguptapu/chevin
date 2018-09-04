import React, { Component } from "react";

import { connect } from 'react-redux';


import GridLayout from "react-grid-layout";
import { WidthProvider, Responsive } from "react-grid-layout";


import css from "../../../../node_modules/react-grid-layout/css/styles.css";
import css1 from "../../../../node_modules/react-resizable/css/styles.css";





import ListOfJiraUsers from "./listofjirausers";
import IndividualIssueDetails from "./individualIssueDetails";
import PullRequest from "./pullrequest";
import IndividualIssueProgressBar from "./individualIssueProgressBar";

import Commits from "./commits";

import { Link } from 'react-router-dom';
import axios from "axios";

 import image from "../../../shared/spring_board_logo.png";
import Avatar from "material-ui/Avatar";
import Grid from "material-ui/svg-icons/image/grid-on";
import Search from "material-ui/svg-icons/action/search";
import Fullscreen from "material-ui/svg-icons/navigation/fullscreen";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Card, CardHeader} from "material-ui";


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { grey600, faintBlack } from "material-ui/styles/colors";
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
            overflow: "auto"
        }
    }
};
const ResponsiveReactGridLayout = WidthProvider(Responsive);



class IndividualSprintData extends Component {
    state = {
        newClass: "some",
    };

    componentWillMount(){
        console.log(this.props)
             this.setState({
               //  individualSprintModal:this.props.IndividualSprintModal,
                 listOfUsers:<ListOfJiraUsers selectedUser={this.selectedJiraUser}/>
             })
         }
         selectedJiraUser=(selectedUser)=>{
             console.log(selectedUser)
              this.setState({individualIssueDetails:<IndividualIssueDetails selectedUser={selectedUser}/>,
                IndividualIssueProgressBar:<IndividualIssueProgressBar selectedUser={selectedUser}/>,              
                IndividualPullRequest:<PullRequest/>,
                branches:<Commits/>
            })
         }

         fullscreen = () => {
            const currentState = this.state.newClass;
            this.setState({ newClass: !currentState });
        };
  

    render() {

        return (
            <div style={navBarContainer.widgetContainer}>
                <div className="container-fluid">
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
                     
                        {/* <div className="col-lg-2 text-right">
                            <div>
                                <Avatar
                                    src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
                                    size={40}
                                />
                            </div>
                        </div> */}
                    </nav>

                    <div
                        className="boards col-lg-12 clearfix d-flex align-items-center"
                        style={{ backgroundColor: "#494b4f", height: "3rem" }}
                    >
                        <div className="col-lg-2">
                            {this.state.listOfUsers}
                        </div>
                        {/* <div className="col-lg-2"> {this.state.sprintDetails} </div> */}
                    </div>


                    <div className="col-lg-12 my-4">
                        <div className="col-lg-12 text-right">
                            <FloatingActionButton mini={true} className="add-custom_button">
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                        <div>
                        {/* {this.state.IndividualSprintData} */}
                            </div>
                        <div className="widgetCard clearfix">
                            <ResponsiveReactGridLayout
                                className="layout clearfix"
                                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                                rowHeight={30}
                                width={1200}
                            >
                            
                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="7"
                                    data-grid={{ x: 0, y: 0, w:12, h: 4, minW: 4, minH: 4}}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Issues Overview" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforsonar}
                                        {this.state.IndividualIssueProgressBar}
                                    </div>
                                </Card>
                            <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="4"
                                    data-grid={{ x: 4, y: 0, w: 8, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Critical Path" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                      
                                        {this.state.individualIssueDetails}
                                    </div>
                                </Card>
                             
                                {/* <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="6"
                                    data-grid={{ x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}

                                >
                               
                                <div className="d-flex custom_dashboard-header justify-content-between" >
                                        <CardHeader title="Notes" className="p-0 pointer" />
                                    </div>
                                
                                   

                                    <div className="col-lg-12 text-center">
                                        {this.state.loaderforsprintoverviewpiechart}
                                        {this.state.emptySprintArray}
                                        {this.state.sprintPieChart}
                                    </div>
                                </Card> */}
                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="5"
                                    data-grid={{ x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                    id="myDiv"
                                    className={this.state.newClass ? "minScreen" : "fullscreen"}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Pull Request" className="p-0" />
                                        <div>
                                            <Fullscreen onClick={this.fullscreen} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                   
                                        {this.state.IndividualPullRequest}
                                    </div>
                                </Card>


                              

                                <Card
                                    style={navBarContainer.widgetContainer.widgetCard}
                                    key="8"
                                    data-grid={{ x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }}
                                >
                                    <div className="d-flex custom_dashboard-header justify-content-between">
                                        <CardHeader title="Recent Commits" className="p-0" />
                                    </div>
                                    <div className="col-lg-12 text-center">
                                    
                                        {this.state.branches}
                                    </div>
                                </Card>
                             </ResponsiveReactGridLayout>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  IndividualSprintData

