import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { updateNotificationStatusToRead } from "../../redux/actions/userActions";

// Material UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import HelpIcon from "@material-ui/icons/Help";
import StarIcon from "@material-ui/icons/Star";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  handleOnMenuOpen = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);

    this.props.updateNotificationStatusToRead(unreadNotificationsIds);
  };

  notificationContent(type) {
    switch (type) {
      case "like":
        return "liked";
      case "fire":
        return "reacted with fire to";
      case "laugh":
        return "reacted with a smile to";
      case "rocket":
        return "reacted with a star to";
      case "confused":
        return "is confused by";
      case "comment":
        return "commented on";
      default:
        return;
    }
  }

  notificationIcon(type, color, style) {
    switch (type) {
      case "like":
        return <FavoriteIcon color={color} style={style} />;
      case "fire":
        return <WhatshotIcon color={color} style={style} />;
      case "laugh":
        return <EmojiEmotionsIcon color={color} style={style} />;
      case "rocket":
        return <StarIcon color={color} style={style} />;
      case "confused":
        return <HelpIcon color={color} style={style} />;
      case "comment":
        return <ChatIcon color={color} style={style} />;
      default:
        return;
    }
  }

  render() {
    dayjs.extend(relativeTime);
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      let unreadNotifications = notifications.filter(
        (notification) => notification.read === false
      );
      // Check if unread notifications
      unreadNotifications.length > 0
        ? (notificationsIcon = (
            <Badge badgeContent={unreadNotifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsToDisplay =
      notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => {
          const verb = this.notificationContent(notification.type);
          const time = dayjs(notification.createdAt).fromNow();
          const icon = this.notificationIcon(
            notification.type,
            notification.read ? "primary" : "secondary",
            { marginRight: 10 }
          );
          // const icon =
          //   notification.type === "like" ? (
          //     <FavoriteIcon
          //       color={notification.read ? "primary" : "secondary"}
          //       style={{ marginRight: 10 }}
          //     />
          //   ) : (
          //     <ChatIcon
          //       color={notification.read ? "primary" : "secondary"}
          //       style={{ marginRight: 10 }}
          //     />
          //   );

          return (
            <MenuItem
              key={index}
              onClick={this.handleClose}
              style={{
                backgroundColor: !notification.read ? "#ffccff" : "",
              }}
            >
              {icon}
              <Typography
                component={Link}
                to={`/users/${notification.recipient}/project/${notification.projectId}`}
                color="primary"
                variant="body1"
              >
                {notification.sender} {verb} your project {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>No notifications</MenuItem>
      );
    return (
      <MenuItem>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.handleOnMenuOpen}
        >
          {notificationsToDisplay}
        </Menu>
      </MenuItem>
    );
  }
}

Notifications.propTypes = {
  updateNotificationStatusToRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  updateNotificationStatusToRead: PropTypes.func.isRequired,
  notifications: state.user.notifications,
});

const mapDispatchToProps = {
  updateNotificationStatusToRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
