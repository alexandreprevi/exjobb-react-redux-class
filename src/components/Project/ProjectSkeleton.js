import React from "react";
import NOIMAGE from "../../images/no-img.png";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
  ...theme.generalStyles,
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  username: {
    width: 60,
    height: 10,
    backgroundColor: "#3f50b5",
    marginBottom: 7,
  },
  date: {
    height: 12,
    width: 100,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

const ProjectSkeleton = (props) => {
  const { classes } = props;
  const skelet = Array.from({ length: 5 });

  return (
    <>
      {skelet.map((_, index) => (
        <Card className={classes.card} key={index}>
          <CardMedia className={classes.cover} image={NOIMAGE} />
          <CardContent className={classes.cardContent}>
            <div className={classes.username} />
            <div className={classes.date} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

ProjectSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectSkeleton);
