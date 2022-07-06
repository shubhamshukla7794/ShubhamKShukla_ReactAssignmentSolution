import { useState } from 'react';
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
                    tab === TabOptions.MOVIES_IN_THEATERS && <MoviesInTheaters />
                }
                {
                    tab === TabOptions.COMING_SOON && <ComingSoon />
                }
                {
                    tab === TabOptions.TOP_RATED_INDIAN && <TopRatedIndian />
                }
                {
                    tab === TabOptions.TOP_RATED_MOVIES && <TopRatedMovies />
                }
                {
                    tab === TabOptions.FAVOURITES && <Favourites />
                }
            </div>
        </div>
    );
}

export default Menu;