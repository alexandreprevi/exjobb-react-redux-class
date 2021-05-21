import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import CustomButton from "../../utils/CustomButton";
import ReactionButton from "./ReactionButton";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

// Redux
import { connect } from "react-redux";
import { getOneProject, clearErrors } from "../../redux/actions/dataActions";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.generalStyles,
  profileImage: {
    maxWidth: 50,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
    maxWidth: "80%",
    margin: "0px 10px",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "85%",
    top: "80%",
  },
  loaderContainer: {
    textAlign: "center",
    margin: "0 50px",
  },
});

class ProjectModal extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openModal) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    // When user click on a project we want to redirect him to the user page and open the projectModal
    const { username, projectId } = this.props;
    let oldPath = window.location.pathname;
    const newPath = `/users/${username}/project/${projectId}`;

    if (oldPath === newPath) {
      oldPath = `/users/${username}`;
    }

    // Set the new url
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getOneProject(this.props.projectId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      project: {
        projectId,
        body,
        category,
        status,
        createdAt,
        likeCount,
        fireCount,
        confusedCount,
        laughCount,
        rocketCount,
        commentCount,
        userImage,
        username,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogContent = loading ? (
      <div className={classes.loaderContainer}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <img
            src={userImage}
            alt={username}
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={10}>
          <Typography
            component={Link}
            to={`/users/${username}`}
            color="primary"
            variant="h5"
          >
            @{username}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="secondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <Typography variant="body2" color="primary">
            Category: {category}
          </Typography>
          <Typography variant="body2" color="primary">
            Status: {status}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1" style={{ paddingBottom: 30 }}>
            {body}
          </Typography>
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
          <span style={{ marginLeft: 20 }}>{commentCount} comments</span>
          <hr className={classes.invisibleSeparator} />
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CreateComment projectId={projectId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleOpen}
          className={classes.expandButton}
        >
          VIEW
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="md"
        >
          <CustomButton
            tooltip="Close"
            onClick={this.handleClose}
            tooltipClassName={classes.closeButton}
            tooltipPlacement="top"
          >
            <CloseIcon />
          </CustomButton>
          <DialogContent className={classes.dialogContent}>
            {dialogContent}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

ProjectModal.propTypes = {
  getOneProject: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.data.project,
  UI: state.UI,
});

const mapDispatchToProps = {
  getOneProject,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProjectModal));
