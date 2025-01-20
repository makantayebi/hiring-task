# Home Assignment: Sentiment Analysis Application

## Description

This is a sentiment analysis application that allows users to analyze the sentiment of a given text. A product is rated by the customer, the sentiment analysis system assigns a sentiment category (Good, Bad, Neutral) to the rating. User can give feedback about the sentiment, and admin(s) can see a list of all the feedbacks.

## Components

- Frontend: Frontend is developed in react. React components use the Restful API of the backend to fetch their data and authentication. Framework is React and language is Typescript.
- Backend: The initially named "backend" serves Restful APIs for authentication, adding ratings and feedbacks and showing their list. Framework is Express and language is Typescript.
- Analyze-engine is software implemented in Python that uses the open-source `transformers` library of Huggin-face to categorize the sentiment of a given sentence. This software provides Restful API to receive texts and return rates.

## Run

Currently three softwares need to be set up separately:

- fronent: `cd ./frontend`, then `npm run build`, `npm run preview`
- backend: `cd ./backend`, then `npm run dev`

## DEV

- For the signup:

```
curl -X POST http://localhost:8000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"name":"user1", "password":"testmaster3000"}'
```

- For the sign in:

```
  curl -X POST http://localhost:8000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"name":"user1", "password":"testmaster3000"}'
```

- For the sentiment analysis:

```
  curl -X POST http://localhost:8000/api/analyze -H
  -H "Content-Type: application/json" \
  Authorization: Bearer {jwtToken} \
  body: JSON.stringify({text})
```

## Requirements

- Implement a REST API, which takes text (up to 1000 characters) as input, calculates a sentiment of the text, and stores the results in a database.

- Implement a REST API, which returns saved customer text messages together with calculated sentiments.

- Implement a frontend application with a feedback form for the end customer and that displays existing feedback with sentiment to ADMIN users.

- Tech stacks:
  - **Frontend:** React or Nextjs, tailwindcss or chakraUI
  - **Backend:** Nodejs, express, PostgreSQL

## Instructions

- Design, implement, and test your solution.

- Prepare a short, concise document (no presentation slides, 2 pages max) describing your solution (design, architecture, database structure if applicable).

- Send us the document and your implementation in a ZIP file (please, exclude binaries and dependencies)

- Your assignment is complete when you have a working solution that you can show to your customer.

## Advice/Hints

- Since we already provide project backend infrastructure that contains user authentication and authorization, you should keep our codebase style and structure for this project.

- Consider using existing libraries or cloud services for calculating sentiment.

- Think of sentiment as simple classification (Good/Bad/Neutral).

- Target for simplicity. Don't overcommit to the task, we value your personal time.

- If you have any questions, don't hesitate to ask.

- If you manage to complete the task very fast, here are a couple of bonus tasks:

  - Integrate with blockchain as connecting with metamask using web3.js.

  - Deploy your solution to the cloud.

  - Implement engineering best practices (source control, CI/CD, infrastructure-as-a-code)
