import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';
import Automation from '../../components/Admin/Automation/automation.js'
// const LoaderHOC = loadingProp => WrappedComponent => class  extends Component {
//     isEmpty = prop =>
//       prop === null ||
//       prop === undefined ||
//       (prop.hasOwnProperty("length") && prop.length === 0) ||
//       (prop.constructor === Object && Object.keys(prop).length === 0);

//     render() {
//       return this.isEmpty(this.props[loadingProp]) ? (
//         <h1>Loading...</h1>
//       ) : (
//         <WrappedComponent {...this.props} />
//       );
//     }
//   };

const RedirectHOC=(token)=>(WrappedComponent)=>{
// console.log(WrappedComponent)
// console.log(token)
// console.log(this.props);

{/* <Router>
  <Switch>
<Route exact path="app/manageCustomerTeams" render={() => (<Redirect to="/" />)} />
</Switch>
  </Router> */}
console.log(token,"HOC")
if(token==null){
  return(
    <Redirect to='/'/>
   )
}
    

  


//   this.props.history.push({
//     pathname: "/"      
//   });




 
}
export default RedirectHOC;
//export default LoaderHOC;