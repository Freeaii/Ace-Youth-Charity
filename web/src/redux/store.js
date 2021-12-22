import {createStore,applyMiddleware} from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from 'redux-devtools-extension'
import rootRouter from "./reducers";
import {tokenCheck} from "../dataDetection/token_check";
import {setCurrentUser} from "./actions/login_action";
import jwtDecode from "jwt-decode";
import {changeLoginState} from "./actions/header_action";

const store=createStore(rootRouter,composeWithDevTools(applyMiddleware(thunk)))

if(localStorage.jwtToken){
    tokenCheck(localStorage.jwtToken)
    store.dispatch(changeLoginState(1))
    store.dispatch(setCurrentUser({
        user:jwtDecode(localStorage.jwtToken)
    }))
}
export default store