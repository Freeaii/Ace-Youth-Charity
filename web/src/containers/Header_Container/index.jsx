import Header from "../../components/Header";
import {connect} from 'react-redux';
import {changeLoginState} from "../../redux/actions/header_action";
import {logOut} from "../../redux/actions/login_action";


function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return{
        changeLoginState:(data)=>{
            dispatch(changeLoginState(data))
        },
        loginOut:()=>{
            dispatch(logOut())
        }
    }
}

const HeaderContainer=connect(mapStateToProps,mapDispatchToProps)(Header)

export default HeaderContainer