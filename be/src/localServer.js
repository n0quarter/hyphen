/**
 * Local Express Server Wrapper for AWS Lambda
 *
 * This script sets up an Express server to mimic AWS Lambda's behavior, allowing
 * local testing and development of Lambda functions. It constructs a similar event
 * object to what AWS Lambda would receive and forwards requests to the Lambda handler.
 */

import express from 'express';
import { handler } from './index.js';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes for local development
app.use(express.json());

app.all('*', async (req, res) => {
  // Construct an event object similar to what API Gateway provides
  const event = {
    httpMethod: req.method,
    path: req.path,
    queryStringParameters: req.query,
    headers: req.headers,
    body: JSON.stringify(req.body)
  };

  // Call the Lambda handler
  try {
    const result = await handler(event);
    // Return the response from the Lambda function
    res.status(result.statusCode).set(result.headers).send(result.body);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Local server listening at http://localhost:${port}`);
});
