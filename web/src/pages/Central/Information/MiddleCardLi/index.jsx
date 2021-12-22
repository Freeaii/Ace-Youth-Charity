import React, {Component} from 'react';
import './index.css'
import {Link} from "react-router-dom";
class MiddleCardLi extends Component {
    render() {
        const {article_id,cover,title,introduce}=this.props.data
        return (
            <div className="article_show_middle">
                <Link key={article_id} style={{color:"black"}} to={{pathname:'/information/content',state:{article_id:article_id}}}>
                    <div className="middle_cover">
                        <img src={cover} alt=""/>
                    </div>
                    <div className="middle_describe">
                        <h3>{title}</h3>
                        <p>{introduce}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default MiddleCardLi;