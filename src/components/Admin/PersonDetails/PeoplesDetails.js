import React, { Component } from "react";

import Avatar from 'material-ui/Avatar';

const peopleDetails={
  textColor:{
    color:"white"
  }
}

class PeoplesDetails extends Component {
  render() {
    return (
      <div className="p-0" style={{ flex: 1 }}>
        <div className="pl-3">
            {/* <h1>{this.props.selectePeopleDetailsObj.name}</h1> */}
            <div className="text-center">
                <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={150} />
                <h3 className="text-capitalize"style={peopleDetails.textColor}>{this.props.selectePeopleDetailsObj.name}</h3>
                <div className="font-weight-normal" style={peopleDetails.textColor}>{this.props.selectePeopleDetailsObj.email}</div>
                <div className="font-weight-light text-capitalize" style={peopleDetails.textColor}>{this.props.selectePeopleDetailsObj.designation}</div>
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
                <div style={peopleDetails.textColor}>Teams</div>
                <div style={peopleDetails.textColor}>Projects</div>
                <div style={peopleDetails.textColor}>Roles</div>
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
