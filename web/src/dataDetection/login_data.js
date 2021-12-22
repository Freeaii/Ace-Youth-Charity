export const emailCheck=(email)=>{
    var reg=/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(email);
}

export const getQueryVariable=(variable)=>
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return false;
}