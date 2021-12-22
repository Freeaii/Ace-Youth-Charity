import React, {Component} from 'react';
import './index.css'
import Notification from "./Notification";
class Notice extends Component {
    render() {
        return (
            <div className="personal_notice">
               <Notification notice={2}/>
            </div>
        );
    }
}

export default Notice;