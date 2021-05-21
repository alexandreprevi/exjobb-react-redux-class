import React from "react";
import NOIMAGE from "../../images/no-img.png";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

import PublicIcon from "@material-ui/icons/Public";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.generalStyles,
  username: {
    height: 20,
    backgroundColor: "#3f50b5",
    width: 60,
    margin: "0px auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "50%",
    marginBottom: 10,
  },
});

const DashboardSkeleton = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NOIMAGE} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.username} />
          <hr />
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <hr />
          <PublicIcon color="primary" /> <span>Location</span>
          <CalendarTodayIcon color="primary" /> Member since
        </div>
      </div>
    </Paper>
  );
};

DashboardSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardSkeleton);
