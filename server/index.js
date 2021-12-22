const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const readCookies=require('./utils/readCookie')
const stringJudge=require('./utils/stringJudge')
//后端设置cors解决跨域（测试方案）

//上线后部署跨域测试
const history = require('connect-history-api-fallback'); // 引入history插件
const cors=require('cors')
const register=require('./routes/register')
const debug=require("debug")("my-application")
const bodyParser=require('body-parser')
const login=require('./routes/login')
const subscription=require('./routes/subscription')
const user=require('./routes/user')
const information=require('./routes/getInformation')
const admin=require('./routes/admin')
const recompose=require('./routes/recompose')
const email=require('./routes/email')

const materials=require('./routes/materials')

//上线后部署：粗略版本
app.use(cors())
app.use(history())

//处理token验证
app.use('/',(req,res,next)=>{
    if(stringJudge(req.url)){
        //接受token
        const token=String(req.headers.authorization)

        //接受cookie
        const cookie_user_id=unescape(readCookies(req.headers.cookie).user_id)
        //解析token

        const token_user_id=jwt.decode(token)
        //验证id是和否相同
        if(cookie_user_id == token_user_id.id){
            next()
        }else {
            res.status(404).json({errors:"请不要尝试修改token或者cookie，请重新登录！"})
        }
    }else {
        next()
    }
})

app.use(bodyParser.json({
    limit:'20mb',
}))
app.use(bodyParser.urlencoded({
    limit:'20mb',
    extended:true
}))
//处理注册的接口
app.use('/register',register)

//处理登录的接口
app.use('/login',login)


//处理订阅的接口
app.use('/subscription',subscription)

//开放静态资源文件接口
app.use('/static',express.static(__dirname+'/static'))
app.use(express.static('./public'))

//处理个人中心的接口
app.use('/user',user)

//处理首页、项目、资讯页面的接口
app.use('/information',information)

//处理管理员页面的接口
app.use('/admin',admin)

//处理信息相关修改的接口
app.use('/recompose',recompose)

//处理材料提交模块
app.use('/materials',materials)

//处理邮件模块
app.use('/email',email)


//设置端口
app.listen(8888,()=>{
    debug('server is running on 80 port!')
})