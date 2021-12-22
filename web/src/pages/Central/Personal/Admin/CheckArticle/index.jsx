import React, {Component} from 'react';
import ManageArticleProject from "../../../Article_Project_Show";
class CheckArticle extends Component {
    render() {
        return (
            <ManageArticleProject path="/api/admin/check/article" admin={true}/>
        );
    }
}

export default CheckArticle;