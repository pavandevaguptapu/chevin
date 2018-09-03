import React, { Component }from 'react';
//  import '../../App.css';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class IndividualIssueDetails extends Component{
     state={
        individualIssuesArray:[]
     }

     getIndivudualUSerIsues=(user)=>{
         
        axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
            resourceURL: "https://fullyincontrol.atlassian.net/rest/api/2/search?jql=assignee="+user+"&fields=id,summary,description,issuetype,status,priority",        
            userName: "koteswararao.b@comakeit.com",
            password: "Abc@1234",
            actionMethod: "get"
        }
        )
            .then(response => {     
                console.log(response.data.issues)  
                if (response.data.issues.length !== 0) {
                    this.setState({ individualIssuesArray: response.data.issues})                 
                } else {

                }
            }, (error) => {
                console.log("error")
            });
     }

    componentDidMount(){
        console.log(this.props)
        var user=this.props.selectedUser
        this.getIndivudualUSerIsues(user)
      
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        var user=nextProps.selectedUser
        this.getIndivudualUSerIsues(user)
    } 

    render(){
        return(            
    <div className="col-md-12 col-lg-12 padding0">
    <table className="table table-fixed table-striped">
      <thead className="">
        <tr className="epicdetailstableheadrowStyle">
        <th className="epictableheadverticalalign"> id</th>
        <th className="epictableheadverticalalign"> priority</th> 
        <th className="epictableheadverticalalign"> status</th>
        <th className="epictableheadverticalalign"> description</th>
        </tr>
      </thead>
      <tbody>
        {this.state.individualIssuesArray.map((item,i) => (
          <tr key={i}>           
              <td className="epicTableDataStyle">{item.key}</td>  
              <td className="epicTableDataStyle">{item.fields.priority.name}</td> 
                  <td className="epicTableDataStyle">{item.fields.status.name}</td>
                   <td className="epicTableDataStyle">{item.fields.description}</td>
                         
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      
        )
    }
    
}

  