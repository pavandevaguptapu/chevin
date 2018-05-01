import React from "react";


class DashboardAdvanced extends React.Component{

    // constructor (props) {
    //     super(props);
    //     this.state = {value : 'start value'};
    //     this.element = this.withSubscription(<PlainComponent/>);
    // }

    //  withSubscription = (WrappedComponent) => {
    //     // ...and returns another component...
    //     console.log("fasdfsdffsdfasfasd")
    //     return class extends React.Component {
    //        componentWillMount(){
    //             console.log('fasdfasf',this.props.value)
    //        }
    //       render() {
           
    //         // ... and renders the wrapped component with the fresh data!
    //         // Notice that we pass through any additional props
    //         return(<WrappedComponent {...this.props}/>) ;
    //       }
    //     };
    //   }
       


    render() {
        return(
    //     <this.element
    //     value={this.state.value}
        
    // />
    <div>ss </div>
        );
    }

}

class PlainComponent extends  React.Component{
    render() {
        return (
            <div style= {{backgroundColor: '#fff', height:'500px'}}>

uhgjgggggggggggggggh
                </div>
        );
    }
}

export default DashboardAdvanced;