import React, {Component,Fragment} from 'react';
import {Pagination} from "antd";
import './index.css'
import axios from "axios";
import StyleChoose from "../CheckArticle/StyleChoose";
import Notification from "../../Notice/Notification";
class CheckAccount extends Component {
    state={
        accounts:[],
        page:1,
        pageSize:10,
        userStyle:"个人",
        pitch:"注册待验证"
    }
    componentWillMount() {
       this.getAdminAccounts("个人","注册待验证")
    }
    getAdminAccounts=(style,pitch)=>{
        axios.get('/api/admin/check/account',{params:{style,state:pitch}}).then(res=>{
            this.setState({accounts:res.data})
        })
    }
    pageChange=(page,pageSize)=>{
        this.setState({
            page,
            pageSize,
        })
    }
    stateChangeUser=(user)=>{
        switch (user) {
            case "个人":
                this.setState({userStyle:user,pitch:"注册待验证"})
                //获取信息
                this.getAdminAccounts("个人","注册待验证")
                break;
            case "组织":
                this.setState({userStyle:user,pitch:"资质审核"})
                //获取信息
                this.getAdminAccounts("组织","资质审核")
                break;
            default:
                break;
        }
    }
    stateChangeStyle=(style)=>{
        this.setState({pitch:style})
        let {userStyle}=this.state
        switch (style) {
            case "注册待验证":
                this.getAdminAccounts(userStyle,"注册待验证")
                break;
            case "正式用户":
                this.getAdminAccounts(userStyle,"正式用户")
                break;
            case "已禁封":
                if(userStyle==="个人"){
                    this.getAdminAccounts(userStyle,"已禁封")
                }else {
                    this.getAdminAccounts('组织',"已禁封")
                }
                break;
            case "资质审核":
                this.getAdminAccounts(userStyle,"资质审核")
                break;
            case "正式组织":
                this.getAdminAccounts(userStyle,"正式组织")
                break;
            default:
                break;
        }
    }
    //发送请求的接口封装
    recomposeUserPort=(style,path,value)=>{
        switch (style) {
            case "delete":
                axios.delete(path,value).then(res=>{
                    //闲置刷新接口
                    this.stateChangeStyle(this.state.pitch)
                })
                break;
            case "post":
                axios.post(path,value).then(res=>{
                    //闲置刷新接口
                    this.stateChangeStyle(this.state.pitch)
                })
                break;
            default:
                break;
        }
    }
    //对用户的信息处理函数
    userPass=(index)=>{
        this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"userPass"})
    }
    userBan=(index)=>{
        this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"userBan"})
    }
    relieve=(index)=>{
        if(this.state.userStyle==="个人"){
            this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"userRelieve"})
        }else {
            this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"groupRelieve"})
        }
    }
    groupPass=(index)=>{
        this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"groupPass"})
    }
    groupReject=(index)=>{
        this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"groupReject"})
    }
    lower=(index)=>{
        this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"lower"})
    }
    groupBan=(index)=>{
        this.recomposeUserPort('post','/api/recompose/user',{user_id:index,key:"groupBan"})
    }
    render() {
        const {accounts,page,pageSize,userStyle,pitch}=this.state
        const state=['个人','组织']
        const style=userStyle==="个人"?['注册待验证','正式用户','已禁封']:["资质审核",'正式组织','已禁封']
        return (
            <div className="admin_account">
                <StyleChoose style={state} title="类型" onChange={this.stateChangeUser} defaultState={userStyle}/>
                <StyleChoose style={style} title="状态" onChange={this.stateChangeStyle} defaultState={pitch}/>
                {accounts.length>0?<Fragment>
                    <div className="total">共{accounts.length}条内容</div>
                    <div className="account_menu">
                        <div className="id">ID</div>
                        <div className="name">名称</div>
                        <div className="email">邮箱</div>
                    </div>
                    <ul className="admin_account_show">
                        {
                            accounts.slice((page-1)*pageSize,page*pageSize).map((articleObj,index)=>{
                                return(
                                    <li key={articleObj.user_id}>
                                            <div className="account">
                                                <div className="about_account">
                                                    <div className="account_id">{articleObj.user_id}</div>
                                                    <div className="account_name">{articleObj.username}</div>
                                                    <div className="account_email">{articleObj.email}</div>
                                                </div>
                                                {
                                                    articleObj.account_state==="注册待验证"?<div className="control">
                                                        <button onClick={(e)=>{this.userPass(articleObj.user_id)}}>通过</button>
                                                    </div>:(articleObj.account_state==="正式用户"||articleObj.account_state==="资质审核中")&&(userStyle==="个人")?<div className="control">
                                                        <button onClick={(e)=>{this.userBan(articleObj.user_id)}}>禁封</button>
                                                    </div>:articleObj.account_state==="已禁封"?<div className="control">
                                                        <button onClick={(e)=>{this.relieve(articleObj.user_id)}}>解除</button>
                                                    </div>:articleObj.account_state==="资质审核中"&&userStyle==="组织"?<div className="control">
                                                        <button onClick={(e)=>{this.groupPass(articleObj.user_id)}}>通过</button>
                                                        <button onClick={(e)=>{this.groupReject(articleObj.user_id)}}>拒绝</button>
                                                    </div>:articleObj.account_state==="正式组织"?<div className="control">
                                                        <button onClick={(e)=>{this.lower(articleObj.user_id)}}>降低为个人</button>
                                                        <button onClick={(e)=>{this.groupBan(articleObj.user_id)}}>禁封</button>
                                                    </div>:null
                                                }
                                            </div>
                                        {
                                            articleObj.account_state==="资质审核中"&&userStyle==="组织"?
                                                <div className="pic_show">
                                                    <img src={articleObj.pic_front} alt=""/>
                                                    <img src={articleObj.pic_reserve} alt=""/>
                                                    <img src={articleObj.pic_info} alt=""/>
                                                </div> :null
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="pagination">
                        <Pagination
                            total={accounts.length}
                            showSizeChanger
                            showQuickJumper
                            current={page}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            pageSizeOptions={[10,20,50,100]}
                            onChange={this.pageChange}
                        />
                    </div>
                </Fragment>:<Notification notice={1}/>
                }
            </div>
        );
    }
}

export default CheckAccount;