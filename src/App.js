import React, { useEffect, useState } from 'react';

async function fetchData() {
  try {
    const response = await fetch('http://localhost:8001/graphql', {
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
    });
    const data = await response.json();
    console.log('Response from Express:', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const result = fetchData();
    setData(result);
  }, []);

  return <div>{data.name}</div>;
}

export default App;
