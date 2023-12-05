import * as Network from '../Infrastructure/Network';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'http://hyphen.asdcode.com'; // TODO: add SSL

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



