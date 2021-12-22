import React, {Component} from 'react';
import './index.css'
import {Route,Switch,Redirect} from 'react-router-dom'
import InformationShow from "./InformationShow";
import InformationAll from "./InformationAll";
import InformationContent from "./InformationContent";
class Information extends Component {
    render() {
        return (
            <div className="information_page">
                <Switch>
                    <Route path='/information/all' component={InformationAll}/>
                    <Route path='/information/content' component={InformationContent}/>
                    <Route path='/information' component={InformationShow}/>
                    <Redirect to='/information'/>
                </Switch>
            </div>
        );
    }
}

export default Information;