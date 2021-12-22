import Login from "../../pages/LoginPage/index";

import {connect} from 'react-redux';
import {register, setCurrentUser} from "../../redux/actions/login_action";
import {changeLoginState} from "../../redux/actions/header_action";

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return{
        changeLoginState:(data)=>{
            dispatch(changeLoginState(data))
        },
        register,
        setCurrentUser:(data)=>{
            dispatch(setCurrentUser(data))
        }
    }
}

const LoginContainer=connect(mapStateToProps,mapDispatchToProps)(Login)

export default LoginContainer