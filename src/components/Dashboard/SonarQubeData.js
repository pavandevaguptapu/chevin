import React, { Component } from "react";

import axios from "axios";

class SonarQubeData extends Component {
  _;
  constructor(props) {
    super(props);
    this.state = {
      sonarQubeData: {
        bugs: "",
        vulnerabilities: "",
        codesmells: "",
        duplicatedBlocks: "",
        duplications: "",
        script: "",
        linesofcode: ""
      }
    };
  }

  componentWillMount() {
    axios
      .post(`sbtpgateway/tp/rest/esccors/generic/`, {
        resourceURL:
          "http://172.16.25.50:9000/api/measures/component?additionalFields=metrics,periods&componentKey=FIC&metricKeys=alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,code_smells,new_code_smells,sqale_rating,sqale_index,new_technical_debt,overall_coverage,new_overall_coverage,coverage,new_coverage,it_coverage,new_it_coverage,new_lines_to_cover,new_it_lines_to_cover,new_overall_lines_to_cover,tests,duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution",
        userName: "admin",
        password: "admin",
        actionMethod: "get"
      })
      .then(response => {
        var i;
        // 	this.state.closedIssues=[]
        // 	this.state.openIssues=[]
        for (i = 0; i < response.data.component.measures.length; i++) {
          if (response.data.component.measures[i].metric == "bugs") {
            this.state.bugs = response.data.component.measures[i].value;
          }
          if (response.data.component.measures[i].metric == "vulnerabilities") {
            this.state.vulnerabilities =
              response.data.component.measures[i].value;
          }
          if (response.data.component.measures[i].metric == "code_smells") {
            this.state.codesmells = response.data.component.measures[i].value;
          }

          if (
            response.data.component.measures[i].metric == "duplicated_blocks"
          ) {
            this.state.duplicatedBlocks =
              response.data.component.measures[i].value;
          }
          if (
            response.data.component.measures[i].metric ==
            "duplicated_lines_density"
          ) {
            this.state.duplications = response.data.component.measures[i].value;
          }
          if (
            response.data.component.measures[i].metric ==
            "ncloc_language_distribution"
          ) {
            this.state.script = response.data.component.measures[i].value;
          }
          if (response.data.component.measures[i].metric == "ncloc") {
            this.state.linesofcode = response.data.component.measures[i].value;
          }
        }
        this.setState({
          sonarQubeData: {
            bugs: this.state.bugs,
            vulnerabilities: this.state.vulnerabilities,
            codesmells: this.state.codesmells,
            duplicatedBlocks: this.state.duplicatedBlocks,
            duplications: this.state.duplications,
            script: this.state.script,
            linesofcode: this.state.linesofcode
          }
        });

        //  this.props.sonarQubeDetails(this.state.sonarQubeData);
      });
  }

  render() {
    return (
      <div className="col-md-12 padding0">
        {/* <div className="col-md-12 col-lg-12 marginB08 textAlignCenter ">
                      <h5>Quality Overview</h5>
                  </div> */}

        <div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">
          <div className="col-md-3 col-lg-4 textAlignCenter">
            Bugs
            <div className="textAlignCenter">
              {this.state.sonarQubeData.bugs}
            </div>
          </div>
          <div className="col-md-4 col-lg-4 textAlignCenter">
            {" "}
            Vulnerabilities
            <div className="textAlignCenter">
              {this.state.sonarQubeData.vulnerabilities}
            </div>
          </div>
          <div className="col-md-5 col-lg-4 textAlignCenter">
            Code Smells
            <div className="textAlignCenter">
              {this.state.sonarQubeData.codesmells}
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">
          <div className="col-md-3 col-lg-4 textAlignCenter">
            {" "}
            Debt
            <div className="textAlignCenter">{}</div>
          </div>
          <div className="col-md-4 col-lg-4 textAlignCenter">
            Duplications
            <div className="textAlignCenter">
              {this.state.sonarQubeData.duplications}
            </div>
          </div>
          <div className="col-md-5 col-lg-4 textAlignCenter">
            {" "}
            Duplicated Blocks
            <div className="textAlignCenter">
              {this.state.sonarQubeData.duplicatedBlocks}
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">
          <div className="col-md-3 col-lg-4 textAlignCenter">
            {" "}
            Lines of Code
            <div className="textAlignCenter">
              {this.state.sonarQubeData.linesofcode}
            </div>
          </div>

          <div className="col-md-4 col-lg-4 textAlignCenter wordwrap">
            Script Lines
            <div className="textAlignCenter">
              {this.state.sonarQubeData.script}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SonarQubeData;
