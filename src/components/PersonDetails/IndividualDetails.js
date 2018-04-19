import  React, { Component } from 'react';


class IndividualDetails extends Component {
    render() {
        return(
            <div className="p-0">
                <p>{this.props.selectePeopleDetailsObj.name} </p>
            </div>
        );
    }
}

export default IndividualDetails;