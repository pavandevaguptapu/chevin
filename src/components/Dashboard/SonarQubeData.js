import React, { Component } from "react";
import { Card, CardHeader } from "material-ui";
import { kFormatter } from '../../shared/Helpers';
import axios from "axios";

const qualityContainerCards = {
  qualityCardDetails: {
    width: '7rem',
    height: '6rem',
    fontWeight: '300',
    margin: '4px 0',
    qualityCardBugNum: {
      fontSize: '3em',
      color: '#2a769c',
      borderBottom: '1px solid #2a769c',
    },
    qualityCardText: {
      fontSize: '13px'
    }
  }
}

class SonarQubeData extends Component {
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
      <div className="d-flex justify-content-between flex-row flex-wrap">
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span className="text-danger" style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.bugs)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Bugs</div>
          </Card>
        </div>
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.vulnerabilities)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Vulnerabilities</div>
          </Card>
        </div>
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.codesmells)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Code Smells</div>
          </Card>
        </div>
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.codesmells)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Debt</div>
          </Card>
        </div>
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.duplications)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Duplications</div>
          </Card>
        </div>
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.duplicatedBlocks)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Duplicated Blocks</div>
          </Card>
        </div>
        <div>
          <Card style={qualityContainerCards.qualityCardDetails} className="d-flex justify-content-center align-items-center">
            <span style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.linesofcode)}</span>
            <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Lines of Code</div>
          </Card>
        </div>
        {/* <div className="text-truncate">
            <Card style={qualityContainerCards.qualityCardDetails}  className="d-flex justify-content-center align-items-center">
                <span  style={qualityContainerCards.qualityCardDetails.qualityCardBugNum}>{kFormatter(this.state.sonarQubeData.script)}</span>
                <div style={qualityContainerCards.qualityCardDetails.qualityCardText}>Script Lines</div>
            </Card>
        </div> */}
      </div>
    );
  }
}

export default SonarQubeData;
