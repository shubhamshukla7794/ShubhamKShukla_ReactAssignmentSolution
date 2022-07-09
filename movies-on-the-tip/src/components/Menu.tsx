import { useState } from 'react';
import MoviesList from './MoviesList';
import MoviesInTheaters from './MoviesInTheaters';
import ComingSoon from './ComingSoon';
import TopRatedIndian from './TopRatedIndian';
import TopRatedMovies from './TopRatedMovies';
import Favourites from './Favourites';
import TabOptions from "../utils/TabOptions";

import './Menu.css';

const tabOptions = [
    TabOptions.MOVIES_IN_THEATERS,
    TabOptions.COMING_SOON,
    TabOptions.TOP_RATED_INDIAN,
    TabOptions.TOP_RATED_MOVIES,
    TabOptions.FAVOURITES
]

function Menu() {

    const [ tab, setTab ] = useState<TabOptions>( TabOptions.MOVIES_IN_THEATERS );

    return (
        <div>
            <div className="menu-tabs">
            {
                tabOptions.map(
                    topts => (
                        <button 
                            key={topts}
                            className={`tab-options ${topts === tab ? 'tab-option-active' : ''}`}
                            onClick={() => setTab( topts )} 
                        >
                            {topts}
                        </button>
                    )
                )
            }
            </div>
            <div className='content-container'>
                {
                    // tab === TabOptions.MOVIES_IN_THEATERS && <MoviesInTheaters />
                    tab === TabOptions.MOVIES_IN_THEATERS && <MoviesList TabName='movies-in-theaters' />
                }
                {
                    // tab === TabOptions.COMING_SOON && <ComingSoon />
                    tab === TabOptions.COMING_SOON && <MoviesList TabName='movies-coming' />
                }
                {
                    // tab === TabOptions.TOP_RATED_INDIAN && <TopRatedIndian />
                    tab === TabOptions.TOP_RATED_INDIAN && <MoviesList TabName='top-rated-india' />
                }
                {
                    // tab === TabOptions.TOP_RATED_MOVIES && <TopRatedMovies />
                    tab === TabOptions.TOP_RATED_MOVIES && <MoviesList TabName='top-rated-movies' />
                }
                {
                    // tab === TabOptions.FAVOURITES && <Favourites />
                    tab === TabOptions.FAVOURITES && <MoviesList TabName='favourites' />
                }
            </div>
        </div>
    );
}

export default Menu;