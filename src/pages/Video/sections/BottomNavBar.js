import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  bottomBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent", // Keep the bottom bar transparent
    color: "#fff",
    padding: "10px 0",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#000",
    padding: "10px",
    margin: "5px",
    border: "2px solid #000",
    width: "64px", // Fixed size for consistency
    height: "64px", // Fixed size for consistency
  },
  icon: {
    color: "#fff", // Ensure icons are white
    fontSize: "2rem", // Adjust the icon size
  },
  timer: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "24px",
    backgroundColor: "#000", // Black background for the timer
    borderRadius: "50%", // Circular shape for the timer
    padding: "10px 20px",
    border: "2px solid #000", // Solid black border
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
  },
}));

const BottomNavBar = ({ onToggleAudio, onToggleVideo }) => {
  const classes = useStyles();

  return (
    <Box className={classes.bottomBar}>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            🚨
          </span>
        </IconButton>
      </Box>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton} onClick={onToggleAudio}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            🎙️
          </span>
        </IconButton>
      </Box>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton} onClick={onToggleVideo}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            📷
          </span>
        </IconButton>
      </Box>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            ⏳
          </span>
        </IconButton>
      </Box>
      <Typography className={classes.timer}>03:00</Typography>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            🎉
          </span>
        </IconButton>
      </Box>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            🎁
          </span>
        </IconButton>
      </Box>
      <Box className={classes.iconContainer}>
        <IconButton className={classes.iconButton}>
          <span role="img" aria-label="Alert" className={classes.icon}>
            🏦
          </span>
        </IconButton>
      </Box>
    </Box>
  );
};

BottomNavBar.propTypes = {
  onToggleAudio: PropTypes.func.isRequired,
  onToggleVideo: PropTypes.func.isRequired,
};

export default BottomNavBar;
