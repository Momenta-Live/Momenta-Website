import React from "react";
import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment } from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ChatIcon from "@mui/icons-material/Chat";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  appBar: {
    background: "linear-gradient(90deg, rgba(255,123,0,1) 0%, rgba(255,94,0,1) 100%)",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  batteryIcon: {
    marginRight: "8px",
  },
  skipButton: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
  },
  skipText: {
    marginLeft: "4px",
  },
  textField: {
    flexGrow: 1,
    marginLeft: "16px",
    marginRight: "16px",
    backgroundColor: "#fff",
    borderRadius: "4px",
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <BatteryChargingFullIcon className={classes.batteryIcon} />
          Battery
        </Typography>
        <TextField
          variant="outlined"
          placeholder="What is your Favorite Drake Album?"
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ChatIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton edge="end" className={classes.skipButton}>
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
