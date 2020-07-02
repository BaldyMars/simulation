import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(localStorage.getItem("authToken")) || Boolean(sessionStorage.getItem("authToken"))
const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"))


const initState = {
  ...user,
  isLogin, //未登录
  isLoading:false //登陆时的loading
}

export default (state = initState, action) => {
  switch(action.type){
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading:true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLogin:true,
        isLoading:false
      }
    case actionTypes.LOGIN_FAIL:
      return {
        id:"", //唯一的id
        avatar:"",//用户头像
        displayName:"",//用户昵称
        role:"",//用户角色
        isLogin:false,//未登录
        isLoading:false
    }
    default:
      return state
  }
}