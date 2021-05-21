import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// redux
import { connect } from "react-redux";
import { getOneUser } from "../redux/actions/dataActions";

// Components
import ProjectCard from "../components/Project/ProjectCard";
import ProjectSkeleton from "../components/Project/ProjectSkeleton";
import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";
import UserProfile from "../components/Project/UserProfile";

// Material UI
import Grid from "@material-ui/core/Grid";

class user extends Component {
  state = {
    profile: null,
    projectIdParam: null,
  };

  componentDidMount() {
    const { username, projectId } = this.props.match.params;

    if (projectId) this.setState({ projectIdParam: projectId });

    this.props.getOneUser(username);
    // We can fetch here this data is not going to change
    // No need to have it in our global state
    axios
      .get(`/user/${username}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { projects, loading } = this.props.data;
    const { projectIdParam } = this.state;

    const userProjects = loading ? (
      <ProjectSkeleton />
    ) : projects === null ? (
      <p>No projects to display</p>
    ) : !projectIdParam ? (
      projects.map((project) => (
        <ProjectCard key={project.projectId} project={project} />
      ))
    ) : (
      projects.map((project) => {
        if (project.projectId !== projectIdParam) {
          return <ProjectCard key={project.projectId} project={project} />;
        } else {
          return (
            <ProjectCard key={project.projectId} project={project} openModal />
          );
        }
      })
    );

    return (
      <Grid container spacing={3}>
        <Grid item sm={12} xs={12}>
          {this.state.profile === null ? (
            <DashboardSkeleton />
          ) : (
            <UserProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={12} xs={12}>
          {userProjects}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getOneUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getOneUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(user);
