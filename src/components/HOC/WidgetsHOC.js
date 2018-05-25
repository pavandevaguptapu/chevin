import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui';

const style = {
  width: '350px',
  marginLeft: '20px',
  marginTop: '20px',
  display: 'inline-block'
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    });
    console.log(error, errorInfo, "asds")
  }
  render() {
    if(this.state.hasError) {
      return (
        <Card style={style}>

          <CardTitle
            title="Sorry Something went wrong!!!"
            subtitle="Error catched by error boundary of react 16"
          />
        </Card>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

