import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  userSection: {
    display: "flex",
    alignItems: "center",
    padding: "2px 8px", // Reduced padding to make the background smaller
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Shaded transparent background
    borderRadius: "8px", // Adjusted border radius
    color: "#fff",
    marginBottom: theme.spacing(1),
  },
  flag: {
    fontSize: "18px", // Adjust size as necessary
    marginRight: theme.spacing(1),
  },
  name: {
    fontSize: "14px", // Adjust font size if needed
  },
}));

const UserSection = ({ name, flag }) => {
  const classes = useStyles();

  return (
    <Box className={classes.userSection}>
      <Typography className={classes.flag}>{flag}</Typography>
      <Typography variant="h6" className={classes.name}>
        {name}
      </Typography>{" "}
    </Box>
  );
};

UserSection.propTypes = {
  name: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
};

export default UserSection;
