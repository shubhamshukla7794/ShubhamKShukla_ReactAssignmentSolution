import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import IMovie from "../../models/IMovie";


type Props = {
    movie : IMovie,
    tabName: string
};

const MovieListItem = ( { movie, tabName }:Props) => {

    const {
        title,
        poster
    } = movie;

    const currentTab = tabName;
    const encodedTitle = encodeURIComponent(title);
 
    return (
        <div>
            <Card>
                <a href="/">
                    <div className="poster-container">
                        <Card.Img variant="top" src={`${process.env.REACT_APP_IMAGE_URL}${poster}`} alt={title}  className="card-img"/>
                    </div>
                </a>
                <Card.Body>
                    <Card.Title className="card-title">{ title.length > 23 ? title.substring(0,23).concat('...') : title}</Card.Title>
                    <div className="text-center my-3">
                        <Button variant="outline-primary">Add to Favourite <FontAwesomeIcon icon={faHeart} style={{color:'#FF0000'}} /></Button>
                    </div>                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default MovieListItem;