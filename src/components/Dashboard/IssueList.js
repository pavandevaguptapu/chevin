import React, { Component } from "react";

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      epicsArray: [],
      issuesArray: [],
      height: "300px",
      showCheckboxes: false,
      issuesHeaderItems: []
    };
  }
  componentDidMount() {
    for (var i = 0; i < 1; i++) {
      var headerItems = Object.keys(this.props.issuesArray[1]);
    }
    this.setState({
      issuesArray: this.props.issuesArray,
      issuesHeaderItems: headerItems
    });
  }
  render() {
    return (
      <div className="col-md-12 col-lg-12 padding0">
        <table className="table table-fixed">
          <thead className="">
            <tr className="epicdetailstableheadrowStyle">
              {this.state.issuesHeaderItems.map((row, i) => (
                <th className="epictableheadverticalalign" key={i}>
                  {row}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.issuesArray.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map(rowValue => (
                  <td className="epicTableDataStyle">{rowValue}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IssuesList;
