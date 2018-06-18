import React, { Component } from 'react';
//  import '../../App.css';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ProgressBar } from 'react-bootstrap';

export default class IndividualIssueProgressBar extends Component {
    state = {
        individualIssuesProgressArray: [],
        totalIssueCount: 0
    }

    getIndivudualUSerIsues = (user) => {
        axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
            resourceURL: "https://fullyincontrol.atlassian.net/rest/api/2/status",
            userName: "koteswararao.b@comakeit.com",
            password: "Abc@1234",
            actionMethod: "get"
        })
            .then(response => {
                var statusArray = [];
                response.data.forEach(function (eachStatus) {
                    statusArray.push({ "name": eachStatus.name, "issueCount": 0, "weightage": "","color":eachStatus.statusCategory.colorName });
                });



                axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
                    resourceURL: "https://fullyincontrol.atlassian.net/rest/api/2/search?jql=assignee=" + user + "&fields=id,issuetype,status",
                    userName: "koteswararao.b@comakeit.com",
                    password: "Abc@1234",
                    actionMethod: "get"
                })
                    .then(response => {
                        var issuesDataArray = [];
                        console.log(response.data.issues)
                        var allIssues = response.data.issues

                        if (response.data.issues.length !== 0) {
                            allIssues.forEach(function (eachIssueDetails) {
                                var obj = statusArray.find(function (obj) { return obj.name === eachIssueDetails.fields.status.name });
                                obj.issueCount++

                            });

                            for (var i = 0; i < statusArray.length; i++) {
                                console.log(statusArray[i].issueCount, allIssues.length, (statusArray[i].issueCount / allIssues.length) * 100)
                                statusArray[i].weightage = (statusArray[i].issueCount / allIssues.length) * 100 + "%"
                                
                            }

                            console.log(statusArray)

                            this.setState({ individualIssuesProgressArray: statusArray })
                        } else {

                        }
                    }, (error) => {
                        console.log("error")
                    });
            })
    }

    componentDidMount() {
        console.log(this.props)
        var user = this.props.selectedUser
        this.getIndivudualUSerIsues(user)

    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        var user = nextProps.selectedUser
        this.getIndivudualUSerIsues(user)
    }

    render() {

        return (

            <div className="col-md-12 col-lg-12 padding0">         

                <div class="progress" style={{height: "55px",width: "100%",border:"1px solid #d4d1d1",borderRadius:"10px"}}>
                    {this.state.individualIssuesProgressArray.map((eachStatus, i) => (
                        <div key={i} style={{
                            width: this.state.individualIssuesProgressArray[i] !== undefined ?
                            eachStatus.weightage : 0,backgroundColor:eachStatus.color,borderRight:"1px solid grey"
                        }}>                              
                        </div>                
                    ))}
                </div>
                <div className="displayInline m-2" >
                    {this.state.individualIssuesProgressArray.map((eachStatus, i) => (
                        <div className="displayInline m-2">
                        <div className="mr-1" style={{marginTop:"2px",backgroundColor:eachStatus.color,width: "20px",height: "20px", border:"1px solid #d4d1d1",borderRadius: "10px"}}> </div> 
                        <div key={i} className={[eachStatus.color].join('')}>        
                        {eachStatus.name}-{eachStatus.weightage}                 
                       
                        </div>       
                        </div>        
                    ))}
                </div>

            </div>

        )
    }

}

