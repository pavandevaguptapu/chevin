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

class Piechart extends Component {
  state = {
    doneArrayList: [],
    inprogressArrayList: [],
    todoArrayList: [],
    inqaArrayList: [],
    doneArrayListlength: "",
    inprogressArrayListlength: "",
    todoArrayListlength: "",
    inqaArrayListlength: ""
    };

  componentWillMount() {
    this.state.doneArrayList = this.props.sprinttList.issues.filter(function(
      issue
    ) {
      if (issue.fields.status.statusCategory.name === "Done") {
        return issue;
      }
    });
    this.state.inprogressArrayList = this.props.sprinttList.issues.filter(
      function(issue) {
        if (issue.fields.status.statusCategory.name === "In Progress") {
          return issue;
        }
      }
    );
    this.state.todoArrayList = this.props.sprinttList.issues.filter(function(
      issue
    ) {
      if (issue.fields.status.statusCategory.name === "To Do") {
        return issue;
      }
    });

    this.state.inqaArrayList = this.props.sprinttList.issues.filter(function(
      issue
    ) {
      if (issue.fields.status.statusCategory.name === "In QA") {
        return issue;
      }
    });

    this.setState({
      doneArrayListlength: this.state.doneArrayList.length,
      inprogressArrayListlength: this.state.inprogressArrayList.length,
      todoArrayListlength: this.state.todoArrayList.length,
      inqaArrayListlength: this.state.inqaArrayList.length
    });
  }

  componentWillReceiveProps(nextProps) {
    this.state.doneArrayList = nextProps.sprinttList.issues.filter(function(
      issue
    ) {
      if (issue.fields.status.statusCategory.name === "Done") {
        return issue;
      }
    });
    this.state.inprogressArrayList = nextProps.sprinttList.issues.filter(
      function(issue) {
        if (issue.fields.status.statusCategory.name === "In Progress") {
          return issue;
        }
      }
    );
    this.state.todoArrayList = nextProps.sprinttList.issues.filter(function(
      issue
    ) {
      if (issue.fields.status.statusCategory.name === "To Do") {
        return issue;
      }
    });

    this.state.inqaArrayList = nextProps.sprinttList.issues.filter(function(
      issue
    ) {
      if (issue.fields.status.statusCategory.name === "In QA") {
        return issue;
      }
    });

    this.setState({
      doneArrayListlength: this.state.doneArrayList.length,
      inprogressArrayListlength: this.state.inprogressArrayList.length,
      todoArrayListlength: this.state.todoArrayList.length,
      inqaArrayListlength: this.state.inqaArrayList.length
    });
  }

  render() {

    const todoArrayPercentage = Math.round(
      this.state.todoArrayListlength /
        (this.state.todoArrayListlength +
          this.state.inprogressArrayListlength +
          this.state.inqaArrayListlength +
          this.state.doneArrayListlength) *
        100
    );
    const inprogressArrayPercentage = Math.round(
      this.state.inprogressArrayListlength /
        (this.state.todoArrayListlength +
          this.state.inprogressArrayListlength +
          this.state.inqaArrayListlength +
          this.state.doneArrayListlength) *
        100
    );
    const inqaArrayPercentage = Math.round(
      this.state.inqaArrayListlength /
        (this.state.todoArrayListlength +
          this.state.inprogressArrayListlength +
          this.state.inqaArrayListlength +
          this.state.doneArrayListlength) *
        100
    );
    const doneArrayPercentage = Math.round(
      this.state.doneArrayListlength /
        (this.state.todoArrayListlength +
          this.state.inprogressArrayListlength +
          this.state.inqaArrayListlength +
          this.state.doneArrayListlength) *
        100
    );

    const data = [
      { name: "Group C", value: this.state.todoArrayListlength },
      { name: "Group B", value: this.state.inprogressArrayListlength },
      { name: "Group D", value: this.state.inqaArrayListlength },
      { name: "Group A", value: this.state.doneArrayListlength }
    ];
    const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      data,
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return `${(percent * 100).toFixed(0)}%`;
    };
    return (
      <div>
        {/* <div className="col-md-12 col-lg-12 textAlignCenter ">
                      <h5>Sprint Overview</h5>
                  </div> */}
        <div
          className="col-lg-12 padding0  displayInline"
          style={{height:'16rem'}}
        >
          <div className="col-md-8 col-lg-9 justify padding0">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  //nameKey='name'
                  dataKey="value"
                  data={data}
                  cx={150}
                  cy={150}
                  //labelLine={true}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  animationEasing="ease-in-out"
                  //PieLabelStyle ='outside'
                >
                  {data.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} key={index} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-md-3  col-lg-3 justify padding0">
            <div className="displayInline sprintStatusMenuWidth">
              <div
                className="borderRadius"
                style={{
                  backgroundColor: "#FF8042",
                  width: "20px",
                  height: "20px",
                  border: "10px solid #FF8042"
                }}
              />

              <div className="col-md-12 padding0">
                <label>{todoArrayPercentage}% To Do </label>
              </div>
            </div>
            <div className="displayInline sprintStatusMenuWidth">
              <div
                className="borderRadius"
                style={{
                  backgroundColor: "#00C49F",
                  width: "20px",
                  height: "20px",
                  border: "10px solid #00C49F"
                }}
              />

              <div className="col-md-12 padding0">
                <label>{inprogressArrayPercentage}% Progress</label>
              </div>
            </div>
            <div className="displayInline sprintStatusMenuWidth">
              <div
                className="borderRadius"
                style={{
                  backgroundColor: "#FFBB28",
                  width: "20px",
                  height: "20px",
                  border: "10px solid #FFBB28"
                }}
              />

              <div className="col-md-12 padding0">
                <label>{inqaArrayPercentage}% In QA</label>
              </div>
            </div>
            <div className="displayInline sprintStatusMenuWidth">
              <div
                className="borderRadius"
                style={{
                  backgroundColor: "#0088FE",
                  width: "20px",
                  height: "20px",
                  border: "10px solid #0088FE"
                }}
              />

              <div className="col-md-12 padding0">
                <label>{doneArrayPercentage}% Done</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Piechart;
