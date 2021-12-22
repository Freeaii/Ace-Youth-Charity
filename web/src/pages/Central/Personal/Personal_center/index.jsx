import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Personal_home from "./Personal_home";
import Personal_style from "./Personal_style";

class Personal_center extends Component {
    render() {
        return (
           <Switch>
               <Route path='/personal/p_center/info' component={Personal_home}/>
               <Route path='/personal/p_center/style' component={Personal_style}/>
               <Redirect to='/personal/p_center/info'/>
           </Switch>
        );
    }
}

export default Personal_center;