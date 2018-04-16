import React, { Component } from 'react';


import BasicForm from '../PersonDetails/BasicForm';
import IndividualCardDetails from '../PersonDetails/IndividualCardDetails';

import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

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
    };

    render() {
      return(
        <div className="d-block clearfix col-lg-11 col-md-11 p-0 m-auto" >
          <div className="mb-2">
            <AutoComplete 
                hintText="Search Here"  
                dataSource={this.state.dataSource} 
                floatingLabelText="Search Here"
                />
          </div>
            <div className="d-block clearfix">    
                <IndividualCardDetails />                                                                                                                                                               
            </div>
            <div className="d-block clearfix">                                                           
                <RaisedButton label="Add Individual" primary={true} onClick={this.openIndividualModal} />
                <Dialog
                     title="Add Individual"
                     className="text-center"
                     modal={true}
                    //  actions={actions}
                     open={this.state.individualModal}
                >
                    <BasicForm closeIndividualModal={this.closeIndividualModal} />
                </Dialog>
            </div>
        </div>
      );
    }
}

export default People;
