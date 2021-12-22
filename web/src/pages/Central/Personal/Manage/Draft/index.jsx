import React, {Component,Fragment} from 'react';
import {Pagination} from "antd";
import './index.css'
import axios from "axios";
import Notification from "../../Notice/Notification";
import {Link} from "react-router-dom";
class Draft extends Component {
    state={
        articles:[],
        page:1,
        pageSize:5
    }
    componentWillMount() {
        this.getDraft()
    }

    getDraft=()=>{
        axios.get('/api/user/drafts').then(res=>{
            this.setState({articles:res.data})
        })
    }
    pageChange=(page,pageSize)=>{
        this.setState({
            page,
            pageSize,
        })
    }
    delete=(event,article_id)=>{
        axios.delete('/api/recompose/delete',{params:{article_id}}).then(res=>{
            //闲置刷新接口
            this.getDraft()
        })
    }
    render() {
        const {articles,page,pageSize}=this.state
        return (
            <div className="manage_article">
                {articles.length>0?<Fragment>
                    <ul className="personal_article_show">
                        {
                            articles.slice((page-1)*pageSize,page*pageSize).map((articleObj,index)=>{
                                return(
                                    <li key={articleObj.article_id}>
                                        <div className="about_article">
                                            <img src={articleObj.cover} alt=""/>
                                            <div className="article_check">
                                                <span>{articleObj.title}</span>
                                                <button className="check_style" style={{backgroundColor:articleObj.state==="已发布"?'#66ef6d':articleObj.state==="未通过"?"#f17f4b":articleObj.state==="审核中"?"#61deef":"#ffffff"}}>{articleObj.state}</button>
                                            </div>
                                        </div>
                                        <div className="article_control">
                                            <div className="article_data">
                                                2021-10-23 17:09
                                            </div>
                                            <div className="article_control_func">
                                                <Link to={{pathname:'/personal/creation',state:{article_id:articleObj.article_id}}}><button>编辑</button></Link>
                                                <button onClick={(e)=>{this.delete(e,articleObj.article_id)}}>删除</button>
                                            </div>
                                        </div>
                                    </li>
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
                </Fragment>:<Notification notice={1}/>
                }
            </div>
        );
    }
}

export default Draft;