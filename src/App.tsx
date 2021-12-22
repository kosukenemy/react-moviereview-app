import React, { useState, useEffect } from 'react';
import style from "../src/css/app.module.css";
import { getMovieGenres } from '../src/tmdbAPI';
import { getGenresQueryMovie } from '../src/tmdbAPI';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { searchKeyword } from './store/searchKeyword/action';
import { keyWordSearch } from './tmdbAPI/index';
import { Button } from './components/atoms/Button';
import { SearchBar } from './components/atoms/SearchBar';
import { ThumbnailCard } from './components/organisms/ThumbnailCard';

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
  popularity: string;
  poster_path: string;
  backdrop_path: string,
  release_date: string;
  vote_average: string;
  vote_count:string;
  liked?: boolean;
};


function App() {

  const initialGenreName:initialGenre = { Action: 28 };
  const initialGenreId:initialGenre = { type: initialGenreName.initialGenreId };
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<GenreMovie[]>([]);
  const [selectedGenre, SetSelectedGenre] = useState<Object>(Object.keys(initialGenreName));
  const inputSearch:any = { state: false };

  const fetchAPI = async() => {
    setGenres( await getMovieGenres());
    setMovies( await getGenresQueryMovie(initialGenreId.type));
  }

  useEffect(() => {
    fetchAPI();
  }, []);


  const handleGenreType = async(genreId:string, genreName:any) => {
    setMovies( await getGenresQueryMovie(genreId));
    SetSelectedGenre(genreName);
  }



  // reducxから呼び出し
  const inputValueState:any = useSelector((state: RootState) => state.inputValue);
  // stateを更新
  const dispatch = useDispatch();


  const handleKeyWordSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value)
    if ( !event.currentTarget.value ) return false;
    return inputValueState.value = event.currentTarget.value;
  }

  const handleSubmit = async() => {
    dispatch(searchKeyword() );
    // 検索APIに引数を渡す
    setMovies(await keyWordSearch(inputValueState.value) );
    inputSearch.state = true;
    console.log(inputSearch.state)
  }

  return (
    <div className={style.pageContainer}>
      <div className="sideBar">
        <label className="keywordSearch">
          <SearchBar 
            border={"#333"}
            placeholder={"...find movies by title"}
            onChange={ (event) => { handleKeyWordSearch(event) } }
          />
          <Button 
            value={"search"}
            colorTheme={"blue"}
            fontSize={12}
            fontWeight={600}
            fontColor={"#fff"}
            onClick={handleSubmit} 
            borderRadius={3}
            />
        </label>
        <ul className={style.sideMenu}>
        {genres.map((genre, index) => {
          return (
            <li className="sideMenu-list" key={index}>
              <Button
                id={genre.id} 
                value={genre.name}
                colorTheme={"#fff"}
                border={"#333"}
                fontSize={12}
                fontWeight={300}
                fontColor={"#333"}
                borderRadius={10}
                onClick={(event) => handleGenreType(event.currentTarget.id, event.currentTarget.textContent) } 
              />
            </li>
          )
        })}
        </ul>
      </div>
      <div className="main">
        <h3>
          { selectedGenre }
        </h3>
        <ul className={style.movieList}>
          {movies.map((movie, index) => {
            movie.liked = false;

            if (movie.title === "UNdefined") {
              return <div key={index} className="no-results">検索結果はありません</div>
            }
            return (
              <React.Fragment key={index}>
                <ThumbnailCard 
                  src={movie?.backdrop_path}
                  title={movie.title}
                />
              </React.Fragment>
            )
          })}
          { movies.length === 0 && <div className="no-results">検索結果はありません</div> }
        </ul>
      </div>
    </div>
  );
}



export default App;
