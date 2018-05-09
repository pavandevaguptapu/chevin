import React, { Component } from "react";

import axios from "axios";

class Jenkins extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  componentWillMount() {
    // axios
    //   .post(`sbtpgateway/tp/rest/esccors/generic12/`, {
    //     resourceURL:
    //       "http://192.168.29.25:8080/job/samplejob/api/json?tree=builds[number,status,timestamp,id,result]",
    //     userName: "admin",
    //     password: "admin",
    //     actionMethod: "get",
    //     headersToForward: [
    //         {
    //             "headerName": "Accept",
    //             "headerValue": "text/xml"
    //         }
    //     ] 
    //   })
    axios.post("http://192.168.29.25:8080/job/a/api/json?tree=builds[number,status,timestamp,id,result",{


    })
      .then(response => {
        console.log(response)
  
        // this.setState({
        //   sonarQubeData: {
        //     bugs: this.state.bugs,
        //     vulnerabilities: this.state.vulnerabilities,
        //     codesmells: this.state.codesmells,
        //     duplicatedBlocks: this.state.duplicatedBlocks,
        //     duplications: this.state.duplications,
        //     script: this.state.script,
        //     linesofcode: this.state.linesofcode
        //   }
        //});

        //  this.props.sonarQubeDetails(this.state.sonarQubeData);
      });
  }

  render() {
    return (
      <div className="col-md-12 padding0">
        {/* <div className="col-md-12 col-lg-12 marginB08 textAlignCenter ">
                      <h5>Quality Overview</h5>
                  </div> */}
{/* 
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
        </div> */}
{/* 
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
        </div> */}

        {/* <div className="col-md-12 col-lg-12 displayInline  marginB08 borderRadius">
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
        </div> */}
      </div>
    );
  }
}

export default Jenkins;
