import fetch from 'node-fetch';
import { config } from 'dotenv';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  config();
}

export const handler = async (event) => {
  // console.log("Event: ", event);

  const openAiApiKey = process.env.OPENAI_API_KEY; // Load API key from environment variables
  // console.log("openAiApiKey: ", openAiApiKey);

  // const userInput = JSON.parse(event.body)?.input;

  // Prepare the request to OpenAI
  const openAiUrl = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openAiApiKey}`
  };
  const data = {
    model: "gpt-4-1106-preview",
    messages: [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "what is up?" }
    ]
  };

  try {
    const response = await fetch(openAiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    const openAiResponse = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(openAiResponse)
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
