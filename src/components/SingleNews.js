import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function SingleStory() {
  const { id } = useParams(); // Get the story id from the URL
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/stories/${id}?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468`);
        if (!response.ok) {
          throw new Error('Failed to fetch story');
        }
        const data = await response.json();
        setStory(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <div className="story-details">
      <h2>{story.title}</h2>
      <Outlet />
    </div>
  );
}

export default SingleStory;
