import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// components
import EditUserDetails from "./EditUserDetails";
import DashboardSkeleton from "./DashboardSkeleton";

// Redux
import { connect } from "react-redux";
import { uploadImage } from "../../redux/actions/userActions";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

import PublicIcon from "@material-ui/icons/Public";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.generalStyles,
});

class Dashboard extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditImage = () => {
    document.getElementById("imageInput").click();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { username, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    return !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div
              className="image-wrapper"
              style={{ cursor: "pointer" }}
              onClick={this.handleEditImage}
            >
              <img src={imageUrl} alt={username} className="profile-image" />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${username}`}
                color="primary"
                variant="h6"
              >
                @{username}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <>
                  <PublicIcon color="primary" /> <span>{location}</span>
                </>
              )}
              <hr />
              {website && (
                <>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </>
              )}
              <CalendarTodayIcon color="primary" />{" "}
              <span>Member since {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <EditUserDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            Login to react or comment
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <DashboardSkeleton />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  uploadImage,
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
