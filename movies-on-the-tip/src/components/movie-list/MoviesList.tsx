import { ChangeEvent, Component } from "react";
import { Alert, Col, Form, InputGroup, Row } from "react-bootstrap";
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
    error?: Error | null,
    tabName: string,
    searchedText: string
};


class MoviesList extends Component<Props, State> {

    constructor( props : Props) {
        super(props);

        console.log('constructor');
        this.state = {
            status: 'LOADING',
            movies: [],
            error: null,
            tabName: this.props.tabName,  
            searchedText: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({ searchedText: event.target.value });
    }

    async fetchSearchedData(text : string) {
        try {
                const tabName = this.state.tabName;
                let search = text;
                let moviesList  = await getMoviesFromSearching(tabName, search)
                
                
                this.setState({
                    status: 'LOADED',
                    movies: moviesList,
                });
    
            } catch (err) {
                this.setState({
                    status: 'ERROR_LOADING',
                    error: err as Error
                });
            }
    }

    async fetchData() {
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
    

    render() {

        let el;

        const {status, movies, error, tabName} = this.state;
        

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
                                type='text'
                                onChange={this.handleInputChange}
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

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(oldProps : Props, oldState : State) {
       if (oldState.searchedText !== this.state.searchedText) {
        this.fetchSearchedData(this.state.searchedText);
       }
    }
}

export default MoviesList;