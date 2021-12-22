import React from "react";

import {connect} from "react-redux";

import {withRouter} from 'react-router-dom'
import {changeLoginState} from "../redux/actions/header_action";

export default function (Personal) {
    class LimitAccess extends React.Component{
        componentWillMount() {
            console.log(1)
            if(this.props.headerState!==1){
                this.props.history.push('/home')
                this.props.changeLoginState(0)
            }
        }
        render() {
            return (
                <Personal/>
            );
        }
    }

    const mapStateToProps=(state)=>{
        return {
            headerState:state.headerReducer.headerState
        }
    }

    const mapDispatchToProps=(dispatch)=>{
        return {
            changeLoginState:(data)=>{
                dispatch(changeLoginState(data))
            }
        }
    }
    return withRouter(connect(mapStateToProps,mapDispatchToProps)(LimitAccess))
}