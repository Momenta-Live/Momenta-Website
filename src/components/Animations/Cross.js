import styled from "styled-components";

const Cross = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 9px;
    height: 20px;
    width: 2px;
    background-color: red;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

export default Cross;
