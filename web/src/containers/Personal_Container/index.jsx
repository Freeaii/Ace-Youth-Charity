import Personal from "../../pages/Central/Personal";
import {connect} from 'react-redux';
import {changeLoginState} from "../../redux/actions/header_action";

function mapStateToProps(state) {
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

const PersonalContainer=connect(mapStateToProps,mapDispatchToProps)(Personal)

export default PersonalContainer