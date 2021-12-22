const express=require('express')
const sqlFn=require('../mysql/index')
const router=express.Router()


router.post('/switch',(request,response)=>{
    const {article_id,pass_state}=request.body
    let sqlUpdate="update articles set `pass_state`=? where `article_id`=?"
    let state=pass_state===true?"展示中":"已关闭"
    let arr=[state,article_id]
    sqlFn(sqlUpdate,arr,function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"修改成功"})
        }else {
            response.status(500).json({error:"服务器出问题啦！"})
        }
    })
})


router.delete('/delete',(request,response)=>{
    let {article_id}=request.query
    let sqlDelete="delete from articles where `article_id`=?"
    let arr=[article_id]
    sqlFn(sqlDelete,arr,function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"删除成功"})
        }else {
            response.status(500).json({error:"服务器出问题啦！"})
        }
    })
})

router.post('/pass',(request,response)=>{
    let {article_id}=request.body
    let sqlPass="update articles set `state`=?,`pass_state`=? where `article_id`=?"
    sqlFn(sqlPass,['已通过',"展示中",article_id],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"修改成功"})
        }else {
            response.status(500).json({error:"服务器出问题啦！"})
        }
    })
})

router.post('/reject',(request,response)=>{
    let {article_id}=request.body
    let sqlPass="update articles set `state`=? where `article_id`=?"
    sqlFn(sqlPass,['未通过',article_id],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"修改成功"})
        }else {
            response.status(500).json({error:"服务器出问题啦！"})
        }
    })
})

router.get('/editor',(request,response)=>{
    let {article_id}=request.query
    let sqlDelete="select * from articles where `article_id`=?"
    let arr=[article_id]
    sqlFn(sqlDelete,arr,function (data) {
        if(data.length>0){
            response.status(200).json(data[0])
        }else {
            response.status(500).json({error:"服务器出问题啦！"})
        }
    })
})


//封装下sql方法
function sqlFnUser(sqlUser,arr,response){
    sqlFn(sqlUser,arr,function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"修改成功！"})
        }else {
            response.status(400).json({error:"出现了未知问题！"})
        }
    })
}

router.post('/user',(request,response)=>{
    let {user_id,key}=request.body
    switch (key) {
        case 'userPass':
            let sqlUserPass="update consumer set `account_state`=? where `user_id`=?"
           sqlFnUser(sqlUserPass,['正式用户',user_id],response)
            break;
        case 'userBan':
            let sqlBan="update consumer set `account_state`=? where `user_id`=?"
            sqlFnUser(sqlBan,['已禁封',user_id],response)
            break;
        case 'userRelieve':
            let sqlR="update consumer set `account_state`=? where `user_id`=?"
            sqlFnUser(sqlR,['正式用户',user_id],response)
            break;
        case 'groupRelieve':
            let sqlG="update consumer set `account_state`=? where `user_id`=?"
            sqlFnUser(sqlG,['正式组织',user_id],response)
            break;
        case 'groupPass':
            let sqlGroupPass="update consumer set `account_type`=?,`account_state`=? where `user_id`=?"
            sqlFnUser(sqlGroupPass,['组织','正式组织',user_id],response)
            break;
        case 'groupReject':
            let sqlGroupReject="update consumer set `account_type`=?, `account_state`=? where `user_id`=?"
            sqlFnUser(sqlGroupReject,["个人",'正式用户',user_id],response)
            break;
        case 'lower':
            let sqlLower="update consumer set `account_type`=?,`account_state`=? where `user_id`=?"
            sqlFnUser(sqlLower,['个人','正式用户',user_id],response)
            break;
        case 'groupBan':
            let sqlGroupBan="update consumer set `account_state`=? where `user_id`=?"
            sqlFnUser(sqlGroupBan,['已禁封',user_id],response)
            break;

    }
})

router.post('/username',(request,response)=>{
    let {user_id,editor}=request.body
    let sql="update consumer set `username`=? where `user_id`=?"
    sqlFn(sql,[editor,user_id],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"用户名修改成功"})
        }else {
            response.status(400).json({errors:"未知错误，用户名修改失败"})
        }
    })
})

router.post('/introduce',(request,response)=>{
    let {user_id,editor}=request.body
    let sql="update consumer set `introduce`=? where `user_id`=?"
    sqlFn(sql,[editor,user_id],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"简介修改成功"})
        }else {
            response.status(400).json({errors:"未知错误，简介修改失败"})
        }
    })
})

router.post('/head',(request,response)=>{
    let {user_id,editor}=request.body
    let sql="update consumer set `head_portrait`=? where `user_id`=?"
    sqlFn(sql,[editor,user_id],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"头像更换成功"})
        }else {
            response.status(400).json({errors:"未知错误，头像更换失败"})
        }
    })
})

router.post('/password',(request,response)=>{
    let {user_id,password}=request.body
    let sql="update consumer set `password`=? where `user_id`=?"
    sqlFn(sql,[password,user_id],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"密码修改成功"})
        }else {
            response.status(400).json({errors:"未知错误，密码修改失败"})
        }
    })
})

router.post('/checkPassword',(request,response)=>{
    let {user_id,editor}=request.body
    let sql="select * from consumer where `user_id`=? limit 1"
    sqlFn(sql,[user_id,editor],function (data) {
        if(data.length>0){
            if(data[0].password===editor){
                response.status(200).json({success:"密码正确"})
            }else {
                response.status(400).json({errors:"密码错误"})
            }
        }else {
            response.status(400).json({errors:"未找到该用户"})
        }
    })
})


module.exports =router