import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#17a2b8"
  }
}));

export default function ApplicationLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="#17a2b8" />
      <Typography variant="h6" style={{ color: "#17a2b8" }}>
        Please wait...
      </Typography>
    </div>
  );
}
