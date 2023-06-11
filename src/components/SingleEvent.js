import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function SingleEvents() {
  const { id } = useParams(); // Get the event id from the URL
  const [event, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/events/${id}?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        setEvents(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Events not found</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <img src={`${event.thumbnail.path}.${event.thumbnail.extension}`} alt={event.title} />
      <p>{event.name}</p>
      {/* <p>Price: {event.prices[0].price}</p> */}
      <Outlet />
    </div>
  );
}

export default SingleEvents;
