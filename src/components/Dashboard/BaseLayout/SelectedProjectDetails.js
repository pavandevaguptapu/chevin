import React, { Component } from "react";
import { myConstClass } from "../../../constants";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const styles = {
    underlineStyle: {
        borderColor: "rgb(255, 217, 29)"
    },
    floatingLabelStyle: {
        color: "rgb(255, 217, 29)"
    }
};

class SelectedProjectDetails extends Component {
    state = {
        projectDetails: "",
        selectedProjectId: "",      
        dropdownOpen: false,
        dropDownValue: "Projects",
        searchTerm: "",
        teamId:''
    };

    componentWillMount() {
        this.setState({
            projectDetails: this.props.projectDetails,
            teamId:this.props.teamId
        });
    }

    componentDidMount() {
        if (
            JSON.stringify(this.props.projectDetails.projects) == JSON.stringify([])
        ) {
            return this.props.errorMessage();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            projectDetails: nextProps.projectDetails,
            teamId:nextProps.teamId
        });
    }
    getBoard = (username,password,hostedurl,peopleArray,projectIndex) => {    
        axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
                resourceURL: hostedurl + "rest/agile/1.0/board",
                userName: username,
                password: password,
                actionMethod: "get"
            })
            .then(response => {
                var boardDetails = response.data.values;           
                this.props.onSelectProject(boardDetails,username,password,hostedurl,peopleArray,projectIndex);
            });
    };
    displayDropDownValue = e => {
        this.setState({ dropDownValue: e.currentTarget.textContent });
    };
    listOfProjects = (projects, index, value) => {
        return projects
            .filter(this.projectSearchFilter(this.state.searchTerm))
            .map((project, index, value) => (
                <DropdownItem
                    key={project.projectId}
                    value={project.projectName}
                    className="pointer text-truncate"
                    onClick={(e, i) => {
                        this.selectProject(project.projectId,index);
                        this.displayDropDownValue(e);
                    }}
                >
                    {project.projectName}
                </DropdownItem>
            ));
    };
    selectProject = (e, ind) => {
     
        let projectId = e;
        var projectIndex=ind
        axios.post(myConstClass.new + "/getProjectDetails", {
            projectId: projectId,
            teamId: this.state.teamId
        })
            .then(response => {       
                this.setState({ selectedProjectId: projectId });
                this.props.showLoader();
                var ProcessManagement = [];
                var QualityManagement = [];

                for (var i = 0; i < response.data.content.tools.length; i++) {
                    if (response.data.content.tools[i].processName === "Process Management") {
                        ProcessManagement.push(response.data.content.tools[i])
                        this.getBoard(ProcessManagement[0].userName,ProcessManagement[0].password,ProcessManagement[0].hostedURL,ProcessManagement[0].people)
                    }
                    else if (response.data.content.tools[i].processName === "Quality Management") {
                        QualityManagement.push(response.data.content.tools[i])
                        this.props.getSonarDetails(QualityManagement[0].userName,QualityManagement[0].password,QualityManagement[0].hostedURL);
                    }
                }
            })
    };
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };
    projectInputSearch = e => {
        this.setState({
            searchTerm: e.target.value
        });
    };
    projectSearchFilter = searchTerm => {
        return function (project) {
            return project.projectName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        };
    };
    render() {
        return (
            <div>
                <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    className="custom-dropdown clearfix"
                >
                    <DropdownToggle
                        caret
                        className="text-truncate d-flex justify-content-between"
                    >
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu className="custom-dropdown-menu ">
                        <TextField
                            onChange={this.projectInputSearch}
                            floatingLabelText="Projects"
                            name="projectSearch"
                            style={{ fontSize: '13px' }}
                            underlineFocusStyle={styles.underlineStyle}
                            underlineStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelStyle}
                            fullWidth={true}
                        />
                        {this.listOfProjects(this.state.projectDetails.projects)}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default SelectedProjectDetails;
