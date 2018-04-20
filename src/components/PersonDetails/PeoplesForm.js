import React, { Component } from "react";
import axios from "axios";
import { myConstClass } from "../../constants";

import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class PeoplesForm extends Component {
  updatePeople = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (event, index, values) => this.setState({ values });
  addNewMember = newCustomerDetailsObject => {
    const { name, email, designation, account, projects } = this.state;
    axios
      .post(myConstClass.peoples + `/save`, {
        name: name,
        designation: designation,
        email: email,
        account: account,
        projects: projects,
        role: "newCustomerDetailsObject.role"
      })
      .then(response => {
        this.props.newPeopleObj(response.data);
      });
  };

  render() {
    return (
      <form onSubmit={this.props.addIndividual}>
        <div className="form-row">
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="UserName"
              name="name"
              type="text"
              onChange={this.updatePeople}
              errorText="Enter name"
              required
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="E-mail"
              name="email"
              type="email"
              onChange={this.updatePeople}
              errorText="Enter proper Email Address"
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Designation"
              name="designation"
              type="text"
              onChange={this.updatePeople}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Role"
              type="text"
              name="role"
              onChange={this.updatePeople}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Frequency"
              onChange={this.updatePeople}
              name="accounts"
              type="text"
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Frequency"
              onChange={this.updatePeople}
              name="projects"
              type="text"
            />
          </div>
        </div>
        <FlatButton label="Cancel" onClick={this.props.closeIndividualModal} />
        <FlatButton
          label="Submit"
          primary={true}
          onClick={this.addNewMember}
          type="submit"
        />
      </form>
    );
  }
}

export default PeoplesForm;
