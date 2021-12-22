import HomePage from "../../pages/HomePage";

import {connect} from 'react-redux';

function mapStateToProps(state) {
    return state
}

const HomePageContainer=connect(mapStateToProps)(HomePage)

export default HomePageContainer