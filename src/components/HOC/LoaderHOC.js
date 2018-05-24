import React, { Component } from "react";

const LoaderHOC = loadingProp => WrappedComponent => class  extends Component {
    isEmpty = prop =>
      prop === null ||
      prop === undefined ||
      (prop.hasOwnProperty("length") && prop.length === 0) ||
      (prop.constructor === Object && Object.keys(prop).length === 0);

    render() {
        debugger;
      return this.isEmpty(this.props[loadingProp]) ? (
          <div>
        <h1>Loading...</h1>
        <WrappedComponent {...this.props} {...this.state}/>
        </div>
      ) : (
        <WrappedComponent {...this.props} {...this.state}/>
      );
    }
  };

export default LoaderHOC;