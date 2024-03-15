import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura da tela inteira */
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1); /* Aumenta a espessura da borda */
  border-top: 8px solid #007bff;
  border-radius: 50%;
  width: 80px; /* Tamanho maior */
  height: 80px; /* Tamanho maior */
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loading: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default Loading;
