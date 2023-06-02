import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Search from './components/search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import More from './components/more';
import Movies from './components/movies';
import Comics from './components/comics';
import Fetch from './components/fetch';
import Characters from './components/characters';
import Creators from './components/creators';
import Videos from './components/videos'
import Reviews from './components/reviews';
import News from './components/news';
import Events from './components/events';
import Games from './components/games';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
      <header>
        <h1>MARVEL</h1>
      </header>
        <Search />
        <div className='content'>
        <Navbar />
        <Routes>
          <Route
            path='/fetch'
            element={<Fetch />}
          />
          <Route
            path='/comics'
            element={<Comics />}
          />
          <Route 
          path='/comics/:id'
           element={<Comics />} />
          <Route
            path='/movies'
            element={<Movies />}
          />
          <Route
            path='/creators'
            element={<Creators />}
          />
          <Route
            path='/games'
            element={<Games />}
          />
          <Route
            path='/characters'
            element={<Characters />}
          />
          <Route
            path='/videos'
            element={<Videos />}
          />
          <Route
            path='/more'
            element={<More />}
          />
          <Route
            path='/news'
            element={<News />}
          />
          <Route
            path='/reviews'
            element={<Reviews />}
          />
          <Route
            path='/events'
            element={<Events />}
          />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
