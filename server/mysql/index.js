const mysql=require('mysql')

var client=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'52097592w',
    database:'Ace'
})

//sql对象、数组、回调函数
function sqlFn(sql,arr,callback) {
    client.query(sql,arr,function (error,result) {
        if(error){
            console.log(new Error(error))
            return;
        }
        callback(result)
    })
}

module.exports=sqlFn