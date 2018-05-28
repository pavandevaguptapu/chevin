import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import axios from 'axios';


class Automation extends Component {
    constructor(props) {
        super(props);
    
    this.state = {     
        inputObj:{}
    }
}
    handleChange = (e) => {
        var tempObj = this.state.inputObj
        tempObj[e.target.name] = e.target.value

        this.setState({
            inputObj: tempObj,
        });
    };
    github(reponame, sorceCodeUrl) {
        console.log(reponame, sorceCodeUrl)
        axios.post(`http://192.168.29.25:8087/sbtpgateway/tp/rest/esccors/generic/`, {
            "resourceURL": "https://api.github.com/repos/pavandevaguptapu/" + reponame + "/import",
            "userName": "pavankumar.d@comakeit.com", "password": "Abc@1234", "actionMethod": "put",
            "postParams": {
                "vcs_url": "https://pavankumard@bitbucket.org/coesb/sb-code.git",
                "vcs_username": "pavankumar.d@comakeit.com",
                "vcs_password": "Abc@1234"
            },
            "headersToForward": [
                {
                    "headerName": "Accept",
                    "headerValue": "application/vnd.github.barred-rock-preview"
                }
            ]
        }
        ).then(response => {
            console.log(response)
            // axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
            //     "resourceURL": "https://api.github.com/repos/coMakeIT-Git/" + reponame + "/hooks",
            //     "userName": "comakeit-github", "password": "Abc@123456", "actionMethod": "post",
            //     postParams: {
            //         "name": "web",
            //         "config": { "url": "http://192.168.29.25:8080/job/" + reponame + "/build" ,"content_type": "text/xml"}

            //     },
            //     headersToForward: [
            //         {
            //             "headerName": "Accept",
            //             "headerValue": "application/json"
            //         }
            //     ]
            // })
        })
        // axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
        //     "resourceURL": "https://api.github.com/repos/coMakeIT-Git/"+reponame+"/hooks",
        //     "userName": "comakeit-github", "password": "Abc@123456", "actionMethod": "post",
        //     postParams: {
        //         "name": "web",
        //         "config": {"url":"http://192.168.29.25:8080/job/" + reponame + "/build"}

        //     },                              
        //     headersToForward: [
        //         {
        //             "headerName": "Accept",
        //             "headerValue": "application/json"                    
        //         }
        //     ]
        // })       


    }
    submitData(githubObj) {
        console.log(githubObj)
        var XMLWriter = require('xml-writer');
        var xw = new XMLWriter;
        xw.startDocument();
        xw.startElement('project');
        xw.writeElement('description', '2');
        xw.writeElement('keepDependencies', 'false');
        xw.startElement('scm');
        xw.writeAttribute('class', 'hudson.plugins.scm_sync_configuration');
        xw.writeElement('configVersion', '2');
        xw.startElement('userRemoteConfigs')
        xw.startElement('hudson.plugins.git.UserRemoteConfig')
        xw.writeElement('url', 'http://172.16.25.50:8080/scm/git/Spring')
        xw.endElement()
        xw.endElement()
        xw.startElement('branches')
        xw.startElement('hudson.plugins.git.BranchSpec')
        xw.writeElement('name', '*/master')
        xw.endElement()
        xw.writeElement('doGenerateSubmoduleConfigurations', 'false')
        xw.endElement()
        xw.endElement()
        xw.writeElement('canRoam', 'true')
        xw.writeElement('disabled', 'false')
        xw.writeElement('blockBuildWhenDownstreamBuilding', 'false')
        xw.writeElement('blockBuildWhenUpstreamBuilding', 'false')
        xw.startElement('triggers')
        xw.startElement('hudson.triggers.SCMTrigger')
        xw.writeElement('spec', 'h/15****')
        xw.writeElement('ignorePostCommitHooks', 'false')
        xw.endElement()
        xw.endElement()
        xw.writeElement('concurrentBuild', 'false')
        xw.startElement('builders')
        xw.startElement('hudson.tasks.BatchFile')
        xw.writeElement('command', 'npm install')
        xw.endElement()
        xw.startElement('hudson.tasks.BatchFile')
        xw.writeElement('command', 'npm run build')
        xw.endElement()
        xw.startElement('hudson.plugins.sonar.SonarRunnerBuilder')
        xw.writeElement('properties', 'sonar.projectKey=sonarproject sonar.projectName=Simple Project  sonar.projectVersion=1.0 sonar.sources=src')
        xw.endElement()
        xw.writeElement('jdk', '(Inherit From Job)')
        xw.endElement()
        xw.endElement()
        xw.endDocument();
        var xml = xw.toString();
       // this.setState({ githubInstanceDetails: githubObj })

        axios.post(`http://192.168.29.84:8087/sbtpgateway/tp/rest/esccors/generic/`, {
            "resourceURL":"https://api.github.com/user/repos",
            "userName":"pavankumar.d@comakeit.com", "password": "Abc@1234", "actionMethod": "post",
            "postParams":{
                "name": githubObj.repoName,
                "description": "This is your first repository"
            },
            "headersToForward": [
                {
                    "headerName": "Accept",
                    "headerValue": "application/vnd.github.mercy-preview+json"

                }
            ]
        }).then(response => {
                console.log(response)
            // var data = JSON.stringify({
            //     "resourceURL": "http://172.16.25.50:8080/createItem?name=" + githubObj.repoName,
            //     "userName": "admin",
            //     "password": "97992727007343c2b0f644438fd67e36",
            //     "actionMethod": "post",
            //     "postParams": xml,
            //     "headersToForward": [
            //         {
            //             "headerName": "Accept",
            //             "headerValue": "text/xml"
            //         },
            //         {
            //             "headerName": "Content-Type",
            //             "headerValue": "text/xml"
            //         }
            //     ]
            // });

            // var xhr = new XMLHttpRequest();
            // xhr.withCredentials = true;

            // xhr.addEventListener("readystatechange", function () {
            //     console.log(this.readyState)
            //     if (this.readyState === 4) {
            //         console.log("xhr")

            //     }

            //            this.github(this.state.githubInstanceDetails.repoName,this.state.githubInstanceDetails.projectUrl)



            // }.bind(this))
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState === 4) {
            //         console.log(xhr.response);
            //         this.github(githubObj.repoName, githubObj.sourceCodeUrl)
            //     }
            // }.bind(this)

            // xhr.open("POST", "http://192.168.29.25:8087/sbtpgateway/tp/rest/esccors/generic/");
            // xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.setRequestHeader("Cache-Control", "no-cache");
            // xhr.setRequestHeader("Postman-Token", "56a8ca1a-c164-49a5-8f97-4ce631088e8e");
            // xhr.send(data)

        })
    }
    componentDidMount=()=>{
       console.log(localStorage.getItem('token'))
   }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-12 col-lg-12 navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
                        <div className="col-md-12 col-lg-12 textAlignCenter marginT07">
                            <h5 className="">Automation</h5>
                        </div>
                        <div>
                        </div>
                    </nav>
                </div>  
                <div>
                    <TextField
                        id="text-field-controlled"
                        value={this.state.inputObj.repoName}
                        onChange={this.handleChange}
                        hintText="Repository Name"
                        floatingLabelText="Repository Name"
                        name="repoName"
                    />
                </div>
                <div>
                    <TextField
                        id="text-field-controlled"
                        value={this.state.inputObj.sourceCodeUrl}
                        onChange={this.handleChange}
                        hintText="SourceCode Url"
                        floatingLabelText="SourceCode Url"
                        name="sourceCodeURL"
                    />
                </div>
                <div>
                    <RaisedButton
                        primary={true}
                        onClick={() => this.submitData(this.state.inputObj)}
                    >SAVE
                    </RaisedButton>
                </div>           
            </div>
        );
    }
}

export default Automation;