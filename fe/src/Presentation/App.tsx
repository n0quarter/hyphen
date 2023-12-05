import React from 'react';
import styled from 'styled-components';
import {ChatView} from "./ChatView/ChatView";

const FullScreenCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh; 
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 10px;
  box-sizing: border-box;

  @media (min-width: 769px) {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }
`;

const App = () => {
  return (
    <FullScreenCentered>
      <ChatView />
    </FullScreenCentered>
  );
}

export default App;

