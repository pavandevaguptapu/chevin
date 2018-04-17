import React, { Component } from 'react';

const MyContext = React.createContext();
export const Myconsumer = MyContext.Consumer;

class AdminDatabase extends Component {
  state = {
    peoples: [
        {
            emailid: "v@comakeit.com",
            role: "tester",
            name: "tata"
        },
        {
            emailid: "b@comakeit.com",
            role: "developer",
            name: "srnay"
        }     ,
        {
            emailid: "d@comakeit.com",
            role: "developer",
            name: "1"
        }                ,
        {
            emailid: "a@comakeit.com",
            role: "developer",
            name: "2"
        }             
    ]
  };

  render() {
    return (
      <MyContext.Provider value={{state: this.state}}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default AdminDatabase;