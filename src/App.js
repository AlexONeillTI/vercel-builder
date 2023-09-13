import React, { useEffect } from 'react';

async function fetchApi() {
  const uri = '/api/test';
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
