import React, { Component } from "react";
import { Link } from 'react-router-dom';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const cardContainer = {
    cardWidth : {
        width: "17rem"
    }
}

class IndividualCardDetails extends Component {
  render() {
    return (
      <Card className="mr-3 mb-3 float-left" style={cardContainer.cardWidth}>
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
            <MenuItem primaryText="Delete" />
          </IconMenu>
        </div>
        <div className="">
          <Link to="/app/individual" className="d-flex">
            <div className="d-flex align-items-center pl-2">
              <Avatar
                src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
                size={60}
              />
            </div>
            <CardTitle
              className="text-truncate"
              title="David Karemaker"
              subtitle="Software Engineer"
            >
              <CardText className="p-0" subtitle="asdasd">
                Abc@gmail.com
              </CardText>
            </CardTitle>
          </Link>
        </div>
      </Card>
    );
  }
}

export default IndividualCardDetails;
