import React, {Component} from 'react';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import './index.css'
import CheckArticle from "./CheckArticle";
import CheckProject from "./CheckProject";
import CheckAccount from "./CheckAccount";
class Admin extends Component {

    render() {
        return (
            <div className="personal_admin">
                <div className="personal_manage_title">
                    <Link to="/personal/admin/check/article" style={{color:"black"}}>
                        <span className={window.location.pathname.includes("/personal/admin/check/article")?"span":""}>文章管理</span>
                    </Link>
                    <Link to="/personal/admin/check/project" style={{color:"black"}}>
                        <span className={window.location.pathname.includes("/personal/admin/check/project")?"span":""}>项目管理</span>
                    </Link>
                    <Link to="/personal/admin/check/account" style={{color:"black"}}>
                        <span className={window.location.pathname.includes("/personal/admin/check/account")?"span":""}>用户管理</span>
                    </Link>
                </div>
                <Switch>
                    <Route path="/personal/admin/check/article" component={CheckArticle}/>
                    <Route path="/personal/admin/check/project" component={CheckProject}/>
                    <Route path="/personal/admin/check/account" component={CheckAccount}/>
                    <Redirect to="/personal/admin/check/article"/>
                </Switch>
            </div>
        );
    }
}

export default Admin;