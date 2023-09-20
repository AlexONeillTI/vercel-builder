import React, { useEffect, useState } from 'react';

async function fetchData() {
  try {
    const response = await fetch('https://builder-backend-q16c.onrender.com/graphql', {
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
    throw error; // Re-throw the error to handle it in the calling code
  }
}

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>This is the Builder Homepage</div>;
};

export default Home;
