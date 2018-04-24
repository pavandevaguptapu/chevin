import React, { Component } from "react";
import { Card, CardHeader } from "material-ui";
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
const navBarContainer = {
  navBarbg: {
    backgroundColor: "#ffd91d"
  },
  widgetContainer: {
    backgroundColor: "#3d393a",
    widgetCard: {
      height: "20rem",
      margin: "5px",
      overflow: "auto"
    }
  }
};

class TeamsBaseLayout extends Component {
  state = {
    dropdownOpen: false
  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  render() {
    return (
      <div
        className="mctverticalHeight "
        style={navBarContainer.widgetContainer}
      >
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg"
            style={navBarContainer.navBarbg}
          >
            <a className="navbar-brand" href="#">
              <span className="navbar-brand ml-1 h1">SpringBoard</span>
            </a>
            <div className="navbar-collapse">
              <div className="navbar-nav">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <a className="nav-item nav-link" href="#">
                  Features
                </a>
                <a className="nav-item nav-link" href="#">
                  Pricing
                </a>
              </div>
            </div>
          </nav>

          <div className="col-lg-12">
            <div className="d-flex flex-row flex-wrap widgetCard">
              <div className="col-lg-4">
                <Card style={navBarContainer.widgetContainer.widgetCard}>
                  <CardHeader title="Epic Overview" />
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderColumn>ID</TableHeaderColumn>
                          <TableHeaderColumn>Name</TableHeaderColumn>
                          <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableRowColumn>1</TableRowColumn>
                          <TableRowColumn>John Smith</TableRowColumn>
                          <TableRowColumn>Employed</TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn>2</TableRowColumn>
                          <TableRowColumn>Randal White</TableRowColumn>
                          <TableRowColumn>Unemployed</TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
              <div className="col-lg-4">
                <Card style={navBarContainer.widgetContainer.widgetCard}>
                  <CardHeader title="Quality Overview" />
                </Card>
              </div>
              <div className="col-lg-4">
                <Card style={navBarContainer.widgetContainer.widgetCard}>
                  <CardHeader title="Epic Burndown Chart" />
                </Card>
              </div>
            </div>
            {/* <div className="col-md-4 col-lg-4   padding0 verticalHeight">
            <div className="col-md-12 col-lg-11  teamdetailsheight boxshadowfordata boxmargin borderRadius justify">
              <div className="textAlignCenter">
                {this.state.loaderforpeople}
              </div>
              <div>{this.state.emptyPeoplesArray}</div>
              <div className="col-md-12 col-lg-12 textAlignCenter">
                <h5>Team Details</h5>
                {this.state.peoplesArray}
              </div>
            </div>

            <div className="col-md-12 col-lg-11  sonarqubedataheight boxshadowfordata boxmargin borderRadius">
              <div className="textAlignCenter">{this.state.loaderforsonar}</div>
              <div className="col-md-12 col-lg-12 marginB08 textAlignCenter ">
                <h5>Quality Overview</h5>
                {this.state.sonarQubedata}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4   padding0 verticalHeight">
            <div className="col-md-12 col-lg-11  teamdetailsheight boxshadowfordata boxmarginTop borderRadius">
              <div className="textAlignCenter">
                {this.state.loaderforEpicDetails}
              </div>

              <div className="col-md-12 col-lg-12 textAlignCenter  padding0">
                <h5>Epic Overview</h5>
              </div>
              <div className="epicTablediv">
                {this.state.issuesListArray}
                <div className="textAlignCenter justify">
                  {this.state.emptyEpicsArray}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-11  sonarqubedataheight boxshadowfordata boxmarginTop borderRadius">
              <div className="textAlignCenter">
                {this.state.loaderforEpicOverviewburndownchart}
              </div>
              <div className="col-md-12 col-lg-12 textAlignCenter">
                <h5>Epic BurndownChart</h5>
              </div>
              {this.state.epicBurndownChart}
              <div className="textAlignCenter verticalAlign">
                {this.state.emptyEpicsArray}
              </div>
            </div>
          </div>

          <div
            className={["col-md-4 col-lg-4   padding0 verticalHeight"].join(
              " "
            )}
            >
            <div
              className={[
                "col-md-12 col-lg-11 textAlignCenter  sprintselectboxheight boxshadowfordata boxmarginTopforsprintdata borderRadius",
                this.state.overlay == true ? "backgroundoverlay" : ""
              ].join(" ")}
                >
              <div className="col-md-12 col-lg-12 textAlignCenter ">
                <h5>Select Sprint</h5>
              </div>
              {this.state.sprintDetails}
            </div>
            <div
              className={[
                "col-md-12 col-lg-11 textAlignCenter  sprintburndownheight boxshadowfordata boxmarginTopforsprintdata borderRadius",
                this.state.sprintburndownoverlay == true
                  ? "backgroundoverlay"
                  : ""
              ].join(" ")}
                >
              <div className="col-lg-12 textAlignCenter">
                {this.state.loaderforsprintburndownchart}
              </div>
              <div className="col-md-12 col-lg-12 textAlignCenter ">
                <h5>Sprint Burndown</h5>
                <div className="textAlignCenter">
                  {this.state.emptySprintArray}
                </div>
              </div>
              {this.state.workHours}
            </div>

            <div
              className={[
                "col-md-12 col-lg-11 textAlignCenter sprintoverviewheight boxshadowfordata boxmarginTopforsprintdata borderRadius",
                this.state.sprintoverviewoverlay == true
                  ? "backgroundoverlay"
                  : ""
              ].join(" ")}
                >
              <div className="textAlignCenter">
                {this.state.loaderforsprintoverviewpiechart}
              </div>
              <div className="col-md-12 col-lg-12 textAlignCenter ">
                <h5>Sprint Overview</h5>
                <div className="textAlignCenter">
                  {this.state.emptySprintArray}
                </div>
              </div>
              {this.state.sprintPieChart}
            </div>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default TeamsBaseLayout;
