import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class BasicForm extends Component {
    firstNameRef = React.createRef();
    lastNameRef = React.createRef();
    emailRef = React.createRef();
    designationRef = React.createRef();
    cityRef = React.createRef();
    mobileNumberRef = React.createRef();

    addIndividual = (e) => {
        alert(1);
        e.preventDefault();
        const details = {
            firstNameRef: this.firstNameRef.value.value,
            lastNameRef: this.lastNameRef.value.value,
            emailRef: this.emailRef.value.value,
            designationRef: this.designationRef.value.value,
            cityRef: this.cityRef.value.value,
            mobileNumberRef: this.mobileNumberRef.value.value
        }
        e.currentTarget.reset();
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
                                ref={this.firstNameRef}
                                type="text"
                            />                                    
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="Last Name" 
                                floatingLabelText="Last Name" 
                                name="lastName"
                                ref={this.lastNameRef}
                                type="text"
                            />                                    
                        </div> 
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="E-mail" 
                                floatingLabelText="E-mail"
                                name="email"
                                ref={this.emailRef}
                                type="email"                                
                            />                                    
                        </div> 
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="Designation" 
                                floatingLabelText="Designation" 
                                name="designation"
                                ref={this.designationRef}
                                type="text"                                
                            />                                    
                        </div>  
                        <div className="form-group col-lg-6">
                            <TextField 
                                fullWidth={true}
                                hintText="City" 
                                floatingLabelText="City"
                                name="city"
                                ref={this.cityRef}
                                type="text"                                
                            />                                    
                        </div>                                                      
                        <div className="form-group col-lg-6 col-md-6">
                            <TextField 
                                fullWidth={true}
                                hintText="Mobile Number" 
                                floatingLabelText="Mobile Number"
                                name="mobileNumber"
                                ref={this.mobileNumberRef}
                                type="text"                                
                            />                                    
                        </div> 
                        <div className="form-group col-lg-12">
                            <TextField 
                                fullWidth={true}
                                hintText="Address & City" 
                                floatingLabelText="Address, State, City & Zipcode "
                                rows={2}
                                rowsMax={4}
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
