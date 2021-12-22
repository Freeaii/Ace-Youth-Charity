const express=require('express')
const sqlFn=require('../mysql/index')
const router=express.Router()

router.post('/',(request,response)=>{
    const {email}=request.body;

    //检查用户是否存在
    const findUser=new Promise(((resolve, reject) => {
        let sql="select 1 from subscriptions where `email`=? limit 1"
        sqlFn(sql,[email],function (data) {
            if(data.length>0){
                response.status(400).json({errors:"请勿重复申请订阅！"})
            }else {
                resolve('subscription')
            }
        })
    }))

    findUser.then(res=>{
        //将信息写入数据库
        let sql = "insert into subscriptions values (null,?,?)";
        let arr = [email,false]
        sqlFn(sql, arr, function (data) {
            if (data.affectedRows) {
                response.status(200).json({success:"稍后将会将确认邮件发送到您邮箱!"})
            } else {
                response.status(400).json({errors: "系统故障，请稍后再试！"})
            }
        })
    })
})

module.exports=router