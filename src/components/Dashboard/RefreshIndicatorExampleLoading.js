import React, { Component } from "react";

import RefreshIndicator from "material-ui/RefreshIndicator";

const style = {
  refresh: {
    display: "inline-block",
    position: "relative",
    boxShadow: "none",
    backgroundColor: "none"
  },
};

class RefreshIndicatorExampleLoading extends Component {
  state = {
    laoderStatus: this.props.status
  };

  render() {
    return (
      <div>
        <RefreshIndicator
          size={50}
          left={5}
          top={100}
          status={this.state.laoderStatus}
          style={style.refresh}
          loadingColor={"grey"}
        />
      </div>
    );
  }
}

export default RefreshIndicatorExampleLoading;
