import React from "react";
import { BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  bottomNavBar: {
    backgroundColor: "#000",
    color: "#fff",
  },
  timer: {
    color: "#fff",
    fontWeight: "bold",
  },
}));

const BottomNavBar = () => {
  const classes = useStyles();

  return (
    <Box>
      <BottomNavigation showLabels className={classes.bottomNavBar}>
        <BottomNavigationAction label="Mic" icon={<MicIcon />} />
        <BottomNavigationAction label="Camera" icon={<VideocamIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        <Typography variant="h6" className={classes.timer}>
          03:00
        </Typography>
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavBar;
