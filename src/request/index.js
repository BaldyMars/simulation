import axios from 'axios';
import { message } from 'antd';



message.config({
  top: 50,
  duration: 2,
  maxCount: 3,
});
//monk数据模拟出来的数据不会跨域

//判断是开发环境还是生产环境
const isDev = process.env.NODE_ENV === "development"
const service = axios.create({
  baseURL:isDev ? "http://rap2api.taobao.org/app/mock/237961" : 'http://rap2api.taobao.org/app/mock/237961'
})

const service2 = axios.create({
  baseURL:isDev ? "http://rap2api.taobao.org/app/mock/237961" : 'http://rap2api.taobao.org/app/mock/237961'
})


/* 
  每次请求的时候都需要在请求header上面携带token发送给后端，
  后端可以根据传递来的token判别用户是否登录状态
  axios拦截器 （请求前的拦截、响应后的拦截）
*/

//请求前的拦截
service.interceptors.request.use(config => {
  // console.log("config==>", config);
  // authToken后端搞出来的，应该从本地存储里面去取authToken
  // config.data = {...config.data, "authToken" : "giao"}
  config.data = Object.assign({}, config.data, {
    authToken:localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  })
  return config
})

//响应后的拦截
//根据后端返回给你的状态码进行相关业务逻辑操作
//可以在每次发送请求之前，可以在请求头上面携带一些数据发送给后端
service.interceptors.response.use(res => {
  if(res.data.code === 200){
    return res.data.data
  }else{
    // console.log("不行不行。。。");
    message.error(res.data.msg)
  }
})
//获取文章列表
export const getArticleList = (offset, limited) => {
  return service.post("/api/v1/articleList", {
    offset, limited
  })
}


//根据id删除文章
export const deleteArticleById = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
}


//根据id获取详情
export const getArticleDetailById = (id) =>{
  return service.post(`/api/v1/articlegiao/${id}`)
}


export const saveEditArticle = (id, data) => {
  return service.post(`/api/v1/articleSave/${id}`, data)
}

export const getNotifications = () => {
  return service.post(`/api/v1/notifications/`)
}

export const login = (userInfo) => {
  return service2.post(`/api/v1/login`, userInfo)
}