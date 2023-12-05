import { config } from 'dotenv';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  config();
}

const openAiApiKey = process.env.OPENAI_API_KEY; // Load API key from environment variables

const askGPT = async (chatMessages) => {
  const openAiUrl = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openAiApiKey}`
  };
  console.log('========= [askGPT]: chatMessages = ', chatMessages)
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

    if (openAiResponse.error) {
      throw new Error(openAiResponse.error.message);
    }

    return openAiResponse.choices ? openAiResponse.choices[0].message : null;
  } catch (error) {
    throw error;
  }
}

export default askGPT;