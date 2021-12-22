const express=require('express')
const router=express.Router()

const sqlFn=require('../mysql/index')

router.post('/',(request,response)=> {

    let {username, email, password} = request.body
        //检查用户是否存在
        const register=new Promise(((resolve, reject) => {
            let sqlLogin = "select 1 from consumer where `email`=? limit 1"
            sqlFn(sqlLogin, [email], function (data) {
                if (data.length > 0) {
                    response.status(400).json({errors: "该邮箱已被注册！"})
                } else {
                    resolve('success')
                }
            })
        }))
        register.then((res)=>{//将信息写入数据库
            let sql = "insert into consumer values (null,?,?,?,null,?,?,?)";
            let head="http://localhost:8888/static/images/defaultHead.jpeg"
            let arr = [email, username, password,head,"个人",'注册待验证']
            sqlFn(sql, arr, function (data) {
                if (data.affectedRows) {
                    response.status(200).json({success:"信息通过审核，下面将进行邮箱验证"})
                } else {
                    response.status(400).json({errors: "注册失败"})
                }
            })
        })
})

module.exports=router;