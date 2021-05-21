import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.generalStyles,
  commentUserImage: {
    height: 40,
    objectFit: "cover",
    borderRadius: "50%",
  },
});

export class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments &&
          comments.map((comment, index) => {
            const { body, createdAt, userImage, username } = comment;
            return (
              <Fragment key={index}>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={1}>
                      <img
                        src={userImage}
                        alt="comment"
                        className={classes.commentUserImage}
                      />
                    </Grid>
                    <Grid item sm={11}>
                      <div className={classes.commentData}>
                        <Typography
                          variant="h5"
                          component={Link}
                          to={`/user/${username}`}
                          color="primary"
                        >
                          {username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {index !== comments.length - 1 && (
                  <hr className={classes.visibleSeparator} />
                )}
              </Fragment>
            );
          })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
