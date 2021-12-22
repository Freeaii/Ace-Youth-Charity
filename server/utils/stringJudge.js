function stringJudge(url) {
    let stringArr=['/admin','/materials','/user','/recompose','/email/send','/email/changeEmail','/email/findEmail','/email/checkEmail']
    for(let i=0;i<stringArr.length;i++){
        if(url.includes(stringArr[i])){
            return true
        }
    }
}
module.exports=stringJudge