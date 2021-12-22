module.exports=readCookies=(cookies)=>{
    let cookie={}
    let cookiesManage=cookies.split(';')
    if(cookies.length>0){
        cookiesManage.forEach(item=>{
            if(item){
                let cookieArray=item.split('=');
                if(cookieArray&&cookieArray.length>0){
                    let key = cookieArray[0].trim()
                    let value = cookieArray[1] ? cookieArray[1].trim() : undefined
                    cookie[key] = value
                }
            }
        })
    }
    return cookie
}