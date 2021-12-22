import React, {Component} from 'react';
import './index.css'
import 'antd/dist/antd.css';
import {Link,Switch,Route,Redirect} from "react-router-dom";
import ManageArticle from "./ManageArticle";
import ManageProject from "./ManageProject";
import Draft from "./Draft"; // or 'antd/dist/antd.less'
class Manage extends Component {
    render() {
        return (
            <div className="personal_manage">
                <div className="personal_manage_title">
                    <Link to="/personal/manage/article">
                        <span className={window.location.pathname.includes("/personal/manage/article")?"span":""}>公益文章</span>
                    </Link>
                    <Link to="/personal/manage/project" style={{color:"black"}}>
                        <span className={window.location.pathname.includes("/personal/manage/project")?"span":""}>公益项目</span>
                    </Link>
                    <div className="separate"/>
                    <Link to="/personal/manage/draft" style={{color:"black"}}>
                        <span className={window.location.pathname.includes("/personal/manage/draft")?"span":""}>草稿箱</span>
                    </Link>
                </div>
                <Switch>
                    <Route path="/personal/manage/article" component={ManageArticle}/>
                    <Route path="/personal/manage/project" component={ManageProject}/>
                    <Route path="/personal/manage/draft" component={Draft}/>
                    <Redirect to="/personal/manage/article"/>
                </Switch>
            </div>
        );
    }
}

export default Manage;