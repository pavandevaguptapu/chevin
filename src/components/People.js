import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const cardContainer = {
    parentBlock: {
        paddingLeft: "5rem",
        paddingRight: "5rem",        
    },
    cardWidth : {
        width: "17rem"
    }
}

class People extends Component {
    state = {
        dataSource: [],
        individualModal: false
    };

    openIndividualModal = () => {
        this.setState({individualModal: true});
    };

    closeIndividualModal = () => {
        this.setState({individualModal: false});
    }

    render() {
    const actions= [
        <FlatButton
        label="Cancel"
        onClick={this.closeIndividualModal}
        />,
        <FlatButton
        label="Submit"
        primary={true}
        onClick={this.openIndividualModal}
        />,
    ];
      return(
        <div className="d-block py-3 clearfix text-truncate" style={cardContainer.parentBlock}>
          <div className="mb-2">
            <AutoComplete 
                hintText="Search Here"  
                dataSource={this.state.dataSource} 
                floatingLabelText="Search Here"
                />
          </div>
            <div className="d-block clearfix">
                <Card className="mr-3 mb-3 float-left" style={cardContainer.cardWidth}>
                    <Link to="/app/individual">
                        <div className="d-flex"> 
                            <div className={"p-3 d-inline-flex"}>
                                <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                            </div>
                            <CardTitle 
                                title="Srinath"
                                subtitle="Software Engineer"
                            >
                                <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                            </CardTitle>                       
                        </div>
                    </Link>
                </Card>
            </div>
            <div className="d-block clearfix">                                                           
                <RaisedButton label="Add Individual" primary={true} onClick={this.openIndividualModal} />
                <Dialog
                     title="Add Individual"
                     className="text-center"
                     modal={true}
                     actions={actions}
                     open={this.state.individualModal}
                >
                    <form>
                        <div className="form-row">
                            <div className="form-group col-lg-6 col-md-6">
                                <TextField 
                                    fullWidth={true}
                                    hintText="First Name" 
                                    floatingLabelText="First Name" 
                                />                                    
                            </div>
                            <div className="form-group col-lg-6 col-md-6">
                                <TextField 
                                    fullWidth={true}
                                    hintText="Last Name" 
                                    floatingLabelText="Last Name" 
                                />                                    
                            </div> 
                            <div className="form-group col-lg-6 col-md-6">
                                <TextField 
                                    fullWidth={true}
                                    hintText="E-mail" 
                                    floatingLabelText="E-mail" 
                                />                                    
                            </div> 
                            <div className="form-group col-lg-6 col-md-6">
                                <TextField 
                                    fullWidth={true}
                                    hintText="Designation" 
                                    floatingLabelText="Designation" 
                                />                                    
                            </div>  
                            <div className="form-group col-lg-6">
                                <TextField 
                                    fullWidth={true}
                                    hintText="City" 
                                    floatingLabelText="City" 
                                />                                    
                            </div>                                                      
                            <div className="form-group col-lg-6 col-md-6">
                                <TextField 
                                    fullWidth={true}
                                    hintText="Mobile Number" 
                                    floatingLabelText="Mobile Number" 
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
                    </form>
                </Dialog>
            </div>
        </div>
      );
    }
}

export default People;