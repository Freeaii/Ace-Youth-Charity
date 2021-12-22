import React, {Component} from 'react';
import ManageArticleProject from "../../../Article_Project_Show";
class ManageArticle extends Component {
    render() {
        return (
            <ManageArticleProject path="/api/user/articles" admin={false}/>
        );
    }
}

export default ManageArticle;