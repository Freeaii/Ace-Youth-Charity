import {CHANGE_LOGIN_STATE} from "../../constants";

const initState={
    headerState:-1,
};

function headerReducer(preState=initState,action) {
    const {type,headerState}=action
    switch (type) {
        case CHANGE_LOGIN_STATE:
            return {
                headerState
            }
        default:
            return preState
    }
}

export default headerReducer