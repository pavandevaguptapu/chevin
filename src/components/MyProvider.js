import React, { Component } from 'react';

const MyContext = React.createContext();
export const Myconsumer = MyContext.Consumer;

class MyProvider extends Component {
  state = {
    name: "Srinath",
    age: 100,
    boa: true
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          plusOne: () =>
            this.setState({
              age: this.state.age + 1
            })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;