import { useState } from 'react';
import MoviesList from './movie-list/MoviesList';
import TabOptions from "../utils/TabOptions";


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
                    tabopts => (
                        <button 
                            key={tabopts}
                            className={`tab-options ${tabopts === tab ? 'tab-option-active' : ''}`}
                            onClick={() => setTab( tabopts )} 
                        >
                            {tabopts}
                        </button>
                    )
                )
            }
            </div>
            <div className='content-container'>
                {
                    tab === TabOptions.MOVIES_IN_THEATERS && <MoviesList TabName='movies-in-theaters' />
                }
                {
                    tab === TabOptions.COMING_SOON && <MoviesList TabName='movies-coming' />
                }
                {
                    tab === TabOptions.TOP_RATED_INDIAN && <MoviesList TabName='top-rated-india' />
                }
                {
                    tab === TabOptions.TOP_RATED_MOVIES && <MoviesList TabName='top-rated-movies' />
                }
                {
                    tab === TabOptions.FAVOURITES && <MoviesList TabName='favourit' />
                }
            </div>
        </div>
    );
}

export default Menu;