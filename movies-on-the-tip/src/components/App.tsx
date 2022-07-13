import Menu from "./Menu";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./movie-details/MovieDetails";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Menu />}></Route>
                <Route path="/:title" element={<MovieDetails />}></Route>
            </Routes>
        </div>
    );
}

export default App;
