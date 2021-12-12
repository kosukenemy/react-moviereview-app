import axios from "axios";


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const APIQuery = "?api_key=";
const GenreQuery = "&with_genres=";
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list${APIQuery}${API_KEY}`;

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

