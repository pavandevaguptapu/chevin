import React, { Component } from 'react';

import {Card, CardTitle,CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import AutoComplete from 'material-ui/AutoComplete';

const cardContainer = {
    paddingLeft: "5rem",
    paddingRight: "5rem",
    cardWidth : {
        width: "17rem"
    }
}

class People extends Component {
    state = {
        dataSource: [],
    };

    render() {
      return(
        <div className="d-block py-3 clearfix" style={cardContainer}>
          <div className="">
            <AutoComplete 
                hintText="Search Here"  
                dataSource={this.state.dataSource} 
                floatingLabelText="Search Here"
                />
          </div>
          <Card className="mr-3 mb-3 float-left" style={cardContainer.cardWidth}>
            <div className="d-flex"> 
                <div className={"p-3 d-inline-flex"}>
                    <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                </div>
                <CardTitle 
                    title="Person 1"
                    subtitle="Software Engineer"
                >
                    <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                </CardTitle>                       
            </div>            
          </Card>
          <Card className="mr-3 mb-3 float-left" style={cardContainer.cardWidth}>
            <div className="d-flex"> 
                <div className={"p-3 d-inline-flex"}>
                    <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                </div>
                <CardTitle 
                    title="Person 1"
                    subtitle="Software Engineer"
                >
                    <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                </CardTitle>                       
            </div>            
          </Card>
          <Card className="mr-3 mb-3 float-left" style={{width: "17rem"}}>
            <div className="d-flex"> 
                <div className={"p-3 d-inline-flex"}>
                    <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                </div>
                <CardTitle 
                    title="Person 1"
                    subtitle="Software Engineer"
                >
                    <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                </CardTitle>                       
            </div>            
          </Card>
          <Card className="mr-3 mb-3 float-left" style={{width: "17rem"}}>
            <div className="d-flex"> 
                <div className={"p-3 d-inline-flex"}>
                    <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                </div>
                <CardTitle 
                    title="Person 1"
                    subtitle="Software Engineer"
                >
                    <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                </CardTitle>                       
            </div>            
          </Card>
          <Card className="mr-3 mb-3 float-left" style={{width: "17rem"}}>
            <div className="d-flex"> 
                <div className={"p-3 d-inline-flex"}>
                    <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                </div>
                <CardTitle 
                    title="Person 1"
                    subtitle="Software Engineer"
                >
                    <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                </CardTitle>                       
            </div>            
          </Card>       
          <Card className="mr-3 mb-3 float-left" style={{width: "17rem"}}>
            <div className="d-flex"> 
                <div className={"p-3 d-inline-flex"}>
                    <Avatar src="https://www.gstatic.com/webp/gallery/4.sm.jpg" size={80}/>
                </div>
                <CardTitle 
                    title="Person 1"
                    subtitle="Software Engineer"
                >
                    <CardText className="p-0" subtitle="asdasd">Abc@gmail.com</CardText>
                </CardTitle>                       
            </div>            
          </Card>                                                   
                                
        </div>
      );
    }
}

export default People;