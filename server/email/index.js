const nodMailer=require('nodemailer')

//生成验证码
function createCode(){
    let str='0123456789';
    let code='';
    for(let i=0;i<6;i++){
        code+=str.charAt(Math.random()*str.length |0)
    }
    return code
}


//封装验证码发送并且存储函数
 function postEmail(auth,to,subject,code,style,callback){
    //验证码全局参数
    let newCode=code?code:createCode()
    //建立SMTP连接
    let transports = nodMailer.createTransport({
        host:"smtp.qq.com",
        secureConnection:true,
        auth:auth
    })

    //相关参数
    let options={
        from:auth.user,
        to,
        subject,
        html:`<div class="home" style="display: flex;flex-flow: column;justify-content: center;align-items: center">
    <h1>爱思青年公益</h1>
    <div class="check" style="display: flex;align-items: center">
        <p>请接收您的验证码:</p>
        <span style="background-color: #f1f2f3;margin: 0 10px;font-weight: 500;font-size: 26px">${newCode}</span>
        <p>,5分钟内有效!</p>
    </div>
</div>`
    };

    //发送邮件
   transports.sendMail(options,function (err,msg) {
        if(err){
            callback('error')
        }else {
            if(!code){
                callback(newCode)
            }
        }
    })
}
module.exports=postEmail