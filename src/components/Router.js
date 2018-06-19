import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Login from '../login';
import ManageCustomerTeams from './Admin/ConfigureTeams/manageCustomerTeams';
import People from './Admin/PersonDetails/People';
import jumpstart from './Admin/ConfigureJumpstart/jumpstart';
import Automation from './Admin/Automation/automation';
import App from './App'
import TeamsBaseLayout from './Dashboard/BaseLayout/TeamsBaseLayout';
import IndividualSprintData from './Dashboard/IndividualUserData/individualSprintData';
import LoginNew from '../shared/LoginNew';
import axios from 'axios';


const Routes = () => (
   <Router>         
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={TeamsBaseLayout} />
        <Route path="/login" component={LoginNew}/>  
        <Route path="/userDetails" component={IndividualSprintData} />     
        <App>
          <Route  path="/app/manageCustomerTeams" component={ManageCustomerTeams} />
          <Route path="/app/people" component={People} />
          <Route path="/app/jumpstart" component={jumpstart} />
          <Route path="/app/automation" component={Automation} />
          
        </App>
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    </div>
  </Router>
);

export default Routes;

axios.interceptors.request.use(function (config) { 
  //console.log(config)
  var token = localStorage.getItem('token');
  if(config.headers["Authorization"]===undefined){
    if (token) {      
           config.headers["Authorization"] = "Bearer " + token;
          return config
      } 
      else{
        //console.log("2323")
        window.location.href = '/'
      }
  } else{
    return config
  }              
  }, function (error) {   
      //console.log("no auth") 
      return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  // Do something with response data

return response
 }, function (error) {
  if(error.response.data.error==="invalid_token"){
    window.location.href = '/'
  }
  // Do something with response error
   //
});