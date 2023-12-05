import fetch from 'node-fetch';
import { config } from 'dotenv';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  config();
}

export const handler = async (event) => {
  console.log("Event: ", event);

  const openAiApiKey = process.env.OPENAI_API_KEY; // Load API key from environment variables
  // console.log("openAiApiKey: ", openAiApiKey);

  const chatMessages = JSON.parse(event.body)?.chatMessages;
  console.log("chatMessages: ", chatMessages);

  // Prepare the request to OpenAI
  const openAiUrl = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openAiApiKey}`
  };
  const data = {
    model: "gpt-4-1106-preview",
    messages: [
      { "role": "system", "content": "You are master Yoda from Star Wars. keep you answers short and concise." },
      ...chatMessages
    ]
  };

  try {
    const response = await fetch(openAiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    const openAiResponse = await response.json();

    const message = openAiResponse.choices[0].message;
    console.log("message: ", message);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Error calling OpenAI API" })
    };
  }
};
