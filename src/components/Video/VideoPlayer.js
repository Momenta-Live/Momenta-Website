import propTypes from "prop-types";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Video = styled.video`
  width: auto;
  height: auto;
  min-width: 100%;
  max-height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Plaholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
`;

const VideoPlayer = ({ stream, isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  console.log("stream", stream);

  return <>{stream ? <Video ref={videoRef} muted={isMuted} autoPlay /> : <Plaholder />}</>;
};

VideoPlayer.propTypes = {
  stream: propTypes.object,
  isMuted: propTypes.bool,
};

export default VideoPlayer;
