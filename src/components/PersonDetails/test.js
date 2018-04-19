import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class BasicForm extends Component {
    state = {
        firstNameError: "",
        lastNameError: "",
        emailError:""
    }

    validate = () => {
        let isErr= false;
        const errors = {};
        if(this.state.firstName.length < 5) {
            isErr = true;
            errors.firstNameError = "Some text here";
        }
        if(!this.state.email.indexOf('@') === -1) {
            isErr = true;
            errors.firstNameError = "Some text here";            
        }

        if(isErr) {
            this.setState({
                ...this.setState,
                ...errors
            })
        }

        return isErr;
    }

    addIndividual = (e) => {
        e.preventDefault();
        const err = this.validate();
        if(!err) {
            console.log(this.state)
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return(
                <form onSubmit={this.addIndividual}>
                    <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="First Name" 
                                floatingLabelText="First Name"
                                name="firstName"
                                type="text"
                                value={this.state.firstName || ''}
                                onChange={this.handleChange}
                                errorText={this.state.firstNameError}
                            />                                    
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="Last Name" 
                                floatingLabelText="Last Name" 
                                name="lastName"
                                type="text"
                                value={this.state.lastName || ''}
                                onChange={this.handleChange}
                                errorText={this.state.lastNameError}
                            />                                    
                        </div> 
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="E-mail" 
                                floatingLabelText="E-mail"
                                name="email"
                                type="text"
                                value={this.state.email || ''}
                                onChange={this.handleChange}    
                                errorText={this.state.emailError}                                               
                            />                                    
                        </div> 
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="Designation" 
                                floatingLabelText="Designation" 
                                name="designation"
                                type="text"       
                                value={this.state.designation || ''}
                                onChange={this.handleChange}                                                         
                            />                                    
                        </div>  
                        <div className="form-group col-lg-6">
                            <TextField 
                                fullWidth={true}
                                hintText="City" 
                                floatingLabelText="City"
                                name="city"
                                type="text"  
                                value={this.state.city || ''}
                                onChange={this.handleChange}                                                              
                            />                                    
                        </div>                                                      
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="Mobile Number" 
                                floatingLabelText="Mobile Number"
                                name="mobileNumber"
                                type="number"  
                                value={this.state.mobileNumber || ''}
                                onChange={this.handleChange}                                                              
                            />                                    
                        </div> 
                        <div className="form-group col-lg-12">
                            <TextField 
                                fullWidth={true}
                                hintText="Address & City" 
                                floatingLabelText="Address, State, City & Zipcode "
                                rows={2}
                                rowsMax={4}
                                type="text"
                                name="address"
                                value={this.state.address || ''}
                                onChange={this.handleChange}                                
                            />                                    
                        </div>                                                                                                                                                                                                     
                    </div>
                    <FlatButton
                        label="Cancel"
                        onClick={this.props.closeIndividualModal}
                />                    
                    <FlatButton 
                        label="Submit"
                        primary={true}
                        // onClick={this.openIndividualModal}
                        type="submit"
                    />
                </form>                
        );
    }
}

export default BasicForm;
