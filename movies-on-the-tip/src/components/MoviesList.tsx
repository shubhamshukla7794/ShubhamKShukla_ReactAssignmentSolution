import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import IMovie  from "../models/IMovie";

type currentTab = {
    TabName: string,
} 

class MoviesList extends Component<currentTab> {
    render() {
        return (
            <div>
                <div>{this.props.TabName}</div>
            </div>
        );
    }
}

export default MoviesList;