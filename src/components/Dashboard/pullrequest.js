import React, { Component }from 'react';
// import '../../../App.css';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class PullRequest extends Component{
     state={
        pullRequestArray:[],
        selectedUser:''
     }

    componentDidMount(){
        axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
            resourceURL: "https://api.github.com/repos/pavandevaguptapu/SampleRepo/pulls",
            userName: "pavankumar.d@comakeit.com",
            password: "Abc@1234",
            actionMethod: "get"
        })
            .then(response => {   
                console.log(response)    
                if (response.data.length !== 0) {
                    this.setState({ pullRequestArray: response.data})               
                } else {

                }
            }, (error) => {
                console.log("error")
            });
    }
  

    render(){
        return(              
            <div className="col-md-12 col-lg-12 padding0">
                <table className="table table-fixed">
                    <thead className="">
                        <tr className="epicdetailstableheadrowStyle">
                            <th className="epictableheadverticalalign"> Number</th>
                            <th className="epictableheadverticalalign"> Title</th>
                            <th className="epictableheadverticalalign"> Owner</th>
                            <th className="epictableheadverticalalign"> Created Time</th>
                            <th className="epictableheadverticalalign"> Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pullRequestArray.map((item, i) => (
                            <tr key={i}>
                                <td className="epicTableDataStyle">{item.number}</td>
                                <td className="epicTableDataStyle">{item.title}</td>
                                <td className="epicTableDataStyle">{item.head.repo.owner.login}</td>
                                <td className="epicTableDataStyle">{item.created_at}</td>
                                <td className="epicTableDataStyle">{item.state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
  </div>
      
        )
    }
    
}

  