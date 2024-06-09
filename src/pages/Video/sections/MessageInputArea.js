import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  messageInputArea: {
    background: "rgba(0, 0, 0, 0.5)", // Shaded transparent background
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    borderRadius: "8px", // Optional: add border radius for rounded corners
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly transparent background for the text field
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.5)", // Grey border color
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.75)", // Hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(255, 255, 255, 0.75)", // Focused border color
      },
    },
    "& .MuiInputBase-input": {
      color: "#fff", // Text color
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(255, 255, 255, 0.7)", // Placeholder color
    },
  },
  iconButton: {
    color: "#fff",
  },
}));

const MessageInputArea = () => {
  const classes = useStyles();

  return (
    <Box className={classes.messageInputArea}>
      <TextField
        variant="outlined"
        placeholder="Send Message"
        className={classes.textField}
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
      <IconButton className={classes.iconButton}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInputArea;
