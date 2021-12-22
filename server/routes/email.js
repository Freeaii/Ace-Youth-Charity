const express=require('express')
const email=express.Router()
const sqlFn=require('../mysql/index')
const postEmail=require('../email/index')


//获取登录或者注册的邮箱验证码
email.get('/verification',(request,response)=>{
    const {email,style}=request.query
    //修改密码
    if(style==="findPassword"){

        //邮箱模版
        let sendStyle=`findPassword`
        //邮箱主题
        let subject="接收您的验证码"
        //smtp授权
        let auth={
            user:'1374977935@qq.com',
            pass:'ffxnjiyndcweiiaj'
        }
        //验证数据库中是否有这个人的邮箱
        new Promise(((resolve, reject) => {
            let sql="select 1 from consumer where `email`=?"
            sqlFn(sql,[email],function (data) {
                if(data.length>0){
                    resolve()
                }else {
                    response.status(400).json({errors:"此邮箱未注册!"})
                }
            })
        })).then((resolve)=>{
            //设置回调函数
            let callback=(data)=>{
                if(data==='error'){
                    response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
                }else {
                    let sql="insert into emailVerification value(null,?,?,?,?)"
                    sqlFn(sql,[email,sendStyle,data,new Date().getTime()],function (data) {
                        if(data.affectedRows>0){
                            response.status(200).json({success:"邮件已下发"})
                        }else {
                            response.status(400).json({errors:"验证邮件发送失败"})
                        }
                    })
                }
            }
            return new Promise(((resolve, reject) => {
                //验证邮箱中是否存在验证码？
                let sql='select 1 from emailVerification where `email`=? and `style`=?'
                sqlFn(sql,[email,sendStyle],function (data) {
                   if(data.length>0){
                       resolve()
                   }else {
                       //接收返回的参数
                       postEmail(auth,email,subject,null,sendStyle,callback)
                   }
                })
            }))
        }).then(res=>{
            //设置回调函数
            let callback=(data)=>{
                if(data==='error'){
                    response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
                }else {
                    let sql="update emailVerification set `code`=?,`date`=? where `email`=? and `style`=? limit 1"
                    sqlFn(sql,[data,new Date().getTime(),email,sendStyle],function (data) {
                        if(data.affectedRows>0){
                            response.status(200).json({success:"邮件已下发"})
                        }else {
                            response.status(400).json({errors:"验证邮件发送失败"})
                        }
                    })
                }
            }
            let sqlFind='select code,date from emailVerification where `email`=? and `style`=? limit 1'
            sqlFn(sqlFind,[email,'findPassword'],function (data) {
                if(new Date().getTime()-data[0].date<1000*240){
                    postEmail(auth,email,subject,data[0].code,sendStyle,null)
                    response.status(200).json({success:"邮件已下发"})
                }else {
                    postEmail(auth,email,subject,null,sendStyle,callback)
                }
            })
        })
    }
    //注册
    if(style==="register_final"){
        //邮箱模版
        let sendStyle=`register`
        //邮箱主题
        let subject="验证您的邮箱"
        //smtp授权
        let auth={
            user:'1374977935@qq.com',
            pass:'ffxnjiyndcweiiaj'
        }
        new Promise(((resolve, reject) => {
            //设置回调函数
            let callback=(data)=>{
                if(data==='error'){
                    response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
                }else {
                    let sql="insert into emailVerification value(null,?,?,?,?)"
                    sqlFn(sql,[email,sendStyle,data,new Date().getTime()],function (data) {
                        if(data.affectedRows>0){
                            response.status(200).json({success:"邮件已下发"})
                        }else {
                            response.status(400).json({errors:"验证邮件发送失败"})
                        }
                    })
                }
            }
            //验证邮箱中是否存在验证码？
            let sql='select 1 from emailVerification where `email`=? and `style`=?'
            sqlFn(sql,[email,sendStyle],function (data) {
                if(data.length>0){
                    resolve()
                }else {
                    //接收返回的参数
                    postEmail(auth,email,subject,null,sendStyle,callback)
                }
            })
        })).then(res=>{
            //设置回调函数
            let callback=(data)=>{
                if(data==='error'){
                    response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
                }else {
                    let sql="update emailVerification set `code`=?,`date`=? where `email`=? and `style`=? limit 1"
                    sqlFn(sql,[data,new Date().getTime(),email,sendStyle],function (data) {
                        if(data.affectedRows>0){
                            response.status(200).json({success:"邮件已下发"})
                        }else {
                            response.status(400).json({errors:"验证邮件发送失败"})
                        }
                    })
                }
            }
            let sqlFind='select code,date from emailVerification where `email`=? and `style`=? limit 1'
            sqlFn(sqlFind,[email,sendStyle],function (data) {
                if(new Date().getTime()-data[0].date<1000*240){
                    postEmail(auth,email,subject,data[0].code,sendStyle,null)
                    response.status(200).json({success:"邮件已下发"})
                }else {
                    postEmail(auth,email,subject,null,sendStyle,callback)
                }
            })
        })
    }

})


//发送邮箱验证码
email.get('/send',(request,response)=>{
    let{style,email}=request.query
    //邮箱模版
    let sendStyle=style
    //邮箱主题
    let subject="请接收您的验证码"
    //smtp授权
    let auth={
        user:'1374977935@qq.com',
        pass:'ffxnjiyndcweiiaj'
    }
    new Promise(((resolve, reject) => {
        //设置回调函数
        let callback=(data)=>{
            if(data==='error'){
                response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
            }else {
                let sql="insert into emailVerification value(null,?,?,?,?)"
                sqlFn(sql,[email,sendStyle,data,new Date().getTime()],function (data) {
                    if(data.affectedRows>0){
                        response.status(200).json({success:"邮件已下发"})
                    }else {
                        response.status(400).json({errors:"验证邮件发送失败"})
                    }
                })
            }
        }
        //验证邮箱中是否存在验证码？
        let sql='select 1 from emailVerification where `email`=? and `style`=?'
        sqlFn(sql,[email,sendStyle],function (data) {
            if(data.length>0){
                resolve()
            }else {
                //接收返回的参数
                postEmail(auth,email,subject,null,sendStyle,callback)
            }
        })
    })).then(res=>{
        //设置回调函数
        let callback=(data)=>{
            if(data==='error'){
                response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
            }else {
                let sql="update emailVerification set `code`=?,`date`=? where `email`=? and `style`=? limit 1"
                sqlFn(sql,[data,new Date().getTime(),email,sendStyle],function (data) {
                    if(data.affectedRows>0){
                        response.status(200).json({success:"邮件已下发"})
                    }else {
                        response.status(400).json({errors:"验证邮件发送失败"})
                    }
                })
            }
        }
        let sqlFind='select code,date from emailVerification where `email`=? and `style`=? limit 1'
        sqlFn(sqlFind,[email,sendStyle],function (data) {
            if(new Date().getTime()-data[0].date<1000*240){
                postEmail(auth,email,subject,data[0].code,sendStyle,null)
                response.status(200).json({success:"邮件已下发"})
            }else {
                postEmail(auth,email,subject,null,sendStyle,callback)
            }
        })
    })
})


//发送邮箱，并且检测更换绑定的邮箱是否已经注册
email.get('/findEmail',(request,response)=>{
    let{style,email}=request.query
    //邮箱模版
    let sendStyle=style
    //邮箱主题
    let subject="请接收您的验证码"
    //smtp授权
    let auth={
        user:'1374977935@qq.com',
        pass:'ffxnjiyndcweiiaj'
    }
    new Promise(((resolve, reject) => {
        let sql="select 1 from consumer where `email`=?"
        sqlFn(sql,[email],function (data) {
            if(data.length>0){
                response.status(400).json({errors:"此邮箱已注册!"})
            }else {
                resolve()
            }
        })
    })).then(res=>{
        //设置回调函数
        let callback=(data)=>{
            if(data==='error'){
                response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
            }else {
                let sql="insert into emailVerification value(null,?,?,?,?)"
                sqlFn(sql,[email,sendStyle,data,new Date().getTime()],function (data) {
                    if(data.affectedRows>0){
                        response.status(200).json({success:"邮件已下发"})
                    }else {
                        response.status(400).json({errors:"验证邮件发送失败"})
                    }
                })
            }
        }
        return new Promise(((resolve, reject) => {
            //验证邮箱中是否存在验证码？
            let sql='select 1 from emailVerification where `email`=? and `style`=?'
            sqlFn(sql,[email,sendStyle],function (data) {
                if(data.length>0){
                    resolve()
                }else {
                    //接收返回的参数
                    postEmail(auth,email,subject,null,sendStyle,callback)
                }
            })
        }))
    }).then(res=>{
        //设置回调函数
        let callback=(data)=>{
            if(data==='error'){
                response.status(400).json({errors:'服务器出错了，你可能无法接收到验证码!'})
            }else {
                let sql="update emailVerification set `code`=?,`date`=? where `email`=? and `style`=? limit 1"
                sqlFn(sql,[data,new Date().getTime(),email,sendStyle],function (data) {
                    if(data.affectedRows>0){
                        response.status(200).json({success:"邮件已下发"})
                    }else {
                        response.status(400).json({errors:"验证邮件发送失败"})
                    }
                })
            }
        }
        let sqlFind='select code,date from emailVerification where `email`=? and `style`=? limit 1'
        sqlFn(sqlFind,[email,sendStyle],function (data) {
            if(new Date().getTime()-data[0].date<1000*240){
                postEmail(auth,email,subject,data[0].code,sendStyle,null)
                response.status(200).json({success:"邮件已下发"})
            }else {
                postEmail(auth,email,subject,null,sendStyle,callback)
            }
        })
    })
})

//检测邮箱验证码是否正确
email.post('/checkEmail',(request,response)=>{
    let {email,verification,style}=request.body
    new Promise(((resolve, reject) => {

        let sql="select * from emailVerification where `email`=? and `style`=? limit 1"
        sqlFn(sql,[email,style],function (data) {
            if(data.length>0){
                if(new Date().getTime()-1000*300>data[0].date){
                    response.status(400).json({errors:"验证码错误"})
                }else {
                    if(verification===data[0].code){
                        resolve(data[0].code)
                        response.status(200).json({success:"验证通过"})
                    }else{
                        response.status(400).json({errors:"验证码错误"})
                    }
                }
            }else {
                response.status(400).json({errors:"请点击发送验证码"})
            }
        })
    })).then(res=>{
        //删除已使用过的验证码
        let sql="delete from emailVerification where `email`=? and `style`=? and `code`=? limit 1"
        sqlFn(sql,[email,style,res],function (data) {
            if(data.affectedRows>0){
                console.log('已删除陈旧验证码')
            }else {
                console.log('陈旧验证码删除失败')
            }
        })
    })
})


//更换邮箱以及相关信息
email.post('/changeEmail',(request,response)=>{
    let {email,verification,style,email_change,user_id}=request.body
    new Promise(((resolve, reject) => {

        let sql="select * from emailVerification where `email`=? and `style`=? limit 1"
        sqlFn(sql,[email_change,style],function (data) {
            if(data.length>0){
                if(new Date().getTime()-1000*300>data[0].date){
                    response.status(400).json({errors:"验证码错误"})
                }else {
                    if(verification===data[0].code){
                        resolve(data[0].code)
                    }else{
                        response.status(400).json({errors:"验证码错误"})
                    }
                }
            }else {
                response.status(400).json({errors:"请点击发送验证码"})
            }
        })
    })).then(res=>{
        //删除已使用过的验证码
        let sql="delete from emailVerification where `email`=? and `style`=? and `code`=? limit 1"
        sqlFn(sql,[email_change,style,res],function (data) {
            if(data.affectedRows>0){
                console.log('已删除陈旧验证码')
            }else {
                console.log('陈旧验证码删除失败')
            }
        })

        //将邮箱进行更改
        let sqlUpdate="update consumer set `email`=? where `email`=? limit 1"
        sqlFn(sqlUpdate,[email_change,email],function (data) {
            if(data.affectedRows>0){
                response.status(200).json({success:"邮箱修改成功"})
            }else {
                response.status(400).json({errors:"邮箱修改失败"})
            }
        })
    })
})



//注册检测邮箱
email.post('/check',(request,response)=>{
   let {email,verification,style}=request.body
    //查询数据中是否有验证码
    let sendStyle=style==="findPassword"?"findPassword":"register"
    new Promise(((resolve, reject) => {

        let sql="select * from emailVerification where `email`=? and `style`=? limit 1"
        sqlFn(sql,[email,sendStyle],function (data) {
            if(data.length>0){
                if(new Date().getTime()-1000*300>data[0].date){
                    response.status(400).json({errors:"验证码错误"})
                }else {
                    if(verification===data[0].code){
                        resolve(data[0].code)
                        if(sendStyle==="findPassword"){
                            response.status(200).json({success:"验证成功,请设置您的新密码！"})
                        }
                    }else{
                        response.status(400).json({errors:"验证码错误"})
                    }
                }
            }else {
                response.status(400).json({errors:"请点击发送验证码"})
            }
        })
    })).then(res=>{
        //删除已使用过的验证码
        let sql="delete from emailVerification where `email`=? and `style`=? and `code`=? limit 1"
        sqlFn(sql,[email,sendStyle,res],function (data) {
            if(data.affectedRows>0){
                console.log('已删除陈旧验证码')
            }else {
                console.log('陈旧验证码删除失败')
            }
        })
        if(sendStyle==="register"){
            //将用户改为正式用户
            let sqlUser="update consumer set `account_state`=? where `email`=?"
            sqlFn(sqlUser,['正式用户',email],function (data) {
                if(data.affectedRows>0){
                    response.status(200).json({success:"验证成功,赶快登录吧！"})
                }else {
                    response.status(400).json({errors:"验证失败，服务器挂了！"})
                }
            })
        }
    })
})



module.exports=email