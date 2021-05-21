import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

// components
import ProjectCard from "../components/Project/ProjectCard";
import ProjectSkeleton from "../components/Project/ProjectSkeleton";
import Dashboard from "../components/Dashboard/Dashboard";

// Redux
import { connect } from "react-redux";
import { getAllProjects } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getAllProjects();
  }

  render() {
    const { projects, loading } = this.props.data;
    let displayProjects = !loading ? (
      projects.map((project) => (
        <ProjectCard project={project} key={project.projectId} />
      ))
    ) : (
      <ProjectSkeleton />
    );

    return (
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Dashboard />
        </Grid>
        <Grid item sm={8} xs={12}>
          {displayProjects}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getAllProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(home);
