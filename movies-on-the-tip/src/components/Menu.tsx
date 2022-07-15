import { useEffect, useRef, useState } from 'react';
import MoviesList from './movie-list/MoviesList';
import TabOptions from "../utils/TabOptions";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';




const tabOptions = [
    TabOptions.MOVIES_IN_THEATERS,
    TabOptions.COMING_SOON,
    TabOptions.TOP_RATED_INDIAN,
    TabOptions.TOP_RATED_MOVIES,
    TabOptions.FAVOURITES
]

function Menu() {

    const [ tab, setTab ] = useState<TabOptions>( TabOptions.MOVIES_IN_THEATERS );
    // const [ searchtext, setSearchText] = useState<string>();
    // useEffect(() => {
    //     let fetch2 = () => {
    //         // console.log(searchRef?.current?.value as string);
    //         // setSearchText(searchRef?.current?.value as string);
    //         console.log(searchtext);
    //     }

    //     fetch2();
    // },);

    // const searchRef = useRef<HTMLInputElement>(null);
    

    // let fetch = () => {
    //     // console.log(searchRef?.current?.value as string);
    //     setSearchText(searchRef?.current?.value as string);
    //     // console.log(searchtext);
    //     // fetch2();
    // }


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
            {/* <InputGroup className="search-box">
                <Form.Control
                placeholder="Search Movie"
                ref={searchRef}
                type='text'
                onInput={fetch}
                />
                <Button variant="primary" id="button-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </Button>
            </InputGroup> */}
            </div>
            <div className='content-container'>
                {
                    tab === TabOptions.MOVIES_IN_THEATERS && <MoviesList tabName='movies-in-theaters' />
                }
                {
                    tab === TabOptions.COMING_SOON && <MoviesList tabName='movies-coming' />
                }
                {
                    tab === TabOptions.TOP_RATED_INDIAN && <MoviesList tabName='top-rated-india' />
                }
                {
                    tab === TabOptions.TOP_RATED_MOVIES && <MoviesList tabName='top-rated-movies' />
                }
                {
                    tab === TabOptions.FAVOURITES && <MoviesList tabName='favourit' />
                }
            </div>
        </div>
    );
}

export default Menu;