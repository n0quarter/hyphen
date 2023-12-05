
export const handler = async (event) => {
  console.log("Event: ", event);

// return hello world
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({message: "Hello World!"})
  };
};