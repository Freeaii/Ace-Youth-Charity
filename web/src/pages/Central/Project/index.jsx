import React, {Component} from 'react';
import './index.css'
import ProjectAll from "./ProjectAll";
import {Redirect, Route,Switch} from 'react-router-dom'
import ProjectShow from "./Show";
import ProjectContent from "./ProjectContent";
class Project extends Component {
    render() {
        return (
            <div className="project_page">
                <Switch>
                    {/*二级路由跳转页面*/}
                    <Route path="/project/all" component={ProjectAll}/>
                    {/*project展示页面*/}
                    <Route path="/project/content" component={ProjectContent}/>
                    {/*一级路由重定位*/}
                    <Route path="/project" component={ProjectShow}/>
                    <Redirect to="/project"/>
                </Switch>
            </div>
        );
    }
}

export default Project;