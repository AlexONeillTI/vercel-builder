import React, { useEffect } from 'react';

import axios from 'axios';
import { gql, useQuery } from '@apollo/client';

// Your GraphQL query
const currentuserQuery = gql`
  currentuser {
    id
  }
`;

async function fetchApi() {
  // const query = useQuery(currentuserQuery);
  try {
    // Make the request to your Express.js backend
    axios
      .post('/graphql', { query: currentuserQuery })
      .then((response) => {
        console.log('Response from Express backend:', response.data);
        // Handle the response from the external GraphQL endpoint here
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function App() {
  useEffect(() => {
    async function fetchData() {
      const result = await fetchApi();
      console.log(result);
    }
    fetchData();
  }, []);

  return <div>This is the sample app working</div>;
}

export default App;
