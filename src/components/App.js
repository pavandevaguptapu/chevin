import React from 'react';

import SideBar from './SideBar';

const App = ({ children }) => (
  <div className="flex-row">
    <div className="col-md-12 col-lg-12 d-flex mctverticalHeight p-0">
      <div style={{ width: "4%", borderRight: "1px solid #cecece" }}>
        <SideBar/>
      </div>

      <div style={{ width: "96%" }}>
          {children}
      </div>
    </div>
  </div>
);

export default App;