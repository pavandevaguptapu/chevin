import React, { Component } from "react";
import axios from "axios";
import { myConstClass } from "../../../constants";

import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from 'material-ui/DatePicker';

class PeoplesForm extends Component {
constructor(props){
  super(props)
  if(props.clickedEvent==='edit'){
    this.state = {      
          newMember: {
            "name":props.selectedMember.name,
            "userName":props.selectedMember.userName,
            "emailId":props.selectedMember.emailId,
            "endDate":new Date(props.selectedMember.endDate),
            "mobile":props.selectedMember.mobile,
            "password":props.selectedMember.password,
            "startDate":new Date(props.selectedMember.startDate),
            "status":props.selectedMember.status,
            "roles":props.selectedMember.roles   
          },
          clickedEvent:props.clickedEvent,
          selectedIndex:props.selectedIndex,
          peopleId:props.selectedMember.peopleId,
          rolesArray:props.selectedMember.roles,
          value:props.selectedMember.roles[0].roleName,
          filterPeople:props.filterPeople
        }
  }else{
    this.state = {      
          newMember: {
            "name":"",
            "userName":"",
            "emailId":"",
            "endDate":"",
            "mobile":"",
            "password":"",
            "satrtDate":"",
            "status":"",
            "roles":""        
          },
          clickedEvent:props.clickedEvent,
          rolesArray:[{"roleId":1,"roleName":"ADMIN"}]
        }
  }

} 

  getDateString = (date) => {
    var date = new Date(date)
    // var date = new Date(epochTime)
    var month = '' + (date.getMonth() + 1)
    var day = '' + date.getDate()
    var year = date.getFullYear()
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var dateString = (year + "-" + month + "-" + day)
    return dateString
  } 
  handleChange = (e, index, value) => {
    this.setState({value:value,roleId:index})
  }
  handleSubmit=(newMember,clickedEvent)=>{
    if(clickedEvent==='edit'){
      this.updateMember(newMember)
    }else{
      this.addNewMember(newMember)
    }

  }
  addNewMember = (newMember) => {  
    newMember.roles=this.state.value 
    var startDate = this.getDateString(newMember.startDate)
    var endDate = this.getDateString(newMember.endDate)  
    axios.post("http://172.16.25.50:8585/sbsecureapi/sbsecureapi/addPeople",
      {
        name: newMember.name,
        userName:newMember.userName,
        emailId:newMember.emailId,
        endDate:endDate,
        startDate:startDate,
        roles:[newMember.roles],
        mobile:newMember.mobile,       
        status:1,
        password:newMember.password,         
      }
    ).
      then(response => {
        this.props.newPeopleObj(response.data.content);
        this.props.closeIndividualModal()
      },(error) => {
        console.log(error)
     });
  };
  updateMember=(updatedMember)=>{
    updatedMember["role"]=this.state.value 
    var startDate = this.getDateString(updatedMember.startDate)
    var endDate = this.getDateString(updatedMember.endDate)  
    axios.put("http://172.16.25.50:8585/sbsecureapi/sbsecureapi/editPeople",
      {
        peopleId:this.state.peopleId,
        name: updatedMember.name,
        userName:updatedMember.userName,
        emailId:updatedMember.emailId,
        endDate:'',
        startDate:startDate,
        roles:[updatedMember.role],
        mobile:updatedMember.mobile,       
        status:"1",
        password:updatedMember.password         
      }
    ).
      then(response => {
        var tempArray=this.state.filterPeople
        tempArray.splice(this.state.selectedIndex,1)
        tempArray.splice(this.state.selectedIndex,0,response.data.content)
        this.setState({filterPeople:tempArray})
        
        this.props.updatedPeopleList(this.state.filterPeople);
        this.props.closeIndividualModal()
      },(error) => {
        console.log(error)
     });
  }
  handleMemberDetails = (e, selectedDate, string) => {    
            var newMemberInputs = this.state.newMember
            if (e !== null) {
    
              newMemberInputs[e.target.name] = e.target.value;
            }
    
            if (e === null && string === 'startDate') {
                // var newAccountInputs = this.state.newTeamObj
                //  newAccountInputs = this.state.newTeamObj.startDate;
                newMemberInputs[string] = selectedDate
            }
            if (e === null && string === 'endDate') {
                // var newAccountInputs = this.state.newTeamObj             
                // var newAccountInputs = this.state.newTeamObj.endDate;
                newMemberInputs[string] = selectedDate
            }
    
            this.setState(
                {
                  newMember: newMemberInputs
                }
    
            )
    
  }
  selectingRole = (roles) => {
      return roles.map((role) => (
        <MenuItem
          key={role.roleId}
          value={role.roleName}
          primaryText={role.roleName}
        />
      ));
    

  }
  render() {
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="name"
              name="name"
              type="text"
              onChange={this.handleMemberDetails}
              value={this.state.newMember.name || ''}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="username"
              name="userName"
              type="text"
              onChange={this.handleMemberDetails}
              value={this.state.newMember.userName || ''}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="password"
              name="password"
              type="password"
              onChange={this.handleMemberDetails}
              value={this.state.newMember.password || ''}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="emailId"
              name="emailId"
              type="email"
              onChange={this.handleMemberDetails}
              value={this.state.newMember.emailId || ''}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">            
            <DatePicker
              textFieldStyle={{ width: '100%' }}
              hintText="Start Date"
              value={this.state.newMember.startDate|| ''}
              onChange={(e, x) => this.handleMemberDetails(e, x, 'startDate')}
              minDate={new Date()}
              floatingLabelText="Start Date"
              autoOk={true}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">  
            <DatePicker
            textFieldStyle={{ width: '100%' }}
            hintText="End Date"
            value={this.state.newMember.endDate|| ''}
            onChange={(e, x) => this.handleMemberDetails(e, x, 'endDate')}                                          
            floatingLabelText="End Date"
            autoOk={true}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <SelectField
              floatingLabelText="Select Role"
              value={this.state.value || ''}
              onChange={this.handleChange}
              autoWidth={true}
              fullWidth={true}
              name="roles"
              className="text-left"              
            >
            {this.selectingRole(this.state.rolesArray)}
            </SelectField>
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="mobile"
              onChange={this.handleMemberDetails}
              name="mobile"
              type="number"
              value={this.state.newMember.mobile || ''}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <TextField
              fullWidth={true}
              floatingLabelText="status"
              onChange={this.handleMemberDetails}
              name="status"
              type="text"
              value={this.state.newMember.status || ''}
            />
          </div>
        </div>

      <FlatButton label="Cancel" onClick={this.props.closeIndividualModal} />
      <FlatButton
        label="Submit"
        primary={true}
        onClick={() => this.handleSubmit(this.state.newMember,this.state.clickedEvent)}
        type="submit"
        disabled={!this.state.newMember.name}
      />
      </div >
    );
  }
}

export default PeoplesForm;
