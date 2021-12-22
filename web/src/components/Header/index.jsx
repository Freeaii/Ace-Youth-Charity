import React, {Component} from 'react';
import './index.css'
import logo from '../../images/logo.png'
import {Link} from "react-router-dom";
import axios from "axios";
import {scrollAdd} from "../../utils/scroll";
class Header extends Component {
    state={
        header_change:false,
        user:[],
        nav_menu:[
            {id:100,address:"/home",name:"首页"},
            {id:101,address:"/project",name:"公益项目"},
            {id:102,address:"/information",name:"公益资讯"},
            {id:103,address:"/about",name:"关于我们"},
            {id:105,address:"/team",name:"青年组织"},
        ],
    }
    static getDerivedStateFromProps(props,state){
        return{
            headerState:props.headerReducer.headerState
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.headerState===1&&prevState.headerState!==1){
            axios.get('/api/user/information').then(res=>{
                this.setState({user:res.data})
            })
        }
    }
    componentDidMount() {
        if(this.state.headerState===1){
            axios.get('/api/user/information').then(res=>{
                this.setState({user:res.data})
            })
        }
        window.addEventListener("scroll",this.headerChange)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll",this.headerChange)
    }

    headerChange=()=>{
        if(window.pageYOffset>=25){
            this.setState({header_change:true})
        }else{
            this.setState({header_change:false})
        }
    }
    login=()=>{
        scrollAdd()
        this.props.changeLoginState(0)
    }
    loginOut=()=>{
        this.props.loginOut()
    }
    buttonState=()=>{
        this.forceUpdate()
    }
    render() {
        const {user,headerState}=this.state
        return (
            <div className="header">
                <div className={this.state.header_change?"header_fill_after":"header_fill_before"}>
                </div>
                <div className="nav_logo">
                    <img src={logo} alt="ACE"/>
                    <div className="logo_describe">
                        <span>爱思青年公益</span>
                        <span>Ace Youth Charity </span>
                    </div>
                </div>
                <div className="nav_button">
                    <div className="nav_main_btn">
                        {
                            this.state.nav_menu.map((menuObj)=>{
                                return(
                                    <Link to={menuObj.address} key={menuObj.id}>
                                        <button className={window.location.pathname.includes(menuObj.address)?"nav_home":""} onClick={this.buttonState}>
                                            {menuObj.name}
                                        </button>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className="user_login">
                        {
                            headerState===1?null:<button className="join_us" onClick={this.login}>加入我们</button>

                        }
                        {
                            headerState===1?<div className="user_head" style={{display:"flex"}}>
                                <img src={user.head_portrait} alt=""/>
                                <div className="user_name">
                                    <span className="og_name">{user.username}</span>
                                    <div className="more_function">
                                        <h5>
                                            更多功能
                                            <svg t="1633188439095" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg" p-id="2414">
                                                <path
                                                    d="M84.48 375.104C71.456 362.528 64.096 345.248 64 327.168 65.696 286.368 100 254.592 140.8 256.032 161.92 255.936 182.176 264.288 197.12 279.2L512 591.904 826.88 279.2C841.824 264.288 862.08 255.936 883.2 256.032 924 254.592 958.304 286.368 960 327.168 959.904 345.248 952.544 362.528 939.52 375.104L568.32 744.96C537.056 775.68 486.944 775.68 455.68 744.96L84.48 375.104Z"
                                                    p-id="2415" fill="#2c2c2c"/>
                                            </svg>
                                        </h5>
                                        <div className="choose_menu">
                                            <Link to="/personal">
                                                <button>个人中心</button>
                                            </Link>
                                            <Link to="/home">
                                                <button onClick={this.loginOut}>退出登录</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>:null
                        }
                    </div>
                    <div className="nav_menu">

                    </div>
                </div>
            </div>
        );
    }
}

export default Header;