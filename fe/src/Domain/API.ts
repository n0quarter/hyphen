import * as Network from '../Infrastructure/Network';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'https://y2g4geyzdvzj2r3vmqgkzjkmza0bropy.lambda-url.eu-central-1.on.aws/'; // TODO: add SSL

export const initialize = (): void => {
  Network.initialize(API_URL);
};

export const sendChatMessages = (chatMessages: ChatMessage[]): Promise<ChatMessage> =>
  Network.post<ChatMessage,  { chatMessages: ChatMessage[] }>('chat', { chatMessages });

// DTOs
export interface ChatMessage {
  role: string;
  content: string;
}



