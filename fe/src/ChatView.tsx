import React from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px; // Max width for the chat container
  width: 100%; // Full width on smaller devices
  //min-height: 100%;
  min-height: 500px;
  background-color: yellow;
  color: black;
  font-size: 24px;
  overflow-y: auto; // Allows vertical scrolling if content overflows
`;

export const ChatView = () => {
  const [messages, setMessages] = React.useState([
    { sender: "me", content: "Hello!" },
    { sender: "other", content: "Hi!" },
    { sender: "me", content: "How are you?" },
    { sender: "other", content: "Good, you?" },
    { sender: "me", content: "Great!" },
  ]);

  return (
    <ChatContainer>
      <h1>Chat</h1>
      {messages.map((message, index) => (
        <div key={index}>
          <b>{message.sender}</b>: {message.content}
        </div>
      ))}

    </ChatContainer>
  );
}