import {GET_ARTICLE_DATA,GET_USER_DATA} from "../../constants";
import axios from "axios";

export const setUserData=(data)=>{
    return{
        type:GET_USER_DATA,
        user:data
    }
}



export const sendUserRequest=()=>{
    return dispatch=> {
            axios.get('/api/user/information',{
            }).then(res=> {
                dispatch(setUserData(res.data))
            }
        )
    }
}
