import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";

export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};
