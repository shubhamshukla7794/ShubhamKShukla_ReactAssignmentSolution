import Menu from "./Menu";

import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListItem from "./movie-list/MovieListItem";
import IMovie from "../models/IMovie";
import MoviesList from "./movie-list/MoviesList";
// import LoadingIndicator from "../common/LoadingIndicator";

import './App.css'
import MovieDetails from "./movie-details/MovieDetails";

const movie:IMovie = {
  "id": "76",
  "title": "Avengers: Infinity War",
  "year": "2018",
  "genres": [
    "Action",
    "Adventure",
    "Fantasy"
  ],
  "ratings": [
    3,
    8,
    9,
    8,
    1,
    1,
    9,
    10,
    10,
    3,
    7,
    8,
    6,
    7,
    5,
    7,
    2,
    9,
    6,
    5,
    10,
    5,
    7,
    5,
    7,
    5,
    10,
    2,
    8,
    4
  ],
  "poster": "MV5BMTc0MjA1OTMxOV5BMl5BanBnXkFtZTgwMzM1NDcyNDM@._V1_SY377_CR0,0,254,377_AL_.jpg",
  "contentRating": "",
  "duration": "",
  "releaseDate": "2018-04-25",
  "averageRating": 0,
  "originalTitle": "",
  "storyline": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.                Written by\nMarvel Studios",
  "actors": [
    "Karen Gillan",
    "Tessa Thompson",
    "Chadwick Boseman"
  ],
  "imdbRating": "",
  "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0MjA1OTMxOV5BMl5BanBnXkFtZTgwMzM1NDcyNDM@._V1_SY377_CR0,0,254,377_AL_.jpg"
};

function App() {
  return (
    <div>
      <Menu />
      {/* <MoviesList TabName='movies-in-theaters' /> */}
      {/* <MovieDetails /> */}
    </div>
  );
}

export default App;
