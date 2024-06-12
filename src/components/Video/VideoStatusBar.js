import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";

const VideoStatusBar = ({ data }) => {
  return (
    <MKBox sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={5} sx={{ justifyContent: "center" }}>
        <Grid item>
          <p> LOCAL VIDEO: {data?.local.video ? "TRUE" : "FALSE"}</p>
        </Grid>
        <Grid item>
          <p> LOCAL AUDIO: {data?.local.audio ? "TRUE" : "FALSE"}</p>
        </Grid>
        <Grid item>
          <p> INCOMING VIDEO: {data?.incoming[0]?.video ? "TRUE" : "FALSE"}</p>
        </Grid>
        <Grid item>
          <p> INCOMING AUDIO: {data?.incoming[0]?.audio ? "TRUE" : "FALSE"}</p>
        </Grid>
      </Grid>
    </MKBox>
  );
};

VideoStatusBar.propTypes = {
  data: PropTypes.object,
};

export default VideoStatusBar;
