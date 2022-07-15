import { Component } from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import IMovie from "../../models/IMovie";
import { LoadingStatus } from "../../models/types";
import MovieListItem from "./MovieListItem";
import { getMovies, getMoviesFromSearching } from "../../services/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
    tabName: string,
} 

type State = {
    status: LoadingStatus,
    movies?: IMovie[],
    error?: Error,
    tabName: string,
    searchedText?: string
};


class MoviesList extends Component<Props, State> {

    state: State = {
        status: 'LOADING',
        tabName: this.props.tabName,
    };

    render() {

        let el;
        let search;

        const {status, movies, error, tabName, searchedText} = this.state;
        

        switch ( status ) {
            case 'LOADING':
                el = (
                    <LoadingIndicator 
                        size="large"
                        message="We are fetching the movies. Please wait..." />
                );
                break;
            case 'LOADED':
                el = (
                    <div>
                        <Row className="search-box-row">
                            <InputGroup className="search-box">
                                <Form.Control
                                placeholder="Search Movie"
                                // ref={searchRef}
                                type='text'
                                // onInput={fetch}
                                onChange={(e)=>{
                                    this.setState({
                                        searchedText: e.target.value
                                    })
                                }}
                                />
                                <InputGroup.Text className="search-icon">
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </InputGroup.Text>
                            </InputGroup>
                        </Row>
                    <Row xs={2} md={3} lg={6}>
                        {
                            movies?.map(
                                (movie, idx) => (
                                    <Col key={idx} className="d-flex align-items-stretch my-3">
                                        <MovieListItem movie={movie} tabName={tabName} />
                                    </Col>
                                )
                            )
                        }
                    </Row>
                    </div>
                );
                break;
            case 'ERROR_LOADING':
                el = (
                    <Alert variant="danger">
                        {error?.message}
                    </Alert>
                );
                break;
        }

        return el;
    }

    async componentDidMount() {
      this.setState({
        status: 'LOADING'
      });

      try {
          const tabName = this.state.tabName;
          const moviesList = await getMovies(tabName);
          
          this.setState({
            status: 'LOADED',
            movies: moviesList
          });
      } catch (err) {
          this.setState({
            status: 'ERROR_LOADING',
            error: err as Error
          });
      }
    }

    async componentDidUpdate() {
        try {
            const tabName = this.state.tabName;
            let search = this.state.searchedText;
          //   const moviesList = await getMovies(tabName);
          let moviesList;
          if( search === '' || search === undefined) {
              moviesList = await getMovies(tabName);
          } else {
              moviesList = await getMoviesFromSearching(tabName, search)
          }
            
            this.setState({
              status: 'LOADED',
              movies: moviesList
            });
        } catch (err) {
            this.setState({
              status: 'ERROR_LOADING',
              error: err as Error
            });
        }
    }
}

export default MoviesList;