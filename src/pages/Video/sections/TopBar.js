import React from "react";
import { Typography, IconButton, Button, Box, AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    position: "fixed", // Use "absolute" if you don't want it to stick during scroll
    top: "50px", // Adjust this value as needed to push the AppBar down from the top
    width: "100%",
    zIndex: 1100, // Keeps it above other content if fixed
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
  },
  batteryContainer: {
    display: "flex",
    alignItems: "center",
    color: "#000",
    padding: "0 40px", // Further reduced padding to push prompt bar closer
  },
  icon: {
    fontSize: "50px", // Default large size
  },
  promptContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "4px 8px", // Adjusted padding
    marginLeft: "5px", // Further reduced margin to push closer to battery
    marginRight: "140px", // Add margin to the right for spacing
  },
  promptText: {
    wordWrap: "break-word",
  },
  skipButtonContainer: {
    backgroundColor: "#000", // Black background for the box
    borderRadius: "8px", // Rounded corners for the box
    padding: "13px 20px", // Padding inside the box
  },
  skipButton: {
    color: "#fff", // White text
  },
  refreshButton: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    marginLeft: "8px",
    padding: "16px", // Increased padding to make the button bigger
    fontSize: "1.5rem", // Adjust font size if needed
  },
  refreshIcon: {
    fontSize: "2rem", // Adjust font size to make the icon bigger
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.container}>
        <div className={classes.batteryContainer}>
          <span role="img" aria-label="Battery" className={classes.icon}>
            🔋
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={classes.promptContainer}>
            <Box className={classes.promptText}>What is your Favorite Drake Album? 👀</Box>
            <Button className={classes.refreshButton}>
              <span style={{ fontSize: "35px" }} className={classes.refreshIcon}>
                🔄
              </span>
            </Button>
          </div>
          <div className={classes.skipButtonContainer}>
            <IconButton className={classes.skipButton}>
              <Typography variant="button" style={{ fontSize: "24px", color: "#fff" }}>
                Skip ⏭️
              </Typography>
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
