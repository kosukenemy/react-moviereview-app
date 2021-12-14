import React, { useState, useEffect } from 'react';
import style from "../src/css/app.module.css";
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
  original_title?: string;
  title: string;
  overview: string;
  popularity?: string;
  poster_path: string;
  release_date?: string;
  vote_average?: string;
  vote_count?:string;
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

  useEffect(() => {
    fetchAPI();
  }, []);

  

  const handleGenreType = async(genreId:string) => {
    setGenreMovie( await getGenresQueryMovie(genreId));
  }


  return (
    <div className={style.pageContainer}>
      <div className="sideBar">
        <ul className={style.sideMenu}>
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
      <div className="main">
        <ul className="movieList">
          <div className="loader"></div>
        {genresMovie.map((movie, index) => {
          return (
            <li key={index}>
              <figure>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                <figcaption>
                  <dd>{movie.title}</dd>
                  <dt></dt>
                </figcaption>
              </figure>
            </li>    
          )
        })}
        </ul>
      </div>
    </div>
  );
}

export default App;
