import axios from 'axios'

export const tokenCheck=(token)=>{
    if(token)
    {
        axios.defaults.headers.common['Authorization']=`${token}`
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}