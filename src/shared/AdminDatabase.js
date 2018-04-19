import React, { Component } from 'react';
import axios from 'axios';
import {myConstClass} from '../constants';

const MyContext = React.createContext();

export const Myconsumer = MyContext.Consumer;


class AdminDatabase extends Component {
  state = {
    peoples: [],
    clicked:0

  };

//   getAllPeople = () => {
//     let peoples = this.state.peoples;
//     axios.get(myConstClass.peoples + "/user").then(response => {
//       this.setState({
//         peoples: response.data
//       });
//     });
//   };

//   componentDidMount() {
//     this.getAllPeople();
//   }

//   clickedPeople = (clickedIndex) => {
//     this.state.clicked = clickedIndex;
//   }

  render() {
    return (
      <MyContext.Provider value={{state: this.state, clickedPeopleFunc:this.clickedPeople}}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default AdminDatabase;