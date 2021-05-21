import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// commponents
import CreateProject from "../Project/CreateProject";
import Notifications from "./Notifications";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: { authenticated },
    } = this.props;

    return (
      <AppBar>
        <Toolbar className="navbar-container">
          {authenticated ? (
            <>
              <div>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <CreateProject />
              </div>

              <Notifications />
              <Button color="inherit" onClick={this.handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <div>
                {" "}
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
              </div>
              <div>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
