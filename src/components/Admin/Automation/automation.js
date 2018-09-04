import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import axios from 'axios';
const automation={
    textStyle:{
      color:"#fff"
    },
    floatingLabelStyle: {
      color: "#fff"
    },
    hintStyle:{
      color:"#ffd91d"
    },
    underlineStyle: {
      borderColor: "#fff"
    }
  }
class Automation extends Component {
    constructor(props) {
        super(props);
    
    this.state = {     
        inputObj:{},
        loading: false,
        finished: false,
        stepIndex: 0,
        RepoName : "",
        inputTech: "",
    }
}
    handleChange = (e) => {
        var tempObj = this.state.inputObj
        tempObj[e.target.name] = e.target.value

        this.setState({
            inputObj: tempObj,
        });
    };

    handleTechChange = (e) => {
        var tempTech = this.state.inputTech
        tempTech = e.target.value
        this.setState({
            inputTech: tempTech,
        })
        this.handleNext();
    }
    CreateGitRepo(githubObj){
        axios.post(`http://172.16.25.50:8585/sbsecureapi/sbtpgateway/generic`, {
            "resourceURL":"https://api.github.com/user/repos",
            "userName":"pavankumar.d@comakeit.com", "password":"Abc@1234", "actionMethod":"post",
            "postParams":"{\"name\": \""+ githubObj.repoName +"\",\"description\":\"This is your first repository\"}",
            "headersToForward": [
                {
                    "headerName": "Content-Type",
                    "headerValue": "application/json"

                }
            ]
        }).then(response => {
            if (
                (response.data.name) !== undefined &&
                (response.data.name) != ""
            ) {
                this.handleNext();
                this.setState({
                    repoName: githubObj.repoName,
                    sourceCodeURL: githubObj.sourceCodeURL,
                });
                var data = JSON.stringify({
                    "resourceURL": "https://3f3efaa1.ngrok.io/createItem?name=" + githubObj.repoName,
                    "userName": "admin",
                    "password": "1ce543883f6441ee931fe0adffcacd4e",
                    "actionMethod": "post",
                   // "postParams": xml,
                    "headersToForward": [
                        {
                            "headerName": "Accept",
                            "headerValue": "text/xml"
                        },
                        {
                            "headerName": "Content-Type",
                            "headerValue": "text/xml"
                        }
                        
                    ]
                    
                });
                localStorage.setItem('RepoName',response.data.name);
            }
            if(githubObj.sourceCodeURL){
                var RepoName = localStorage.getItem('RepoName');
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        console.log(xhr.response);
                        this.github(RepoName, githubObj.sourceCodeURL)
                    }
                }.bind(this)
                xhr.open("POST", "http://172.16.25.50:8585/sbsecureapi/sbtpgateway/generic");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Postman-Token", "56a8ca1a-c164-49a5-8f97-4ce631088e8e");
                xhr.send(data)
            }
                
        })
    }

    github(reponame, sorceCodeUrl) {

        let inputTech = this.state.inputTech;
        let sourceCodeURL;
        if(inputTech == ''){
            sourceCodeURL = 'https://pavankumard@bitbucket.org/coesb/sb-code.git';
        }else if(inputTech == 'reactjs'){
            sourceCodeURL = 'https://github.com/mkrishna2025/react_005';
        }
       
        axios.post(`http://172.16.25.50:8585/sbsecureapi/sbtpgateway/generic`, {
            "resourceURL": "https://api.github.com/repos/pavandevaguptapu/" + reponame + "/import",
            "userName": "pavankumar.d@comakeit.com", "password": "Abc@1234", "actionMethod": "put",
            "postParams": "{\"vcs_url\": \"https://pavankumard@bitbucket.org/coesb/sb-code.git\",\"vcs_username\": \"pavankumar.d@comakeit.com\",\"vcs_password\": \"Abc@1234\"}",
            "headersToForward": [
                {
                    "headerName": "Accept",
                    "headerValue": "application/vnd.github.barred-rock-preview"
                }
            ]
        }
        ).then(response => {
            this.checkStatus(reponame, sorceCodeUrl)
        })

    }

    checkStatus(reponame,sorceCodeUrl){
        axios.post(`http://172.16.25.50:8585/sbsecureapi/sbtpgateway/generic`, {
            "resourceURL": "https://api.github.com/repos/pavandevaguptapu/" + reponame + "/import",
            "userName": "pavankumar.d@comakeit.com", "password": "Abc@1234", "actionMethod": "get",
            "postParams": "{\"vcs_url\": \"https://pavankumard@bitbucket.org/coesb/sb-code.git\",\"vcs_username\": \"pavankumar.d@comakeit.com\",\"vcs_password\": \"Abc@1234\"}",
            "headersToForward": [
                {
                    "headerName": "Accept",
                    "headerValue": "application/vnd.github.barred-rock-preview"
                }
            ]
        }
        ).then(response => {
            var status = response.data.status;
            if(response.data.status == "complete"){
               this.CreateHook(reponame,sorceCodeUrl);
            }else{
                console.log(status);
                this.props.setTimeout(this.checkStatus(reponame, sorceCodeUrl), 80000)
               
            }
            
        })
    }

    CreateHook(reponame,sorceCodeUrl){
        axios.post(`http://172.16.25.50:8585/sbsecureapi/sbtpgateway/generic`, {
            "resourceURL": "https://api.github.com/repos/pavandevaguptapu/" + reponame + "/hooks",
            "userName": "pavankumar.d@comakeit.com", "password": "Abc@1234", "actionMethod": "post",
            postParams: "{\"name\": \"web\",\"config\": { \"url\": \"https://3f3efaa1.ngrok.io/job/" + reponame + "/build\" ,\"content_type\": \"text/xml\"}}",
            headersToForward: [
                {
                    "headerName": "Accept",
                    "headerValue": "application/json"
                }
            ]
            })
            this.handleNext();
            localStorage.removeItem('RepoName');
    }

    submitData(githubObj) {
        //console.log(githubObj)
        var XMLWriter = require('xml-writer');
        var xw = new XMLWriter;
        xw.startDocument();
        xw.startElement('project');
        xw.writeElement('description', '2');
        xw.writeElement('keepDependencies', 'false');
        xw.startElement('scm');
        xw.writeAttribute('class', 'hudson.plugins..git.GitSCM"');
        xw.writeElement('configVersion', '2');
        xw.startElement('userRemoteConfigs')
        xw.startElement('hudson.plugins.git.UserRemoteConfig')
        xw.writeElement('url', 'https://api.github.com/pavandevaguptapu/chevin')
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
        this.CreateGitRepo(githubObj)
    }
    componentDidMount=()=>{
       console.log(localStorage.getItem('token'))
   }

   /* */
   dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };
   /* */

    render() {
        const {loading, stepIndex} = this.state;
        const repoName = this.state.repoName;
        const sourceCodeURL = this.state.sourceCodeURL;
        const techName = this.state.inputTech;
        let technoText;
        let repoText;
        let SourceText;
        if(repoName){
            if(techName == ''){
                technoText = <select value={this.state.inputTech} onChange={this.handleTechChange} name="selectedTech">
                        <option value="">Select Technology</option>
                        <option value="reactjs">React js</option>
                        <option value="java">Java</option>
                        <option value="net">.Net</option>
                        <option value="angular">Angular</option>
                    </select>
            }else{
                SourceText = <div><TextField
                            id="text-field-controlled"
                            //value={this.state.inputObj.sourceCodeUrl}
                            onChange={this.handleChange}                        
                            floatingLabelText="SourceCode Url"
                            name="sourceCodeURL"
                            inputStyle={automation.textStyle}
                            floatingLabelStyle={automation.floatingLabelStyle}
                            underlineStyle={automation.underlineStyle}
                            underlineFocusStyle={automation.underlineStyle}
                            floatingLabelStyle={automation.hintStyle}
                            />
                            <div>
                            <RaisedButton
                                primary={true}
                                onClick={() => this.submitData(this.state.inputObj)}
                            >SAVE
                            </RaisedButton>
                            </div></div>
            }
        }else{
            repoText = <div><TextField
                        id="text-field-controlled"
                    // value={this.state.inputObj.repoName}
                        onChange={this.handleChange}                        
                        floatingLabelText="Repository Name"
                        name="repoName"
                        inputStyle={automation.textStyle}
                        floatingLabelStyle={automation.floatingLabelStyle}
                        underlineStyle={automation.underlineStyle}
                        underlineFocusStyle={automation.underlineStyle}
                        floatingLabelStyle={automation.hintStyle}
                        />
                        <div>
                        <RaisedButton
                            primary={true}
                            onClick={() => this.submitData(this.state.inputObj)}
                        >SAVE
                        </RaisedButton>
                        </div></div>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                        <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Creating Git repository  </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>select technology</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Importing SourceCode Url</StepLabel>
                        </Step>
                        </Stepper>
                    </div>
                </div>   
                <div className="row" style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                    <div>
                        {repoText}
                     </div> 
                    <div style={{width: '100%', maxWidth: 150, margin: 'auto'}}>
                        {technoText}
                    </div>
                    <div>
                        {SourceText}
                    </div>
                   
                </div>
                
            </div>
        );
    }
}

export default Automation;