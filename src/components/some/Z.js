import React, { Component } from 'react'
import LoaderHOC from '../HOC/LoaderHOC';

import RefreshIndicatorExampleLoading from '../Dashboard/RefreshIndicatorExampleLoading';

class Z extends Component {

    render() {
        return (
            <div>
               asd
            </div>
        )
    }
}

export default (LoaderHOC)('e')(Z);