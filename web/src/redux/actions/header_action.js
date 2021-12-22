import {CHANGE_LOGIN_STATE} from "../../constants";

export const changeLoginState=(data)=>{
    return{
        type:CHANGE_LOGIN_STATE,
        headerState: data
    }
}

