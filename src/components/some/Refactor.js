import React, { Component } from 'react'
import { Card, CardHeader } from "material-ui";
import GridLayout from "react-grid-layout";
import { WidthProvider, Responsive } from "react-grid-layout";
import css from "../../../node_modules/react-grid-layout/css/styles.css";
import css1 from "../../../node_modules/react-resizable/css/styles.css";

import Y from './Y';
import Z from './Z';

import LoaderHOC from '../HOC/LoaderHOC';

const navBarContainer = {
    navBarbg: {
        backgroundColor: "#ffd91d"
    },
    widgetContainer: {
        backgroundColor: "#3d393a",
        minHeight: "100vh",
        widgetCard: {
            height: "20rem",
            margin: "5px",
            overflow: "auto"
        }
    }
};



const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Refactor extends Component {
    state = {
        widgets: [
            {
                name: "One",
                _id: 1,
                dataGrid: { x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }
            },
            {
                name: "Two",
                _id: 2,
                dataGrid: { x: 4, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }
            },
            {
                name: "Three",
                _id: 3,
                dataGrid: { x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }
            },
            {
                name: "Four",
                _id: 4,
                dataGrid: { x: 0, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }
            },
            {
                name: "Five",
                _id: 5,
                dataGrid: { x: 4, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }
            },
            {
                name: "Six",
                _id: 6,
                dataGrid: { x: 8, y: 0, w: 4, h: 8.5, minW: 4, minH: 8.5 }
            },
        ]
    }

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    className="layout clearfix"
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={30}
                    width={1200}
                >
                    {this.state.widgets.map(widget => (
                        <Card
                            style={navBarContainer.widgetContainer.widgetCard}
                            key={widget._id}
                            data-grid={{ x: widget.dataGrid.x, y: widget.dataGrid.y, w: widget.dataGrid.w, h: widget.dataGrid.h }}
                        >
                            <div className="d-flex custom_dashboard-header justify-content-between">
                                <CardHeader title={widget.name} className="p-0" />
                            </div>
                            <div className="col-lg-12 text-center">
                            <Y />
                              
                            </div>
                        </Card>
                    ))}
                </ResponsiveReactGridLayout>
            </div>
        )
    }
}

// const loader = LoaderHOC('widgets')(Refactor)
export default Refactor;