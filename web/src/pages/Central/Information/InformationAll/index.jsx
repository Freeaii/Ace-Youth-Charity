import React, {Component} from 'react';
import ArticleAll from "../../ArticleAll";
import pro_bg from "../../../../images/information.png";

class InformationAll extends Component {
    state={
        path:'/information',
        background:pro_bg,
        project_style:[
            {id:301,address:"/all/recommend",name:" 推荐"},
        ],
    }
    render() {
        return (
          <ArticleAll {...this.state}/>
        );
    }
}

export default InformationAll;