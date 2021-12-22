import React, {Component} from 'react';
import './index.css'
class VideoLi extends Component {
    render() {
        return (
            <div className="article_show_video">
                <div className="video_cover">
                    <video muted="muted"  src="http://localhost:8888/static/videos/tenager.mp4" preload="preload" controls="controls"/>
                </div>
            </div>
        );
    }
}

export default VideoLi;