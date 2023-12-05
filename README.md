# ChatEDU

## Table of Contents

- [Overview](#overview)
- [Technical Architecture](#technical-architecture)
    - [Content Upload and Extraction Flow](#content-upload-and-extraction-flow)
    - [RAG Prompting Flow](#rag-prompting-flow)
    - [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Directory Structure](#directory-structure)
  - [/pages](#pages)
  - [/app](#app)
  - [/components](#components)
  - [/hooks](#hooks)
  - [/search](#search)
  - [/prompts](#prompts)
  - [/types](#types)
  - [/cosmosPostgres](#cosmospostgres)
  - [/services](#services)
  - [/documentIntelligence](#documentintelligence)
- [Running the Application](#running-the-app)

## Overview

ChatEDU is not just an educational tool; it's a revolution in learning. By harnessing the power of Azure AI, including GPT-4 and Azure's diverse databases and services, we've transcended traditional learning methods. Our platform transforms any text or file into an immersive tutoring experience, offering personalized study guides, multiple-choice tests, long answer formats, and context-driven sessions. This is education reimagined.

## Technical Architecture

This system leverages the power of React and Next.js for a dynamic front-end, Azure AD for secure authentication, PostgreSQL for robust database management, and Azure Cosmos DB alongside OpenAI's GPT-4 for intelligent data handling and conversational AI. Designed with scalability and user experience in mind, ChatEDU provides a seamless educational journey from information retrieval to knowledge testing.

![Overall.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/overall.png)

### Content Upload and Extraction Flow

The uploading flow in ChatEDU allows users to add files or text via a client interface, which then posts the data to the `/api/notes/upload` or `/api/notes/add` endpoints. This data is processed — text is extracted from files using Azure AI Document Intelligence — and subsequently stored in Azure Cosmos DB for further use within the platform.

![Uploading.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/uploading.png)

### RAG Prompting Flow

The Retrieval-Augmented Generation (RAG) prompting flow in ChatEDU begins when a user submits a prompt through the client interface, which sends a request to the `/api/chat` endpoint. The system then retrieves relevant information from the Azure Cosmos DB database to provide context to the generative language model (LLM), which uses this data to create personalized educational material. Finally, the response is streamed back to the client, providing the user with an answer that is augmented by the retrieved data, ensuring a more accurate and contextual interaction.

![Prompting.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/prompting.png)


### Azure AI Search

We utilize Azure AI search to index the `users` and `notebooks` collections of our database. This then allows users to perform fast and efficient searches on the data through the client. The search service is automatically synced with the database, ensuring that the search results are always up-to-date.

![Search.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/search.png)

### Continuous Integration and Deployment

The CI/CD pipeline for ChatEDU is implemented using GitHub Actions, which automates the process of code integration, testing, and deployment upon every push or pull request to the repository. Once the automated workflows verify the changes, the application is deployed to Azure Static Web Apps, ensuring continuous delivery of the latest version of the platform.

![Continuous Integration and Deployment Workflow with Next.js, GitHub, and Azure.png](https://raw.githubusercontent.com/chat-edu/chat-edu/main/public/architecture/deployment.png)

## Directory Structure

### `/pages`

In the `pages` directory, each `.tsx` file corresponds to a route on the front end, powered by Next.js SSR. When a user visits a URL, the corresponding `.tsx` file is rendered, representing the content of that route.

### `/app`

Defines all API routes for ChatEDU. Any folder with a `route.ts` file represents an API route that can be accessed via the path to that folder. For instance, the route at `/app/api/notebooks/create/route.ts` is invoked by `chatedu.tech/api/notebooks/create/`.

### `/components`

Contains all of the React components for the ChatEDU application. The components are organized into folders based on their functionalities. This directory follows a modular approach, allowing for easy management and reuse of components across different parts of the application.

The `/components/layout` directory contains a shared layout for each page, which includes a navbar, authentication gating, and

### `/hooks`

Responsible for modularizing the stateful aspects of the application. It houses custom React hooks that encapsulate logic and provide reusable functionality. These hooks are designed to be composable, allowing utility hooks to be combined to create more complex hooks.

By separating stateful logic into hooks, the codebase becomes more organized and maintainable. It also promotes code reusability, as hooks can be easily shared and used across different parts of the application.

The hooks integrate with the interfaces defined in the `/types` directory. This allows for changes to the logic of the application without impacting the front end as there is a separation of concerns and use of type-safe contracts.

`/hooks/queries`

All data querying in the ChatEDU application is facilitated through the React hooks located in this directory. These hooks are extensively utilized throughout the client and in other higher-order hooks to ensure efficient and consistent data retrieval for seamless user experiences.

`/hooks/mutators`

The creation, modification, and deletion of data are facilitated through these hooks, encapsulating the logic for interacting with the API.

`/hooks/utilities`

Utility hooks are composable logic that are used in other hooks, such as extracting data from PDFs and summarizing large notes.

`/hooks/useChatEdu.ts`

Governs the chat interface of the application and generalizes use of `commands` defined in the `/prompts` directory.

`/hooks/useAuth.ts`

Handles user authentication through Azure AD, which is used throughout the application to handle user data and gated content.

### `/search`

Contains all of the logic for interacting with the Azure AI Search service. It includes functions and modules for connecting to the search service, querying data, and performing CRUD operations.

### `/prompts`

Contains all of the prompts used by the chat and other LLM (Language Model) related functionality. Commands are templatized prompt structures that are used to interact with the chat component of the application. They provide context and instructions for generating personalized educational material and facilitating conversations within the platform.

### `/types`

Defines the interfaces for the application, allowing for communication across components and facilitating the integration of the front and back end of the application.

### `/cosmosPostgres`

Contains all of the logic for interacting with the Azure Cosmos Postgres database. It includes functions and modules for connecting to the database, querying data, performing CRUD operations, and managing database transactions.

### `/services`

Provides functions that enable type-safe interactions with the REST API. These functions handle requests to the server and provide a layer of abstraction for making API calls. They ensure that the data exchanged between the front end and back end is consistent and follows the defined types and contracts.

### `/documentIntelligence`

Handles the extraction of data from images and PDFs for seamless upload through Azure AI Document Intelligence.

## Running the App

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
