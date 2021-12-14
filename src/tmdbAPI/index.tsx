import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const APIQuery = "?api_key=";
const GenreQuery = "&with_genres=";
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list${APIQuery}${API_KEY}`;
const movieWithGenreURL = "https://api.themoviedb.org/3/discover/movie" + APIQuery + API_KEY + GenreQuery;



export const getMovieGenres = async() => {
    try {
        const { data } = await axios.get(genreUrl, {
            params: {
                api_key: API_KEY,
                language: 'en',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((g:any) => ({
            id: g['id'],
            name: g['name']
        }))
        return modifiedData;
    } catch (error) { }
}

export const getGenresQueryMovie = async(genreId:string) => {
    try {
        const { data } = await axios.get(`${movieWithGenreURL}${genreId}`, {
            params: {
                api_key: API_KEY,
                language: 'en',
                page: 1
            }
        })
        const modifiedData = data['results'].map((g:any) => ({
            id: g['id'],
            original_title: g['original_title'],
            title: g['title'],
            overview: g['overview'],
            popularity: g['popularity'],
            poster_path: g['poster_path'],
            backdrop_path: g['backdrop_path'],
            genre_ids: g['genre_ids'],
            release_date: g['release_date'],
            vote_average: g['vote_average'],
            vote_count: g['vote_count']
        }))
        return modifiedData;
    } catch (error) { }
} 
