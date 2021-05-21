import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import { createOneComment } from "../../redux/actions/dataActions";

// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  ...theme.generalStyles,
  button: {
    marginBottom: 20,
    float: "right",
  },
});

class CreateComment extends Component {
  state = {
    body: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      body: this.state.body,
    };
    this.props.createOneComment(this.props.projectId, newComment);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        errors: {},
      });
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
  //     };
  //   }
  // }

  render() {
    const { authenticated, classes } = this.props;
    const errors = this.state.errors;

    return authenticated ? (
      <Grid item sm={8}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Write a comment..."
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    ) : null;
  }
}

CreateComment.propTypes = {
  createOneComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = {
  createOneComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateComment));
