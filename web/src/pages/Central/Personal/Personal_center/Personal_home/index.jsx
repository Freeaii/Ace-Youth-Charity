import React, {Component,Fragment} from 'react';
import './index.css'
import axios from "axios";
import {message} from "antd";
import {emailCheck} from "../../../../../dataDetection/login_data";
import {Link} from "react-router-dom";
import {scrollAdd, scrollRemove} from "../../../../../utils/scroll";

let emailTimer
class Personal_home extends Component {
    state={
        username:"",
        editor:"",
        introduce:"",
        head_portrait:"",
        account_type:"",
        passwordConfirmation:"",
        user_id:"",
        email:"",
        change:"",
        email_change:"",
        checkEmailContent:"点击发送验证码",
        account_state:"",
        disabled:false,
    }

    componentDidMount() {
        axios.get('/api/user/information').then(res=>{
            let {username,introduce,head_portrait,account_type,user_id,email,account_state}=res.data
            this.setState({
                username,
                introduce,
                head_portrait,
                account_type,
                user_id,
                email,
                account_state,
            })
        })
    }

    //图片载入时进行判断
    beforeUpload=(file)=>{
        if(file){
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error("图片仅支持jpeg和png格式",2)
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 4;
            if (!isLt2M) {
                message.error("图片大小不允许超过4M",2)
                return false
            }
            return true
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
                    editor:result,
                    change:"head_portrait"
                })

            }
        }
    };

    //保存状态
    save=(e,style)=>{
        let {value}=e.target
        switch (style) {
            case 'username':
                this.setState({editor:value})
                break;
            case 'introduce':
                this.setState({editor:value})
                break;
            case 'head_portrait':
                this.handleChange(e)
                break;
            case 'password':
                this.setState({editor:value})
                break;
            case 'password_change':
                this.setState({editor:value})
                break;
            case 'passwordConfirmation':
                this.setState({passwordConfirmation:value})
                break;
            case 'email':
                this.setState({editor:value})
                break;
            case 'email_change':
                this.setState({email_change:value})
                break;
            case 'email_final':
                this.setState({editor:value})
                break;
            default:
                break;
        }
    }
    //弹出编辑框
    change=(style,data)=>{
        scrollAdd()
        //过滤掉null
        if(!data){
            data=""
        }
        switch (style) {
            case 'username':
                this.setState({change:style,editor:data})
                break;
            case 'introduce':
                this.setState({change:style,editor:data})
                break;
            case 'head_portrait':
                document.getElementById('head').click()
                scrollRemove()
                break;
            case 'password':
                this.setState({change:style,editor:data})
                break;
            case 'email':
                this.setState({change:style,editor:data})
                break;
            default:
                break;
        }

    }

    //状态判断函数
    judgeState=(e)=>{
        let {username,editor,introduce,email_change,email}=this.state
        switch (e) {
            case 'userEditor':
                return (editor.length <= 0||editor.length>8)||editor===username
            case 'introduce':
                return editor===introduce
            case 'password':
                return editor.length<8||editor.length>=16
            case 'code':
                return editor.length!==6
            case 'email_final':
                return editor.length!==6&&email_change===email&&emailCheck(email_change)
            default:
                return null;
        }
    }

    init=()=>{
        clearInterval(emailTimer)
        this.setState({
            change:"",
            editor:"",
            disabled:false,
            passwordConfirmation:"",
            email_change:""
        })
    }

    //关闭编辑框
    close=()=>{
        scrollRemove()
        this.init()
    }

    //请求成功后函数
    success=(res,state)=>{
        message.success({
            content:res.data.success,
            duration:1,
            onClose:()=>{
                this.setState(state)
                this.init()
                scrollRemove()
            }
        })
    }

    //请求失败后函数
    error=(response)=>{
        message.error({
            content:response.data.errors,
            duration:1,
            onClose:()=>{
                this.init()
                scrollRemove()
            }
        })
    }

    //发送修改请求
    saveEditor=()=>{
        let {change,editor,email,passwordConfirmation,email_change,user_id}=this.state
        this.setState({disabled:true})
        switch (change) {
            case "username":
                axios.post('/api/recompose/username',{user_id,editor}).then(res=>{
                    this.success(res,{username:editor})
                },({response})=>{
                    this.error(response)
                })
                break;
            case "introduce":
                axios.post('/api/recompose/introduce',{user_id,editor}).then(res=>{
                    this.success(res,{introduce:editor})
                },({response})=>{
                    this.error(response)
                })
                break;
            case "head_portrait":
                axios.post('/api/recompose/head',{user_id,editor}).then(res=>{
                    this.success(res,{head_portrait:editor})
                },({response})=>{
                    this.error(response)
                })
                break;
            case "password_change":
                //判断两次密码是否相同
                if(editor!==passwordConfirmation){
                    message.error({
                        content:"两次输入密码不一致，请重新设置",
                        duration:1.5,
                        onClose:()=>{
                            this.setState({
                                editor:"",
                                passwordConfirmation: "",
                                disabled:false
                            })
                        }
                    })
                }else{
                    axios.post('/api/recompose/password',{user_id,password:editor}).then(res=>{
                        this.success(res,{})
                    },({response})=>{
                        this.error(response)
                    })
                }
                break;
            case "email":
                axios.post('/api/email/checkEmail',{email,verification:editor,style:change}).then(res=>{
                    message.success({
                        content:res.data.success,
                        duration:1,
                        onClose:()=>{
                            clearInterval(emailTimer)
                            this.setState({
                                disabled:false,
                                editor: "",
                                change:"email_final",
                                checkEmailContent:"点击发送验证码",
                            })
                        }
                    })
                },({response})=>{
                    message.error({
                        content:response.data.errors,
                        duration:1,
                        onClose:()=>{
                            this.setState({
                                disabled:false,
                                editor: "",
                            })
                        }
                    })
                })
                break;
            case "email_final":
                axios.post('/api/email/changeEmail',{user_id,email,email_change,verification:editor,style:change}).then(res=>{
                    this.success(res,{email:email_change})
                    //处理验证相关信息，比如cookie/token等
                },({response})=>{
                    message.error({
                        content:response.data.errors,
                        duration:1,
                        onClose:()=>{
                            this.setState({
                                editor:"",
                                disabled:false,
                            })
                        }
                    })
                })
               break;
            default:
                break;
        }
    }
    //发送验证请求
    checkEditor=()=>{
        let {editor,user_id}=this.state
        this.setState({disabled:true})
        axios.post('/api/recompose/checkPassword',{user_id,editor}).then(res=>{
            message.success({
                content:res.data.success,
                duration:1,
                onClose:()=>{
                    this.setState({change:"password_change",disabled:false,editor:""})
                }
            })
        },({response})=>{
            message.error({
                content:response.data.errors,
                duration:1,
                onClose:()=>{
                    this.setState({disabled:false,editor:""})
                }
            })
        })
    }
    //封装验证码发送函数
    postVerification=()=>{
        let time=60;
        emailTimer=setInterval(()=>{
            if(time===0){
                clearInterval(emailTimer)
                this.setState({checkEmailContent:'点击发送验证码',checkEmail:false})
            }else {
                this.setState({checkEmailContent:`${time}s后可再次发送`})
                time-=1
            }
        },1000)
    }


    //发送验证码
    getVerification=()=>{
        let {email,change,email_change}=this.state
        if(change==="email"){
            this.postVerification()
            axios.get('/api/email/send',{params:{email,style:change}}).then(res=>{
                message.success(res.data.success,1)
            },({response})=>{
                message.error(response.data.errors,1)
            })
        }
        if(change==="email_final"){
            if(emailCheck(email_change)&&email_change!==email){
                this.postVerification()
                axios.get('/api/email/findEmail',{params:{email:email_change,style:change}}).then(res=>{
                    message.success(res.data.success,1)
                },({response})=>{
                    message.error(response.data.errors,1)
                })
            }else {
                message.error('请输入正确的邮箱',2)
            }
        }

    }

    render() {
        const {email_change,checkEmailContent,email,user_id,introduce,username,account_type,head_portrait,change,editor,disabled,passwordConfirmation}=this.state
        return (
            <div className="personal_center">
                <div className="personal_center_title">
                    <span>账号详情</span>
                </div>
                <div className="personal_information">
                    <div className="about_personal">
                        <span>账号信息</span>
                    </div>
                    <ul className="personal_more_info">
                        <li>
                            <span>用户名</span>
                            <p>{username}</p>
                            <h4 onClick={(e)=>{this.change("username",username)}}>修改</h4>
                        </li>
                        <li>
                            <span>用户简介</span>
                            <p>{introduce}</p>
                            <h4 onClick={(e)=>{this.change("introduce",introduce)}}>编辑</h4>
                        </li>
                        <li>
                            <span>用户头像</span>
                            <img src={head_portrait} alt=""/>
                            <input id="head" type="file" onChange={(e)=>{this.save(e,"head_portrait")}}/>
                            <h4 onClick={(e)=>{this.change("head_portrait",null)}}>更换头像</h4>
                        </li>
                        <li>
                            <span>账号类型</span>
                            <p>{account_type}</p>
                            {
                                account_type==="个人"?<h4><Link to='/personal/p_center/style' style={{color:'#4f88b4'}}>更改类型</Link></h4>:null
                            }
                        </li>
                        <li>
                            <span>账号ID</span>
                            <p>{user_id}</p>
                        </li>
                        <li>
                            <span>联系邮箱</span>
                            <p>{email}</p>
                            <h4 onClick={(e)=>{this.change('email',null)}}>修改邮箱</h4>
                        </li>
                        <li>
                            <span>账号密码</span>
                            <p>************</p>
                            <h4 onClick={(e)=>{this.change('password',null)}}>修改密码</h4>
                        </li>
                    </ul>
                </div>
                {
                    change===""?null:<div className="information_editor">
                        <div className="editor_shade shade"/>
                        <div className="editor_shade">
                            <div className="editor">
                                <button className="close" onClick={this.close}>
                                    <svg  className="icon" viewBox="0 0 1024 1024"
                                          xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
                                            fill="#2c2c2c" />
                                    </svg>
                                </button>
                                <div className="editor_header">
                                    <span>
                                        {
                                            change==="username"?"编辑用户名":
                                                change==="introduce"?"编辑个人简介":
                                                    change==="head_portrait"?"更换头像":
                                                        change==="password"?"验证当前密码":
                                                            change==="password_change"?"修改密码":
                                                                change==="email"?"验证当前邮箱":
                                                                    change==="email_final"?"设置您的新邮箱":null
                                        }
                                    </span>
                                </div>
                                <div className="editor_center">
                                    {
                                        change==="head_portrait"? <img src={editor} alt=""/>:null
                                    }
                                    {
                                        change==="username"?<input className="username" type="text" value={editor} onChange={(e)=>{this.save(e,change)}}/>:
                                            change==="introduce"?<textarea rows={5} maxLength={50} value={editor} onChange={(e)=>{this.save(e,change)}}/>:
                                                change==="password"?<input className="username" type="password" placeholder="请输入当前账号密码" value={editor} onChange={(e)=>{this.save(e,change)}}/>:
                                                    change==="password_change"? <Fragment><input className="username" type="password" placeholder="请设置您的新密码" value={editor} onChange={(e)=>{this.save(e,change)}}/><input className="username" style={{marginTop:"12px"}} type="password" placeholder="请重复您的密码" value={passwordConfirmation} onChange={(e)=>{this.save(e,'passwordConfirmation')}}/></Fragment>:null
                                    }
                                    {
                                        change==="username"?<span className="username_num">{editor.length}/8</span>:
                                            change==="introduce"?<span className="introduce_num">{editor.length}/50</span>:null
                                    }
                                    {
                                        change==="email"||change==='email_final'?
                                            <Fragment>
                                                {
                                                    change==="email"?<input className="username" type="text" readOnly value={email}/>:<input className="username" type="text" placeholder="请输入您的新邮箱" value={email_change} onChange={(e)=>{this.save(e,'email_change')}}/>
                                                }
                                                <div className="check_email">
                                                    <input className="username" type="text" value={editor} onChange={(e)=>{this.save(e,change)}} placeholder="输入您的验证码"/>
                                                    <button onClick={this.getVerification} disabled={checkEmailContent!=="点击发送验证码"}>{checkEmailContent}</button>
                                                </div>
                                            </Fragment>:null
                                    }
                                    {
                                        change==="username"?<div>请勿使用包含特殊符号或含有明显营销推广意图的用户名,否则一经发现，我们将会对账号进行处罚！</div>:
                                            change==="introduce"?<div>请勿使用包含特殊符号或含有明显营销推广意图的简介,例如在简介中暴露您的QQ、微信、电话等联系方式，一经发现，我们将会对账号进行处罚！</div>:
                                                change==="head_portrait"?<div>请勿上传包含明显营销、推广行为的图片作为头像，否则一经审查，我们将会对账号进行处罚，包括但不限于禁封账号!</div>:null
                                    }
                                </div>
                                <div className="editor_footer">
                                    <button onClick={this.close}>取消</button>
                                    {
                                        change==="username"?<button disabled={this.judgeState('userEditor')||disabled} onClick={this.saveEditor} style={{backgroundColor:this.judgeState('userEditor')?'#f5f5f5':"#ffffff",color:this.judgeState('userEditor')?'#b3b3b4':"black"}}>提交</button>:
                                            change==="introduce"? <button disabled={this.judgeState('introduce')||disabled} onClick={this.saveEditor} style={{backgroundColor:this.judgeState('introduce')?'#f5f5f5':"#ffffff",color:this.judgeState('introduce')?'#b3b3b4':"black"}}>提交</button>:
                                                change==="head_portrait"? <button disabled={disabled} onClick={this.saveEditor}>提交</button>:
                                                    change==="password"||change==="password_change"? <button disabled={this.judgeState('password')||disabled} onClick={change==="password"?this.checkEditor:this.saveEditor} style={{backgroundColor:this.judgeState('password')?'#f5f5f5':"#ffffff",color:this.judgeState('password')?'#b3b3b4':"black"}}>确认</button>:
                                                        change==="email"?<button  disabled={disabled||editor.length!==6} onClick={this.saveEditor} style={{backgroundColor:this.judgeState('code')?'#f5f5f5':"#ffffff",color:this.judgeState('code')?'#b3b3b4':"black"}}>提交</button>:
                                                            change==="email_final"?<button  disabled={disabled||this.judgeState('email_final')} onClick={this.saveEditor} style={{backgroundColor:this.judgeState('email_final')?'#f5f5f5':"#ffffff",color:this.judgeState('email_final')?'#b3b3b4':"black"}}>提交</button>:null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Personal_home;