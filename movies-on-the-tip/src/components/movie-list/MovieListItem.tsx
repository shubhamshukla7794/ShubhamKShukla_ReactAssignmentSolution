import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMovie from "../../models/IMovie";


type Props = {
    movie : IMovie,
    tabName: string
};

const MovieListItem = ( { movie, tabName }:Props) => {

    const {
        id,
        title,
        poster,
        year
    } = movie;

    const encodedTitle = encodeURIComponent(title);

    const [data] = useState({
        currentTab : tabName,
        releasedYear : year,
        id: id
    });
 
    return (
        <div>
            <Card>
                <Link to={`/${encodedTitle}`} state={{data:data}}>
                    <div className="poster-container">
                        <Card.Img variant="top" src={`${process.env.REACT_APP_IMAGE_URL}${poster}`} alt={title}  className="card-img"/>
                    </div>
                </Link>
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