# Hyphen Code Challenge by Viktor

Here is a link to the deployed app: https://hyphen-rouge.vercel.app/

BE runs on AWS Lambda, FE runs on Vercel.

To run it locally, read further.

This repository contains two main directories: `be` and `fe`.
## Backend

The backend interacts with the OpenAI API and requires a `.env` file with an `OPENAI_API_KEY`.

### Prerequisites

- Node.js v18

### Setup

1. **Environment**: Create a `.env` file in the backend directory with your OpenAI API key:
   OPENAI_API_KEY=<your_api_key>


2. **Installation**: Run `npm install` in the backend directory to install dependencies.

### Usage

- **Local Development**:
    - Use `npm start` to run the server locally with nodemon.
    - NOTE: The code is built for AWS Lambda. For local development, it runs `localServer.js`, which implements an Express.js wrapper to imitate Lambda behavior.

- **Testing**:
    - Execute `npm test` to run tests with Jest.
    - NOTE: Jest tests are TBD

- **Deployment**:
    - Use `npm run deploy` to zip and deploy to AWS Lambda.
    - NOTE: you need aws cli configured for this to work

## Frontend

- It's a simple React app created with Create React App. 

### Prerequisites

- Node.js v18

### Setup

1. **Installation**: In the `fe` directory, run `npm install` to install the necessary React dependencies.

### Usage

- **Local Development**:
    - `npm start`
- **Testing**:
    - Execute `npm test` to run tests with Jest.
    - NOTE: Jest tests are TBD

### Deployment

- The frontend is hosted on Vercel. To deploy, push changes to your repository linked with Vercel, and it will handle the deployment automatically.

### Notes

This is a standard React application created with Create React App. No special environment variables or configurations are needed for local development.
