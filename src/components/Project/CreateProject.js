import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomButton from "../../utils/CustomButton";

// Redux
import { connect } from "react-redux";
import { createOneProject, clearErrors } from "../../redux/actions/dataActions";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.generalStyles,
  submitButton: {
    position: "relative",
    float: "right",
    margin: 10,
  },
  progressLoader: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "6%",
  },
});

class CreateProject extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  // static getDerivedStateFromProps(props) {
  //   if (props.UI.errors) {
  //     return {
  //       errors: props.UI.errors,
  //     };
  //   }

  //   if (!props.UI.errors && !props.UI.loading) {
  //     return {
  //       body: "",
  //       open: false,
  //       errors: {},
  //     };
  //   }
  // }

  state = {
    open: false,
    body: "",
    category: "",
    status: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newProject = {
      body: this.state.body,
      category: this.state.category,
      status: this.state.status,
    };
    this.props.createOneProject(newProject);
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <>
        <Button onClick={this.handleOpen} color="inherit">
          Create
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tooltip="Close"
            onClick={this.handleClose}
            tooltipClassName={classes.closeButton}
            tooltipPlacement="top"
          >
            <CloseIcon />
          </CustomButton>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Project"
                multiline
                row="3"
                placeholder="What is this about..."
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="category"
                type="text"
                label="Category"
                placeholder="Coding, Cleaning, Carpentry..."
                error={errors.category ? true : false}
                helperText={errors.category}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="status"
                type="text"
                label="Status"
                placeholder="private or public..."
                error={errors.status ? true : false}
                helperText={errors.status}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={20}
                    className={classes.progressLoader}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

CreateProject.proTypes = {
  createOneProject: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapDispatchToProps = {
  createOneProject,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateProject));
