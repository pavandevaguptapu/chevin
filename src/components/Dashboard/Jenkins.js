import React, { Component } from "react";

import axios from "axios";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class Jenkins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenkinsData:{
        "_class": "hudson.model.FreeStyleProject",
        "builds": [
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#8",
                "id": "8",
                "number": 8,
                "result": "SUCCESS",
                "timestamp": 1523016724899
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#7",
                "id": "7",
                "number": 7,
                "result": "SUCCESS",
                "timestamp": 1523015594696
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#6",
                "id": "6",
                "number": 6,
                "result": "SUCCESS",
                "timestamp": 1523012339146
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#5",
                "id": "5",
                "number": 5,
                "result": "SUCCESS",
                "timestamp": 1523012169120
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#4",
                "id": "4",
                "number": 4,
                "result": "SUCCESS",
                "timestamp": 1523011829065
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#3",
                "id": "3",
                "number": 3,
                "result": "SUCCESS",
                "timestamp": 1523011088951
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#2",
                "id": "2",
                "number": 2,
                "result": "SUCCESS",
                "timestamp": 1522999549786
            },
            {
                "_class": "hudson.model.FreeStyleBuild",
                "displayName": "#1",
                "id": "1",
                "number": 1,
                "result": "SUCCESS",
                "timestamp": 1522933379625
            }
        ]
    },
    height: "194px",
    showCheckboxes: false
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
    // axios.post("http://192.168.29.25:8080/job/a/api/json?tree=builds[number,status,timestamp,id,result",{


    // })
    //   .then(response => {
    //     console.log(response)
  
    //     this.setState({
    //       jenkinsData: {
    //         bugs: this.state.bugs,
    //         vulnerabilities: this.state.vulnerabilities,
    //         codesmells: this.state.codesmells,
    //         duplicatedBlocks: this.state.duplicatedBlocks,
    //         duplications: this.state.duplications,
    //         script: this.state.script,
    //         linesofcode: this.state.linesofcode
    //       }
    //     });

    //     //  this.props.sonarQubeDetails(this.state.sonarQubeData);
    //   });

  }

  render() {

    return (
      <div className="col-md-12 padding0">             
        <div>
{/*   
           {
            this.state.jenkinsData.builds.map(function(item,i){
           return <div>
           <div key={i} className="displayInline">
             job-{item.id}
             <div>{item.result}
               </div>

             </div> 
            
             </div> 
             })

          }  */}
          <Table height={this.state.height}>
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>Job</TableHeaderColumn>             
                <TableHeaderColumn>job ID</TableHeaderColumn>
                <TableHeaderColumn>job status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {this.state.jenkinsData.builds.map((item, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{item.id}</TableRowColumn>
                  <TableRowColumn>{item.displayName}</TableRowColumn>
                  <TableRowColumn>{item.result}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
</div>
      </div>
    );
  }
}

export default Jenkins;
