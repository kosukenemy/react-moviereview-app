import React, { useState, useEffect, HTMLInputTypeAttribute } from 'react';
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
  const [selectedGenre, setSelectedGenre] = useState<Object>(Object.keys(initialGenreName));
  const [activeTab, setActiveTab] = useState<string>("Action");
  const [inputValue, setInputValue] = useState<string>("");
  const [findWords, setFindWords] = useState<string>("");
  const noResults = "UNdefined";

  const fetchAPI = async() => {
    setGenres( await getMovieGenres());
    setMovies( await getGenresQueryMovie(initialGenreId.type));
  }

  useEffect(() => {
    fetchAPI();
  }, []);


  const handleGenreButton = async(event:React.MouseEvent<HTMLButtonElement>) => {
    const genreId = event.currentTarget.id;
    const genreName:any = event.currentTarget.textContent;
    setMovies( await getGenresQueryMovie(genreId));
    setSelectedGenre(genreName);
    validClassButton(genreName);
    setFindWords("");
  }

  const validClassButton = (genreName: string) => setActiveTab(genreName);
  
  const inputValueState:any = useSelector((state: RootState) => state.inputValue);
  // stateを更新
  const dispatch = useDispatch();


  const handleKeyWordSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    inputValueState.value = event.currentTarget.value;
    return;
  }

  const clearInputValue = () => {
    const keywordSearchInput = document.querySelector<any>('.keywordSearch input');
    keywordSearchInput.value = ""
  }

  const handleSubmit = async() => {
    dispatch(searchKeyword());
    
    // 検索APIに引数を渡す
    setMovies(await keyWordSearch(inputValueState.value) );
    setFindWords(inputValueState.value);
    
    // ジャンルの表示を初期化
    setSelectedGenre("");
    validClassButton("");
    // 検索フォームの値を初期化
    setInputValue("");
    clearInputValue();
  }

  const onHoverMovieVideo = (thumbnailId:any) => {
    const activeMovieKey:any = new Set<string>();
    activeMovieKey.add(thumbnailId)
    setTimeout(() => {
      for ( const id of activeMovieKey ) {
        // console.log(id)
      }
    },3000)
  }
  const offHoverMovieVideo = () => {
    console.log('off')
  }

  return (
    <div className={style.pageContainer}>
      <div className="sideBar">
        <label className="keywordSearch">
          <SearchBar 
            border={"#333"}
            placeholder={"...movie title"}
            onChange={(event) => { handleKeyWordSearch(event) }}
            value={inputValue}
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
        <ul className="">
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
                onClick={(event) => handleGenreButton(event) }
                active={activeTab}
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
        <h4>
          { findWords && <span>keyWord: </span> }
          <span>{ findWords }</span>
        </h4>
        <ul className={style.movieList}>
          {movies.map((movie, index) => {
            movie.liked = false;
            // console.log(movie)

            if (movie.title === noResults ) {
              return <div key={index} className="no-results">検索結果はありません</div>
            }
            return (
              <li key={index}>
                <ThumbnailCard 
                  id={movie?.id}
                  src={movie?.backdrop_path}
                  title={movie.title}
                  onFocus={(event) => onHoverMovieVideo(event.currentTarget.dataset.movie_id)}
                  offFocus={() => offHoverMovieVideo()}
                />
              </li>
            )
          })}
          { movies.length === 0 && <div className="no-results">検索結果はありません</div> }
        </ul>
      </div>
    </div>
  );
}



export default App;
