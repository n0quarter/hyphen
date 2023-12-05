import React, {useEffect, useRef} from "react";
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
  min-height: 500px;
  background-color: #f1f1f1;
  padding: 20px;
  color: black;
  font-size: 20px;
  overflow-y: auto; 
`;

const StyledForm = styled.form`
  display: flex;
  width: 90%;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    height: 50px;
  }
`;

const StyledButton = styled(Button)`
  height: 50px; 
`;

const LoadingIndicator = styled(CircularProgress)`
  color: white;
  margin-top: 10px;
  padding: 10px;
`;

const UserMessage = styled.div`
  max-width: 80%;
  margin: 10px auto 10px 20px; // Left aligned
  padding: 10px;
  background-color: #2196f3;
  border-radius: 20px;
  text-align: left;
  color: white;
`;

const AssistantMessage = styled.div`
  max-width: 80%;
  margin: 10px 20px 10px auto; // Right aligned
  padding: 10px;
  background-color: #4caf50; 
  border-radius: 20px;
  text-align: left;
  color: white;
`;

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
  padding: 10px;
`;

export const ChatView = () => {

  const [messages, setMessages] = React.useState([
    { role: "assistant", content: "Hi, I'm master Yoda. What is up?" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array ensures this runs whenever messages change

  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onSendClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem('message') as HTMLInputElement;

    const newMessage = {
      role: "user",
      content: input.value,
    };

    const newMessages: ChatMessage[] = [...messages, newMessage];
    setMessages(newMessages);

    setIsLoading(true);
    API.sendChatMessages(newMessages)
      .then(gptMessage => {
        setMessages(prev => [...prev, gptMessage]);
        setIsLoading(false);
        setError(null);

      })
      .catch(err => {
        setError(err.message);
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
      {messages.map((message, index) => {
        const MessageComponent = message.role === "user" ? UserMessage : AssistantMessage;
        return (
          <MessageComponent key={index}>
            <b>{message.role}</b>: {message.content}
          </MessageComponent>
        );
      })}
      <div ref={messagesEndRef} />

      {isLoading && <LoadingIndicator size={24} />}
      {error && <ErrorMsg>{error}</ErrorMsg>}
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