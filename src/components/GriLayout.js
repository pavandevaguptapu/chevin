import React from "react";
import GridLayout from 'react-grid-layout';

import css from '../../node_modules/react-grid-layout/css/styles.css';
import css1 from '../../node_modules/react-resizable/css/styles.css';


class GriLayout extends React.Component {
    render() {
      // layout is an array of objects, see the demo for more complete usage

      return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div key="as" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
        <div key="bs" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
        <div key="cs" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
        <div key="css" data-grid={{x: 4, y: 0, w: 1, h: 2}}>d</div>
      </GridLayout>
      )
    }
  }


export default GriLayout;
