import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  addReactionToOneProject,
  removeReactionFromOneProject,
} from "../../redux/actions/dataActions";

// Material UI
import FavoriteIcon from "@material-ui/icons/Favorite";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import HelpIcon from "@material-ui/icons/Help";
import StarIcon from "@material-ui/icons/Star";

import { Button } from "@material-ui/core";

class ReactionButton extends Component {
  userAlreadyReactedToThisProject = (type) => {
    switch (type) {
      case "like":
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.projectId === this.props.projectId
          )
        ) {
          return true;
        } else {
          return false;
        }
      case "fire":
        if (
          this.props.user.fires &&
          this.props.user.fires.find(
            (fire) => fire.projectId === this.props.projectId
          )
        ) {
          return true;
        } else {
          return false;
        }
      case "laugh":
        if (
          this.props.user.laughs &&
          this.props.user.laughs.find(
            (laugh) => laugh.projectId === this.props.projectId
          )
        ) {
          return true;
        } else {
          return false;
        }
      case "confused":
        if (
          this.props.user.confuseds &&
          this.props.user.confuseds.find(
            (confused) => confused.projectId === this.props.projectId
          )
        ) {
          return true;
        } else {
          return false;
        }
      case "rocket":
        if (
          this.props.user.rockets &&
          this.props.user.rockets.find(
            (rocket) => rocket.projectId === this.props.projectId
          )
        ) {
          return true;
        } else {
          return false;
        }
      default:
        return;
    }
  };

  addReaction = () => {
    this.props.addReactionToOneProject(this.props.projectId, this.props.type);
  };

  removeReaction = () => {
    this.props.removeReactionFromOneProject(
      this.props.projectId,
      this.props.type
    );
  };

  returnIcon = (type, color) => {
    switch (type) {
      case "like":
        return <FavoriteIcon color={color} />;
      case "fire":
        return <WhatshotIcon color={color} />;
      case "laugh":
        return <EmojiEmotionsIcon color={color} />;
      case "confused":
        return <HelpIcon color={color} />;
      case "rocket":
        return <StarIcon color={color} />;
      default:
        return;
    }
  };

  render() {
    const { authenticated } = this.props.user;
    return !authenticated ? (
      <Link to="/login">
        <Button>{this.returnIcon(this.props.type, "disabled")}</Button>
      </Link>
    ) : this.userAlreadyReactedToThisProject(this.props.type) ? (
      <Button onClick={this.removeReaction}>
        {this.returnIcon(this.props.type, "secondary")}
      </Button>
    ) : (
      <Button onClick={this.addReaction}>
        {this.returnIcon(this.props.type, "disabled")}
      </Button>
    );
  }
}

ReactionButton.propTypes = {
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  addReactionToOneProject: PropTypes.func.isRequired,
  removeReactionFromOneProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  addReactionToOneProject,
  removeReactionFromOneProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionButton);
