import React, { Component } from "react";
import { myConstClass } from "../../constants";
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
        selectedProject: "",
        userName: "",
        pwd: "",
        url: "",
        dropdownOpen: false,
        dropDownValue: "Projects",
        searchTerm: ""
    };

    componentWillMount() {
        this.setState({
            projectDetails: this.props.projectDetails
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
            projectDetails: nextProps.projectDetails
        });
    }

    getBoard = (url, username, password, people) => {
        axios
            .post(`sbtpgateway/tp/rest/esccors/generic/`, {
                resourceURL: url + "rest/agile/1.0/board",
                userName: username,
                password: password,
                actionMethod: "get"
            })
            .then(response => {
                // console.log(response)
                var boardDetails = response.data.values;
                var userName = username;
                var Password = password;
                var hostedUrl = url;
                var peopleList = people;
                this.props.onSelectProject(
                    boardDetails,
                    userName,
                    Password,
                    hostedUrl,
                    peopleList
                );
            });
    };

    displayDropDownValue = e => {
        this.setState({ dropDownValue: e.currentTarget.textContent });
    };

    projectDetailsListarray = (projects, index, value) => {
        return projects
            .filter(this.projectSearchFilter(this.state.searchTerm))
            .map((project, index, value) => (
                <DropdownItem
                    key={project.projectId}
                    value={project.projectName}
                    className="pointer text-truncate"
                    onClick={(e, i) => {
                        this.selectProject(project.projectId);
                        this.displayDropDownValue(e);
                    }}
                >
                    {project.projectName}
                </DropdownItem>
            ));
    };

    selectProject = (e, ind) => {
        // let indexOfSelectedAccount = this.state.projectDetails.projects
        //     .map(function (k) {
        //         return k.projectName;
        //     })
        //     .indexOf(e);
        let projectId = e;


        axios.post(myConstClass.new + "/getProjectDetails", {
            projectId: projectId,
            teamId: this.props.teamId
        })
            .then(response => {
                console.log(response.data.content.tools, "asdas")
                this.setState({ selectedProjectIndex: projectId });

                this.state.hintStyle2 = {
                    opacity: 0
                };
                this.props.showLoader();
                var jumpStartMenuNameArray = [];
                const IM = "Issue Management";

                let tools = [];
                let toolsNew = response.data.content.tools;
                tools = toolsNew.filter(tool => {
                    return tool.toolName === "Jira";
                });

                this.getBoard(
                    tools[0].hostedURL,
                    tools[0].userName,
                    tools[0].password,
                    tools[0].people
                );

                // if (
                //     this.state.projectDetails.projects[projectId].tools ==
                //     undefined &&
                //     this.state.projectDetails.projects[projectId].people ==
                //     undefined
                // ) {
                //     return this.props.errorMessage();
                //     alert(1);
                // }

                // if (
                //     this.state.projectDetails.projects[projectId].tools !=
                //     undefined &&
                //     (this.state.projectDetails.projects[projectId].people ==
                //         undefined ||
                //         JSON.stringify(
                //             this.state.projectDetails.projects[projectId].people
                //         ) == JSON.stringify([]))
                // ) {
                //     alert(2);
                //     this.props.showLoader();
                //     var jumpStartMenuNameArray = [];
                //     const IM = "Issue Management";
                //     this.getBoard(
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .hostedURL,
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .userName,
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .password,
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .people
                //     );
                // }

                // if (
                //     this.state.projectDetails.projects[projectId].tools !=
                //     undefined &&
                //     this.state.projectDetails.projects[projectId].people !=
                //     undefined &&
                //     JSON.stringify(
                //         this.state.projectDetails.projects[projectId].people
                //     ) != JSON.stringify([])
                // ) {
                //     alert(3);
                //     this.props.showLoader();
                //     var jumpStartMenuNameArray = [];
                //     const IM = "Issue Management";

                //     this.getBoard(
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .hostedURL,
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .userName,
                //         this.state.projectDetails.projects[projectId].tools[IM]
                //             .password,
                //         this.state.projectDetails.projects[projectId].people
                //     );
                // }            
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
                        {this.projectDetailsListarray(this.state.projectDetails.projects)}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default SelectedProjectDetails;
