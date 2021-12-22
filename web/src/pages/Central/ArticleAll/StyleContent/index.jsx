import React, {Component} from 'react';
import './index.css'
import {Pagination} from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
class StyleContent extends Component {
    state={
        articles:[],
        page:1,
        pageSize:5,
    }
    updateInformation=()=>{
        let url=window.location.pathname
        if(url.includes('/project')){
            axios.get('/api/information/project',{
                params:{
                    url
                }
            }).then(res=>{
                this.setState({articles:res.data})
            })
        }else {
            axios.get('/api/information/article',{
                params:{
                    url
                }
            }).then(res=>{
                this.setState({articles:res.data})
            })
        }
    }
    componentDidMount() {
        this.updateInformation()
    }
    pageChange=(page,pageSize)=>{
        this.setState({
            page,
            pageSize
        })
    }
    render() {
        const {articles,page,pageSize}=this.state
        return (
            <div className="project_underway">
                <ul className="underway_article">
                    {
                        articles.slice((page-1)*pageSize,page*pageSize).map((articleObj)=>{
                            return(
                                <Link key={articleObj.article_id} to={{pathname:window.location.pathname.includes('/project')?'/project/content':'/information/content',state:{article_id:articleObj.article_id}}}>
                                    <li>
                                        <div className="article_pic">
                                            <img src={articleObj.cover} alt="1"/>
                                        </div>
                                        <div className="article_describe">
                                            <span className="article_title">{articleObj.title}</span>
                                            <p>{articleObj.introduce}</p>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
                <div className="pagination">
                    <Pagination
                        total={articles.length}
                        showSizeChanger
                        showQuickJumper
                        current={page}
                        defaultCurrent={1}
                        pageSize={pageSize}
                        pageSizeOptions={[5,10,20,50,100]}
                        onChange={this.pageChange}
                    />
                </div>
            </div>
        );
    }
}

export default StyleContent;