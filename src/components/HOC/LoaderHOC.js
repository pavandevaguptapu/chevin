import React, { Component } from "react";

const LoaderHOC = loadingProp => WrappedComponent => class  extends Component {
    isEmpty = prop =>
      prop === null ||
      prop === undefined ||
      (prop.hasOwnProperty("length") && prop.length === 0) ||
      (prop.constructor === Object && Object.keys(prop).length === 0);

    render() {
      return this.isEmpty(this.props[loadingProp]) ? (
        <h1>Loading...</h1>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default LoaderHOC;