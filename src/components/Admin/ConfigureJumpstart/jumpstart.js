import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../App.css';

import { myConstClass } from '../../../constants.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import axios from 'axios';
import { Tabs, Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDone from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
var dcopy = require('deep-copy')
const tabsBackgroundColor = {
    backgroundColor: "rgb(156, 156, 156)",

}
const modelbuttonsStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.87)',
    paddingRight: '10px',
    boxShadow: 'none'
}

class Jumpstart extends Component {


    state = {
        newProcessObj: {},
        processArray: [
            { "name": "Project Management", "processID": 4 },
            { "name": "Quality Management", "processID": 5 },
            { "name": "Build Tool", "processID": 6 },
            { "name": "Source Control", "processID": 7 }
        ],
        newToolObj: {},
        toolsArray: [
            { "name": "Jira", "processID": [3, 5, 4] }, { "name": "SonarQube", "processID": [0, 5] }, { "name": "Jenkins", "processID": [3]},
            { "name": "Git", "processID": [7]}
        ],
        selectedProcessIndex: 0,
        editableProcessArray: [
            { "name": "Project Management", "processID": 4 },
            { "name": "Quality Management", "processID": 5 },
            { "name": "Build Tool", "processID": 6 },
            { "name": "Source Control", "processID": 7 }
        ],

        selectedToolIndex: 0,
        editableToolsArray: [
            { "name": "Jira", "processID": [3, 5, 4] }, { "name": "SonarQube", "processID": [0, 5] }, { "name": "Jenkins", "processID": [3] },{ "name": "Git", "processID": [7]}
        ],
        headersToolsArray: [{ "name": "Project Management", "processID": 4 }, { "name": "Quality Management", "processID": 5 }, { "name": "Build Tool", "processID": 6 },{ "name": "Source Control", "processID": 7 }],
        selectedTab: "",
        handleChangesInProcessName: false,
        handleChangesInToolName: false

    }


    componeDidMount() {
        console.log("1")
    }



    addProcessModal = () => {
        this.setState({ addProcessModal: true })
    }
    closeProcessModal = () => {
        this.setState({ addProcessModal: false, newProcessObj: {} })
    }
    handlingNewProcessDetails = (e) => {
        var newProcessObj = this.state.newProcessObj
        newProcessObj[e.target.name] = e.target.value
        this.setState({ newProcessObj: newProcessObj })
    }
    addProcess = (newProcessObj) => {
        var processArray = this.state.processArray
        processArray.push(newProcessObj)
        this.setState({ processArray: processArray, addProcessModal: false, editableProcessArray: processArray })
    }
    editProcess = (e, name, i) => {
        this.setState({ editProcessModal: true, selectedProcessIndex: i, handleChangesInProcessName: false })
    }
    handlingEditProcessDetails = (e) => {
        var editableProcessArray = dcopy(this.state.editableProcessArray)
        editableProcessArray[this.state.selectedProcessIndex][e.target.name] = e.target.value
        this.setState({ editableProcessArray: editableProcessArray, handleChangesInProcessName: true })
    }

    saveEditedProcess = (editedObj) => {
        this.setState({ processArray: this.state.editableProcessArray, editProcessModal: false })
    }
    closeEditProcessModal = () => {
        this.setState({ editProcessModal: false, editableProcessArray: this.state.processArray })
    }

    deleteProcess = (e, name, i) => {
        console.log(e, name, i)
    }
    addToolModal = () => {
        this.setState({ addToolModal: true, newToolObj: {} })
    }
    closeAddToolModal = () => {
        this.setState({ addToolModal: false, })
    }
    handlingNewToolDetails = (e) => {
        var newToolObj = this.state.newToolObj
        newToolObj[e.target.name] = e.target.value
        this.setState({ newToolObj: newToolObj })
    }
    addNewTool = (newToolObj) => {
        newToolObj = { name: newToolObj.name, "processID": [] }


        var toolsArray = this.state.toolsArray
        toolsArray.push(newToolObj)
        this.setState({ toolsArray: toolsArray, addToolModal: false, editableToolsArray: toolsArray, newToolObj: {} })

    }
    editTool = (e, name, i) => {
        this.setState({ editToolModal: true, selectedToolIndex: i, handleChangesInToolName: false, editableToolsArray: this.state.toolsArray })
    }
    closeEditToolModal = () => {
        this.setState({ editToolModal: false })
    }

    handlingEditToolDetails = (e) => {
        var editableToolsArray = dcopy(this.state.editableToolsArray)
        editableToolsArray[this.state.selectedToolIndex][e.target.name] = e.target.value
        this.setState({ editableToolsArray: editableToolsArray, handleChangesInToolName: true })
    }
    saveEditedToolName = (editedObj) => {
        this.setState({ toolsArray: this.state.editableToolsArray, editToolModal: false })
    }
    deleteTool = (e, name, i) => {
        console.log(e, name, i)
    }
    selectedProcess = (process) => {
        return process.map((process) => (
            <MenuItem
                key={process.name}
                value={process.processID}
                primaryText={process.name}
            />
        ));
    }
    selectedTab = (e, selectedTab) => {
        if (selectedTab === "Tools") {
            this.setState({ selectedTab: selectedTab })
        }
        else {
            this.setState({ selectedTab: "" })
        }

    }
    selectProcessforTool = (e, checked, index, headerToolsId) => {
        var tempToolArray = this.state.toolsArray
        if (checked === false) {
            var ind = tempToolArray[index].processID.indexOf(headerToolsId)
            tempToolArray[index].processID.splice(ind, 1)
            this.setState({ toolsArray: tempToolArray })
        }
        if (checked === true) {
            tempToolArray[index].processID.push(headerToolsId)
            this.setState({ toolsArray: tempToolArray })

        }

    }
    saveTools = (e, toolsArray) => {
        console.log(toolsArray)
        this.setState({ toolsArray: toolsArray })

    }
    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-12 col-lg-12 navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
                        <div className="col-md-12 col-lg-12 textAlignCenter marginT07">
                            <h5 className="">Jump Start</h5>
                        </div>
                        <div>
                        </div>
                    </nav>
                </div>
                <div className="mt-5">
                    <div className="col-md-12 col-lg-12">
                        <Tabs inkBarStyle={{ background: '#FF3D00' }}>}
                            {/* <Tab label="Process" style={tabsBackgroundColor} onActive={(e) => this.selectedTab(e, "Process")}>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} >
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Process Name</TableHeaderColumn>
                                                <TableHeaderColumn>Process Id</TableHeaderColumn>
                                                <TableHeaderColumn>Settings</TableHeaderColumn>
                                                <TableHeaderColumn>
                                                    <FloatingActionButton
                                                        secondary={true}
                                                        mini={true}
                                                        onClick={this.addProcessModal}
                                                    >
                                                        <ContentAdd />
                                                    </FloatingActionButton>

                                                </TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false} className={[this.state.processArray.length !== 0 ? "show" : "visibility"]}>
                                            {this.state.processArray.map((process, index) => (
                                                <TableRow key={index} selectable={false} >
                                                    <TableRowColumn>{process.name}</TableRowColumn>
                                                    <TableRowColumn>{process.processID}</TableRowColumn>
                                                    <TableRowColumn style={{ paddingLeft: "0px" }} >
                                                        <IconButton  touch={true} onClick={(e) => this.editProcess(e, "edit", index)}>
                                                            <ContentEdit />
                                                        </IconButton>
                                                        <IconButton  touch={true}  onClick={(e) => this.deleteProcess(e, "disable", index)}>
                                                            <ContentClear />
                                                        </IconButton>
                                                    </TableRowColumn>
                                                    <TableRowColumn ></TableRowColumn>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className={[this.state.processArray.length === 0 ? "show" : "visibility"]}>
                                        <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                            No process is assigned
                                      </Subheader>
                                    </div>
                                </div>
                            </Tab> */}
                            <Tab label="Tools" style={tabsBackgroundColor} onActive={(e) => this.selectedTab(e, "Tools")}>
                                <div style={{ border: "1px solid rgb(238, 238, 238)" }} >
                                    <Table onCellClick={this.editProcess}>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={{"paddingLeft":"10px"}}>Tool Name</TableHeaderColumn>
                                                {this.state.headersToolsArray.map(row => (
                                                    <TableHeaderColumn style={{"paddingLeft":"0px"}}>{row.name}</TableHeaderColumn>
                                                ))}
                                                {/* <TableHeaderColumn>Settings</TableHeaderColumn> */}
                                                {/* <TableHeaderColumn>
                                                    <FloatingActionButton
                                                        secondary={true}
                                                        mini={true}
                                                        onClick={this.addToolModal}
                                                    >
                                                        <ContentAdd />
                                                    </FloatingActionButton>
                                                </TableHeaderColumn> */}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false} className={[this.state.toolsArray.length !== 0 ? "show" : "visibility"]}>
                                            {this.state.toolsArray.map((tool, index) => (
                                                <TableRow key={index} selectable={false}>
                                                    <TableRowColumn>{tool.name}</TableRowColumn>
                                                    {this.state.headersToolsArray.map((processID, i) => (
                                                        <TableRowColumn key={i}>
                                                            <Checkbox
                                                                checked={this.state.toolsArray[index].processID.includes(this.state.headersToolsArray[i].processID) ? true : false}
                                                                onCheck={(e, checked) => this.selectProcessforTool(e, checked, index, this.state.headersToolsArray[i].processID)}
                                                            />
                                                        </TableRowColumn>
                                                    ))}

                                                    {/* <TableRowColumn style={{ paddingLeft: "0px" }}>
                                                        <IconButton tooltip="edit" touch={true} tooltipPosition="top-left" onClick={(e) => this.editTool(e, "edit", index)}>
                                                            <ContentEdit />
                                                        </IconButton>
                                                        <IconButton tooltip="delete" touch={true} tooltipPosition="bottom-right" onClick={(e) => this.deleteTool(e, "disable", index)}>
                                                            <ContentClear />
                                                        </IconButton>
                                                    </TableRowColumn> */}
                                                    {/* <TableRowColumn></TableRowColumn> */}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>


                                    <div className={[this.state.toolsArray.length === 0 ? "show" : "visibility"]}>
                                        <Subheader className="p-0 textAlignCenter" style={{ fontSize: '20px' }}>
                                            No tool is assigned
                                      </Subheader>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>

                        <div className={["col-md-11 col-lg-12 mt-4 textAlignRight", this.state.selectedTab === "Tools" ? "show" : "visibility"].join(" ")}>
                            {/* <RaisedButton
                                label="Save"
                                primary={true}
                                style={modelbuttonsStyle}
                                onClick={(e) => this.saveTools(e, this.state.toolsArray)}

                            /> */}
                            {/* <FloatingActionButton
                                primary={true}
                                mini={true}
                                onClick={(e) => this.saveTools(e,this.state.toolsArray)}
                                title="save"
                               
                            >
                                <ActionDone />
                            </FloatingActionButton> */}
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.addProcessModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Add Process</Subheader>
                        </div>
                    </div>
                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.newProcessObj.name}
                                    name='name'
                                    onChange={this.handlingNewProcessDetails}
                                    hintText="process name"
                                    floatingLabelText="process name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeProcessModal()}
                                />
                                <RaisedButton
                                    label="Save"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    disabled={this.state.newProcessObj.name === "" || this.state.newProcessObj.name === undefined ? true : false}
                                    onClick={() => this.addProcess(this.state.newProcessObj)}


                                />
                            </div>
                        </div>
                    </div>

                </Dialog>
                <Dialog open={this.state.editProcessModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Edit Process Name</Subheader>
                        </div>
                    </div>
                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-12">
                                <TextField
                                    value={this.state.editableProcessArray[this.state.selectedProcessIndex].name || ''}
                                    name='name'
                                    onChange={this.handlingEditProcessDetails}
                                    hintText="process name"
                                    floatingLabelText="process name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeEditProcessModal()}
                                />
                                <RaisedButton
                                    label="Save"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.saveEditedProcess(this.state.editableProcessArray)}
                                    disabled={this.state.handleChangesInProcessName == false}
                                />
                            </div>
                        </div>
                    </div>

                </Dialog>
                <Dialog open={this.state.addToolModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Add Tool</Subheader>
                        </div>
                    </div>
                    <div className="textAlignLeft">
                        <div className="row margin0">

                            <div className="col-md-12">
                                <TextField
                                    value={this.state.newToolObj.name || ''}
                                    name='name'
                                    onChange={this.handlingNewToolDetails}
                                    hintText="Tool name"
                                    floatingLabelText="Tool name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeAddToolModal()}
                                />
                                <RaisedButton
                                    label="Add"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.addNewTool(this.state.newToolObj)}
                                    disabled={this.state.newToolObj.name === "" || this.state.newToolObj.name === undefined ? true : false}

                                />
                            </div>
                        </div>
                    </div>

                </Dialog>
                <Dialog open={this.state.editToolModal} contentStyle={{ "left": "70%" }} className={["col-md-6 col-lg-5"].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 textAlignCenter">
                            <Subheader className="p-0" style={{ fontSize: '30px' }}>Edit Tool Name</Subheader>
                        </div>
                    </div>
                    <div className="textAlignLeft">
                        <div className="row margin0">

                            <div className="col-md-12">
                                <TextField
                                    value={this.state.editableToolsArray[this.state.selectedToolIndex].name || ''}
                                    name='name'
                                    onChange={this.handlingEditToolDetails}
                                    hintText="Tool name"
                                    floatingLabelText="Tool name"
                                    type="text"
                                    fullWidth={true}
                                />
                            </div>

                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton
                                    label="Close"
                                    secondary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.closeEditToolModal()}
                                />
                                <RaisedButton
                                    label="Save"
                                    primary={true}
                                    style={modelbuttonsStyle}
                                    onClick={() => this.saveEditedToolName(this.state.newToolObj)}
                                    disabled={this.state.handleChangesInToolName === false}

                                />
                            </div>
                        </div>
                    </div>

                </Dialog>
            </div>
        );
    }
}

export default Jumpstart;