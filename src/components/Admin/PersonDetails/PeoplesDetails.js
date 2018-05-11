import React, { Component } from "react";

import Avatar from 'material-ui/Avatar';

class PeoplesDetails extends Component {
  render() {
    return (
      <div className="p-0" style={{ flex: 1 }}>
        <div className="pl-3">
            {/* <h1>{this.props.selectePeopleDetailsObj.name}</h1> */}
            <div className="text-center">
                <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={150} />
                <h3 className="text-capitalize">{this.props.selectePeopleDetailsObj.name}</h3>
                <div className="font-weight-normal">{this.props.selectePeopleDetailsObj.email}</div>
                <div className="font-weight-light text-capitalize">{this.props.selectePeopleDetailsObj.designation}</div>
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
                <div>Teams</div>
                <div>Projects</div>
                <div>Roles</div>
            </div>
            <div>
                
            </div>
        </div>
        <div />
      </div>
    );
  }
}

export default PeoplesDetails;
