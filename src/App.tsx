import React, { useState, useEffect } from 'react';
import { getMovieGenres } from '../src/tmdbAPI';
import { getGenresQueryMovie } from '../src/tmdbAPI';
import { getMovieDetails } from '../src/tmdbAPI';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { searchKeyword } from './store/searchKeyword/action';
import { keyWordSearch } from './tmdbAPI/index';
import { Button } from './components/atoms/Button';
import { SearchBar } from './components/atoms/SearchBar';
import { ThumbnailCard } from './components/organisms/ThumbnailCard';
import { Modal } from './components/molecules/Modal';
import styled from 'styled-components';

type initialGenre = {
  [key: string]: number | any;
};

type Genre = {
  id: string;
  name: string;
};

type Movie = {
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
  const [loader, setLoader] = useState<boolean>(false);
  const initialGenreName:initialGenre = { Action: 28 };
  const initialGenreId:initialGenre = { type: initialGenreName.initialGenreId };
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Object>(Object.keys(initialGenreName));
  const [activeTab, setActiveTab] = useState<string>("Action");
  const [inputValue, setInputValue] = useState<string>("");
  const [findWords, setFindWords] = useState<string>("");
  const [movieDetail, setMovieDetail] = useState<Movie[] | any>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const movieVideoKeys:string[] | undefined = [];
  const noResults = "UNdefined";

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async() => {
    setGenres( await getMovieGenres());
    setMovies( await getGenresQueryMovie(initialGenreId.type));
    setLoader(!loader);
  }

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
  // state?????????
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
    // ??????API??????????????????
    setMovies(await keyWordSearch(inputValueState.value) );
    setFindWords(inputValueState.value);
    // ?????????????????????????????????
    setSelectedGenre("");
    validClassButton("");
    // ????????????????????????????????????
    setInputValue("");
    clearInputValue();
  }

  const getMovieDetail = async(thumbnailId: string) => {
    setIsOpenModal(!isOpenModal);
    setMovieDetail( await getMovieDetails(thumbnailId));
  }

  if ( movieDetail.hasOwnProperty("videos") ) {
    console.log(movieDetail)
    movieVideoKeys.push(movieDetail.videos.results);
  }


  return (
    <StyledMainWrapper>
      <div className="sideBar">
        <label className="keywordSearch">
          <SearchBar 
            border={"#c0c0c0"}
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
            borderRadius={6}
            />
        </label>
        <StyledMovieLists>
        {genres.map((genre, index) => {
          return (
            <li className="sideMenu-list" key={index}>
              <Button
                id={genre.id} 
                value={genre.name}
                colorTheme={"#fff"}
                border={"#708090"}
                fontSize={12}
                fontWeight={300}
                fontColor={"#708090"}
                borderRadius={10}
                onClick={(event) => handleGenreButton(event) }
                active={activeTab}
              />
            </li>
          )
        })}
        </StyledMovieLists>
      </div>
      {
        loader? 
        <>
          <div>
            <h3>
              { selectedGenre }
            </h3>
            <h4>
              { findWords && <span>keyWord: </span> }
              <span>{ findWords }</span>
            </h4>
            <StyledMovieLists>
              { movies.map((movie, index) => {
                movie.liked = false;
                if (movie.title === noResults ) {
                  return <h5 key={index} className="no-results">??????????????????????????????</h5>
                }
                if ( movie.backdrop_path === null ) return false;

                return (
                  <StyledMovieList key={index}>
                    <ThumbnailCard 
                      id={movie?.id}
                      src={movie?.backdrop_path}
                      title={movie.title}
                      onFocus={(event) => getMovieDetail(event.currentTarget.dataset.movie_id as string )}
                      onError={ (event:any) => event.target.src = `${process.env.PUBLIC_URL}/noImage.png` }
                    />
                  </StyledMovieList>
                )
              })}
              { movies.length === 0 && <h5 className="no-results">??????????????????????????????</h5> }
            </StyledMovieLists>
          </div>
          
          {isOpenModal &&
            <Modal
              isOpen={isOpenModal}
              type={"iframe"}
              keys={movieVideoKeys}
              onClose={setIsOpenModal}
              eventBubble={(event) => event.stopPropagation }
            />
          }
        </>
        :
        <Loader>
          <img src={`${process.env.PUBLIC_URL}/loader.gif`} alt="...loader" />
          <p>...loading</p>
        </Loader>
      }
    </StyledMainWrapper>
  );
}

export default App;

const StyledMainWrapper = styled.div`
  position: relative;
`;

const StyledMovieLists = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledMovieList = styled.li`
  width: 32.3%;
  padding: 0 3px;
`;

const Loader = styled.div`
  width: 10%;
  display: block;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
`;