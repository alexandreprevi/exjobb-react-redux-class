import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import CustomButton from "../../utils/CustomButton";

// Redux
import { connect } from "react-redux";
import { deleteOneProject } from "../../redux/actions/dataActions";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const styles = {
  deleteButton: {
    left: "90%",
    top: "10%",
    position: "absolute",
  },
};

class DeleteProject extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.deleteOneProject(this.props.projectId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <CustomButton
          tooltip="Delete Project"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <HighlightOffIcon color="secondary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Do you really want to delete this project?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteProject.propTypes = {
  deleteOneProject: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  deleteOneProject,
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DeleteProject));
