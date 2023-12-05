import React from 'react';
import styled from 'styled-components';
import {ChatView} from "./ChatView";

// FullScreenCentered component for full-screen on mobile and centered on desktop
const FullScreenCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh; // Full viewport height
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 10px;
  box-sizing: border-box; // Ensures padding is included in the element's total width and height

  // Media query for desktop
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

