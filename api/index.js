const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(cors());

app.post('/graphql', async (req, res) => {
  const externalGraphQLUrl =
    'https://heliumhackathon13.thoughtindustries.com/helium?apiKey=p1mjossidtxgiq9fgevv9anqlxolp8v0';

  try {
    const response = await fetch(externalGraphQLUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVG9rZW4iOiI0NWExaDF3YWZiZnlrZGppaWF2anM1cXZmeXRxdW1xIiwiaWF0IjoxNjk0NDM2MzQwLCJleHAiOjE3MjYwNTg3Mzl9.E0JougNJ4zu7sNtVW_TUqlI47l3FzPX6iOFB0echNMY',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log('>>> data', data);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/graphql', (req, res) => {
  // You can return a message or serve a GraphQL Playground here
  res.send('This is the GraphQL endpoint. Use a POST request to send GraphQL queries.');
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
