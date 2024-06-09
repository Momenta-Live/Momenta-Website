import React from "react";
import { Typography, IconButton, Button, Box, AppBar, Toolbar } from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
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
  },
  promptContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "4px",
    flexGrow: 1,
    marginLeft: "16px",
    marginRight: "16px",
    padding: "8px",
  },
  promptText: {
    flexGrow: 1,
    wordWrap: "break-word",
  },
  skipButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#000",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px",
  },
  skipText: {
    marginLeft: "4px",
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
          <BatteryChargingFullIcon />
          <Typography variant="h6" style={{ marginLeft: "8px" }}>
            Battery
          </Typography>
        </div>
        <div className={classes.promptContainer}>
          <Box className={classes.promptText}>What is your Favorite Drake Album? 👀</Box>
          <Button className={classes.refreshButton}>
            <span className={classes.refreshIcon}>🔄</span>
          </Button>
        </div>
        <IconButton className={classes.skipButton}>
          <SkipNextIcon />
          <Typography variant="button" className={classes.skipText}>
            Skip
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
