import React, {Component} from 'react';
import ManageArticleProject from "../../../Article_Project_Show";
class ManageProject extends Component {

    render() {
        return (
          <ManageArticleProject path="/api/user/projects" adminn={false}/>
        );
    }
}

export default ManageProject;