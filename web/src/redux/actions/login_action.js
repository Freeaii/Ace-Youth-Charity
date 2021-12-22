import axios from "axios";
import {SET_CURRENT_USERS} from "../../constants";
import {tokenCheck} from "../../dataDetection/token_check";
import {changeLoginState} from "./header_action";

export const setCurrentUser=(data)=>{
    return{
        type:SET_CURRENT_USERS,
        user:data
    }
}

export const logOut=()=>{
    return dispatch=>{
        dispatch(changeLoginState(-1))
        //清空redux中的数据
        dispatch(setCurrentUser({user:{}}))
        //清空localstorage
        localStorage.removeItem('jwtToken')

        localStorage.clear();
        sessionStorage.clear();
        //取消请求头中的信息
        tokenCheck(false)
    }
}

export const register=(userData)=>{
    return axios.post("/api/register",userData)
}
