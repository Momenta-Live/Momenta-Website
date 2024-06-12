import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingCircle = styled.div`
  border: 2px solid #eee; /* Light grey */
  border-top: 2px solid rgb(226, 8, 128); /* Blue */
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: ${spin} 1s linear infinite;
`;

export default LoadingCircle;
