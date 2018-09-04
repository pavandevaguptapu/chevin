import React, { Component }from 'react';
// import '../../../App.css';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class ListOfJiraUsers extends Component{
     state={
        jiraUsersArray:[],
        selectedUser:''
     }

    componentDidMount(){
        axios.post(`sbsecureapi/sbtpgateway/generic/`, {
            resourceURL: "https://fullyincontrol.atlassian.net/rest/api/2/user/assignable/search?project=FIC",
            userName: "koteswararao.b@comakeit.com",
            password: "Abc@1234",
            actionMethod: "get"
        })
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ jiraUsersArray: response.data })
                    this.selectedUser("e", "ind", response.data[0].name)
                } else {

                }
            }, (error) => {
                console.log("error")
            });
    }
    usersList = (Users) => {     
            return Users.map((user)=> (
                <MenuItem
                    key={user.key}
                    value={user.name}
                    primaryText={user.name}
                />
            ));  
    }
    selectedUser=(e,ind,value)=>{
       // console.log()
        this.setState({selectedUser:value})
        console.log(value)
       this.props.selectedUser(value)
    }
    render(){
        return(              
                <div className="">
                <SelectField hintText="Select user" value={this.state.selectedUser} hintStyle={{ color: "white" }}
                    labelStyle={{ height: "37px" }} labelStyle={{color:"white"}} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedUser(e, i, v)}>
                    {this.usersList(this.state.jiraUsersArray)} 
                </SelectField>                 
                </div>
      
        )
    }
    
}

  