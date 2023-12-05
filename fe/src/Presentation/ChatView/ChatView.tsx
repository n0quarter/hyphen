import React from "react";
import styled from "styled-components";
import {Button, CircularProgress, TextField} from "@mui/material";
import * as API from '../../Domain/API';
import {ChatMessage} from "../../Domain/API";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px; // Max width for the chat container
  width: 100%; // Full width on smaller devices
  //min-height: 100%;
  min-height: 500px;
  background-color: #f1f1f1;
  padding: 20px;
  color: black;
  font-size: 24px;
  overflow-y: auto; // Allows vertical scrolling if content overflows
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    height: 50px; // Adjust this value as needed
  }
`;

const StyledButton = styled(Button)`
  height: 50px; // Ensure this matches the TextField height
`;

const LoadingIndicator = styled(CircularProgress)`
  color: white;
  margin-top: 10px;
  padding: 10px;
`;

export const ChatView = () => {
  const [messages, setMessages] = React.useState([
    { role: "user", content: "Hello!" },
    { role: "assistant", content: "hi, how are you?" },
  ]);

  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSendClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;

    const newMessage = {
      role: "user",
      content: input.value,
    };

    // optimistic update
    const newMessages: ChatMessage[] = [...messages, newMessage];
    setMessages(newMessages);

    setIsLoading(true);
    API.sendChatMessages(newMessages).then(gptMessage => {
      console.log(gptMessage);
      setMessages(prev => [...prev, gptMessage]);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <ChatContainer>
      <h1>Chat</h1>
      {messages.map((message, index) => (
        <div key={index}>
          <b>{message.role}</b>: {message.content}
        </div>
      ))}

      {isLoading && <LoadingIndicator size={24} />}

      <StyledForm onSubmit={onSendClick}>
        <StyledTextField
          name="message"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <StyledButton type="submit"
                variant="contained"
                color="primary"
                disabled={!inputValue || isLoading}
        >
          Send
        </StyledButton>
      </StyledForm>

    </ChatContainer>
  );
}