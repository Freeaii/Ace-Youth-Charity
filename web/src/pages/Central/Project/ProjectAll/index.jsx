import React, {Component} from 'react';
import ArticleAll from "../../ArticleAll";
import pro_bg from "../../../../images/project_bg.png";
class ProjectAll extends Component {
    state={
        path:'/project',
        background:pro_bg,
        project_style:[
            {id:301,address:"/all/recommend",name:"项目总览"},
            {id:302,address:"/all/public",name:"公共服务"},
            {id:303,address:"/all/knowledge",name:"知识传播"},
            {id:304,address:"/all/society",name:"社会援助"},
            {id:305,address:"/all/environment",name:"环境保护"},
            {id:306,address:"/all/other",name:"其它"},
        ],
    }
    render() {
        return (
            <ArticleAll {...this.state} />
        );
    }
}

export default ProjectAll;