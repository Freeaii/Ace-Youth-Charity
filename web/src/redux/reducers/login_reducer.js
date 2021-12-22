import {SET_CURRENT_USERS} from "../../constants";

const initState={
    user:{}
};

function loginReducer(preState=initState,action) {
    const {type,user}=action
    switch (type) {
        case SET_CURRENT_USERS:
            return user
        default:
            return preState
    }
}

export default loginReducer