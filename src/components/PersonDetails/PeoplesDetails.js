import React, { Component } from "react";

class PeoplesDetails extends Component {
  render() {
    return (
      <div className="p-0" style={{ flex: 1 }}>
        <div>
            <h1>{this.props.selectePeopleDetailsObj.name}</h1>

        </div>
        <div />
      </div>
    );
  }
}

export default PeoplesDetails;
