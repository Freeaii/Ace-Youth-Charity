import React, {Component} from 'react';
import './index.css'
import ManageArticleProject from "../../../Article_Project_Show";
class CheckProject extends Component {
    render() {
        return (
            <ManageArticleProject path="/api/admin/check/project" admin={true}/>
        );
    }
}

export default CheckProject;