import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class BasicForm extends Component {
    state={
        firstName: "",
        lastName:"",
        mobileNumber:"",
        city:"",
        address:"",
        email:"",
        designation:"",
    }
    render() {
        return(
                <form onSubmit={this.props.addIndividual}>
                    <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}                                
                                floatingLabelText="First Name"
                                name="firstName"
                                type="text"
                                value={this.props.firstName}
                                onChange={this.props.updateIndividual}
                            />                                    
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Last Name" 
                                name="lastName"
                                type="text"
                                value={this.props.lastName}
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
                        <div className="form-group col-lg-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="City"
                                name="city"
                                type="text"  
                                value={this.props.city}
                                onChange={this.props.updateIndividual}                                                             
                            />                                    
                        </div>                                                      
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Mobile Number"
                                name="mobileNumber"
                                type="number"  
                                value={this.props.mobileNumber}
                                onChange={this.props.updateIndividual}                                                            
                            />                                    
                        </div> 
                        <div className="form-group col-lg-12">
                            <TextField 
                                fullWidth={true}
                                floatingLabelText="Address, State, City & Zipcode "
                                rows={2}
                                rowsMax={4}
                                type="text"
                                name="address"
                                value={this.props.address}
                                onChange={this.props.updateIndividual}                               
                            />                                    
                        </div>                                                                                                                                                                                                     
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

export default BasicForm;
