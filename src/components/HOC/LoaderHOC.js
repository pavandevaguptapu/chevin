import React, { Component } from "react";

const LoaderHOC = LoadIndicator  => class extends Component {
    render() {
        return(
            this.props.filterPeople.length === 0 ? <h1>Loading</h1> : <LoadIndicator {...this.state} {...this.props} />
        )
    }
}

export default LoaderHOC;

