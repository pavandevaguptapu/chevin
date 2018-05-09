import React, { Component } from "react";
import axios from "axios";
import { myConstClass } from "../../constants";

import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class PeoplesForm extends Component {
  state = {
    name: "",
    email: "",
    value: 1
  };
  updatePeople = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (event, index, value) => this.setState({ value });

  addNewMember = e => {
    e.preventDefault();
    const { name, email, designation, account, projects } = this.state;
    axios
      .post(myConstClass.peoples + `/save`, {
        name: name,
        designation: designation,
        email: email,
        account: "account",
        projects: "projects",
        role: "newCustomerDetailsObject.role"
      })
      .then(response => {
        this.props.newPeopleObj(response.data);
      })
      .catch(error => {
          if(error.response) {
              return(error.response);
          }
      });
  };

  render() {
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="UserName"
              name="name"
              type="text"
              onChange={this.updatePeople}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="E-mail"
              name="email"
              type="email"
              onChange={this.updatePeople}
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
            {/* <TextField
              fullWidth={true}
              floatingLabelText="Frequency"
              onChange={this.updatePeople}
              name="accounts"
              type="text"
            /> */}
            <SelectField
              floatingLabelText="Select Teams"
              value={this.state.value}
              onChange={this.handleChange}
              autoWidth={true}
              fullWidth={true}
              name="teams"
              className="text-left"
            >
              <MenuItem value={1} primaryText="Auto width" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Select Projects"
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
          disabled={!this.state.name || !this.state.email}
        />
      </form>
    );
  }
}

export default PeoplesForm;
