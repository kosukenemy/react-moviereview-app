import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovieGenres } from '../src/tmdbAPI';

type Genre = {
  id: string;
  name: string;
}


function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const fetchAPI = async() => {
    setGenres(await getMovieGenres())
  }

  useEffect(() => { fetchAPI() }, [])

  return (
    <div className="App">
      <div className="sideBar">
        {genres.map((genre, index) => {
          return (
            <ul key={index}>
              <li><button id={genre.id}>{genre.name}</button></li>
            </ul>
          )
        })}
      </div>
      <div className="main">main</div>
    </div>
  );
}

export default App;
