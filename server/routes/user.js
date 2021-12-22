const express=require('express')
const sqlFn=require('../mysql/index')
const router=express.Router()
const readCookies=require('../utils/readCookie')
const {nowTime}=require('../utils/nowTime')
//获取设置相关的信息
router.get('/information',(request,response)=>{
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    const sql="select * from consumer where `user_id`=?";
    sqlFn(sql,[user_id],function (data) {
        if(data.length>0){
            response.status(200).json(data[0]
            )
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})
//获取设置相关的信息
router.get('/admin',(request,response)=>{
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    const sql="select * from admin where `user_id`=? limit 1";
    sqlFn(sql,[user_id],function (data) {
        if(data.length>0){
            response.status(200).json(data[0])
        }else{
            response.status(400).json({errors:"服务器出错了！"})
        }
    })
})

//获取数据列表函数
function getArticle(sql,arr,response){
    sqlFn(sql,arr,function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(200).json([])
        }
    })
}


//获取文章列表
router.get('/articles',(request,response)=>{
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    switch (request.query.style) {
        case "全部":
            let sqlT="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and (`state`=? or `state`=? or `state`=?)";
            let arrT=[user_id,'公益资讯','已通过','未通过','审核中']
            getArticle(sqlT,arrT,response)
            break;
        case "审核中":
            let sqlS="select article_id,title,cover,date,state from articles where `user_id`=? and `style`=? and `state`=?";
            let arrS=[user_id,'公益资讯','审核中']
            getArticle(sqlS,arrS,response)
            break;
        case "已通过":
            let sqlY="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and `state`=?";
            let arrY=[user_id,'公益资讯','已通过']
            getArticle(sqlY,arrY,response)
            break;
        case "未通过":
            let sqlW="select article_id,title,cover,date,state from articles where `user_id`=? and `style`=? and `state`=?";
            let arrW=[user_id,'公益资讯','未通过']
            getArticle(sqlW,arrW,response)
            break;
        case "展示中":
            let sqlZ="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and `state`=? and `pass_state`=?";
            let arrZ=[user_id,'公益资讯','已通过','展示中']
            getArticle(sqlZ,arrZ,response)
            break;
        //数据库暂时没设立key
        case "已关闭":
            let sqlG="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and `state`=? and `pass_state`=?";
            let arrG=[user_id,'公益资讯','已通过','已关闭']
            getArticle(sqlG,arrG,response)
            break;
    }
})

//获取项目列表
router.get('/projects',(request,response)=>{
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    switch (request.query.style) {
        case "全部":
            let sqlT="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=?";
            let arrT=[user_id,'公益项目']
            getArticle(sqlT,arrT,response)
            break;
        case "审核中":
            let sqlS="select article_id,title,cover,date,state from articles where `user_id`=? and `style`=? and `state`=?";
            let arrS=[user_id,'公益项目','审核中']
            getArticle(sqlS,arrS,response)
            break;
        //数据库暂时没设立key
        case "已通过":
            let sqlY="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and `state`=?";
            let arrY=[user_id,'公益项目','已通过']
            getArticle(sqlY,arrY,response)
            break;
        case "未通过":
            let sqlW="select article_id,title,cover,date,state from articles where `user_id`=? and `style`=? and `state`=?";
            let arrW=[user_id,'公益项目','未通过']
            getArticle(sqlW,arrW,response)
            break;
            //数据库暂时没设立key
        case "展示中":
            let sqlZ="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and `state`=? and `pass_state`=?";
            let arrZ=[user_id,'公益项目','已通过','展示中']
            getArticle(sqlZ,arrZ,response)
            break;
            //数据库暂时没设立key
        case "已关闭":
            let sqlG="select article_id,title,cover,date,state,pass_state from articles where `user_id`=? and `style`=? and `state`=? and `pass_state`=?";
            let arrG=[user_id,'公益项目','已通过','已关闭']
            getArticle(sqlG,arrG,response)
            break;
    }
})

//获取草稿列表
router.get('/drafts',(request,response)=>{
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    const sql="select article_id,title,cover,date,state from articles where `user_id`=? and (`state`=? or `state`=?)";
    sqlFn(sql,[user_id,'已保存','编辑中'],function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(200).json([])
        }
    })
})

//保存已发布的文章，后续审核
router.post('/publish',(request,response)=>{
    checkSql(request,response,"审核中",{
        success:"发布成功，后续我们将进行审核！",
        error:"服务器故障，请稍后再试！"
    })
})


//获取之前正在编辑的文章
router.get('/temporary',(request,response)=>{
   let user_id=unescape(readCookies(request.headers.cookie).user_id)
    //将信息写入数据库
    let sql = "select * from articles where `user_id`=? AND `state`=?";
    let arr = [user_id, '编辑中']
    sqlFn(sql, arr, function (data) {
        if (data.length>0) {
            response.status(200).json(data[0])
        } else {
            response.status(200).json({})
        }
    })
})

//写入保存的文章
router.post('/save',(request,response)=>{
    checkSql(request,response,"已保存",{
        success:"保存成功！",
        error:"服务器故障，请稍后再试！"
    })
})


//写入临时保存的文章
router.post('/temporary',(request,response)=>{
    checkSql(request,response,'编辑中',{
        success:"草稿已保存",
        error:"服务器故障，请稍后再试！"
    })
})


function checkSql(request,response,action,message){
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    let now=nowTime()
    let state=action
    const {introduce,content,title,cover,article_id,style,projectStyle,contactEmail}=request.body
    let sqlFind="select 1 from articles where `article_id`=?"
    let sqlInsert = "insert into articles values (null,?,?,?,?,?,?,?,?,?,null,?)";
    let sqlUpdate="update articles set `title`=?,`introduce`=?,`cover`=?,`date`=?,`state`=?,`content`=?,`style`=?,`project_style`=?,`contact_email`=?,`user_id`=? where `article_id`=?"
    let arr = [title,introduce, cover,now,state,content,style,projectStyle,contactEmail,user_id]
    //将信息写入数据库
    new Promise(((resolve, reject) => {
        sqlFn(sqlFind,[article_id],function (data) {
            if(data.length>0){
                reject()
            }else {
                resolve()
            }
        })
    })).then(res=>{
        sqlFn(sqlInsert, arr, function (data) {
            if (data.affectedRows) {
                if(action==='编辑中'){
                    response.status(200).json({
                        success:message.success,
                        article_id:data.insertId
                    })
                }else {
                    response.status(200).json({success:message.success})
                }
            } else {
                response.status(400).json({errors: message.error})
            }
        })
    },err=>{
        sqlFn(sqlUpdate,[...arr,article_id],function (data) {
            if (data.affectedRows) {
                 response.status(200).json({success:message.success})
            } else {
                 response.status(400).json({errors: message.error})
            }
        })
    })
}


module.exports=router