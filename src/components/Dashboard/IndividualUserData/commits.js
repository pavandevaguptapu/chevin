import React, { Component } from 'react';
// import '../../../App.css';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class Commits extends Component {
    state = {
        listOfBranches: [],
        slectedBranch: '',
        listOfCommits: []
    }

    componentDidMount() {
        axios.post(`sbsecureapi/sbtpgateway/generic/`, {
            resourceURL: "https://api.github.com/repos/pavandevaguptapu/SampleRepo/branches",
            userName: "pavankumar.d@comakeit.com",
            password: "Abc@1234",
            actionMethod: "get"
        })
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ listOfBranches: response.data })
                    this.slectedBranch("e", "ind", response.data[0].name)
                } else {

                }
            }, (error) => {
                console.log("error")
            });
    }
    branchesList = (branches) => {
        return branches.map((branch) => (
            <MenuItem
                key={branch.name}
                value={branch.name}
                primaryText={branch.name}
            />
        ));
    }
    getDateString = (date) => {
        
        
                var date = new Date(date)
                // var date = new Date(epochTime)
                var month = '' + (date.getMonth() + 1)
                var day = '' + date.getDate()
                var year = date.getFullYear()
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                var dateString = (year + "-" + month + "-" + day)
                return dateString
        
        
            }
    slectedBranch = (e, ind, value) => {
        this.setState({ slectedBranch: value })

        axios.post(`sbsecureapi/sbtpgateway/generic/`, {
            resourceURL: "https://api.github.com/repos/pavandevaguptapu/SampleRepo/commits?sha=" + value,
            userName: "pavankumar.d@comakeit.com",
            password: "Abc@1234",
            actionMethod: "get"
        })
            .then(response => {
                if (response.data.length !== 0) {
                    response.data.forEach(function(element) {
                        element.commit.committer.date= this.getDateString(element.commit.committer.date)
                    }, this);

                    this.setState({ listOfCommits: response.data })

                } else {

                }
            }, (error) => {
                console.log("error")
            });

    }
    render() {
        return (<div>
            <div className="">
                <SelectField hintText="Select branch" value={this.state.slectedBranch}
                    labelStyle={{ height: "37px",color: "black"  }} hintStyle={{ color: "black" }} underlineStyle={{ display: 'none' }}
                    onChange={(e, i, v) => this.slectedBranch(e, i, v)}  iconStyle={{ fill: 'black' }}               
                    >
                    {this.branchesList(this.state.listOfBranches)}
                </SelectField>
            </div>
            <div className="col-md-12 col-lg-12 padding0">
                <table className="table table-fixed table-striped">
                    <thead className="">
                        <tr className="epicdetailstableheadrowStyle">
                            <th className="epictableheadverticalalign"> name</th>
                            <th className="epictableheadverticalalign"> date</th>            
                            <th className="epictableheadverticalalign"> description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listOfCommits.map((item, i) => (
                            <tr key={i}>
                                <td className="epicTableDataStyle">{item.commit.committer.name}</td>
                                <td className="epicTableDataStyle">{item.commit.committer.date}</td>
                                <td className="epicTableDataStyle">{item.commit.message}</td>
                          

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        )
    }

}

