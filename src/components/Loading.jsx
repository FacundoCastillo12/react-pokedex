import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/react';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Pokeball = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 4px solid #f2f2f2;
    border-top-color: #dc1d1d;
    border-radius: 50%;
    animation: ${rotation} 1s linear infinite;
    box-sizing: border-box;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 18px;
    left: 18px;
    width: 28px;
    height: 28px;
    background-color: #f2f2f2;
    border-radius: 50%;
    box-sizing: border-box;
  }
`;

function Loading() {
  return (
    <Container>
      <Pokeball />
    </Container>
  );
}
export default Loading;
