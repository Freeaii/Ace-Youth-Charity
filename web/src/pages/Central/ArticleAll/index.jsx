import React, {Component} from 'react';
import {Link,Switch,Route,Redirect} from "react-router-dom";
import './index.css'
import Environment from "./Environment";
import Public from "./Public";
import Recommend from "./Recommend";
import Knowledge from "./Knowledge";
import Society from "./Society";
import Other from "./Other";
class ArticleAll extends Component {
    state={
        path:""
    }
    changePath=()=>{
        this.setState({path:window.location.pathname})
    }
    render() {
        const {background,project_style,path}=this.props
        return (
            <div className="projectShow_page">
                <div className="project_publicity">
                    <img src={background} alt=""/>
                    <div className="project_title">
                        让智慧的光芒，激发新青年的梦想!
                    </div>
                </div>
                <div className="project_show">
                    <ul className="choose_project_style">
                        {
                            project_style.map((projectObj)=>{
                                return(
                                    <Link to={path+projectObj.address} key={projectObj.id}>
                                        <li className={window.location.pathname.includes(projectObj.address)?"li":""} onClick={this.changePath}>{projectObj.name}</li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                    <div className="project_style_show">
                        {
                            path==="/project"? <Switch>
                                <Route path={path+'/all/recommend'} component={Recommend}/>
                                <Route path={path+'/all/public'} component={Public}/>
                                <Route path={path+'/all/knowledge'} component={Knowledge}/>
                                <Route path={path+'/all/society'} component={Society}/>
                                <Route path={path+'/all/environment'} component={Environment}/>
                                <Route path={path+'/all/other'} component={Other}/>
                                <Redirect to={path+"/all/recommend"}/>
                            </Switch>:<Switch>
                                <Route path={path+'/all/recommend'} component={Recommend}/>
                                <Redirect to={path+"/all/recommend"}/>
                            </Switch>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleAll;