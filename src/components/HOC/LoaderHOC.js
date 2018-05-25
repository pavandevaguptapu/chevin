import React, { Component } from "react";
import RefreshIndicatorExampleLoading from "../Dashboard/RefreshIndicatorExampleLoading";

const LoaderHOC = loadingProp => WrappedComponent => class  extends Component {
    isEmpty = prop =>
      prop === null ||
      prop === undefined ||
      (prop.hasOwnProperty("length") && prop.length === 0) ||
      (prop.constructor === Object && Object.keys(prop).length === 0);

    render() {
      return this.isEmpty(this.props[loadingProp]) ? (
        <RefreshIndicatorExampleLoading />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default LoaderHOC;