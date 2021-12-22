
const getCookieExpires=require('../utils/cookie')
const express=require('express')
const sqlFn=require('../mysql/index')
const jwt=require('jsonwebtoken')
const config=require('../config')
const router=express.Router()

router.post('/',(request,response)=>{
    const {email,password}=request.body;
    //检查用户是否存在
    const findUser=new Promise(((resolve, reject) => {
        let sql="select 1 from consumer where `email`=? limit 1"
        sqlFn(sql,[email],function (data) {
            if(data.length>0){
                resolve('login')
            }else {
                reject('login')
            }
        })
    }))
    //查询账户密码是否正确
    findUser.then(res=>{
            const sql="select * from consumer where `email`=? AND `password`=?";
            const arr=[email,password];
            sqlFn(sql,arr,function (data) {
                if(data.length>0){
                    switch (data[0].account_state) {
                        case '注册待验证':
                            response.status(401).json({errors:"您的账号还未进行邮箱验证",next:"register_final"})
                            break;
                        case "已禁封":
                            response.status(401).json({errors:"该账号已禁封,解封可联系管理员"})
                            break;
                        default:
                            //返回token
                            const token=jwt.sign({
                                id:data[0].user_id,
                            },config.jwtSecret)
                            //设置cokie
                            response.setHeader('Set-Cookie',`user_id=${data[0].user_id};path:/;httpOnly;expires=${getCookieExpires()}`)

                            response.status(200).send({
                                token:token,
                                id:data[0].user_id
                            })
                            break;

                    }
                }else{
                    response.status(401).json({errors:"用户名密码错误！"})
                }
            })
    },err=>{
        response.status(401).json({errors:"未找到该用户！"})
    })
})

router.post('/password',(request,response)=>{
    let {email,password}=request.body
    let sql="update consumer set `password`=? where `email`=?"
    sqlFn(sql,[password,email],function (data) {
        if(data.affectedRows>0){
            response.status(200).json({success:"密码设置成功"})
        }else {
            response.status(400).json({errors:"未知错误，密码设置失败"})
        }
    })
})

module.exports=router