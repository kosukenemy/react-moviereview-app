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
  const [selectedGenre, setSelectedGenre] = useState<Object>(Object.keys(initialGenreName));
  const [activeTab, setActiveTab] = useState<string>("Action");
  const inputSearch:any = { state: false };

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
  }

  const validClassButton = (genreName: string) => {
    setActiveTab(genreName);
    console.log(activeTab)
  }
  console.log(activeTab)
  

  // reducxから呼び出し
  const inputValueState:any = useSelector((state: RootState) => state.inputValue);
  // stateを更新
  const dispatch = useDispatch();


  const handleKeyWordSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    if ( !event.currentTarget.value ) return false;
    return inputValueState.value = event.currentTarget.value;
  }

  const handleSubmit = async() => {
    dispatch(searchKeyword() );
    // 検索APIに引数を渡す
    setMovies(await keyWordSearch(inputValueState.value) );
    inputSearch.state = true;
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
        <ul className={style.movieList}>
          {movies.map((movie, index) => {
            movie.liked = false;

            if (movie.title === "UNdefined") {
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
