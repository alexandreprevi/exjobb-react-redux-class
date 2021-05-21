import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import ProjectModal from "./ProjectModal";
import DeleteProject from "./DeleteProject";
import ReactionButton from "./ReactionButton";

// Redux
import { connect } from "react-redux";

// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.generalStyles,
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    maxWidth: 700,
    margin: "auto",
  },
  image: {
    minWidth: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: "50%",
    margin: "15px 0 0 10px",
  },
  content: {
    padding: 15,
  },
});

class ProjectCard extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      project: {
        userImage,
        body,
        status,
        category,
        createdAt,
        username: projectOwner,
        projectId,
        likeCount,
        fireCount,
        laughCount,
        confusedCount,
        rocketCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { username: currentUsername },
      },
    } = this.props;

    const deleteButton =
      authenticated && currentUsername === projectOwner ? (
        <DeleteProject projectId={projectId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="profile"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            component={Link}
            to={`/users/${projectOwner}`}
            color="primary"
          >
            {projectOwner}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body2" color="primary">
            Category: {category}
          </Typography>
          <Typography variant="body2" color="primary">
            Status: {status}
          </Typography>
          <Typography style={{ paddingBottom: 30 }} variant="body1">
            {body}
          </Typography>
          <hr />
          <ReactionButton projectId={projectId} type={"like"} />
          <span>{likeCount}</span>
          <ReactionButton projectId={projectId} type={"fire"} />
          <span>{fireCount}</span>
          <ReactionButton projectId={projectId} type={"confused"} />
          <span>{confusedCount}</span>
          <ReactionButton projectId={projectId} type={"laugh"} />
          <span>{laughCount}</span>
          <ReactionButton projectId={projectId} type={"rocket"} />
          <span>{rocketCount}</span>
          <hr className={classes.invisibleSeparator} />
          <span>{commentCount} comments</span>

          <ProjectModal
            projectId={projectId}
            username={projectOwner}
            openModal={this.props.openModal}
          />
        </CardContent>
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openModal: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(ProjectCard));
