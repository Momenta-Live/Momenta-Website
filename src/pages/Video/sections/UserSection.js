import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  userSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "#f0f0f0", // Placeholder background color for video call screen
    height: "100%", // Full height to represent video call screen
  },
  name: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
}));

const UserSection = ({ name }) => {
  const classes = useStyles();

  return (
    <Box className={classes.userSection}>
      <Typography variant="h6" className={classes.name}>
        {name}
      </Typography>
    </Box>
  );
};

UserSection.propTypes = {
  name: PropTypes.string.isRequired, // Add propTypes validation for name
};

export default UserSection;
