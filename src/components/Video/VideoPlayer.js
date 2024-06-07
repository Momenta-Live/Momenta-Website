import propTypes from "prop-types";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const VideoPlayer = ({ stream, isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return <Video ref={videoRef} muted={isMuted} autoPlay />;
};

const Video = styled.video`
  width: 25vw;
  height: fit-content;
  border: 2px solid black;
`;

VideoPlayer.propTypes = {
  stream: propTypes.object,
  isMuted: propTypes.bool,
};

export default VideoPlayer;
