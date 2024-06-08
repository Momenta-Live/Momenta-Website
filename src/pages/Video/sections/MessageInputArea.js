import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  messageInputArea: {
    background: "linear-gradient(90deg, rgba(255,123,0,1) 0%, rgba(255,94,0,1) 100%)",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  iconButton: {
    color: "#fff",
  },
}));

const MessageInputArea = () => {
  const classes = useStyles();

  return (
    <Box className={classes.messageInputArea}>
      <TextField variant="outlined" placeholder="Send Message" className={classes.textField} />
      <IconButton className={classes.iconButton}>
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInputArea;
