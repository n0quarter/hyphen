import askGPT from "./Services/gptService.js";

export const handler = async (event) => {
  const chatMessages = JSON.parse(event.body)?.chatMessages;

  try {
    const message = await askGPT(chatMessages);
    return SuccessResult(message);
  }
  catch (error) {
    console.error(error);
    return ErrorResult('Error while calling OpenAI API: ' + error.message);
  }
};

const SuccessResult = (message) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  };
}

const ErrorResult = (error) => {
  return {
    statusCode: 500,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ error })
  };
}