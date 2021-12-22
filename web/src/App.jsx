import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import './App.css'
import Preview from "./pages/Central/Personal/Creation/Preview";
import HomePageContainer from "./containers/HomePage_Container";
class App extends Component {
  render() {
    return (
        <div className="App">
            <Switch>
                <Route path="/preview" component={Preview}/>
                <Route path='/' component={HomePageContainer}/>
                <Redirect to='/'/>
            </Switch>
        </div>
    );
  }
}
export default App;
