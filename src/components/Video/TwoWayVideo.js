import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// MK Components
import MKBox from "components/MKBox";

// Custom Components
import VideoPlayer from "components/Video/VideoPlayer";
import UserSection from "components/Video/UserSection";

function TwoWayVideo({ streamSelf, isMutedSelf, streamOther, isMutedOther }) {
  return (
    <MKBox sx={{ width: "100%", margin: "auto" }}>
      <Container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <MKBox
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
                position: "relative",
              }}
            >
              <UserSection name="You" flag="🇺🇸" />
              <VideoPlayer stream={streamSelf} isMuted={isMutedSelf} />
            </MKBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MKBox
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
                position: "relative",
              }}
            >
              <UserSection name="Other" flag="🇺🇸" />
              <VideoPlayer stream={streamOther} isMuted={isMutedOther} />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

TwoWayVideo.propTypes = {
  streamSelf: PropTypes.object,
  isMutedSelf: PropTypes.bool,
  streamOther: PropTypes.object,
  isMutedOther: PropTypes.bool,
};

export default TwoWayVideo;
