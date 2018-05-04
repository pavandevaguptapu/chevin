import React, { Component } from "react";
import LoaderHOC from '../HOC/LoaderHOC';

import { Card, CardTitle, CardText } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

const cardContainer = {
  cardWidth: {
    width: "17rem",
    height: "6.88rem",
    flex: "1 0 auto",
    margin: "0 5px 5px 0"
  }
};

class PeoplesGridView extends Component {
  onPeopleCardClick = index => {
    this.props.changeCardLayout(index);
  };

  render() {
    const { filterPeople, changeView } = this.props;
    return (
      <div className={`d-flex ${changeView}`}>
        {filterPeople.map((people, index) => (
          <Card style={cardContainer.cardWidth} key={people.id}>
            <div className="">
              <IconMenu
                className="float-right"
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                targetOrigin={{ horizontal: "left", vertical: "top" }}
              >
                <MenuItem primaryText="Edit" onClick={this.props.open}/>
                {/* <MenuItem primaryText="Delete" /> */}
              </IconMenu>
            </div>
            <div>
              <div
                className="d-flex pointer"
                onClick={() => this.onPeopleCardClick(index)}
              >
                <div className="d-flex align-items-center pl-2">
                  <Avatar
                    src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
                    size={60}
                  />
                </div>
                <CardTitle
                  className="text-truncate"
                  title={people.name}
                  subtitle={people.designation}
                >
                  <CardText className="p-0" subtitle={people.email}>
                    {people.email}
                  </CardText>
                </CardTitle>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default LoaderHOC(PeoplesGridView);