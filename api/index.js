const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const app = express();

// Define your GraphQL schema and resolvers as before
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
};

// Set up your Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Define a route that handles proxying GraphQL requests to the external endpoint
app.post('/graphql', async (req, res) => {
  try {
    const response = await axios.post(
      'https://heliumhackathon13.thoughtindustries.com/graphql', // External GraphQL endpoint
      req.body, // Forward the incoming request body
      {
        headers: {
          'Content-Type': 'application/json',
          // You can add any necessary headers here
        },
      }
    );

    // Return the response from the external endpoint to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying GraphQL request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
