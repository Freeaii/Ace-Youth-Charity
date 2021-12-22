import React, {Component} from 'react';
import Article from "../../Article";

class InformationContent extends Component {
    render() {
        return (
            <Article article_id={this.props.location.state.article_id}/>
        );
    }
}

export default InformationContent;