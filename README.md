# ChatEDU

## Overview

ChatEDU is not just an educational tool; it's a revolution in learning. By harnessing the power of Azure AI, including GPT-4 and Azure's diverse databases and services, we've transcended traditional learning methods. Our platform transforms any text or file into an immersive tutoring experience, offering personalized study guides, multiple-choice tests, long answer formats, and context-driven sessions. This is education reimagined.

## Technical Architecture

This system leverages the power of React and Next.js for a dynamic front-end, Azure AD for secure authentication, PostgreSQL for robust database management, and Azure Cosmos DB alongside OpenAI's GPT-4 for intelligent data handling and conversational AI. Designed with scalability and user experience in mind, ChatEDU provides a seamless educational journey from information retrieval to knowledge testing.

![Overall.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/overall.png)

## Content Upload and Extraction Flow

The uploading flow in ChatEDU allows users to add files or text via a client interface, which then posts the data to the `/api/notes/upload` or `/api/notes/add` endpoints. This data is processed — text is extracted from files using Azure AI Document Intelligence — and subsequently stored in Azure Cosmos DB for further use within the platform.

![Uploading.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/uploading.png)

## RAG Prompting Flow

The Retrieval-Augmented Generation (RAG) prompting flow in ChatEDU begins when a user submits a prompt through the client interface, which sends a request to the `/api/chat` endpoint. The system then retrieves relevant information from the Azure Cosmos DB database to provide context to the generative language model (LLM), which uses this data to create personalized educational material. Finally, the response is streamed back to the client, providing the user with an answer that is augmented by the retrieved data, ensuring a more accurate and contextual interaction.

![Prompting.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/prompting.png)


## Continuous Integration and Deployment

The CI/CD pipeline for ChatEDU is implemented using GitHub Actions, which automates the process of code integration, testing, and deployment upon every push or pull request to the repository. Once the automated workflows verify the changes, the application is deployed to Azure Static Web Apps, ensuring continuous delivery of the latest version of the platform.

![Continuous Integration and Deployment Workflow with Next.js, GitHub, and Azure.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/deployment.png)

# Running the App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
