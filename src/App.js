import React, { useEffect } from 'react';

async function fetchData() {
  try {
    const response = await fetch(
      'https://vercel-builder-git-main-alexoneillti.vercel.app/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query{  
          CurrentUser {
              id
              name
            }
          }`,
        }),
      }
    );
    const data = await response.json();
    console.log('Response from Express:', data);
  } catch (error) {
    console.error(error);
  }
}

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  return <div>This is the sample app working</div>;
}

export default App;
