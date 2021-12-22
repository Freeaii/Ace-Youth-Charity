import React, {Component} from 'react';
import './index.css'
import {Link} from "react-router-dom";
import axios from "axios";

class Home extends Component {
    state={
        home_project:[],
        home_article:[]
    }
    componentDidMount() {
        axios.get('api/information/home').then(res=>{
            let home_project=[]
            let home_article=[]
            for(var i=0;i<res.data.length;i++){
                res.data[i].date=res.data[i].date.split(' ')[0]
                if(res.data[i].style==="公益资讯"){
                    home_article.push(res.data[i])
                }else {
                    home_project.push(res.data[i])
                }
            }
            this.setState({
                home_project,
                home_article
            })
        })
    }
    render() {
        return (
            <div className="homepage">
                <div className="home_home">
                    <video muted="muted" loop="loop" src="http://localhost:8888/static/videos/bg.mp4" autoPlay="autoPlay" className="myVideo"/>
                        <div className="home_title">
                            <span>
                                让青年成为世界的行动者，让公益成为生活的一部分！
                            </span>
                            <Link to="/project" className="to_project">
                                    现在行动
                            </Link>
                        </div>
                </div>
                <div className="home_content">
                    <div className="home_report">
                        <span className="plate_title">热门公益</span>
                        <ul>
                            {
                                this.state.home_project.map((articleObj)=>{
                                    return(
                                        <Link key={articleObj.article_id} to={{pathname:'/project/content',state:{article_id:articleObj.article_id}}}>
                                            <li>
                                                <div className="title">
                                                    {articleObj.title}
                                                </div>
                                                <div className="about_report">
                                                    <div className="author">
                                                        {articleObj.username}
                                                    </div>
                                                    <div className="date">
                                                        {articleObj.date}
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                        <Link to="/project/all">
                            <span className="read_more">
                            查看更多
                            <svg t="1632496925787" className="icon" viewBox="0 0 1213 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="19728">
                                    <path
                                        d="M1004.046124 568.908272l-379.622349 358.119266a54.421386 54.421386 0 0 0 0.26547 80.399538c23.778543 22.185722 62.195869 22.071949 85.822715-0.227546l470.3373-443.67651A56.886466 56.886466 0 0 0 1213.57794 510.580683a54.876477 54.876477 0 0 0-17.634804-41.489196L716.466076 16.844083A63.561145 63.561145 0 0 0 630.681286 16.578612a54.421386 54.421386 0 0 0-0.26547 80.437463L1010.038165 455.135341H56.886466a56.886466 56.886466 0 0 0 0 113.772931h947.159658z"
                                        p-id="19729"/>
                                </svg>
                        </span>
                        </Link>
                    </div>

                    <div className="home_report">
                        <span className="plate_title">热门资讯</span>
                        <ul>
                            {
                                this.state.home_article.map((articleObj)=>{
                                    return(
                                        <Link key={articleObj.article_id} to={{pathname:'/information/content',state:{article_id:articleObj.article_id}}}>
                                            <li>
                                                <div className="title">
                                                    {articleObj.title}
                                                </div>
                                                <div className="about_report">
                                                    <div className="author">
                                                        {articleObj.username}
                                                    </div>
                                                    <div className="date">
                                                        {articleObj.date}
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                        <Link to="/information/all">
                            <span className="read_more">
                            查看更多
                            <svg t="1632496925787" className="icon" viewBox="0 0 1213 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="19728">
                                    <path
                                        d="M1004.046124 568.908272l-379.622349 358.119266a54.421386 54.421386 0 0 0 0.26547 80.399538c23.778543 22.185722 62.195869 22.071949 85.822715-0.227546l470.3373-443.67651A56.886466 56.886466 0 0 0 1213.57794 510.580683a54.876477 54.876477 0 0 0-17.634804-41.489196L716.466076 16.844083A63.561145 63.561145 0 0 0 630.681286 16.578612a54.421386 54.421386 0 0 0-0.26547 80.437463L1010.038165 455.135341H56.886466a56.886466 56.886466 0 0 0 0 113.772931h947.159658z"
                                        p-id="19729"/>
                                </svg>
                        </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;