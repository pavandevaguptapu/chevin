import React, { Component } from "react";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class PeoplesList extends Component {
  _;
  constructor(props) {
    super(props);

    this.state = {
      peoplesArray: [],
      showCheckboxes: false,
      height: "194px"
    };
  }
  componentWillMount() {
    this.setState({ peoplesArray: this.props.peoplesList });
  }
  render() {
    return (
      <div className="padding0">
        <div className="col-md-12 col-lg-12 padding0">
          <Table height={this.state.height}>
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
                <TableHeaderColumn>Email ID</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {this.state.peoplesArray.map((people, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{people.name}</TableRowColumn>
                  <TableRowColumn>{people.role}</TableRowColumn>
                  <TableRowColumn>{people.emailid}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default PeoplesList;
