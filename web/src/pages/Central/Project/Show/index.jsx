import React, {Component} from 'react';
import {Carousel} from "antd";
import './index.css'
import {Link} from "react-router-dom";
import axios from "axios";
class ProjectShow extends Component {
    state={
        main:[],
        slideshows:[],
        show_one:[],
        show_two:[],
        lis:[],
    }
    componentDidMount() {
        //请求数据
        let main=[],slideshows=[],show_one=[],show_two=[],lis=[];
        axios.get('/api/information/show/project').then(res=>{
            res.data.forEach(item=>{
               switch (item.style) {
                   case 'main':
                       main.push(item)
                       break;
                   case 'slideshow':
                       slideshows.push(item)
                       break;
                   case 'show_one':
                       show_one.push(item)
                       break;
                   case 'show_two':
                       show_two.push(item)
                       break;
                   case 'li':
                       lis.push(item)
                       break;
                   default:
                       break;
               }
            })
            this.setState({
                main,
                slideshows,
                show_one,
                show_two,
                lis
            })
        })
    }

    render() {
        const {main,slideshows,show_one,show_two,lis}=this.state
        return (
            <div className="project_show_home">
                {
                    main.map((mainObj)=>{
                        return(
                            <Link key={mainObj.article_id} to={{pathname:'/project/content',state:{article_id:mainObj.article_id}}}>
                                <div className="project_top">
                                    <div className="title">
                                        <h2>串联青年聚落，推动青年生活公益化！</h2>
                                        <h4>点击了解青年公益</h4>
                                    </div>
                                </div>
                            </Link>

                        )
                    })
                }
                <div className="project_center">
                    <div className="project_content">
                        <h2>推荐公益</h2>
                        <Carousel
                            dotPosition="top"
                            autoplay
                        >
                            {
                                slideshows.map((playObj)=>{
                                    return(
                                            <div key={playObj.article_id}>
                                                <div className="project_recommend" onClick={this.onChange}>
                                                    <img src={playObj.cover} alt=""/>
                                                    <div className="describe">
                                                        <h3>{playObj.title}</h3>
                                                        <p>{playObj.introduce}</p>
                                                        <button>
                                                            <Link key={playObj.article_id} style={{color:"black"}} to={{pathname:'/project/content',state:{article_id:playObj.article_id}}}>
                                                                点击了解详情
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                })
                            }
                        </Carousel>
                        {
                            show_one.map((show_one)=>{
                                return(
                                    <div className="project_recommend_one" key={show_one.article_id}>
                                        <div className="article">
                                            <span/>
                                            <h2>{show_one.title}</h2>
                                            <p>{show_one.introduce}</p>
                                            <button>
                                                <Link key={show_one.article_id} style={{color:"black"}} to={{pathname:'/project/content',state:{article_id:show_one.article_id}}}>
                                                    了解详情
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="image">
                                            <img src={show_one.cover} alt=""/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            show_two.map((show_two)=>{
                                return(
                                    <div className="project_recommend_one reverse" key={show_two.article_id}>
                                        <div className="article">
                                            <span/>
                                            <h2>{show_two.title}</h2>
                                            <p>{show_two.introduce}</p>
                                            <button>
                                                <Link style={{color:"black"}} to={{pathname:'/project/content',state:{article_id:show_two.article_id}}}>
                                                    了解详情
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="image">
                                            <img src={show_two.cover} alt=""/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="more_project">
                            <h2>更多项目</h2>
                            <ul>
                                {
                                   lis.map((liObj)=>{
                                       return(
                                           <li key={liObj.article_id}>
                                               <img src={liObj.cover} alt=""/>
                                               <div className="article_info">
                                                   <h3>{liObj.title}</h3>
                                                   <p>{liObj.introduce}</p>
                                                   <button>
                                                       <Link key={liObj.article_id} style={{color:"black"}} to={{pathname:'/project/content',state:{article_id:liObj.article_id}}}>
                                                           了解详情
                                                       </Link>
                                                   </button>
                                               </div>
                                           </li>
                                       )
                                   })
                                }
                            </ul>
                        </div>
                        <Link to="/project/all">
                            <button className="read_more">查看更多</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectShow;