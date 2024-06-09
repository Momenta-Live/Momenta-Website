import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  bottomBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "#fff",
    padding: "10px 0",
  },
  iconButton: {
    color: "#fff",
    backgroundColor: "#000", // Ensure all buttons have a black background
    borderRadius: "50%", // Circular shape for the buttons
    padding: "10px",
    margin: "5px",
    border: "2px solid #000", // Solid black border for consistency
    "&:hover": {
      backgroundColor: "#000",
      boxShadow: "none",
    },
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

const BottomNavBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.bottomBar}>
      <IconButton className={classes.iconButton}>
        <span role="img" aria-label="Alert" style={{ fontSize: "24px" }}>
          🚨
        </span>
      </IconButton>
      <IconButton className={classes.iconButton}>
        <MicIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <AccountBalanceIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <VideocamIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <HourglassEmptyIcon fontSize="large" />
      </IconButton>
      <Typography className={classes.timer}>03:00</Typography>
      <IconButton className={classes.iconButton}>
        <EmojiEmotionsIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <CardGiftcardIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <SettingsIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default BottomNavBar;
