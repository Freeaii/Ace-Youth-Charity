import React, {Component} from 'react';
import './index.css'
import Home from "../../pages/Central/Home";
import {Redirect,Route,Switch} from 'react-router-dom'
import Project from "../../pages/Central/Project";
import Information from "../../pages/Central/Information";
import About from "../../pages/Central/About";
import Team from "../../pages/Central/Team";
import PersonalContainer from "../../containers/Personal_Container";
class Content extends Component {
    render() {
        return (
            <div className="content">
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/project' component={Project}/>
                    <Route path='/information' component={Information}/>
                    <Route path='/about' component={About}/>
                    <Route path='/team' component={Team}/>
                    <Route path="/personal" component={PersonalContainer}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default Content;