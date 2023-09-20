import React, { useEffect, useState } from 'react';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';

builder.init('48ac3b97284e4e28b5ceefc76efd0800');

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
            firstName
            lastName
            email
            client {
                name
                panorama
              }
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

export default function CatchAllRoute() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get('page', {
          url: window.location.pathname,
        })
        .promise();

      setContent(content);
      setNotFound(!content);

      if (content?.data.title) {
        document.title = content.data.title;
      }
    }

    async function fetchDataAndContent() {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      fetchContent();
    }

    fetchDataAndContent();
  }, [window.location.pathname]);

  if (notFound && !isPreviewingInBuilder) {
    return 'page not found';
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BuilderComponent
        model="page"
        content={content}
        data={{
          currentUser: data,
        }}
      />
    </>
  );
}
