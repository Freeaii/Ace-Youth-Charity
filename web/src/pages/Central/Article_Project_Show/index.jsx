import React, {Component,Fragment} from 'react';
import {Pagination, Switch} from "antd";
import './index.css'
import axios from "axios";
import StyleChoose from "../Personal/Admin/CheckArticle/StyleChoose";
import Notification from "../Personal/Notice/Notification";
import {Link} from "react-router-dom";
class ManageArticleProject extends Component {
    state={
        content:[],
        page:1,
        pageSize:5,
        pitch:"全部"
    }
    componentDidMount() {
        this.getAdminArticles("全部")
    }
    getAdminArticles=(style)=>{
        axios.get(this.props.path,{params:{style}}).then(res=>{
            this.setState({content:res.data})
        })
    }
    pageChange=(page,pageSize)=>{
        this.setState({
            page,
            pageSize,
        })
    }
    stateChange=(state)=>{
        this.setState({pitch:state})
        switch (state) {
            case '全部':
                this.getAdminArticles("全部")
                break;
            case '审核中':
                this.getAdminArticles("审核中")
                break;
            case '已通过':
                this.getAdminArticles("已通过")
                break;
            case '未通过':
                this.getAdminArticles("未通过")
                break;
            case '展示中':
                this.getAdminArticles("展示中")
                break;
            case '已关闭':
                this.getAdminArticles("已关闭")
                break;
            default:
                break;
        }
    }

    recomposePort=(style,path,value)=>{
        switch (style) {
            case "delete":
                axios.delete(path,value).then(res=>{
                    //闲置刷新接口
                    this.stateChange(this.state.pitch)
                })
                break;
            case "post":
                axios.post(path,value).then(res=>{
                    //闲置刷新接口
                    this.stateChange(this.state.pitch)
                })
                break;
            default:
                break;
        }
    }

    delete=(article_id)=>{
        this.recomposePort("delete",'/api/recompose/delete',{params:{article_id}})
    }
    switchChange=(checked,article_id)=>{
        this.recomposePort("post",'/api/recompose/switch',{article_id,pass_state:checked})
    }
    articlePass=(article_id)=>{
        this.recomposePort("post",'/api/recompose/pass',{article_id})
    }
    articleReject=(article_id)=>{
        this.recomposePort("post",'/api/recompose/reject',{article_id})
    }
    articleRecall=(article_id)=>{
        this.recomposePort("post",'/api/recompose/reject',{article_id})
    }
    render() {
        const {content,page,pageSize,pitch}=this.state
        const style=['全部','审核中','已通过','未通过',"展示中",'已关闭']
        return (
            <div className="manage_all">
                <StyleChoose style={style} title="状态" onChange={this.stateChange} defaultState={pitch}/>
                {
                    content.length>0?<Fragment>
                        <div>共{content.length}条内容</div>
                        <ul className="manage_show">
                            {
                                content.slice((page-1)*pageSize,page*pageSize).map((contentObj,index)=>{
                                    return(
                                        <li key={contentObj.article_id}>
                                            <div className="about_content">
                                                <img src={contentObj.cover} alt=""/>
                                                <div className="about_check">
                                                    <Link to={{pathname:'/preview',search:`article_id=${contentObj.article_id}`}} target='_blank'>
                                                        <span>{contentObj.title}</span>
                                                    </Link>
                                                    <div>
                                                        <button className="check_style" style={{backgroundColor:contentObj.state==="已通过"?'#66ef6d':contentObj.state==="未通过"?"#f17f4b":contentObj.state==="审核中"?"#61deef":"#ffffff"}}>{contentObj.state}</button>
                                                        {this.props.admin?<span>id:{contentObj.article_id}</span>:null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="manage_control">
                                                <div className="content_data">
                                                    {contentObj.date}
                                                </div>
                                                {
                                                    contentObj.state==="已通过"? <div className="switch">
                                                        <Switch disabled={this.props.admin} checkedChildren="公开" unCheckedChildren="私密" defaultChecked={contentObj.pass_state === "展示中"} onChange={(checked)=>{this.switchChange(checked,contentObj.article_id)}}/>
                                                    </div>:null
                                                }
                                                {
                                                    this.props.admin===true?<div className="content_func">
                                                        {
                                                            contentObj.state==="已通过"?
                                                                <Fragment><button onClick={(e)=>{this.articleRecall(contentObj.article_id)}}>撤回</button>
                                                                    <button onClick={(e)=>{this.delete(contentObj.article_id)}}>删除</button></Fragment> :
                                                                contentObj.state==="审核中"?
                                                                    <Fragment><button onClick={(e)=>{this.articlePass(contentObj.article_id)}}>通过</button>
                                                                    <button onClick={(e)=>{this.articleReject(contentObj.article_id)}}>拒绝</button>
                                                                </Fragment>:
                                                                    contentObj.state==="未通过"?
                                                                        <button onClick={(e)=>{this.articlePass(contentObj.article_id)}}>通过</button>:
                                                                        null
                                                        }
                                                    </div>:<div className="content_func">
                                                        <Link to={{pathname:'/personal/creation',state:{article_id:contentObj.article_id}}}><button>编辑</button></Link>
                                                        <button onClick={(e)=>{this.delete(contentObj.article_id)}}>删除</button>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="pagination">
                            <Pagination
                                total={content.length}
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

export default ManageArticleProject;