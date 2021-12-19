import { useState, useEffect } from 'react';
import style from "../src/css/app.module.css";
import { getMovieGenres } from '../src/tmdbAPI';
import { getGenresQueryMovie } from '../src/tmdbAPI';

type initialGenre = {
  [key: string]: any;
};

type Genre = {
  id: string;
  name: string;
};

type GenreMovie = {
  id: number;
  original_title: string;
  title: string;
  overview: string;
  popularity?: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
  vote_count:string;
  likedCount?: number;
};

export const inputKeyWord:any = {
    value: undefined
}

function App() {

  const initialGenreName:initialGenre = { Action: 28 };
  const initialGenreId:initialGenre = { type: initialGenreName.initialGenreId };
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<GenreMovie[]>([]);
  const [selectedGenre, SetSelectedGenre] = useState<Object>(Object.keys(initialGenreName));

  const fetchAPI = async() => {
    setGenres( await getMovieGenres());
    setMovies( await getGenresQueryMovie(initialGenreId.type));
  }

  useEffect(() => {
    fetchAPI();
  }, []);


  const handleGenreType = async(genreId:string, genreName:any) => {
    setMovies( await getGenresQueryMovie(genreId));
    SetSelectedGenre( genreName)
  }

  const handleKeyWordSearch = (value:string) => {
    inputKeyWord.value = value;
  }


  return (
    <div className={style.pageContainer}>
      <div className="sideBar">
        <label className="keywordSearch">
          <input onChange={ (event) => { handleKeyWordSearch(event.currentTarget.value) } } 
          type="text" id="" 
          />
          <button>search</button>
        </label>
        <ul className={style.sideMenu}>
        {genres.map((genre, index) => {
          return (
              <li key={index} className="sideMenu-list">
                <button onClick={ (event) => handleGenreType(event.currentTarget.id, event.currentTarget.textContent) } 
                id={genre.id}>{genre.name}</button>
              </li>
          )
        })}
        </ul>
      </div>
      <div className="main">
        <ul className={style.movieList}>
          <h3 className="selectedGenreTitle">{selectedGenre}</h3>
        {movies.map((movie, index) => {
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
