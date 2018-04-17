// import React, {Component, createContext} from 'react';


// const MyContext = createContext();
// const { Provider, Consumer } = MyContext;

// class MyProvider extends Component {
//     state= {
//         name: 'Wes',
//         age: 100,
//         cool: true
//     }

//     render() {
//         return(
//             <Provider value={{
//                 state: this.state,
//                 growYearOlder: ()  => this.setState({
//                     age: this.state.age + 1
//                 })
//             }}>
//                 {this.props.children}
//             </Provider>
//         );
//     }    

// }


// const Family = (props) => (
//     <div>
//         <Api/>
//         <Tata />
//     </div>    
// )

// class Api extends Component {
//     render() {
//         return(
//             <div>Hey
//                 <Consumer>
//                     {(context) => (
//                         <div>
//                         <p>I am inside the {context.state.name}</p>
//                         <p>My age is {context.state.age}</p>
//                         <button onClick={context.growYearOlder}> ss</button>
//                         </div>
//                     )}
//                 </Consumer>
//             </div>
//         );
//     }
// }

// class Person extends Component {

//     render() {
//         return(
//             <MyProvider>
//             <div className="context">Srinath
//             <Family /> 
//             <Tata />
//             </div>
//             </MyProvider>
//         );
//     }
// }

// class Tata extends Component {
//     render() {
//         return(
//             <Consumer>
//                 {(context) => (
//                     <div>Hi I am new age{context.state.age}</div>
//                 )}
//             </Consumer>
//         );
//     }
// }

// export default Person;