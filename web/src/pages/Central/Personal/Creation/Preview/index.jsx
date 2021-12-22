import React, {Component} from 'react';
import './index.css'
import axios from "axios";
import BraftEditor from "braft-editor";
import {getQueryVariable} from "../../../../../dataDetection/login_data";
class Preview extends Component {
    state={
        title:"",
        content:"",
        email:"",
        date:"",
        style:"",
        cover:"",
        introduce:"",
        contactEmail:""
    }

    componentDidMount() {
        let article_id=getQueryVariable("article_id")
        axios.get('/api/information/content',{params:{article_id}}).then(
            res=>{
                this.setState({
                    title:res.data.title,
                    content:BraftEditor.createEditorState(res.data.content).toHTML(),
                    email:res.data.email,
                    date:res.data.date,
                    style:res.data.style,
                    cover:res.data.cover,
                    introduce:res.data.introduce,
                    contactEmail:res.data.contact_email
                })
            })
    }
    render() {
        const {title,content,email,date,cover,introduce,style,contactEmail}=this.state
        return (
            <div className="preview_page">
                <div className="recommend_view">
                    <span>推荐显示</span>
                    <div className="content">
                        <img src={cover} alt=""/>
                        <div className="introduce">
                            <h3>{title}</h3>
                            <p>{introduce}</p>
                        </div>
                    </div>
                </div>
                <div className="article_view">
                    <span>页面展示</span>
                    <div className="detail">
                        <div className="title">
                            <h2>{title}</h2>
                            <div className="about_writer"><span>
                                作者: {email}
                            </span>
                                <span>发布时间: {date}</span>
                            </div>
                        </div>
                        <div className="article_show" dangerouslySetInnerHTML={{__html: content}}/>
                        <div className="contact" style={{display:style==="公益项目"?"":"none"}}>
                            <img src="http://localhost:8888/static/images/poison.JPG" alt=""/>
                            <div className="contact_introduce">
                                <h4>如果你对此公益感兴趣,可联系下方邮箱来参加此次公益活动。</h4>
                                <h4>联系邮箱:{contactEmail}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;