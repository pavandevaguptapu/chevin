import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';

class PeoplesForm extends Component {
    state={
        name: "",
        email:"",
        designation:"",
        accounts: "",
        projects: "",
        role:"",
    }
    render() {
        return(
                <form onSubmit={this.props.addIndividual}>
                    <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}                                
                                floatingLabelText="UserName"
                                name="name"
                                type="text"
                                value={this.props.name}
                                onChange={this.props.updateIndividual}
                            />                                    
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="E-mail"
                                name="email"
                                type="email"
                                value={this.props.email}
                                onChange={this.props.updateIndividual}                                               
                            />                                    
                        </div> 
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Designation" 
                                name="designation"
                                type="text"       
                                value={this.props.designation}
                                onChange={this.props.updateIndividual}                                                         
                            />                                    
                        </div>  
                        {/* <div className="form-group col-lg-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Accounts"
                                name="accounts"
                                type="text"  
                                value={this.props.accounts}
                                onChange={this.props.updateIndividual}                                                             
                            />                                    
                        </div>                                                      
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Projects"
                                name="projects"
                                type="text"  
                                value={this.props.projects}
                                onChange={this.props.updateIndividual}                                                            
                            />                                    
                        </div> 
                        <div className="form-group col-lg-12">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Role"
                                type="text"
                                name="role"
                                value={this.props.role}
                                onChange={this.props.updateIndividual}                               
                            />                                    
                        </div>                                                                                                                                                                                                      */}
                    </div>
                    {/* <FlatButton
                        label="Cancel"
                        onClick={this.props.closeIndividualModal}
                />                    
                    <FlatButton 
                        label="Submit"
                        primary={true}
                        // onClick={this.openIndividualModal}
                        type="submit"
                    /> */}                    
                </form>                
        );
    }
}

export default PeoplesForm;
