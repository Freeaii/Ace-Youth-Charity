import React, {Component} from 'react';
import './index.css'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

import {Radio,message} from "antd";
import axios from "axios";
import {emailCheck} from "../../../../dataDetection/login_data";
import {Link} from "react-router-dom";

class Creation extends Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null),
        article_id:"",
        title:"",
        cover:"",
        style:"",
        introduce:'',
        projectStyle:"",
        contactEmail:"",
        emailCheck:true,
        initEditorTime:0,
        publishState:false,
        cover_remind:"格式支持JPG、PNG且不超过2M!",
        save_remind:"草稿将自动保存",
        errors:{
            article_id:"",
            title:"",
            cover:"",
            style:"",
            introduce:'',
            projectStyle:"",
            contactEmail:"",
        }
    }
    //图片载入时进行判断
    beforeUpload=(file)=>{
        if(file){
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.setState({
                    cover_remind: '你只能上传PNG和JPG格式的图片资源!'
                })
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 4;
            if (!isLt2M) {
                this.setState({
                    cover_remind: '文件大小不允许超过4M!'
                })
                return false
            }
            return true
        }
    }

    //发送请求文章的函数
    getTemporaryArticle=(path,params)=>{
        axios.get(path,params).then(res=>{
            this.setState({
                editorState: BraftEditor.createEditorState(res.data.content),
                article_id:res.data.article_id,
                title:res.data.title,
                introduce:res.data.introduce,
                projectStyle:res.data.project_style,
                contactEmail:res.data.contact_email,
                cover:res.data.cover,
                style:res.data.style,
                cover_remind:res.data.cover?"图片已通过审核!":"格式支持JPG、PNG且不超过2M!"
            })
        })
    }

    //组件挂在后就请求需要编辑的文章
     componentDidMount() {
        if(this.props.location.state!==undefined){
            if(this.props.location.state.article_id){
                this.getTemporaryArticle('/api/recompose/editor',{params:{article_id:this.props.location.state.article_id}})
            }
        }else {
            this.getTemporaryArticle('/api/user/temporary')
        }
    }

    //重置state
    init=()=>{
        this.setState({
            editorState: BraftEditor.createEditorState(null),
            article_id:"",
            title:"",
            cover:"",
            style:"",
            introduce:"",
            projectStyle:"",
            contactEmail:"",
            emailCheck:true,
            publishState:false,
            loading: false,
            initEditorTime:0,
            cover_remind:"格式支持JPG、PNG且不超过2M!",
            save_remind:"草稿将自动保存",
            errors:{}
        })
    }

    //发送请求处理当前编辑内容
    saveEditorContent=(saveStyle)=>{
        const {introduce,editorState,title,style,cover,article_id,projectStyle,contactEmail}=this.state
        let articleObj={
            article_id,
            content:editorState.toRAW(),
            title,
            introduce,
            style,
            cover,
            projectStyle,
            contactEmail
        }
        let mess=(content)=>({
            content:content,
            duration:2.5,
            style:{
                marginTop:'80px'
            }
        })
        switch (saveStyle) {
            case "temporary":
                this.setState({save_remind:"正在保存中..."})
                axios.post('/api/user/temporary',articleObj).then(res=>{
                    if(res.data.article_id){
                        this.setState({
                            article_id:res.data.article_id,
                        })
                    }
                    this.setState({save_remind:"草稿已保存"})
                })
                break;
            case "publish":
                this.setState({publishState:true})
                let messages=message.loading(mess("请稍等..."))
                axios.post('/api/user/publish',articleObj).then(res=>{
                    messages.then(()=>{
                        message.success(mess('文章已进入审核流程...')).then(()=>{
                            this.init()
                        })
                    })
                },err=>{
                    messages.then(()=>{
                        message.info(mess('服务器故障，但文章已存入草稿箱!')).then(()=>{
                            this.init()
                        })
                    })
                })
                break;
            case "save":
                this.setState({publishState:true})
                let messageSave=message.loading(mess('请稍等...'))
                axios.post('/api/user/save',articleObj).then(res=>{
                    messageSave.then(()=>{
                        message.success(mess('文章已保存')).then(()=>{
                            this.init()
                        })
                    })
                },err=>{
                    messageSave.then(()=>{
                        message.error(mess('文章保存失败,但是应该可以在草稿箱找回!')).then(()=>{
                            this.init()
                        })
                    })
                })
                break;
            default:
                break;
        }
    }

    //state相关内容判断函数,并且收集相关错误信息
    judge=()=>{
        let {title,cover,style,introduce,contactEmail,projectStyle,editorState}=this.state
        let stateObj={title,cover,style,introduce}
        let errors={}
        for(let key in stateObj){
            if(stateObj[key]===""||stateObj[key]===undefined){
                errors.iserror=true
                switch (key) {
                    case 'title':
                        errors.title="请输入标题"
                        break;
                    case 'cover':
                        errors.cover="请设置封面图片"
                        break;
                    case 'introduce':
                        errors.introduce="请输入文章简介"
                        break;
                    case 'style':
                        errors.style="请选择文章类型"
                        break;
                    default:
                        break;
                }
            }
        }
        if(stateObj.style==="公益项目"){
            if(contactEmail===""||contactEmail===undefined){
                errors.iserror=true
                errors.email="请输入该项目联系邮箱"
            }
            if(projectStyle===""||projectStyle===undefined){
                errors.iserror=true
                errors.projectStyle="请选择项目类型"
            }
        }
        return {
            sure:errors.iserror||editorState.isEmpty(),
            errors:errors
        }
    }

    //仅保存
    saveArticle=()=>{
        this.saveEditorContent('save')
    }

    //发布并且判断文章内容是否完整
    publishArticle=()=>{
        let {sure,errors}=this.judge()
        if(sure){
            this.setState({errors:errors})
            message.destroy()
            message.error({
                content:"请检查文章相关内容是否填写完整,标记为*的内容是必填项",
                duration:5,
                style:{
                    marginTop:'80px'
                }
            })
        }else {
            message.destroy()
            this.saveEditorContent("publish")
        }
    }

    //预览并且判断文章内容是否完整
    preview=(event)=>{
        let {sure,errors}=this.judge()
        if(sure){
            event.preventDefault();
            message.destroy()
            message.error({
                content:"请检查文章相关内容是否填写完整！",
                duration:5,
                style:{
                    marginTop:'80px'
                }
            })
            this.setState({errors:errors})
        }else {
            this.saveEditorContent('temporary')
            //在新窗口打开
        }
    }

    //保存文章中的信息
    save=(event,style)=>{
        //判断信息改变次数，选择是否保存
        this.setState({initEditorTime:this.state.initEditorTime+1})
        if(this.state.initEditorTime>5){
            this.saveEditorContent('temporary')
            this.setState({initEditorTime:0})
        }
        switch (style) {
            case 'content':
                this.setState({editorState:event})
                break;
            case 'title':
                if(event.target.value.length<30){
                    this.setState({title:event.target.value})
                }
                break;
            case 'introduce':
                if(event.target.value.length<50){
                    this.setState({introduce:event.target.value})
                }
                break;
            case 'cover':
                this.handleChange(event)
                break;
            case 'style':
                if(event.target.value==="公益资讯"){
                    this.setState({style:event.target.value,projectStyle:"",contactEmail:""})
                }else {
                    this.setState({style:event.target.value,projectStyle:"",contactEmail:""})
                }
                break;
            case 'projectStyle':
                this.setState({projectStyle:event.target.value})
                break;
            case 'email':
                this.setState({contactEmail:event.target.value,emailCheck:emailCheck(event.target.value)})
                break;
            default:
                break;
        }
    }

    //图片载入以及编码函数
    handleChange = event => {
        const file=event.target.files[0]
        if(this.beforeUpload(file)){

            const reader=new FileReader();
            reader.readAsDataURL(file)
            reader.onload=()=>{
                //发送post请求将图片传到后端存储
                const result=reader.result
                //返回base64编码或者暴露出来的url，前端再修改呈现
                this.setState({
                    cover_remind:"图片已通过审核!",
                    cover:result
                })

            }
        }
    };

    //为上传图片文件绑定事件
    chooseFile=()=>{
        document.getElementById('setImg').click()
    }

    render() {
        const { emailCheck,save_remind,article_id,introduce,editorState,title,cover,style ,publishState,cover_remind,projectStyle,contactEmail} = this.state
        return (
            <div id="personalCreation">
                <div className="editor">
                    <BraftEditor
                        value={editorState}
                        onChange={(editorState)=>{this.save(editorState,'content')}}
                        excludeControls={'emoji'}
                        contentClassName="content"
                    />
                </div>
                <div className="about_article_editor">
                    <div className="title">
                        <span className="title_style">标题设置</span>
                        <input value={title} type="text"  placeholder="请输入标题且不超过30个字符" onChange={(event)=>{this.save(event,'title')}}/>
                    </div>
                    <div className="title introduce">
                        <span className="title_style">简介设置</span>
                        <input value={introduce} type="text"  placeholder="请输入文章或项目简介，且不超过50个字符" onChange={(event)=>{this.save(event,'introduce')}}/>
                    </div>
                    <div className="cover">
                        <span className="title_style">展示封面</span>
                        <div className="image_show" onClick={this.chooseFile}>
                            <input type="file" id="setImg" style={{display:"none"}} onChange={(event)=>{this.save(event,'cover')}}/>
                            <svg viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" style={{display:cover?"none":""}} >
                                <path
                                    d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                                    fill="#bfbfbf" />
                            </svg>
                            <img src={cover} alt="" style={{display:cover?"":"none"}}/>
                        </div>
                        <p style={{
                            color:cover_remind==="格式支持JPG、PNG且不超过2M!"?
                                "black":cover_remind==="图片已通过审核!"?"green":"red"
                        }}>{cover_remind}</p>
                    </div>
                    <div className="article_style">
                        <span className="title_style">文章类型</span>
                        <Radio.Group name="articleGroup" value={style} onChange={(event)=>{this.save(event,"style")}}>
                            <Radio value="公益项目">公益项目</Radio>
                            <Radio value="公益资讯">公益资讯</Radio>
                        </Radio.Group>
                    </div>
                    <div className="project_style" style={{display:style==="公益项目"?"":"none"}}>
                        <span className="title_style">项目类型</span>
                        <Radio.Group name="projectGroup" value={projectStyle} onChange={(event)=>{this.save(event,"projectStyle")}}>
                            <Radio value="公共服务">公共服务</Radio>
                            <Radio value="知识传播">知识传播</Radio>
                            <Radio value="社会援助">社会援助</Radio>
                            <Radio value="环境保护">环境保护</Radio>
                            <Radio value="其它">其它</Radio>
                        </Radio.Group>
                    </div>
                    <div className="contact_email" style={{display:style==="公益项目"?"":"none"}}>
                        <span className="title_style">联系邮箱</span>
                        <input value={contactEmail} type="text" placeholder="请输入邮箱" onChange={(event)=>{this.save(event,"email")}}/>
                        <p style={{display:emailCheck?"none":""}}>邮箱格式有误</p>
                    </div>
                </div>
                <div className="button_menu">
                    <div className="remind">
                        <svg className="icon" style={{display:save_remind==="正在保存中..."?"none":""}} viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" >
                            <path
                                d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-213.333333 468.608l-105.664-105.642666a21.248 21.248 0 0 0-30.122667 0.042666c-8.32 8.32-8.213333 21.973333-0.064 30.101334l120.810667 120.832a21.248 21.248 0 0 0 30.122666-0.085334l211.157334-211.157333a21.290667 21.290667 0 0 0 0-30.186667 21.397333 21.397333 0 0 0-30.250667 0.106667l-196.010667 195.989333z"
                                fill="#8a8a8a"/>
                        </svg>
                        <p>{save_remind}</p>
                    </div>
                    <button disabled={publishState} className="publish" onClick={this.publishArticle}>发布</button>
                    <Link to={{pathname:'/preview',search:`article_id=${article_id}`}} target='_blank'>
                        <button disabled={publishState} className="preview" onClick={this.preview}>预览</button>
                    </Link>
                    <button disabled={publishState} className="save" onClick={this.saveArticle}>保存</button>
                </div>
            </div>

        );
    }
}


export default Creation;