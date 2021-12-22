const axios =require('axios')

const {createProxyMiddleware}=require('http-proxy-middleware')

axios.defaults.withCredentials=true

module.exports=function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target:"http://localhost:8888",
            changeOrigin:true,
            pathRewrite:{
                '^/api':""
            }
        })
    )
}

