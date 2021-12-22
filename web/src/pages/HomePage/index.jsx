import React, {Component} from 'react';
import './index.css'
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import HeaderContainer from "../../containers/Header_Container";
import LoginContainer from "../../containers/Login_Container";
class HomePage extends Component {
    render() {
        return (
            <div className="homepage">
                <HeaderContainer/>
                <Content/>
                <Footer/>
                {
                    this.props.headerReducer.headerState===0?<LoginContainer/>:null
                }
            </div>
        );
    }
}

export default HomePage;