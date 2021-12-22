import React, {Component} from 'react';
import './index.css'
class StyleChoose extends Component {
    state={
        pitch:this.props.defaultState
    }
    changePitch=(e)=>{
        this.setState({pitch:e.target.innerHTML})
        this.props.onChange(e.target.innerHTML)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({pitch:nextProps.defaultState})
    }

    render() {
        return (
            <div className="style">
                <div className="choose">
                    <span>{this.props.title}</span>
                    <ul>
                        {
                            this.props.style.map((styleObj,index)=>{
                                return(
                                    <li key={index} style={{color:styleObj===this.state.pitch?"red":"black"}} onClick={this.changePitch}>{styleObj}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    this.props.title==="类型"?null: <div className="search">
                        <input type="text" placeholder="请输入关键词"/>
                        <svg t="1635080562337" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" ><path
                            d="M474.453333 884.053333c-225.28 0-409.6-184.32-409.6-409.6s184.32-409.6 409.6-409.6 409.6 184.32 409.6 409.6-184.32 409.6-409.6 409.6z m0-68.266666c187.733333 0 341.333333-153.6 341.333334-341.333334s-153.6-341.333333-341.333334-341.333333-341.333333 153.6-341.333333 341.333333 153.6 341.333333 341.333333 341.333334z m252.586667 54.613333c-13.653333-13.653333-10.24-37.546667 3.413333-47.786667s37.546667-10.24 47.786667 3.413334l64.853333 78.506666c13.653333 13.653333 10.24 37.546667-3.413333 47.786667s-37.546667 10.24-47.786667-3.413333l-64.853333-78.506667z"
                        /></svg>
                    </div>
                }
            </div>
        );
    }
}

export default StyleChoose;