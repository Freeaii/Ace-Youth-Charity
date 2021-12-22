import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './index.css'
class SmallCardLi extends Component {
    render() {
        const {article_id,cover,date,title,introduce}=this.props.data
        return (
            <div className="article_show_small">
                <Link key={article_id} style={{color:"black"}} to={{pathname:'/information/content',state:{article_id:article_id}}}>
                    <div className="article_cover">
                        <img src={cover} alt=""/>
                    </div>
                </Link>
                <div className="article_content">
                    <span className="article_date">
                        {date.split(' ')[0]}
                    </span>
                    <Link key={article_id} style={{color:"black"}} to={{pathname:'/information/content',state:{article_id:article_id}}}>
                        <h3>
                            {title}
                        </h3>
                        <p>
                            {introduce}
                        </p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SmallCardLi;