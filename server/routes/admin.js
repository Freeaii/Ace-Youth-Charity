const express=require('express')
const sqlFn=require('../mysql/index')
const router=express.Router()



//获取数据列表函数
function getAdminArticle(sql,arr,response){
    sqlFn(sql,arr,function (data) {
        if(data.length>0){
            response.status(200).json(data)
        }else{
            response.status(200).json([])
        }
    })
}

//获取待审核文章列表
router.get('/check/article',(request,response)=>{
    switch (request.query.style) {
        case "全部":
            let sqlT="select article_id,title,cover,date,state,pass_state from articles where `style`=? and (`state`=? or `state`=? or `state`=?)";
            let arrT=['公益资讯','审核中','已通过','未通过']
            getAdminArticle(sqlT,arrT,response)
            break;
        case "审核中":
            let sqlS="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=?";
            let arrS=['公益资讯','审核中']
            getAdminArticle(sqlS,arrS,response)
            break;
        case "已通过":
            let sqlY="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=?";
            let arrY=['公益资讯','已通过']
            getAdminArticle(sqlY,arrY,response)
            break;
        case "未通过":
            let sqlW="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=?";
            let arrW=['公益资讯','未通过']
            getAdminArticle(sqlW,arrW,response)
            break;
        //数据库没有对应key
        case "展示中":
            let sqlZ="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=? and `pass_state`=?";
            let arrZ=['公益资讯','已通过','展示中']
            getAdminArticle(sqlZ,arrZ,response)
            break;

        //数据库没有对应key
        case "已关闭":
            let sqlG="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=? and `pass_state`=?";
            let arrG=['公益资讯','已通过','已关闭']
            getAdminArticle(sqlG,arrG,response)
            break;
    }
})


//获取待审核项目列表
router.get('/check/project',(request,response)=>{
    switch (request.query.style) {
        case "全部":
            let sqlT="select article_id,title,cover,date,state,pass_state from articles where `style`=? and (`state`=? or `state`=? or `state`=?)";
            let arrT=['公益项目','审核中','已通过','未通过']
            getAdminArticle(sqlT,arrT,response)
            break;
        case "审核中":
            let sqlS="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=?";
            let arrS=['公益项目','审核中']
            getAdminArticle(sqlS,arrS,response)
            break;
        case "已通过":
            let sqlY="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=?";
            let arrY=['公益项目','已通过']
            getAdminArticle(sqlY,arrY,response)
            break;
        case "未通过":
            let sqlW="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=?";
            let arrW=['公益项目','未通过']
            getAdminArticle(sqlW,arrW,response)
            break;

         //数据库没有对应key
        case "展示中":
            let sqlZ="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=? and `pass_state`=?";
            let arrZ=['公益项目','已通过','展示中']
            getAdminArticle(sqlZ,arrZ,response)
            break;

        //数据库没有对应key
        case "已关闭":
            let sqlG="select article_id,title,cover,date,state,pass_state from articles where `style`=? and `state`=? and `pass_state`=?";
            let arrG=['公益项目','已通过','已关闭']
            getAdminArticle(sqlG,arrG,response)
            break;
    }
})

//获取待审核账号列表
router.get('/check/account',(request,response)=>{
    let {style,state}=request.query
    if(style==="个人"){
        switch (state) {
            case "注册待验证":
                let sqlG="select * from consumer where `account_type`=? and `account_state`=?";
                let arrG=['个人','注册待验证']
                getAdminArticle(sqlG,arrG,response)
                break;
            case "正式用户":
                let sqlZ="select * from consumer where `account_type`=? and (`account_state`=? or`account_state`=?)";
                let arrZ=['个人','正式用户','资质审核中']
                getAdminArticle(sqlZ,arrZ,response)
                break;
            case "已禁封":
                let sqlJ="select * from consumer where `account_type`=? and `account_state`=?";
                let arrJ=['个人','已禁封']
                getAdminArticle(sqlJ,arrJ,response)
                break;
        }
    }else {
        switch (state) {
            case "资质审核":
               // let sqlZ="select * from consumer where `account_type`=? and `account_state`=?";
                let sqlZ="select consumer.user_id,consumer.email,consumer.username,consumer.account_type,consumer.account_state,materials.pic_front,materials.pic_reserve,materials.pic_info from materials,consumer where materials.user_id=consumer.user_id and  consumer.account_type=? and consumer.account_state=?"
                let arrZ=['个人','资质审核中']
                getAdminArticle(sqlZ,arrZ,response)
                break;
            case "正式组织":
                let sqlS="select * from consumer where `account_type`=? and `account_state`=?";
                let arrS=['组织','正式组织']
                getAdminArticle(sqlS,arrS,response)
                break;
            case "已禁封":
                let sqlJ="select * from consumer where `account_type`=? and `account_state`=?";
                let arrJ=['组织','已禁封']
                getAdminArticle(sqlJ,arrJ,response)
        }
    }
})


module.exports=router