const express=require('express')
const materials=express.Router()
const readCookies=require('../utils/readCookie')
const sqlFn=require('../mysql/index')


materials.post('/organization',(request,response)=>{
    let user_id=unescape(readCookies(request.headers.cookie).user_id)
    let {pic_front,pic_reserve,pic_info}=request.body
    new Promise(((resolve, reject) => {
        let sql="select * from materials where user_id=?"
        sqlFn(sql,[user_id],function (data) {
            if(data.length>0){
                reject()
            }else {
                resolve()
            }
        })
    })).then(res=>{
        return new Promise(((resolve, reject) => {
            let sql="insert into materials values (null,?,?,?,?,?)"
            sqlFn(sql,[user_id,pic_front,pic_reserve,pic_info,'资质审核中'],function (data) {
                if(data.affectedRows>0){
                    resolve()
                }else {
                    response.status(400).json({errors:"服务器故障，请稍后再试！"})
                }
            })
        }))
    },err=>{
        return new Promise(((resolve, reject) => {
            let sql="update materials set `pic_front`=?,`pic_reserve`=?,`pic_info`=? where `user_id`=?"
            sqlFn(sql,[pic_front,pic_reserve,pic_info,user_id],function (data) {
                if(data.affectedRows>0){
                    resolve()
                }else {
                    response.status(400).json({errors:"服务器故障，请稍后再试！"})
                }
            })
        }))
    }).then(res=>{
        //更改用户表中的信息
        let sql="update consumer set `account_state`=? where `user_id`=?"
        sqlFn(sql,['资质审核中',user_id],function (data) {
            if(data.affectedRows>0){
                response.status(200).json({success:"材料提交成功,请等待审核信息"})
            }else{
                response.status(400).json({errors:"服务器故障，请稍后再试！"})
            }
        })
    })
})


module.exports=materials