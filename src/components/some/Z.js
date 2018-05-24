import React, { Component } from 'react'
import LoaderHOC from '../HOC/LoaderHOC';

import RefreshIndicatorExampleLoading from '../Dashboard/RefreshIndicatorExampleLoading';

class Z extends Component {
    state = {
        visibleView:'',
        
    }

    onToggleView = (view) => {
        this.setState({
            // visibleView: <RefreshIndicatorExampleLoading />
            D:[]
          });
    }
    onToggleView2 = (view) => {
        this.setState({
            // visibleView: 2
            D:['1']
          });        
    }    

    render() {
        return (
            <div>
                <button onClick={this.onToggleView}>start</button>
                <button onClick={this.onToggleView2}>stop</button>
                <div>
                    {this.state.visibleView}
                </div>
            </div>
        )
    }
}

export default (LoaderHOC)('E')(Z);