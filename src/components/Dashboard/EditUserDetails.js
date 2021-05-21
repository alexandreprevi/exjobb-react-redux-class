import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomButton from "../../utils/CustomButton";

// Redux
import { connect } from "react-redux";
import { updateUserDetails } from "../../redux/actions/userActions";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.generalStyles,
  button: {
    position: "absolute",
    top: "1%",
    right: "1%",
  },
});

class EditUserDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.updateUserDetails(userDetails);
    this.handleClose();
  };

  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <CustomButton
          tooltip="Edit details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
          tooltipPlacement="top"
        >
          <EditIcon color="primary" />
        </CustomButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Who are you..."
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleOnChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="http://yourwebsite.com"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleOnChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where are you..."
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleOnChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

const mapDispatchToProps = {
  updateUserDetails,
};

EditUserDetails.propTypes = {
  updateUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditUserDetails));
