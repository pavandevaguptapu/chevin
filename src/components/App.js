import React from 'react';

import SideBar from './SideBar';
import People from './People';
import ManageCustomerTeams from '../manageCustomerTeams';



const App = () => (
  <div className="flex-row">
    <div className="col-md-12 col-lg-12 d-flex mctverticalHeight">
      <div style={{ width: "4%", borderRight: "1px solid #cecece" }}>
        <SideBar/>
      </div>

      <div style={{ width: "96%" }}>
        <ManageCustomerTeams /> 
        <People />       
      </div>
    </div>
  </div>
);

export default App;