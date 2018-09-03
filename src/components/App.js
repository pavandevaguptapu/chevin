
import React, { Component } from "react";
import Login from '../login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './SideBar';
import { BrowserRouter as Router, Route,Redirect,Switch } from 'react-router-dom';
import axios from 'axios';

      

const App = ({ children }) => (  
  <div className="flex-row">
    <div className="col-md-12 col-lg-12  p-0">
      <div >
        <SideBar/>
      </div>

      <div>
          {children}
      </div>
    </div>
  </div>
);

export default App;


// axios.interceptors.request.use(function (config) { 
//   //console.log(config)
//   var token = localStorage.getItem('token');
//   if(config.headers["Authorization"]===undefined){
//     if (token) {      
//            config.headers["Authorization"] = "Bearer " + token;
//           return config
//       } 
//       else{
//         //console.log("2323")
//         window.location.href = '/'
//       }
//   } else{
//     return config
//   }              
//   }, function (error) {   
//       //console.log("no auth") 
//       return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(function (response) {
//   // Do something with response data

// return response
//  }, function (error) {
//   if(error.response.data.error==="invalid_token"){
//     window.location.href = '/'
//   }
//   // Do something with response error
//    //
// });