import { useEffect, useState } from "react";
import { Alert, Badge, Col, Container, Modal, Row } from "react-bootstrap";
import IMovie from "../../models/IMovie";
import { LoadingStatus } from "../../models/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMovieDetailsByTitleAndYear } from "../../services/Movie";

type Props = {

};


const MovieDetails = ( props : Props ) => {
    const [ status, setStatus] = useState<LoadingStatus>( 'LOADING' );
    const [ movie, setMovie] = useState<IMovie | null>( null );
    const [ error, setError] = useState<Error | null>( null );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   

    useEffect( 
        () => {
        const fetchMovie = async () => {
            
            try {
                // const data = await getMovieDetailsByID('movies-in-theaters',1); 
                const data = await getMovieDetailsByTitleAndYear('top-rated-india','Swades%3A%20We%2C%20the%20People','2004'); 
                console.log(data[0]);
                setMovie( data[0] );
                setStatus( 'LOADED' );
            } catch (error) {
                setError( error as Error );
                setStatus( 'ERROR_LOADING');
            }
            
        };

        fetchMovie();
    }, [] );

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
                poster,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                storyline,
                actors,
                imdbRating,
            } = movie as IMovie;
            el = (
                <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <img 
                            src={`${process.env.REACT_APP_IMAGE_URL}${poster}`} 
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
                            <h1 className="movieTitle">{title} ({year})</h1>
                            <hr />
                        </Col>
                        <Col xs={12} lg={4}>
                            
                                <img 
                                    src={`${process.env.REACT_APP_IMAGE_URL}${poster}`} 
                                    alt="{title}" 
                                    onClick={handleShow}
                                />
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row>
                                <Col xs={4} className="detailsTitle">
                                    <FontAwesomeIcon icon={faImdb} style={{color:'#F5C518'}}/> Imdb Rating
                                </Col>
                                <Col xs={8}>{imdbRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="detailsTitle">Content Rating</Col>
                                <Col xs={8}>{contentRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="detailsTitle">Average Rating</Col>
                                <Col xs={8}>{averageRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="detailsTitle">Duration</Col>
                                <Col xs={8}>{duration.substring(2)}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="detailsTitle my-2">Genres</Col>
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
                                <Col xs={4} className="detailsTitle my-2">Actors</Col>
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
                                <Col xs={4} className="detailsTitle">Release Date</Col>
                                <Col xs={8}>{releaseDate}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} className="detailsTitle">Story Line</Col>
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