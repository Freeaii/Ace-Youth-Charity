import React, {Component} from 'react';
import BigCardLi from "../BigCardLi";
import SmallCardLi from "../SmallCardLi";
import MiddleCardLi from "../MiddleCardLi";
import VideoLi from "../VideoLi";
import './index.css'
import {Link} from "react-router-dom";
import axios from "axios";
class InformationShow extends Component {
    state={

    }
    componentDidMount() {
        axios.get('/api/information/show/information').then(res=>{
            let big=[],middle=[],small=[],main=[];
            res.data.forEach((item)=>{
                switch (item.style) {
                    case 'main':
                        main.push(item)
                        break;
                    case 'big':
                        big.push(item)
                        break;
                    case 'middle':
                        middle.push(item)
                        break;
                    case 'small':
                        small.push(item)
                        break;
                    default:
                        break;
                }
            })
            this.setState({
                big,
                small,
                middle,
                main
            })
        })
    }

    render() {
        const {main,big,middle,small}=this.state
        return (
            <div className="information_show">
                {
                    main?<Link style={{color:"black"}} to={{pathname:'/information/content',state:{article_id:main[0].article_id}}}>
                        <div className="information_top">
                            <div className="title">
                                <h2>成为改变世界的行动者！
                                </h2>
                                <h4>
                                    点击了解新青年de梦想
                                </h4>
                            </div>
                            <div className="bg_change">
                                <span className="arrow_l"/>
                                <span className="arrow_r"/>
                            </div>
                        </div>
                    </Link>:null
                }
                <div className="information_center">
                    <div className="information_content">
                        <h2>最新动态</h2>
                        <div className="content_show">
                            <ul className="information_show_left">
                                <li>
                                    {
                                        big?<BigCardLi data={big[0]}/>:null
                                    }
                                </li>
                                <li className="middle_style_left">
                                    {
                                        small?<SmallCardLi data={small[0]}/>:null
                                    }
                                </li>
                                <li className="middle_style_right">
                                    {
                                        small?<SmallCardLi data={small[1]}/>:null
                                    }
                                </li>
                                <li>
                                    {
                                        big?<BigCardLi data={big[1]}/>:null
                                    }
                                </li>
                                <li>
                                    {
                                        middle?<MiddleCardLi data={middle[0]}/>:null
                                    }
                                </li>
                            </ul>
                            <ul className="information_show_right">
                                <li>
                                    {
                                        small?<SmallCardLi data={small[2]}/>:null
                                    }
                                </li>
                                <li>
                                    {
                                        small?<SmallCardLi data={small[3]}/>:null
                                    }
                                </li>
                                <li>
                                    {
                                        small?<SmallCardLi data={small[4]}/>:null
                                    }
                                </li>
                                <li>
                                    <VideoLi/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to="/information/all">
                    <button className="read_more">查看更多</button>
                </Link>
            </div>
        );
    }
}

export default InformationShow;