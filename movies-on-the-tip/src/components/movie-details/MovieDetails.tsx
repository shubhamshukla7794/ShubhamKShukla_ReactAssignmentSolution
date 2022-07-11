import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Container, Modal, Row } from "react-bootstrap";
import IMovie from "../../models/IMovie";
import { LoadingStatus } from "../../models/types";
import LoadingIndicator from "../common/LoadingIndicator";

type Props = {

};

const blackPanther = {
    "id": "1",
    "title": "Black Panther",
    "year": "2018",
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "ratings": [
      4,
      1,
      9,
      6,
      2,
      10,
      6,
      5,
      1,
      7,
      4,
      5,
      6,
      5,
      6,
      3,
      10,
      10,
      8,
      2,
      5,
      3,
      4,
      6,
      6,
      7,
      9,
      4,
      4,
      9
    ],
    "poster": "MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "contentRating": "15",
    "duration": "PT134M",
    "releaseDate": "2018-02-14",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "After the events of Captain America: Civil War, King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war.                Written by\nEditor",
    "actors": [
      "Chadwick Boseman",
      "Michael B. Jordan",
      "Lupita Nyong'o"
    ],
    "imdbRating": 7,
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg"
  };

const MovieDetails = ( props : Props ) => {
    const [ status, setStatus] = useState<LoadingStatus>( 'LOADING' );
    const [ movie, setMovie] = useState<IMovie | null>( null );
    const [ error, setError] = useState<Error | null>( null );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchMovie = () => {
        setTimeout(() => {
            setMovie(blackPanther);
            setStatus( 'LOADED' );
        }, 1000);
    };

    useEffect( fetchMovie, [] );

    let el;

    switch ( status ) {
        case 'LOADING':
            el = (
                <LoadingIndicator 
                    size="large"
                    message="We are fetching the details of the movie. Please wait..." />
            );
            break;
        case 'LOADED':
            const {
                title,
                year,
                genres,
                ratings,
                poster,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                originalTitle,
                storyline,
                actors,
                imdbRating,
                posterurl
            } = movie as IMovie;
            el = (
                <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <img 
                            src={`${process.env.REACT_APP_BASE_URL}/images/${poster}`} 
                            alt="{title}" 
                            className="w-100"
                        />
                    </Modal.Body>
                </Modal>
                <div className="my-3">
                <a href="/" className="backHome"> Back to Home</a>
                <Container className="my-4">
                    <Row>
                        <Col xs={12}>
                            <h1>{title}</h1>
                            <hr />
                        </Col>
                        <Col xs={12} lg={4}>
                            
                                <img 
                                    src={`${process.env.REACT_APP_BASE_URL}/images/${poster}`} 
                                    alt="{title}" 
                                    onClick={handleShow}
                                />
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row>
                                <Col xs={4}>Imdb Rating</Col>
                                <Col xs={8}>{imdbRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={4}>Content Rating</Col>
                                <Col xs={8}>{contentRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={4}>Average Rating</Col>
                                <Col xs={8}>{averageRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={4}>Duration</Col>
                                <Col xs={8}>{duration.substring(2)}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="my-2">Genres</Col>
                                <Col xs={8}>
                                    {
                                        genres.map(
                                            genre => (
                                                <Badge bg="primary" className="badge" key={genre}>{genre}</Badge>
                                            )
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="my-2">Actors</Col>
                                <Col xs={8}>
                                    {
                                        actors.map(
                                            actor => (
                                                <Badge bg="secondary me-2" key={actor}>{actor}</Badge>
                                            )
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>Release Date</Col>
                                <Col xs={8}>{releaseDate}</Col>
                            </Row>
                            <Row>
                                <Col xs={4}>Story Line</Col>
                                <Col xs={8}>{storyline}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                </div>
                </>
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

export default MovieDetails;