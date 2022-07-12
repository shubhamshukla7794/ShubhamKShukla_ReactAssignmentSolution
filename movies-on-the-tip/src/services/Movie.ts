import axios from "axios";
import IMovie from "../models/IMovie";

const baseURL = process.env.REACT_APP_BASE_URL;

const getMovies = async ( tabName : string) => {
    const response = await axios.get<IMovie[]>(`${baseURL}/${tabName}`);
    return response.data;
}

export {
    getMovies
};