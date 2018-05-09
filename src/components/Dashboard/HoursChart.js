import React, { Component } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class Hourschart extends Component {
  render() {
    return (
      <div>
        <div className="col-md-12 col-lg-12 justify padding0">
          <ResponsiveContainer width="100%" aspect={5.0 / 2.8}>
            <LineChart data={this.props.data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="1 1" />
              <Legend />
              <Line type="stepAfter" dataKey="hr" stroke="green"  name="BurnUp"/>
              <Line type="stepAfter" dataKey="hr1" stroke="red"  name="BurnDown"/>
              {/* <Line type="monotone" dataKey="y" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default Hourschart;
