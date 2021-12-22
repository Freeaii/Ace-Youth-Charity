import {combineReducers} from "redux";
import headerReducer from "./header_reducer";
import loginReducer from "./login_reducer";
const rootRouter=combineReducers({
    headerReducer,
    loginReducer,
})

export default rootRouter