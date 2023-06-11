import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function SingleMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/series/${id}?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        setMovie(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`} alt={movie.title} />
      <Outlet />
    </div>
  );
}

export default SingleMovie;
