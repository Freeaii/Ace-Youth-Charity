const express=require('express')
const sqlFn=require('../mysql/index')
const router=express.Router()



//获取首页展示信息
router.get('/home',(request,response)=>{
    const sql="select articles.article_id,articles.title,articles.date,articles.style,consumer.username from articles,consumer,homePage where articles.user_id=consumer.user_id and articles.article_id=homePage.article_id and articles.state=? and articles.pass_state=?";
    sqlFn(sql,['已通过','展示中'],function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})

//获取设置相关的信息测试接口
router.get('/content',(request,response)=>{
    const sql="select articles.title,articles.date,articles.content,articles.style,articles.contact_email,consumer.username,consumer.head_portrait from articles,consumer where articles.user_id=consumer.user_id and article_id=?";
    let article_id=request.query.article_id
    sqlFn(sql,[article_id],function (data) {
        if(data.length>0){
            response.status(200).json(data[0]
            )
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})


//获取项目接口
router.get('/project',(request,response)=>{
    const sqlRecommend="select * from articles where `style`=? and `state`=? and `pass_state`=?";
    const sqlOtherProject="select * from articles where `style`=? and `project_style`=? and state=? and pass_state=?";
    switch (request.query.url) {
        case '/project/all/recommend':
            sqlFn(sqlRecommend,['公益项目','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;
        case '/project/all/public':
            sqlFn(sqlOtherProject,['公益项目','公共服务','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;
        case '/project/all/knowledge':
            sqlFn(sqlOtherProject,['公益项目','知识传播','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;

        case '/project/all/environment':
            sqlFn(sqlOtherProject,['公益项目','环境保护','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;
        case '/project/all/society':
            sqlFn(sqlOtherProject,['公益项目','社会援助','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;
        case '/project/all/other':
            sqlFn(sqlOtherProject,['公益项目','其它','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;
        default:
            break;
    }
})
//获取项目接口
router.get('/article',(request,response)=>{
    const sqlRecommend="select * from articles where `style`=? and articles.state=? and articles.pass_state=?";
    switch (request.query.url) {
        case '/information/all/recommend':
            sqlFn(sqlRecommend,['公益资讯','已通过','展示中'],function (data) {
                if(data.length>0){
                    response.status(200).json(data)
                }else{
                    response.status(400).json({errors:"服务器出错了！"})
                }
            })
            break;
        default:
            break;
    }
})

//获取展示页面Project
router.get('/show/project',(request,response)=>{
    const sql="select projectPage.article_id,projectPage.style,articles.title,articles.cover,articles.introduce from articles,projectPage where projectPage.article_id=articles.article_id and articles.state=? and articles.pass_state=?"
    sqlFn(sql,['已通过','展示中'],function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})




//获取展示页面information
router.get('/show/information',(request,response)=>{
    const sql="select informationPage.article_id,informationPage.style,articles.title,articles.date,articles.cover,articles.introduce from articles,informationPage where informationPage.article_id=articles.article_id and articles.state=? and articles.pass_state=?"
    sqlFn(sql,['已通过','展示中'],function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})

//获取组织成员信息
router.get('/members',(request,response)=>{
    const sql="select * from members"
    sqlFn(sql,[],function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})

module.exports=router