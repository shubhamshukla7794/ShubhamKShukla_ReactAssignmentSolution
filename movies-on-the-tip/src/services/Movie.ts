import axios from "axios";
import IMovie from "../models/IMovie";

const baseURL = process.env.REACT_APP_BASE_URL;

const getMovies = async ( tabName : string) => {
    const response = await axios.get<IMovie[]>(`${baseURL}/${tabName}`);
    return response.data;
}

const getMovieDetailsByID = async ( tabName : string, id : string ) => {
    const response = await axios.get<IMovie>(`${baseURL}/${tabName}/${id}`);
    return response.data;
}

const getMovieDetailsByTitleAndYear = async ( tabName : string,title : string, year : string ) => {
    const response = await axios.get<IMovie[]>(`${baseURL}/${tabName}?title=${title}&year=${year}`);
    return response.data;
}

const getMoviesFromSearching =async ( tabName : string, searchedText : string) => {
    const response = await axios.get<IMovie[]>(`${baseURL}/${tabName}?q=${searchedText}`);
    return response.data;
}

export {
    getMovies,
    getMovieDetailsByID,
    getMovieDetailsByTitleAndYear,
    getMoviesFromSearching
};