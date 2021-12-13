import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovieGenres } from '../src/tmdbAPI';
import { getGenresQueryMovie } from '../src/tmdbAPI';

type initialGenre = {
  [key: string]: any;
}

type Genre = {
  id: string;
  name: string;
}

type GenreMovie = {
  id: string;
  overview: string;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  likedCount?: number;
}

function App() {
  const initialGenreName:initialGenre = { Action: 28 };
  const initialGenreId:initialGenre = { type: initialGenreName.initialGenreId };
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresMovie, setGenreMovie] = useState<GenreMovie[]>([]);
  const fetchAPI = async() => {
    setGenres(await getMovieGenres());
    setGenreMovie( await getGenresQueryMovie(initialGenreId.type));
  }

  console.log(genresMovie)

  useEffect(() => { fetchAPI() }, []);


  const handleGenreType = async(genreId:string) => {
    initialGenreId.type = genreId;
    return fetchAPI();
  }

  return (
    <div className="App">
      <div className="sideBar">
        <ul className="sideMenu">
        {genres.map((genre, index) => {
          return (
              <li key={index} className="sideMenu-list">
                <button onClick={ (event) => handleGenreType(event.currentTarget.id) } 
                id={genre.id}>{genre.name}</button>
              </li>
          )
        })}
        </ul>
      </div>
      <div className="main">main</div>
    </div>
  );
}

export default App;
