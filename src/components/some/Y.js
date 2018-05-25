import React, { Component } from 'react'
import Z from './Z';
import RefreshIndicatorExampleLoading from '../Dashboard/RefreshIndicatorExampleLoading';
import ErrorBoundary from '../HOC/WidgetsHOC';
export default class Y extends Component {
    state = {
        dummyArray: ''
    }
    onToggleView = (view) => {
        this.setState({
            dummyArray: 1
        })        
    
    }
    onToggleView2 = (view) => {
        this.setState({
            dummyArray: ''
          
        });
    } 

  render() {
    return (
      <div>
                <button onClick={this.onToggleView}>start</button>
                <button onClick={this.onToggleView2}>stop</button>
                <ErrorBoundary>          
                <Z  e={this.state.dummyArray}/>
                </ErrorBoundary>
      </div>
    )
  }
}
