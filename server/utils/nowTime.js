function nowTime(){
    let myDate=new Date()
    let date={
        year:myDate.getFullYear(),
        month:myDate.getMonth()+1<10?"0"+myDate.getMonth()+1:myDate.getMonth()+1,
        day:myDate.getDay()<10?"0"+myDate.getDay():myDate.getDay(),
        hour:myDate.getHours()<10?"0"+myDate.getHours():myDate.getHours(),
        minute:myDate.getMinutes()<10?"0"+myDate.getMinutes():myDate.getMinutes()
    }
    return date.year+"-"+date.month+"-"+date.day+" "+date.hour+":"+date.minute
}

module.exports={
    nowTime
}