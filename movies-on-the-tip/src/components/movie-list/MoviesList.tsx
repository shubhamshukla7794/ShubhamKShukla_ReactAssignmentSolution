import { Component } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import IMovie from "../../models/IMovie";
import { LoadingStatus } from "../../models/types";
import MovieListItem from "./MovieListItem";
import { getMovies } from "../../services/Movie";

type Props = {
    TabName: string
} 

type State = {
    status: LoadingStatus,
    movies?: IMovie[],
    error?: Error,
    tabName: string
};


class MoviesList extends Component<Props, State> {

    state: State = {
        status: 'LOADING',
        tabName: this.props.TabName
    };

    render() {

        let el;

        const {status, movies, error} = this.state;
        

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
                    <Row xs={2} md={3} lg={6}>
                        {
                            movies?.map(
                                (movie, idx) => (
                                    <Col key={idx} className="d-flex align-items-stretch my-3">
                                        <MovieListItem movie={movie} />
                                    </Col>
                                )
                            )
                        }
                    </Row>
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
}

export default MoviesList;