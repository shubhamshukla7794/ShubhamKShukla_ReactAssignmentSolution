import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import IMovie from "../../models/IMovie";

type Props = {
    movie : IMovie
};

const MovieListItem = ( { movie }:Props) => {

    const {
        title,
        poster
    } = movie;

 
    return (
        <div>
            <Card>
                <a href="/">
                <Card.Img variant="top" src={`${process.env.REACT_APP_BASE_URL}/images/${poster}`} alt={title} className="card-img" />
                </a>
                <Card.Body>
                    <Card.Title className="card-title">{title.length>23 ? title.substring(0,23).concat('...'): title}</Card.Title>
                    <div className="text-center my-3">
                        <Button variant="outline-primary">Add to Favourite <FontAwesomeIcon icon={faHeart} style={{color:'#FF0000'}} /></Button>
                    </div>                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default MovieListItem;