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
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the video fills the container while maintaining aspect ratio */
`;

VideoPlayer.propTypes = {
  stream: propTypes.object,
  isMuted: propTypes.bool,
};

export default VideoPlayer;
