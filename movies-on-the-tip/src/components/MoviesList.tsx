import { Component } from "react";

type currentTab = {
    TabName: string
} 

class MoviesList extends Component<currentTab> {
    render() {
        return (
            <div>{this.props.TabName}</div>
        );
    }
}

export default MoviesList;