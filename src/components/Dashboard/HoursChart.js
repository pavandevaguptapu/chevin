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
        <div className="col-md-12 col-lg-11 justify padding0 marginTop6">
          <ResponsiveContainer width="100%" aspect={5.0 / 2.8}>
            <LineChart data={this.props.data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="1 1" />
              <Legend />
              <Line type="stepAfter" dataKey="hr" stroke="#82ca9d" />
              <Line type="monotone" dataKey="y" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default Hourschart;
