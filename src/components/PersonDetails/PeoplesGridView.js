import React, { Component } from "react";

import { Card, CardTitle, CardText } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

const cardContainer = {
  cardWidth: {
    width: "17rem"
  }
};

class PeoplesGridView extends Component {
  onPeopleCardClick = index => {
    this.props.changeCardLayout(index);
  };

  render() {
      const {peoples,peopleSearchFilter,searchTerm} = this.props;
    return (
      <div className={this.props.changeView}>
        {peoples.filter(peopleSearchFilter(searchTerm)).map((people, index) => (
          <Card
            className="mr-3 mb-3 float-left"
            style={cardContainer.cardWidth}
            key={people.id}
          >
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
                <MenuItem primaryText="Edit" />
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
                  subtitle="Software Engineer"
                >
                  <CardText className="p-0" subtitle="asdasd">
                    {people.emailid}
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

export default PeoplesGridView;