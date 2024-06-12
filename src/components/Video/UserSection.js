import React from "react";
import PropTypes from "prop-types";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  videoFrameWrapper: {
    position: "absolute",
  },
}));

const UserSection = ({ name, flag }) => {
  const classes = useStyles();

  return (
    <div className={classes.videoFrameWrapper}>
      <MKBox
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "2px 30px", // Reduced padding to make the background smaller
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Shaded transparent background
          borderRadius: "5px", // Adjusted border radius
          color: "#fff",
        }}
      >
        <MKTypography color="white">{flag} </MKTypography>
        <MKTypography variant="h6" color="white" pl={1}>
          {name}
        </MKTypography>
      </MKBox>
    </div>
  );
};

UserSection.propTypes = {
  name: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
};

export default UserSection;
