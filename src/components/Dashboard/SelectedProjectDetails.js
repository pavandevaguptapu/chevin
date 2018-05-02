import React, { Component } from "react";
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
import TextField from 'material-ui/TextField';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {orange500} from "material-ui/styles/colors";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const styles = {
    underlineStyle: {
      color: orange500
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
      // userName: this.props.selectedUserName,
      // pwd: this.props.selectedUserPwd,
      // url: this.props.selectedUrl
      //loader:<RefreshIndicatorExampleLoading status={""}/>
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
      // userName: nextProps.selectedUserName,
      // pwd: nextProps.selectedUserPwd,
      // url: nextProps.selectedUrl
    });
  }

  getBoard = (url, username, password, people) => {
    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL: url + "/rest/agile/1.0/board",
        userName: username,
        password: password,
        actionMethod: "get"
      })
      .then(response => {
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
    return projects.filter(this.projectSearchFilter(this.state.searchTerm)).map((project, index, value) => (
      <DropdownItem
        key={project.projectName}
        value={project.projectName}
        className="pointer text-truncate"
        onClick={(e, i) => {
          this.selectProject(e.target.value);
          this.displayDropDownValue(e);
        }}
      >
        {project.projectName}
      </DropdownItem>
    ));
  };

  selectProject = (e, ind) => {
    let indexOfSelectedAccount = this.state.projectDetails.projects
      .map(function(k) {
        return k.projectName;
      })
      .indexOf(e);
    this.setState({ selectedProjectIndex: indexOfSelectedAccount });

    this.state.hintStyle2 = {
      opacity: 0
    };
    if (
      this.state.projectDetails.projects[indexOfSelectedAccount].tools ==
        undefined &&
      this.state.projectDetails.projects[indexOfSelectedAccount].people ==
        undefined
    ) {
      return this.props.errorMessage();
    }

    if (
      this.state.projectDetails.projects[indexOfSelectedAccount].tools !=
        undefined &&
      (this.state.projectDetails.projects[indexOfSelectedAccount].people ==
        undefined ||
        JSON.stringify(
          this.state.projectDetails.projects[indexOfSelectedAccount].people
        ) == JSON.stringify([]))
    ) {
      this.props.showLoader();
      var jumpStartMenuNameArray = [];
      const IM = "Issue Management";
      this.getBoard(
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .hostedURL,
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .userName,
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .password,
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .people
      );
    }

    if (
      this.state.projectDetails.projects[indexOfSelectedAccount].tools !=
        undefined &&
      this.state.projectDetails.projects[indexOfSelectedAccount].people !=
        undefined &&
      JSON.stringify(
        this.state.projectDetails.projects[indexOfSelectedAccount].people
      ) != JSON.stringify([])
    ) {
      this.props.showLoader();
      var jumpStartMenuNameArray = [];
      const IM = "Issue Management";

      this.getBoard(
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .hostedURL,
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .userName,
        this.state.projectDetails.projects[indexOfSelectedAccount].tools[IM]
          .password,
        this.state.projectDetails.projects[indexOfSelectedAccount].people
      );
    }
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

  projectSearchFilter= (searchTerm) => {
    return function(project) {
        return project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }



  render() {
    return (
      <div>
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="custom-dropdown"
        >
          <DropdownToggle caret className="text-truncate">{this.state.dropDownValue}</DropdownToggle>
          <DropdownMenu className="custom-dropdown-menu">
          <TextField onChange={this.projectInputSearch} hintText="Seach Projects" name="projectSearch" underlineFocusStyle={styles.underlineStyle} />
            {this.projectDetailsListarray(this.state.projectDetails.projects)}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default SelectedProjectDetails;
